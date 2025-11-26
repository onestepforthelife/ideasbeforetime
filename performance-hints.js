// Performance Optimization - Resource Hints
// Adds preconnect and dns-prefetch for external resources

(function() {
    // Add resource hints to head
    function addResourceHints() {
        const hints = [
            // Preconnect to Google Analytics
            { rel: 'preconnect', href: 'https://www.googletagmanager.com' },
            { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
            
            // Preconnect to LinkedIn (for profile links)
            { rel: 'dns-prefetch', href: 'https://www.linkedin.com' },
            
            // Preconnect to Medium (for blog links)
            { rel: 'dns-prefetch', href: 'https://medium.com' }
        ];
        
        hints.forEach(hint => {
            // Check if hint already exists
            const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
            if (!existing) {
                const link = document.createElement('link');
                link.rel = hint.rel;
                link.href = hint.href;
                if (hint.rel === 'preconnect') {
                    link.crossOrigin = 'anonymous';
                }
                document.head.appendChild(link);
            }
        });
    }
    
    // Run immediately
    addResourceHints();
})();
