// Simple performance monitor
let frameCount = 0;
let lastTime = performance.now();
let fps = 60;

export const startPerformanceMonitor = () => {
  function measureFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      // If FPS drops below 30, reduce animations
      if (fps < 30) {
        document.body.classList.add('low-performance');
      } else {
        document.body.classList.remove('low-performance');
      }
    }
    
    requestAnimationFrame(measureFPS);
  }
  
  requestAnimationFrame(measureFPS);
};

export const getCurrentFPS = () => fps;