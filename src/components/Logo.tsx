import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [wiggle, setWiggle] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  
  const handleMouseEnter = () => {
    setWiggle(true);
  };
  
  const handleAnimationEnd = () => {
    setWiggle(false);
  };
  
  const handleClick = () => {
    navigate('/');
  };

  const handleImageLoad = () => {
    console.log('Logo圖片加載成功');
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Logo圖片加載失敗');
    setImageError(true);
    setImageLoaded(false);
  };

  useEffect(() => {
    console.log('Logo組件已掛載');
  }, []);
  
  return (
    <div 
      className={`flex items-center ${className} cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className={`relative ${wiggle ? 'animate-jelly' : ''}`} onAnimationEnd={handleAnimationEnd}>
        <div className="absolute -bottom-1 -left-2 -right-2 h-3 bg-primary-300 dark:bg-primary-700 rounded-full blur-sm opacity-30"></div>
        <div className="text-2xl font-bold">UX3</div>
        <span className="absolute -top-2 -right-2 text-lg kawaii-star z-20">✦</span>
        <span className="absolute -bottom-2 -left-2 text-lg kawaii-cherry-blossom z-20">🌸</span>
      </div>
    </div>
  );
};

export default Logo;