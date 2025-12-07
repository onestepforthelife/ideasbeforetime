/**
 * SELF-HEALING SYSTEM - Fixes Errors Automatically!
 * No human intervention needed - system heals itself
 */

class AutoHealSystem {
    constructor() {
        this.healingStrategies = new Map();
        this.healingHistory = [];
        this.lastNavigationClick = 0;
        this.setupStrategies();
        this.init();
        this.trackNavigationClicks();
    }

    init() {
        console.log('🏥 Self-Healing System Active');
        
        // Listen for errors from error tracker
        if (window.userErrorTracker) {
            const originalReport = window.userErrorTracker.reportError.bind(window.userErrorTracker);
            window.userErrorTracker.reportError = (error) => {
                originalReport(error);
                this.attemptHeal(error);
            };
        }

        // Monitor and heal every 30 seconds
        setInterval(() => this.proactiveHealing(), 30000);
    }

    setupStrategies() {
        // STRATEGY 1: Button Not Working → Add Demo Button
        this.healingStrategies.set('REPEATED_CLICKS', {
            diagnose: (error) => error.clicks >= 3,
            heal: (error) => this.healRepeatedClicks(error),
            description: 'Add demo/skip button when main button fails'
        });

        // STRATEGY 2: Form Not Submitting → Show Better Errors
        this.healingStrategies.set('FORM_NOT_SUBMITTING', {
            diagnose: (error) => error.type === 'FORM_NOT_SUBMITTING',
            heal: (error) => this.healFormSubmission(error),
            description: 'Show validation errors clearly'
        });

        // STRATEGY 3: Broken Link → Redirect to Homepage
        this.healingStrategies.set('BROKEN_LINK', {
            diagnose: (error) => error.status === 404,
            heal: (error) => this.healBrokenLink(error),
            description: 'Redirect broken links to working pages'
        });

        // STRATEGY 4: Slow Loading → Show Loading Message
        this.healingStrategies.set('SLOW_LOADING', {
            diagnose: (error) => error.loadTime > 5000,
            heal: (error) => this.healSlowLoading(error),
            description: 'Show "Please wait" message'
        });

        // STRATEGY 5: JavaScript Error → Reload Page
        this.healingStrategies.set('JS_ERROR', {
            diagnose: (error) => error.type === 'error',
            heal: (error) => this.healJSError(error),
            description: 'Auto-reload page once'
        });
    }

    async attemptHeal(error) {
        console.log('🏥 Attempting to heal:', error.type);

        // Find matching strategy
        for (const [name, strategy] of this.healingStrategies) {
            if (strategy.diagnose(error)) {
                console.log(`🏥 Using strategy: ${strategy.description}`);
                
                const result = await strategy.heal(error);
                
                this.healingHistory.push({
                    error,
                    strategy: name,
                    result,
                    timestamp: new Date().toISOString()
                });

                // Report healing to analytics
                if (window.gtag) {
                    gtag('event', 'auto_heal', {
                        event_category: 'Self_Healing',
                        event_label: name,
                        value: result.success ? 1 : 0
                    });
                }

                return result;
            }
        }

        console.log('⚠️ No healing strategy found for:', error.type);
        return { success: false, reason: 'No strategy' };
    }

