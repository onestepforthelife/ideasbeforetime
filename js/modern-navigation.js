/**
 * Modern Navigation - Ideas Before Time
 * Handles sticky navigation, mobile menu, and smooth scrolling
 */

(function() {
  'use strict';
  
  // Navigation state
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  // Initialize navigation
  function initNavigation() {
    const nav = document.querySelector('.nav-modern');
    if (!nav) return;
    
    // Handle scroll for sticky nav
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll(nav);
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Mobile menu toggle
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    if (toggle && links) {
      toggle.addEventListener('click', () => {
        links.classList.toggle('active');
        toggle.classList.toggle('active');
        document.body.style.overflow = links.classList.contains('active') ? 'hidden' : '';
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && links.classList.contains('active')) {
          links.classList.remove('active');
          toggle.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
      
      // Close menu when clicking a link
      links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          links.classList.remove('active');
          toggle.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = nav.offsetHeight;
          const targetPosition = target.offsetTop - navHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Set active link based on current page
    setActiveLink();
  }
  
  // Handle scroll behavior
  function handleScroll(nav) {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }
  
  // Set active navigation link
  function setActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.includes(href)) {
        link.classList.add('active');
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
