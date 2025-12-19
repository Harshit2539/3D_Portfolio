// Performance optimization utilities

// Throttle function for expensive operations
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};

// Debounce function for resize events
export const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animations based on device capabilities
export const getOptimizedAnimationConfig = () => {
  const isLowEndDevice = navigator.hardwareConcurrency <= 4;
  const prefersReduced = prefersReducedMotion();
  
  return {
    particleCount: prefersReduced ? 0 : isLowEndDevice ? 3 : 6,
    animationDuration: prefersReduced ? 0 : isLowEndDevice ? 0.5 : 1,
    enableComplexAnimations: !prefersReduced && !isLowEndDevice,
    enableParallax: !prefersReduced && !isLowEndDevice
  };
};

// Request animation frame with fallback
export const requestAnimFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();