import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate required fields
    const { title, firstName, lastName, phone, email, tripId, tripName, tripCategory, imageBase64 } = body;
    
    if (!firstName || !lastName || !phone || !email || !tripId || !tripName || !tripCategory || !imageBase64) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields: firstName, lastName, phone, email, tripId, tripName, tripCategory, and imageBase64 are required' 
        },
        { status: 400 }
      );
    }

    // Get webhook URL and token from environment variables
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    const webhookToken = process.env.GOOGLE_SHEET_TOKEN;

    if (!webhookUrl) {
      console.error('GOOGLE_SHEET_WEBHOOK_URL environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!webhookToken) {
      console.error('GOOGLE_SHEET_TOKEN environment variable is not set');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Prepare data for Google Apps Script webhook
    // Include all dynamic fields from the request body while maintaining static fields
    const webhookData = {
      token: webhookToken,
      title,
      firstName,
      lastName,
      phone,
      email: email || '',
      tripId,
      tripName,
      tripCategory,
      imageBase64,
      submittedAt: new Date().toISOString(),
      // Include all dynamic fields from the request body
      ...body,
      // Ensure fields object is preserved for backward compatibility
      fields: body.fields || {}
    };

    // Debug: Log the webhook data being sent (excluding sensitive fields)
    console.log('Webhook data being sent:', {
      ...webhookData,
      token: '[REDACTED]',
      imageBase64: webhookData.imageBase64 ? '[PRESENT]' : '[MISSING]'
    });

    // Forward request to Google Apps Script webhook
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      }
    );

    // Handle the response
    if (response.ok) {
      try {
        const responseData = await response.json();
        
        // Check if webhook responded with success: true
        if (responseData.success === true) {
          return NextResponse.json({ 
            success: true, 
            message: responseData.message || 'Booking submitted successfully! We will contact you soon.' 
          });
        } else {
          // Webhook responded but with success: false or no success property
          console.error('Google Apps Script webhook returned error:', responseData);
          throw new Error(responseData.message || 'Webhook returned unsuccessful response');
        }
      } catch (jsonError) {
        // If JSON parsing fails, log the error and throw
        console.error('Failed to parse webhook JSON response:', jsonError);
        throw new Error('Invalid response from webhook');
      }
    } else {
      // Handle HTTP errors
      const errorText = await response.text();
      console.error('Google Apps Script webhook HTTP error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

  } catch (error) {
    console.error('API route error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 