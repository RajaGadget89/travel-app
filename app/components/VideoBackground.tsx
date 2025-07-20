"use client";

import { useEffect, useState, useRef } from 'react';

export default function VideoBackground() {
    console.log("Rendering VideoBackground component");
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [useFallback, setUseFallback] = useState(false);
    const [debug, setDebug] = useState('Initializing...');
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setDebug('Starting video background initialization...');

        // Try to load YouTube video with better compatibility
        const loadYouTubeVideo = () => {
            try {
                if (!containerRef.current) {
                    throw new Error('Container not ready');
                }

                // Create iframe dynamically for better control
                const iframe = document.createElement('iframe');
                iframe.src = "https://www.youtube.com/embed/jNQXAC9IVRw?autoplay=1&mute=1&controls=0&loop=1&playlist=jNQXAC9IVRw&modestbranding=1&showinfo=0&rel=0&playsinline=1&enablejsapi=1&origin=" + window.location.origin;
                iframe.title = "Travel Hero Video";
                iframe.allow = "autoplay; encrypted-media; fullscreen; picture-in-picture";
                iframe.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        `;

                containerRef.current.appendChild(iframe);

                // Check if video loads successfully
                setTimeout(() => {
                    if (iframe.contentWindow) {
                        setVideoLoaded(true);
                        iframe.style.opacity = '1';
                        setDebug('YouTube video loaded successfully');
                    } else {
                        throw new Error('Video failed to load');
                    }
                }, 2000);

                // Fallback if video doesn't load within 5 seconds
                setTimeout(() => {
                    if (!videoLoaded) {
                        setUseFallback(true);
                        setDebug('Video load timeout, using animated background');
                    }
                }, 5000);
            } catch (error) {
                console.log('YouTube video failed:', error);
                setUseFallback(true);
                setDebug('YouTube video failed, using animated background');
            }
        };

        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            loadYouTubeVideo();
        } else {
            setUseFallback(true);
            setDebug('Server-side rendering, using fallback');
        }
    }, [videoLoaded]);

    if (useFallback) {
        return (
            <div className="absolute inset-0 w-full h-full">
                {/* Beautiful animated gradient fallback */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)',
                        backgroundSize: '400% 400%',
                        animation: 'gradientShift 15s ease infinite'
                    }}
                />

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>

                <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
          }
        `}</style>

                {/* Debug info - remove in production */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50">
                        {debug}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="absolute inset-0 w-full h-full">
            {/* Video container */}
            <div ref={containerRef} className="absolute inset-0 w-full h-full" />

            {/* Overlay for better text readability */}
            <div
                className="absolute inset-0 bg-black bg-opacity-30"
                style={{ zIndex: 1 }}
            />

            {/* Loading indicator */}
            {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
            )}

            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs z-50">
                    {debug}
                </div>
            )}
        </div>
    );
} 