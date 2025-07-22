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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (iframeRef.current && !isLoaded && !hasError) {
        setIsLoaded(true);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [isLoaded, hasError]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Fallback for when video fails to load
  if (hasError) {
    return (
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
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
    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
      {/* Fallback background - always beneath iframe */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0" />
      
      {/* YouTube Video Background - with native controls for desktop and mobile */}
      <div className="absolute inset-0 w-full h-full z-30">
        <iframe
          ref={iframeRef}
          className={`w-full h-full transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={videoUrl}
          title="Hero Video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
          style={{ 
            border: 'none',
            pointerEvents: 'auto' // Enable interaction with YouTube controls
          }}
        />
      </div>
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Dark overlay for better text readability - positioned behind iframe */}
      <div className="absolute inset-0 bg-black bg-opacity-20 z-5" />
    </div>
  );
}
