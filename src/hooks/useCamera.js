import { useState, useRef } from 'react';

export const useCamera = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setImageSrc(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Navegador no compatible o sin HTTPS");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      throw err;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        if(callback) callback();
      };
      reader.readAsDataURL(file);
    }
  };

  return { 
    videoRef, 
    isCameraActive, 
    imageSrc, 
    startCamera, 
    stopCamera, 
    handleImageUpload 
  };
};