import { redirect } from 'next/navigation';

/**
 * Fallback page for /book route
 * 
 * This page handles direct access to /book when no specific trip ID is provided.
 * It redirects users to the home page where they can browse available trips.
 * 
 * This prevents 404 errors that occur when users:
 * - Type /book directly in the URL bar
 * - Click on broken links pointing to /book
 * - Access the route from external sources
 */
export default function BookFallbackPage() {
  // Redirect to home page where users can browse trips
  redirect('/');
} 