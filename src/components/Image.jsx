import React, { useState } from 'react';

/**
 * Image Component with Fallback Support
 * Shows loading placeholder, handles errors gracefully, and displays fallback only when needed
 */
const Image = ({
  src,
  alt = 'Product Image',
  fallbackSrc = null,
  className = '',
  onError = null,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = (e) => {
    setImageError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Determine which image to show
  const imageSrc = imageError ? fallbackSrc : src;

  // If no valid image source available, don't show any image
  if (!imageSrc) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">No Image</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}></div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={className}
        {...props}
      />
    </>
  );
};

export default Image;
