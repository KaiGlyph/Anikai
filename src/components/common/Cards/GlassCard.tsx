import React from 'react';
import './GlassCard.css';

interface GlassCardProps {
  title: string;
  image: string;
  rating?: number;
  onClick?: () => void;
  children?: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  title, 
  image, 
  rating, 
  onClick,
  children 
}) => {
  return (
    <div className="glass-card anime-card" onClick={onClick}>
      <div className="card-image-container">
        <img src={image} alt={title} className="card-image" />
        {rating && (
          <div className="card-rating">
            <span>★</span>
            <span>{rating}</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default GlassCard;