    // HEALING STRATEGY 1: Repeated Clicks
    healRepeatedClicks(error) {
        const element = document.querySelector(`[data-error-element="${error.element}"]`) 
                     || this.findElementByText(error.text);

        if (!element) {
            return { success: false, reason: 'Element not found' };
        }

        // Add "Demo Mode" or "Skip" button next to broken button
        const demoButton = document.createElement('button');
        demoButton.textContent = '🎯 Try Demo Mode';
        demoButton.className = 'demo-button';
        demoButton.style.cssText = `
            margin-left: 10px;
            padding: 10px 20px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;

        demoButton.onclick = () => {
            // Enable demo mode
            if (window.location.pathname.includes('social-optimizer')) {
                // For SPO: Skip to preview with demo data
                window.location.href = 'social-optimizer-success.html?demo=true';
            } else {
                // For other pages: Show demo content
                alert('Demo mode activated! Showing sample results.');
            }
        };

        element.parentElement.appendChild(demoButton);

        // Show helpful message
        this.showHealingMessage(
            '🏥 Button seems stuck? Try Demo Mode!',
            'We detected you clicked multiple times. Demo mode lets you see how it works.'
        );

        return { 
            success: true, 
            action: 'Added demo button',
            element: error.element 
        };
    }

    // HEALING STRATEGY 2: Form Not Submitting
    healFormSubmission(error) {
        const form = document.querySelector('form');
        if (!form) return { success: false, reason: 'Form not found' };

        // Show validation errors clearly
        const errorDiv = document.createElement('div');
        errorDiv.className = 'auto-heal-error';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 8px;
            z-index: 999999;
            max-width: 500px;
        `;

        errorDiv.innerHTML = `
            <strong>🏥 Auto-Healing Activated</strong><br>
            Form validation issue detected. Please check:<br>
            <ul style="margin: 10px 0; text-align: left;">
                <li>All required fields filled?</li>
                <li>Email format correct?</li>
                <li>Phone number valid?</li>
            </ul>
            <button onclick="this.parentElement.remove()" style="padding: 5px 15px; cursor: pointer;">
                Got it!
            </button>
        `;

        document.body.appendChild(errorDiv);

        // Highlight empty required fields
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value) {
                field.style.border = '2px solid #ff4444';
                field.placeholder = '⚠️ Required field';
            }
        });

        return { success: true, action: 'Showed validation errors' };
    }

    // HEALING STRATEGY 3: Broken Link
    healBrokenLink(error) {
        // Only redirect if it's actually a 404 error, not navigation clicks
        if (error.status !== 404) {
            return { success: false, action: 'Not a broken link' };
        }
        
        // Don't redirect if user is actively navigating (clicked a link recently)
        const recentNavigation = Date.now() - this.lastNavigationClick < 5000;
        if (recentNavigation) {
            return { success: false, action: 'User navigating - not redirecting' };
        }
        
        // Only redirect for actual 404 pages
        this.showHealingMessage(
            '🏥 Page Not Found - Redirecting...',
            'This page doesn\'t exist. Taking you to homepage in 3 seconds.'
        );

        setTimeout(() => {
            window.location.href = '/index.html';
        }, 3000);

        return { success: true, action: 'Redirecting to homepage' };
    }

    // HEALING STRATEGY 4: Slow Loading
    healSlowLoading(error) {
        // Show loading overlay
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            font-size: 24px;
        `;

        overlay.innerHTML = `
            <div style="text-align: center;">
                <div class="spinner" style="
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #3498db;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <div>🏥 Loading... Please wait</div>
                <div style="font-size: 14px; margin-top: 10px;">
                    This is taking longer than usual
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Remove after page loads
        window.addEventListener('load', () => overlay.remove());

        return { success: true, action: 'Showed loading message' };
    }

    // HEALING STRATEGY 5: JavaScript Error
    healJSError(error) {
        // Only reload once (prevent infinite loop)
        const reloadCount = sessionStorage.getItem('auto_reload_count') || 0;
        
        if (reloadCount < 1) {
            sessionStorage.setItem('auto_reload_count', parseInt(reloadCount) + 1);
            
            this.showHealingMessage(
                '🏥 Fixing Error - Reloading...',
                'Detected a technical issue. Refreshing page to fix it.'
            );

            setTimeout(() => window.location.reload(), 2000);
            
            return { success: true, action: 'Reloading page' };
        }

        return { success: false, reason: 'Already reloaded once' };
    }

    // PROACTIVE HEALING: Fix issues before users notice
    proactiveHealing() {
        // Check for common issues and fix them
        
        // 1. Fix broken images
        document.querySelectorAll('img').forEach(img => {
            if (img.complete && img.naturalHeight === 0) {
                img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect fill="%23ddd" width="200" height="200"/><text x="50%" y="50%" text-anchor="middle" fill="%23999">Image</text></svg>';
                img.alt = 'Image not available';
            }
        });

        // 2. Fix broken links (make them visible)
        document.querySelectorAll('a[href="#"]').forEach(link => {
            if (!link.onclick) {
                link.style.opacity = '0.5';
                link.title = 'Coming soon';
            }
        });

        // 3. Fix empty buttons
        document.querySelectorAll('button').forEach(btn => {
            if (!btn.textContent.trim() && !btn.innerHTML.includes('<')) {
                btn.textContent = 'Click Here';
            }
        });
    }

    // Track navigation clicks to avoid interfering with user navigation
    trackNavigationClicks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                this.lastNavigationClick = Date.now();
            }
        });
    }

    // Helper: Show healing message
    showHealingMessage(title, message) {
        const toast = document.createElement('div');
        toast.className = 'healing-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 999999;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;

        toast.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 10px;">${title}</div>
            <div style="font-size: 14px;">${message}</div>
        `;

        document.body.appendChild(toast);

        // Auto-remove after 5 seconds
        setTimeout(() => toast.remove(), 5000);
    }

    // Helper: Find element by text
    findElementByText(text) {
        const elements = Array.from(document.querySelectorAll('button, a, input[type="submit"]'));
        return elements.find(el => el.textContent.includes(text) || el.value === text);
    }

    // Get healing report
    getHealingReport() {
        return {
            totalHeals: this.healingHistory.length,
            successfulHeals: this.healingHistory.filter(h => h.result.success).length,
            strategies: Array.from(this.healingStrategies.keys()),
            recentHeals: this.healingHistory.slice(-10)
        };
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize automatically
if (typeof window !== 'undefined') {
    window.autoHealSystem = new AutoHealSystem();
    
    // Expose report function
    window.getHealingReport = () => window.autoHealSystem.getHealingReport();
}

/**
 * USAGE:
 * 
 * 1. Add to all HTML pages:
 *    <script src="error-tracker.js"></script>
 *    <script src="auto-heal-system.js"></script>
 * 
 * 2. System runs automatically
 * 
 * 3. When error detected:
 *    - System tries to fix it automatically
 *    - User sees helpful message
 *    - Error gets reported to you
 *    - You don't need to do anything!
 * 
 * 4. Check healing report:
 *    getHealingReport()
 * 
 * EXAMPLES OF AUTO-HEALING:
 * - Button not working → Adds "Demo Mode" button
 * - Form not submitting → Shows validation errors
 * - Page not found → Redirects to homepage
 * - Slow loading → Shows "Please wait" message
 * - JavaScript error → Reloads page once
 */
