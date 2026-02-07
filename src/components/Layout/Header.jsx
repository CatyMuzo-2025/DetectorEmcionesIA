import React from 'react';
import { GraduationCap } from 'lucide-react';
import { STYLES } from '../../utils/constants';

const Header = () => {
  return (
    <header className="py-3 px-4 w-100" style={STYLES.glassBar}>
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-light text-dark rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: '45px', height: '45px', fontSize: '1.2rem'}}>
            U
          </div>
          <div className="lh-1">
            <h5 className="m-0 fw-bold text-white" style={{fontSize: '1.1rem'}}>Universidad de las Fuerzas Armadas - ESPE</h5>
            <small className="text-info opacity-75">Departamento de Ciencias de la Computación</small>
          </div>
        </div>
        
        <div className="d-flex align-items-center gap-3 mt-2 mt-md-0">
          <div className="text-end lh-1">
            <span className="d-block fw-semibold text-white">Desarrollado por: Caterine Rocío Muzo Samueza</span>
            <small className="text-info opacity-75" style={{fontSize: '0.8rem'}}>Ingeniería en Tecnologías de la Información</small>
          </div>
          <div className="bg-white bg-opacity-10 rounded-circle p-2">
            <GraduationCap size={24} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;