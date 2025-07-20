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
      {/* Fallback background - always beneath iframe */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0" />
      
      {/* YouTube Video Background */}
      <iframe
        ref={iframeRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none z-10 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        src={videoUrl}
        title="Hero Video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-5" />
    </div>
  );
}
