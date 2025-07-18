export default function YouTubeBackground() {
  return (
    <iframe
      className="absolute inset-0"
      src="https://www.youtube.com/embed/g56DdJ5YFBU?autoplay=1&mute=1&controls=0&loop=1&playlist=g56DdJ5YFBU&modestbranding=1&showinfo=0&rel=0"
      title="Travel Hero Video"
      allow="autoplay; encrypted-media; fullscreen"
      allowFullScreen
      style={{ 
        border: 0,
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none'
      }}
    ></iframe>
  );
} 