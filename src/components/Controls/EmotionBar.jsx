import React from 'react';

const EmotionBar = ({ label, value, color, icon }) => (
  <div className="mb-4">
    <div className="d-flex justify-content-between mb-2">
      <span className="fw-medium text-white-60 d-flex align-items-center gap-2">
        {icon} {label}
      </span>
      <span className="fw-bold text-white">{value}%</span>
    </div>
    <div className="progress" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
      <div 
        className={`progress-bar`} 
        role="progressbar" 
        style={{ 
          width: `${value}%`, 
          backgroundColor: color,
          borderRadius: '10px',
          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 10px ${color}`
        }}
      ></div>
    </div>
  </div>
);

export default EmotionBar;
