// AUTOMATIC ERROR TRACKING SYSTEM
// Detects user frustration and reports issues automatically

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        clickThreshold: 3,           // Report after 3 clicks on same element
        clickTimeWindow: 5000,       // Within 5 seconds
        errorReportEmail: 'onestepforthelife@gmail.com',
        enableConsoleLog: true,
        enableLocalStorage: true,
        enableEmailAlert: false      // Set true to send emails
    };
    
    // Track clicks on each element
    const clickTracker = new Map();
    
    // Track all errors
    const errorLog = [];
    
    // Initialize
    function init() {
        trackRepeatedClicks();
        trackJavaScriptErrors();
        trackBrokenLinks();
        trackFormErrors();
        trackSlowLoading();
        setupReportButton();
        
        console.log('✅ Error Tracker initialized');
    }
    
    // FEATURE 1: Detect repeated clicks (user frustration)
    function trackRepeatedClicks() {
        document.addEventListener('click', function(e) {
            const element = e.target;
            const elementId = getElementIdentifier(element);
            
            // Get or create tracker for this element
            if (!clickTracker.has(elementId)) {
                clickTracker.set(elementId, {
                    count: 0,
                    firstClick: Date.now(),
                    element: element,
                    clicks: []
                });
            }
            
            const tracker = clickTracker.get(elementId);
            const now = Date.now();
            
            // Reset if outside time window
            if (now - tracker.firstClick > CONFIG.clickTimeWindow) {
                tracker.count = 0;
                tracker.firstClick = now;
                tracker.clicks = [];
            }
            
            // Increment count
            tracker.count++;
            tracker.clicks.push(now);
            
            // Check threshold
            if (tracker.count >= CONFIG.clickThreshold) {
                reportRepeatedClicks(elementId, tracker);
                
                // Reset to avoid spam
                clickTracker.delete(elementId);
            }
        }, true);
    }
    
    // FEATURE 2: Track JavaScript errors
    function trackJavaScriptErrors() {
        window.addEventListener('error', function(e) {
            const error = {
                type: 'JavaScript Error',
                message: e.message,
                file: e.filename,
                line: e.lineno,
                column: e.colno,
                stack: e.error ? e.error.stack : 'No stack trace',
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            };
            
            logError(error);
            reportError(error);
        });
        
        // Track unhandled promise rejections
        window.addEventListener('unhandledrejection', function(e) {
            const error = {
                type: 'Unhandled Promise Rejection',
                message: e.reason,
                timestamp: new Date().toISOString(),
                url: window.location.href
            };
            
            logError(error);
            reportError(error);
        });
    }
    
    // FEATURE 3: Track broken links/images
    function trackBrokenLinks() {
        // Check images
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG') {
                const error = {
                    type: 'Broken Image',
                    src: e.target.src,
                    alt: e.target.alt,
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                };
                
                logError(error);
                reportError(error);
            }
        }, true);
        
        // Check links on click
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                const href = e.target.href;
                if (href && href.startsWith('http')) {
                    // Check if link is accessible (in background)
                    checkLinkAccessibility(href, e.target);
                }
            }
        }, true);
    }
    
    // FEATURE 4: Track form validation errors
    function trackFormErrors() {
        document.addEventListener('invalid', function(e) {
            const error = {
                type: 'Form Validation Error',
                field: e.target.name || e.target.id,
                value: e.target.value,
                validationMessage: e.target.validationMessage,
                timestamp: new Date().toISOString(),
                url: window.location.href
            };
            
            logError(error);
        }, true);
    }
    
    // FEATURE 5: Track slow loading
    function trackSlowLoading() {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            
            if (loadTime > 5000) { // Slower than 5 seconds
                const error = {
                    type: 'Slow Page Load',
                    loadTime: loadTime + 'ms',
                    timestamp: new Date().toISOString(),
                    url: window.location.href
                };
                
                logError(error);
                reportError(error);
            }
        });
    }
    
    // Helper: Get unique identifier for element
    function getElementIdentifier(element) {
        if (element.id) return '#' + element.id;
        if (element.name) return '[name="' + element.name + '"]';
        if (element.className) return '.' + element.className.split(' ')[0];
        return element.tagName + '[' + Array.from(element.parentNode.children).indexOf(element) + ']';
    }
    
    // Report repeated clicks (user frustration)
    function reportRepeatedClicks(elementId, tracker) {
        const error = {
            type: '🚨 USER FRUSTRATION DETECTED',
            severity: 'HIGH',
            element: elementId,
            elementText: tracker.element.textContent.substring(0, 50),
            elementType: tracker.element.tagName,
            clickCount: tracker.count,
            timeWindow: CONFIG.clickTimeWindow + 'ms',
            timestamp: new Date().toISOString(),
            url: window.location.href,
            message: `User clicked "${elementId}" ${tracker.count} times in ${CONFIG.clickTimeWindow/1000} seconds. Button/link may not be working!`
        };
        
        logError(error);
        reportError(error);
        
        // Show alert to user
        if (CONFIG.enableConsoleLog) {
            console.error('🚨 REPEATED CLICKS DETECTED:', error);
        }
        
        // Optional: Show message to user
        showUserMessage('We noticed you clicked this multiple times. Having trouble? Contact us: ' + CONFIG.errorReportEmail);
    }
    
    // Check if link is accessible
    function checkLinkAccessibility(url, element) {
        // Skip external links for now
        if (!url.includes(window.location.hostname)) return;
        
        fetch(url, { method: 'HEAD' })
            .catch(function() {
                const error = {
                    type: 'Broken Link',
                    url: url,
                    linkText: element.textContent,
                    timestamp: new Date().toISOString(),
                    pageUrl: window.location.href
                };
                
                logError(error);
                reportError(error);
            });
    }
    
    // Log error to console and storage
    function logError(error) {
        errorLog.push(error);
        
        if (CONFIG.enableConsoleLog) {
            console.error('❌ Error Logged:', error);
        }
        
        if (CONFIG.enableLocalStorage) {
            try {
                const stored = JSON.parse(localStorage.getItem('errorLog') || '[]');
                stored.unshift(error);
                
                // Keep last 100 errors
                if (stored.length > 100) stored.pop();
                
                localStorage.setItem('errorLog', JSON.stringify(stored));
            } catch (e) {
                console.error('Failed to store error:', e);
            }
        }
    }
    
    // Report error (send to admin)
    function reportError(error) {
        // Send to analytics if available
        if (typeof UniversalAnalytics !== 'undefined') {
            UniversalAnalytics.trackEvent('error_detected', {
                event_category: 'errors',
                event_label: error.type,
                value: 1
            });
        }
        
        // Send email alert (if enabled)
        if (CONFIG.enableEmailAlert && error.severity === 'HIGH') {
            sendEmailAlert(error);
        }
        
        // Log to backend (if available)
        // fetch('/api/log-error', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(error)
        // });
    }
    
    // Send email alert
    function sendEmailAlert(error) {
        const subject = '🚨 URGENT: ' + error.type + ' on ' + window.location.hostname;
        const body = formatErrorEmail(error);
        
        // In production, send via backend API
        console.log('Email Alert:', { subject, body });
        
        // For now, just log it
        // In production: fetch('/api/send-alert-email', { method: 'POST', body: JSON.stringify({ subject, body }) });
    }
    
    // Format error for email
    function formatErrorEmail(error) {
        let email = '🚨 ERROR DETECTED ON WEBSITE\n\n';
        email += '═══════════════════════════════════════\n\n';
        
        for (let key in error) {
            email += key + ': ' + error[key] + '\n';
        }
        
        email += '\n═══════════════════════════════════════\n';
        email += 'Time: ' + new Date().toLocaleString() + '\n';
        email += 'Action Required: Investigate and fix immediately!\n';
        
        return email;
    }
    
    // Show message to user
    function showUserMessage(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ff6b6b;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 300px;
            font-size: 0.9em;
            animation: slideIn 0.3s ease-out;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Remove after 5 seconds
        setTimeout(function() {
            toast.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(function() {
                document.body.removeChild(toast);
            }, 300);
        }, 5000);
    }
    
    // Setup error report button (for admin)
    function setupReportButton() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Create floating button (only visible to admin)
        const button = document.createElement('button');
        button.id = 'errorReportButton';
        button.textContent = '📊 Error Report';
        button.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: #5a6c7d;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            font-size: 0.9em;
            display: none;
        `;
        
        button.onclick = showErrorReport;
        document.body.appendChild(button);
        
        // Show button if errors exist
        if (errorLog.length > 0) {
            button.style.display = 'block';
        }
        
        // Show button on Ctrl+Shift+E
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'E') {
                button.style.display = button.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
    
    // Show error report
    function showErrorReport() {
        const stored = JSON.parse(localStorage.getItem('errorLog') || '[]');
        const allErrors = [...errorLog, ...stored];
        
        if (allErrors.length === 0) {
            alert('✅ No errors detected!\n\nThe site is working perfectly.');
            return;
        }
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 30px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            width: 100%;
        `;
        
        let html = '<h2 style="color: #5a6c7d; margin-bottom: 20px;">📊 Error Report</h2>';
        html += '<p style="color: #666; margin-bottom: 20px;">Total Errors: <strong>' + allErrors.length + '</strong></p>';
        
        // Group by type
        const grouped = {};
        allErrors.forEach(function(error) {
            const type = error.type || 'Unknown';
            if (!grouped[type]) grouped[type] = [];
            grouped[type].push(error);
        });
        
        for (let type in grouped) {
            html += '<div style="background: #f8f9ff; padding: 15px; border-radius: 10px; margin-bottom: 15px; border-left: 4px solid #5a6c7d;">';
            html += '<h3 style="color: #5a6c7d; margin-bottom: 10px;">' + type + ' (' + grouped[type].length + ')</h3>';
            
            grouped[type].slice(0, 3).forEach(function(error) {
                html += '<div style="background: white; padding: 10px; border-radius: 5px; margin-bottom: 10px; font-size: 0.85em;">';
                html += '<strong>Message:</strong> ' + (error.message || error.element || 'No details') + '<br>';
                html += '<strong>Time:</strong> ' + new Date(error.timestamp).toLocaleString() + '<br>';
                html += '<strong>Page:</strong> ' + (error.url || error.pageUrl || 'Unknown');
                html += '</div>';
            });
            
            if (grouped[type].length > 3) {
                html += '<p style="color: #999; font-size: 0.85em;">... and ' + (grouped[type].length - 3) + ' more</p>';
            }
            
            html += '</div>';
        }
        
        html += '<div style="margin-top: 20px; display: flex; gap: 10px;">';
        html += '<button onclick="downloadErrorReport()" style="flex: 1; background: #5a6c7d; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">📥 Download Report</button>';
        html += '<button onclick="clearErrorLog()" style="flex: 1; background: #dc3545; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">🗑️ Clear Log</button>';
        html += '<button onclick="this.closest(\'.error-modal\').remove()" style="flex: 1; background: #6c757d; color: white; padding: 12px; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">✖️ Close</button>';
        html += '</div>';
        
        content.innerHTML = html;
        modal.appendChild(content);
        modal.className = 'error-modal';
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Download error report
    window.downloadErrorReport = function() {
        const stored = JSON.parse(localStorage.getItem('errorLog') || '[]');
        const allErrors = [...errorLog, ...stored];
        
        let report = 'ERROR REPORT\n';
        report += 'Generated: ' + new Date().toLocaleString() + '\n';
        report += 'Total Errors: ' + allErrors.length + '\n';
        report += '═══════════════════════════════════════\n\n';
        
        allErrors.forEach(function(error, i) {
            report += 'ERROR #' + (i + 1) + '\n';
            report += '───────────────────────────────────────\n';
            for (let key in error) {
                report += key + ': ' + error[key] + '\n';
            }
            report += '\n';
        });
        
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'error-report-' + Date.now() + '.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    // Clear error log
    window.clearErrorLog = function() {
        if (confirm('Clear all error logs?')) {
            localStorage.removeItem('errorLog');
            errorLog.length = 0;
            alert('✅ Error log cleared!');
            document.querySelector('.error-modal').remove();
        }
    };
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
