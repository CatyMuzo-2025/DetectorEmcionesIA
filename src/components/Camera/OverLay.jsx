import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Overlay = ({ isLoading, statusText, errorMsg, onErrorClose, isCameraActive, imageSrc }) => {
  return (
    <>
      {isLoading && (
        <div className="position-absolute text-white text-center z-3">
          <div className="spinner-border text-info mb-2"></div>
          <p className="small fw-bold">{statusText}</p>
        </div>
      )}
      
      {errorMsg && (
        <div className="position-absolute bg-danger bg-opacity-75 text-white p-3 rounded z-3 w-75 text-center backdrop-blur">
          <AlertTriangle size={32} className="mb-2" />
          <p className="m-0 fw-bold">{errorMsg}</p>
          <button onClick={onErrorClose} className="btn btn-sm btn-outline-light mt-2">Cerrar</button>
        </div>
      )}

      {!isCameraActive && !imageSrc && !isLoading && !errorMsg && (
        <div className="text-center">
          <div className="mb-4 p-4 rounded-circle d-inline-block" style={{background: 'rgba(255,255,255,0.1)'}}>
            {/* Usamos un ícono simple o texto si no pasamos el icono */}
            <span style={{fontSize: '3rem'}}>📷</span>
          </div>
          <h4 className="fw-light text-white">Cámara Inactiva</h4>
        </div>
      )}
    </>
  );
};

export default Overlay;
