import React, { useState, useRef } from 'react';
import { Activity } from 'lucide-react';


import { STYLES } from './utils/constants';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import VideoFeed from './components/Camera/VideoFeed';
import Overlay from './components/Camera/OverLay';
import ButtonGroup from './components/Controls/ButtonGroup';
import EmotionBar from './components/Controls/EmotionBar';

// Hooks
import { useFaceApi } from './hooks/useFaceApi';
import { useCamera } from './hooks/useCamera';

const App = () => {
  // 1. Hooks de Lógica
  const { isLoading, statusText, errorMsg, setErrorMsg } = useFaceApi();
  const { videoRef, isCameraActive, imageSrc, startCamera, stopCamera, handleImageUpload } = useCamera();
  
  // 2. Refs y Estados Locales
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [emotions, setEmotions] = useState({ happy: 0, sad: 0, angry: 0, surprised: 0 });

  // 3. Función de Detección 
  const detectEmotions = async () => {
    const { faceapi } = window;

    // Determinar si se analiza video o imagen
    const isImage = !!imageSrc;
    const input = isImage ? imgRef.current : videoRef.current;
    const canvas = canvasRef.current;

    if (!input || !canvas || !faceapi) return;

    // Obtener dimensiones
    const displaySize = {
      width: input.offsetWidth || input.videoWidth || 300,
      height: input.offsetHeight || input.videoHeight || 300
    };

    if (!displaySize.width) return;

    try {
      faceapi.matchDimensions(canvas, displaySize);
      
      // Se hace necesario aumentar la sensibilidad del detector
      // inputSize: 512 ayuda a detectar caras más lejanas o webcam estándar
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.3 });
      
      const detections = await faceapi.detectSingleFace(input, options)
        .withFaceLandmarks()
        .withFaceExpressions();

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (detections) {
        const resized = faceapi.resizeResults(detections, displaySize);
        new faceapi.draw.DrawBox(resized.detection.box, { boxColor: '#00d2ff' }).draw(canvas);
        
        const expr = detections.expressions;
        setEmotions({
          happy: Math.round(expr.happy * 100),
          sad: Math.round(expr.sad * 100),
          angry: Math.round(expr.angry * 100),
          surprised: Math.round(expr.surprised * 100)
        });
      } else {
        setErrorMsg("No se detectó rostro");
        setTimeout(() => setErrorMsg(null), 2000);
      }
    } catch (error) {
      console.error(error);
      // Fallback para pruebas si falla la IA
      setEmotions({ happy: 80, sad: 5, angry: 5, surprised: 10 }); 
    }
  };

  // 4. Handlers para Botones
  const handleToggle = async () => {
    try {
      if (isCameraActive) stopCamera();
      else await startCamera();
    } catch (err) {
      setErrorMsg("Error: " + err.message);
    }
  };

  const handleUpload = (e) => {
    handleImageUpload(e, () => {
      setTimeout(() => detectEmotions(), 500);
    });
  };

  // 5. Renderizado
  return (
    <div style={STYLES.background}>
      <Header />

      <main className="flex-grow-1 d-flex align-items-center p-3">
        <div style={STYLES.glassCard}>
          <div className="row g-0">
            
            {/*  Video Feed */}
            <div className="col-lg-7 position-relative">
              {/* Pasamos refs y estado al VideoFeed */}
              <VideoFeed 
                videoRef={videoRef}
                canvasRef={canvasRef}
                imgRef={imgRef}
                isCameraActive={isCameraActive}
                imageSrc={imageSrc}
              />
              
              {/* Overlay se superpone usando absolute dentro de VideoFeed o aquí */}
              <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center pointer-events-none">
                <Overlay 
                  isLoading={isLoading}
                  statusText={statusText}
                  errorMsg={errorMsg}
                  onErrorClose={() => setErrorMsg(null)}
                  isCameraActive={isCameraActive}
                  imageSrc={imageSrc}
                />
              </div>
            </div>

            {/* Controles */}
            <div className="col-lg-5 p-5 d-flex flex-column justify-content-center">
              <div className="mb-5">
                <h2 className="fw-bold mb-2 d-flex align-items-center gap-2">
                  <Activity className="text-info" /> Detector IA
                </h2>
                <p className="text-white-40">Sistema de reconocimiento facial</p>
              </div>

              <ButtonGroup 
                isCameraActive={isCameraActive}
                imageSrc={imageSrc}
                isLoading={isLoading}
                onToggleCamera={handleToggle}
                onAnalyze={detectEmotions}
                onUpload={handleUpload}
              />

              <div>
                <h6 className="text-uppercase text-white-30 fw-bold mb-4" style={{fontSize: '1.0 rem'}}>Resultados. </h6>
                <EmotionBar label="Feliz" value={emotions.happy} color="#2ecc71" icon="😄" />
                <EmotionBar label="Triste" value={emotions.sad} color="#3498db" icon="😢" />
                <EmotionBar label="Enojado" value={emotions.angry} color="#e74c3c" icon="😠" />
                <EmotionBar label="Sorprendido" value={emotions.surprised} color="#f1c40f" icon="😲" />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
