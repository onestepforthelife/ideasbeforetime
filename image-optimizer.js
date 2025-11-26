// Image Optimization - Lazy Loading & Performance
// Automatically adds lazy loading to all images

(function() {
    // Add lazy loading to all images
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add lazy loading if not already present
            if (!img.loading) {
                img.loading = 'lazy';
            }
            
            // Ensure alt text exists (accessibility)
            if (!img.alt) {
                console.warn('Image missing alt text:', img.src);
            }
            
            // Add width/height if not present (prevents layout shift)
            if (!img.width && !img.height && img.complete) {
                img.width = img.naturalWidth;
                img.height = img.naturalHeight;
            }
        });
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', optimizeImages);
    } else {
        optimizeImages();
    }
    
    // Also run when new images are added dynamically
    if ('MutationObserver' in window) {
        const observer = new MutationObserver(optimizeImages);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
