"use client";
import { useEffect, useRef, useState } from "react";

export default function YouTubeBackground({
  videoUrl,
}: {
  videoUrl: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (iframeRef.current && !isLoaded && !hasError) {
        console.log("Development: Timeout reached - forcing iframe visibility");
        setIsLoaded(true);
      }
    }, 5000); // Extended to 5 seconds

    return () => clearTimeout(timeoutId);
  }, [isLoaded, hasError]);

  const handleLoad = () => {
    console.log("Development: iframe onLoad fired");
    setIsLoaded(true);
  };

  const handleError = () => {
    console.log("Development: iframe onError fired");
    setHasError(true);
  };

  // Fallback for when video fails to load
  if (hasError) {
    return (
      <div className="absolute inset-0 w-full h-full">
        {/* Static gradient fallback background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0" />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 gradient-animation z-10" />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Debug border for container in development - only show on client */}
      {isClient && (
        <div className="absolute inset-0 border-4 border-green-500 z-50 pointer-events-none">
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs">
            YouTubeBackground Container
          </div>
        </div>
      )}
      
      {/* Fallback background - always beneath iframe */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0" />
      
      {/* YouTube Video Background */}
      <iframe
        ref={iframeRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${isClient ? "border-2 border-red-500" : ""}`}
        src={videoUrl}
        title="Hero Video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Debug overlay to show iframe position in development - only show on client */}
      {isClient && (
        <div className="absolute inset-0 border-2 border-yellow-500 z-15 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-2 py-1 text-xs font-bold">
            IFRAME POSITION (z-10)
          </div>
        </div>
      )}
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Dark overlay for better text readability - FIXED: now below iframe */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-5" />
    </div>
  );
}
