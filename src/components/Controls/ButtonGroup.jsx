import React from 'react';
import { Play, Square, CheckCircle2, Upload } from 'lucide-react';

const ButtonGroup = ({ isCameraActive, imageSrc, isLoading, onToggleCamera, onAnalyze, onUpload }) => {
  const btnStyle = { borderRadius: '50px' };

  return (
    <div className="d-grid gap-3 mb-5">
      {/* Botón Cámara */}
      <button 
        onClick={onToggleCamera} 
        disabled={isLoading}
        className={`btn btn-lg ${isCameraActive ? 'btn-danger' : 'btn-primary'} text-white fw-bold shadow-sm`}
        style={btnStyle}
      >
        <div className="d-flex align-items-center justify-content-center gap-2">
          {isCameraActive ? <Square size={18}/> : <Play size={18}/>}
          {isCameraActive ? 'Detener' : 'Iniciar'}
        </div>
      </button>

      {/* Botón Analizar */}
      {(isCameraActive || imageSrc) && (
        <button 
          onClick={onAnalyze}
          className="btn btn-success btn-lg text-white fw-bold shadow-sm"
          style={btnStyle}
        >
          <div className="d-flex align-items-center justify-content-center gap-2">
            <CheckCircle2 size={18}/> Analizar
          </div>
        </button>
      )}

      {/* Botón Subir */}
      <div className="position-relative">
        <input 
          type="file" 
          accept="image/*" 
          onChange={onUpload} 
          disabled={isLoading} 
          style={{opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10}} 
        />
        <button className="btn btn-outline-light btn-lg w-100 fw-bold" style={btnStyle}>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <Upload size={18}/> Subir Foto
          </div>
        </button>
      </div>
    </div>
  );
};

export default ButtonGroup;