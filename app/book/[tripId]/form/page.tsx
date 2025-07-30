'use client';

import { useState, useEffect, useCallback } from 'react';
import { trips } from '../../../../src/data/trips';
import { tripFormSchema } from '../../../../src/data/tripForms';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    tripId: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface FormData {
  [key: string]: string | File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function BookingFormPage({ params }: PageProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [tripId, setTripId] = useState<string>('');
  const [formSchema, setFormSchema] = useState<FormField[]>([]);
  const [trip, setTrip] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<string>('');

  // Get trip data and form schema
  const getTripData = useCallback(async () => {
    const { tripId: id } = await params;
    setTripId(id);
    
    const tripData = trips.find(t => t.id === id);
    if (!tripData) {
      notFound();
    }
    setTrip(tripData);

    // Get form schema for this trip
    const schema = tripFormSchema[id as keyof typeof tripFormSchema];
    if (!schema) {
      notFound();
    }
    setFormSchema(schema);

    // Initialize form data with empty values
    const initialFormData: FormData = {};
    schema.forEach(field => {
      initialFormData[field.name] = '';
    });
    setFormData(initialFormData);
  }, [params]);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    formSchema.forEach(field => {
      const value = formData[field.name];
      
      if (field.required) {
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }

      // Additional validation for specific field types
      if (field.type === 'file' && field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // Validate that image base64 is available for required file fields
      if (field.type === 'file' && field.required && field.name === 'paymentProof' && !imageBase64) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Handle file upload
  const handleFileChange = (fieldName: string, file: File | null) => {
    if (file) {
      // Validate file type for image files
      if (fieldName === 'paymentProof' && !file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [fieldName]: 'Please upload an image file' }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [fieldName]: 'File size must be less than 5MB' }));
        return;
      }

      // Convert image to base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
      reader.onerror = () => {
        setErrors(prev => ({ ...prev, [fieldName]: 'Failed to process image file' }));
        setImageBase64('');
      };
      reader.readAsDataURL(file);
    } else {
      // Clear base64 when no file is selected
      setImageBase64('');
    }

    setFormData(prev => ({ ...prev, [fieldName]: file }));
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Extract all fields from form data with fallbacks
      const title = formData.title || '';
      const firstName = formData.firstName || '';
      const lastName = formData.lastName || '';
      const phone = formData.phone || formData.phoneNumber || '';
      const email = formData.email || '';
      const extractedTripId = tripId || trip?.id || '';
      const tripName = trip?.name || trip?.title || '';
      const tripCategory = trip?.category || trip?.tripCategory || '';
      const citizenId = formData.citizenId || '';
      const passportNumber = formData.passportNumber || '';
      const passportExpiry = formData.passportExpiry || '';
      const roomType = formData.roomType || '';
      const note = formData.note || formData.additionalNotes || '';
      const extractedImageBase64 = imageBase64;

      // Debug: Log all field values to identify which ones are missing
      console.log('Field values for validation:', {
        title: title || 'EMPTY',
        firstName: firstName || 'EMPTY',
        lastName: lastName || 'EMPTY',
        phone: phone || 'EMPTY',
        email: email || 'EMPTY',
        extractedTripId: extractedTripId || 'EMPTY',
        tripName: tripName || 'EMPTY',
        tripCategory: tripCategory || 'EMPTY',
        citizenId: citizenId || 'EMPTY',
        passportNumber: passportNumber || 'EMPTY',
        passportExpiry: passportExpiry || 'EMPTY',
        roomType: roomType || 'EMPTY',
        note: note || 'EMPTY',
        extractedImageBase64: extractedImageBase64 ? 'PRESENT' : 'EMPTY'
      });

      // Validate required fields before submission - only consider truly missing values
      const missingFields = [];
      
      if (!firstName || (typeof firstName === 'string' && firstName.trim() === '')) {
        missingFields.push('firstName');
      }
      if (!lastName || (typeof lastName === 'string' && lastName.trim() === '')) {
        missingFields.push('lastName');
      }
      if (!phone || (typeof phone === 'string' && phone.trim() === '')) {
        missingFields.push('phone');
      }
      if (!extractedTripId || (typeof extractedTripId === 'string' && extractedTripId.trim() === '')) {
        missingFields.push('tripId');
      }
      if (!tripName || (typeof tripName === 'string' && tripName.trim() === '')) {
        missingFields.push('tripName');
      }
      if (!tripCategory || (typeof tripCategory === 'string' && tripCategory.trim() === '')) {
        missingFields.push('tripCategory');
      }
      if (!extractedImageBase64 || (typeof extractedImageBase64 === 'string' && extractedImageBase64.trim() === '')) {
        missingFields.push('imageBase64');
      }

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Construct the payload with all fields matching Google Sheet headers
      const payload = {
        title,
        firstName,
        lastName,
        phone,
        email,
        tripId: extractedTripId,
        tripName,
        tripCategory,
        citizenId,
        passportNumber,
        passportExpiry,
        roomType,
        note,
        imageBase64: extractedImageBase64,
        fields: { ...formData }
      };

      // Remove File objects from fields
      Object.keys(payload.fields).forEach(key => {
        if (payload.fields[key] instanceof File) {
          delete payload.fields[key];
        }
      });

      // Debug: Log the payload before sending
      console.log('Payload:', payload);

      // Send to API route
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        if (responseData.success) {
          setSubmitStatus('success');
          setSubmitMessage(responseData.message || 'Booking submitted successfully! We will contact you soon.');
          
          // Reset form
          const resetFormData: FormData = {};
          formSchema.forEach(field => {
            resetFormData[field.name] = '';
          });
          setFormData(resetFormData);
          setImageBase64('');
        } else {
          throw new Error(responseData.message || 'Failed to submit booking');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to submit booking`);
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit booking. Please try again.');
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render form field based on type
  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = errors[field.name];

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base resize-vertical min-h-[100px] ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'file':
        return (
          <div 
            className="mt-1 flex justify-center px-4 md:px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => document.getElementById(field.name)?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.getElementById(field.name)?.click();
              }
            }}
            aria-labelledby={`${field.name}-label`}
            aria-describedby={error ? `${field.name}-error` : undefined}
            aria-invalid={!!error}
          >
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-10 w-10 md:h-12 md:w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex flex-col sm:flex-row text-sm text-gray-600">
                <span id={`${field.name}-label`} className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 px-2 py-1">
                  Upload a file
                </span>
                <p className="pl-0 sm:pl-1 mt-1 sm:mt-0">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input
              id={field.name}
              name={field.name}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFileChange(field.name, e.target.files?.[0] || null)}
              aria-required={field.required}
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : undefined}
            />
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            aria-required={field.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-3 md:py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  // Load trip data when component mounts
  useEffect(() => {
    getTripData();
  }, [getTripData]);

  if (!trip || formSchema.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-6 md:py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Book Your Trip</h1>
          <p className="text-gray-600 text-sm md:text-base">Complete the form below to register for your selected trip</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" role="form" aria-label="Trip booking form">
            {/* Trip Name (Readonly) */}
            <div>
              <label htmlFor="tripName" className="block text-sm font-medium text-gray-700 mb-2">
                Selected Trip
              </label>
              <input
                type="text"
                id="tripName"
                name="tripName"
                value={trip.title}
                readOnly
                aria-readonly="true"
                className="w-full px-3 py-3 md:py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm md:text-base"
              />
            </div>

            {/* Dynamic Form Fields */}
            {formSchema.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500" aria-label="required">*</span>}
                </label>
                {renderField(field)}
                {errors[field.name] && (
                  <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600" role="alert" aria-live="polite">
                    {errors[field.name]}
                  </p>
                )}
                {field.type === 'file' && formData[field.name] instanceof File && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600" aria-live="polite">
                      Selected file: {(formData[field.name] as File).name}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Submit Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md" role="alert" aria-live="polite">
                <p className="text-sm text-green-800">{submitMessage}</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md" role="alert" aria-live="polite">
                <p className="text-sm text-red-800">{submitMessage}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Submitting booking form...' : 'Submit booking form'}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base min-h-[44px]"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Booking'}
              </button>
              <Link
                href={`/book/${tripId}`}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 text-center text-sm md:text-base min-h-[44px] flex items-center justify-center"
                role="button"
                aria-label="Go back to trip details"
              >
                Back to Trip
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 