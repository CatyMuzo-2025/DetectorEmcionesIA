import React from 'react';

const VideoFeed = ({ videoRef, canvasRef, imgRef, isCameraActive, imageSrc }) => {
  const mediaStyle = { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' };
  
  return (
    <div style={{ backgroundColor: '#000', minHeight: '500px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Video Element */}
      <video 
        ref={videoRef} 
        style={mediaStyle} 
        className={!isCameraActive ? 'd-none' : ''} 
        playsInline 
        muted 
        crossOrigin="anonymous" 
      />
      
      {/* Image Element */}
      {imageSrc && (
        <img 
          ref={imgRef} 
          src={imageSrc} 
          alt="Upload" 
          style={mediaStyle} 
          crossOrigin="anonymous" 
        />
      )}
      
      {/* Canvas Overlay */}
      <canvas 
        ref={canvasRef} 
        className="position-absolute w-100 h-100" 
        style={{ pointerEvents: 'none' }} 
      />
      
      {/* Slot para el Overlay (Children) */}
    </div>
  );
};

export default VideoFeed;