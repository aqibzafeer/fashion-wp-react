import { useEffect, useState } from 'react';

/**
 * Hook for optimized image loading with lazy loading and modern format support
 * Reduces unused JavaScript and improves image delivery
 */
export const useImageOptimization = () => {
  const [supportedFormats, setSupportedFormats] = useState({
    webp: false,
    avif: false
  });

  useEffect(() => {
    // Check WebP support
    const webpCanvas = document.createElement('canvas');
    webpCanvas.width = webpCanvas.height = 1;
    const webpSupport = webpCanvas.toDataURL('image/webp').indexOf('image/webp') === 5;

    // Check AVIF support (modern browsers)
    const avifSupport = webpSupport; // Simplified - AVIF usually comes with WebP

    setSupportedFormats({
      webp: webpSupport,
      avif: avifSupport
    });
  }, []);

  return supportedFormats;
};

/**
 * Preload critical images to improve LCP
 */
export const preloadImage = (src, fetchPriority = 'high') => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = fetchPriority;
    document.head.appendChild(link);
  }
};

/**
 * Observe images for lazy loading
 */
export const useInViewportImages = (ref) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return isInView;
};
