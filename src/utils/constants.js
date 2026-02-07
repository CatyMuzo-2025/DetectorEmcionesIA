export const MODEL_URL = "https://justadudewhohacks.github.io/face-api.js/models";
export const FACE_API_CDN = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js";
                         

export const STYLES = {
  background: {
    background: 'linear-gradient(to right, #141E30, #243B55)', 
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column', 
    color: 'white',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  glassBar: {
    background: 'rgba(20, 30, 48, 0.7)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 10
  },
  glassCard: {
    width: '100%', maxWidth: '1100px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)', background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)',
  }
};