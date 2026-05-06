import React, { useEffect, useState } from 'react';
import './Preloader.css';
import logoImg from '../images/logo1.png';

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Show preloader for a guaranteed minimum time to allow animations
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsMounted(false);
        if (onFinish) onFinish();
      }, 800); 
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isMounted) return null;

  return (
    <div className={`preloader-wrapper ${fadeOut ? 'fade-out' : ''}`}>
      {/* Soft Ambient Glows matching Gurukula's light theme (Blue and Orange) */}
      <div className="ambient-glow glow-blue"></div>
      <div className="ambient-glow glow-orange"></div>

      <div className="preloader-content">
        <div className="logo-container">
          {/* Energy beam under logo */}
          <div className="energy-beam"></div>
          
          <img 
            src={logoImg} 
            alt="Loading..." 
            className="preloader-logo"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = logoImg;
            }} 
          />
        </div>
        
        <div className="loading-text-container">
          <span className="loading-text">Loading</span>
          <div className="loading-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;