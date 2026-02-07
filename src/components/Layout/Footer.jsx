import React from 'react';
import { BookOpen } from 'lucide-react';
import { STYLES } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="py-3 w-100 mt-auto" style={STYLES.glassBar}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50" style={{fontSize: '0.9rem'}}>
        <div className="d-flex align-items-center gap-2 mb-2 mb-md-0">
          <BookOpen size={16} />
          <span>Materia: <strong>Inteligencia Artificial - NRC 29331</strong></span>
        </div>
        <div className="text-center text-md-end">
          <p className="m-0">&copy; 2026 - Examen Segundo Parcial</p>
          <small className="opacity-75">Desarrollado con React + Face-api.js</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;