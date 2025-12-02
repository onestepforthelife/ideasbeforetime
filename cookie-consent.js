// Cookie Consent Banner for Ideas Before Time
// Compliant with GDPR, DPDP Act 2023, and Google Consent Mode v2

(function() {
    'use strict';

    // Check if consent has already been given
    function hasConsent() {
        return localStorage.getItem('cookieConsent') !== null;
    }

    // Set consent in localStorage
    function setConsent(analytics, marketing) {
        const consent = {
            analytics: analytics,
            marketing: marketing,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        
        // Update Google Consent Mode
        if (window.gtag) {
            gtag('consent', 'update', {
                'analytics_storage': analytics ? 'granted' : 'denied',
                'ad_storage': marketing ? 'granted' : 'denied',
                'ad_user_data': marketing ? 'granted' : 'denied',
                'ad_personalization': marketing ? 'granted' : 'denied'
            });
        }
    }

    // Create and show consent banner
    function showConsentBanner() {
        if (hasConsent()) return;

        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <div class="consent-text">
                    <h3>🍪 Cookie Consent</h3>
                    <p>We use cookies to analyze site traffic and improve your experience. Your data is never sold or shared with third parties.</p>
                </div>
                <div class="consent-buttons">
                    <button id="consent-accept-all" class="btn-accept">Accept All</button>
                    <button id="consent-necessary" class="btn-necessary">Necessary Only</button>
                    <button id="consent-customize" class="btn-customize">Customize</button>
                </div>
            </div>
            <div id="consent-details" class="consent-details" style="display: none;">
                <div class="consent-options">
                    <label class="consent-option">
                        <input type="checkbox" id="consent-analytics" checked>
                        <div>
                            <strong>Analytics Cookies</strong>
                            <p>Help us understand how visitors use our site (Google Analytics)</p>
                        </div>
                    </label>
                    <label class="consent-option">
                        <input type="checkbox" id="consent-marketing">
                        <div>
                            <strong>Marketing Cookies</strong>
                            <p>Used for personalized advertising (currently not used)</p>
                        </div>
                    </label>
                </div>
                <div class="consent-buttons">
                    <button id="consent-save" class="btn-accept">Save Preferences</button>
                    <button id="consent-back" class="btn-necessary">Back</button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Event listeners
        document.getElementById('consent-accept-all').addEventListener('click', function() {
            setConsent(true, true);
            banner.remove();
        });

        document.getElementById('consent-necessary').addEventListener('click', function() {
            setConsent(false, false);
            banner.remove();
        });

        document.getElementById('consent-customize').addEventListener('click', function() {
            document.querySelector('.consent-content').style.display = 'none';
            document.getElementById('consent-details').style.display = 'block';
        });

        document.getElementById('consent-save').addEventListener('click', function() {
            const analytics = document.getElementById('consent-analytics').checked;
            const marketing = document.getElementById('consent-marketing').checked;
            setConsent(analytics, marketing);
            banner.remove();
        });

        document.getElementById('consent-back').addEventListener('click', function() {
            document.querySelector('.consent-content').style.display = 'block';
            document.getElementById('consent-details').style.display = 'none';
        });
    }

    // Initialize Google Consent Mode (default denied)
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    
    gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': 500
    });

    // If consent exists, apply it
    if (hasConsent()) {
        const consent = JSON.parse(localStorage.getItem('cookieConsent'));
        gtag('consent', 'update', {
            'analytics_storage': consent.analytics ? 'granted' : 'denied',
            'ad_storage': consent.marketing ? 'granted' : 'denied',
            'ad_user_data': consent.marketing ? 'granted' : 'denied',
            'ad_personalization': consent.marketing ? 'granted' : 'denied'
        });
    }

    // Show banner when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showConsentBanner);
    } else {
        showConsentBanner();
    }

    // Add reset function for testing
    window.resetCookieConsent = function() {
        localStorage.removeItem('cookieConsent');
        location.reload();
    };

})();

