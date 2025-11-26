/**
 * Scroll Animations - Ideas Before Time
 * Handles scroll-triggered animations using Intersection Observer
 */

(function() {
  'use strict';
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Skip animations for users who prefer reduced motion
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
      el.classList.add('animate-in');
    });
    return;
  }
  
  // Intersection Observer options
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animatable elements
  function observeAnimations() {
    const animatableElements = document.querySelectorAll(
      '.animate-fade-up, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-in'
    );
    
    animatableElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeAnimations);
  } else {
    observeAnimations();
  }
  
  // Re-observe on dynamic content changes
  window.observeNewAnimations = observeAnimations;
})();
