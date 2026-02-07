import { useState, useEffect } from 'react';
import { MODEL_URL, FACE_API_CDN } from '../utils/constants';

export const useFaceApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statusText, setStatusText] = useState("Iniciando sistema...");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const loadScriptAndModels = async () => {
      try {
        if (!window.faceapi) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = FACE_API_CDN;
            script.async = true;
            script.crossOrigin = "anonymous";
            script.onload = resolve;
            script.onerror = () => reject(new Error("No se pudo cargar face-api.js"));
            document.body.appendChild(script);
          });
        }

        setStatusText("Descargando modelos de IA...");
        const { faceapi } = window;
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ]);

        setStatusText("Sistema listo");
        setIsLoading(false);

      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || "Error cargando recursos");
        setIsLoading(false);
      }
    };

    loadScriptAndModels();
  }, []);

  return { isLoading, statusText, errorMsg, setErrorMsg };
};
