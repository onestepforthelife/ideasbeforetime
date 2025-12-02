// UNIVERSAL GOOGLE ANALYTICS 4 - FOR ENTIRE WEBSITE
// Tracks both "Ideas Before Time" portfolio AND Social Profile Optimizer

// ✅ GOOGLE ANALYTICS 4 MEASUREMENT ID CONFIGURED
// Property: Ideas Before Time - All Projects
const GA4_MEASUREMENT_ID = 'G-YGVH0QGSGP'; // Your Analytics ID

// Google Ads Conversion ID (for when you run ads)
const GOOGLE_ADS_ID = 'AW-17698226980';

// Initialize Google Analytics 4
(function() {
    if (GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
        console.log('⚠️ Google Analytics not configured. Get your ID from analytics.google.com');
        return;
    }
    
    // Load GA4 script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure'
    });
    
    // Also configure Google Ads conversion tracking
    gtag('config', GOOGLE_ADS_ID);
    
    console.log('✅ Google Analytics 4 initialized:', GA4_MEASUREMENT_ID);
    console.log('✅ Google Ads tracking initialized:', GOOGLE_ADS_ID);
})();

// Universal Analytics Helper
const UniversalAnalytics = {
    
    // Detect which section of site user is on
    detectSection() {
        const path = window.location.pathname;
        if (path.includes('social-optimizer')) return 'SPO';
        if (path.includes('library') || path.includes('timeline')) return 'Portfolio';
        if (path.includes('innovation') || path.includes('-20')) return 'Innovation';
        if (path.includes('acrylic') || path.includes('market')) return 'Research';
        return 'Main';
    },
    
    // Track page view with section
    trackPageView(pageName) {
        if (typeof gtag === 'undefined') return;
        const section = this.detectSection();
        gtag('event', 'page_view', {
            page_title: pageName || document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
            site_section: section
        });
        console.log('📊 Analytics: Page view -', pageName, 'Section:', section);
    },
    
    // Track navigation between sections
    trackNavigation(from, to) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'navigation', {
            event_category: 'navigation',
            event_label: `${from} → ${to}`,
            from_section: from,
            to_section: to
        });
        console.log('📊 Analytics: Navigation -', from, '→', to);
    },
    
    // Track innovation page views
    trackInnovationView(innovationName, year) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'innovation_viewed', {
            event_category: 'content',
            event_label: innovationName,
            innovation_name: innovationName,
            innovation_year: year
        });
        console.log('📊 Analytics: Innovation viewed -', innovationName, year);
    },
    
    // Track market research downloads
    trackResearchDownload(reportName) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'research_download', {
            event_category: 'content',
            event_label: reportName,
            report_name: reportName
        });
        console.log('📊 Analytics: Research downloaded -', reportName);
    },
    
    // Track contact/email clicks
    trackContactClick(contactType) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'contact_click', {
            event_category: 'engagement',
            event_label: contactType,
            contact_type: contactType
        });
        console.log('📊 Analytics: Contact clicked -', contactType);
    },
    
    // Track external link clicks
    trackExternalLink(url, linkText) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'external_link_click', {
            event_category: 'engagement',
            event_label: linkText,
            link_url: url,
            link_text: linkText
        });
        console.log('📊 Analytics: External link -', url);
    },
    
    // Track time spent on page
    trackTimeOnPage(pageName, seconds) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'time_on_page', {
            event_category: 'engagement',
            event_label: pageName,
            page_name: pageName,
            time_seconds: seconds
        });
        console.log('📊 Analytics: Time on page -', pageName, seconds + 's');
    },
    
    // Track scroll depth
    trackScrollDepth(percentage) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'scroll_depth', {
            event_category: 'engagement',
            event_label: `${percentage}%`,
            scroll_percentage: percentage
        });
        console.log('📊 Analytics: Scrolled', percentage + '%');
    },
    
    // Track login (for password-protected pages)
    trackLogin(success) {
        if (typeof gtag === 'undefined') return;
        gtag('event', success ? 'login_success' : 'login_failed', {
            event_category: 'authentication',
            event_label: success ? 'Success' : 'Failed'
        });
        console.log('📊 Analytics: Login', success ? 'success' : 'failed');
    },
    
    // Track errors
    trackError(errorType, errorMessage) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'error_occurred', {
            event_category: 'error',
            event_label: errorType,
            error_type: errorType,
            error_message: errorMessage
        });
        console.log('📊 Analytics: Error -', errorType);
    }
};

// Auto-track page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        UniversalAnalytics.trackPageView(document.title);
        setupAutoTracking();
    });
} else {
    UniversalAnalytics.trackPageView(document.title);
    setupAutoTracking();
}

// Setup automatic tracking for common interactions
function setupAutoTracking() {
    // Track all external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.addEventListener('click', function() {
                UniversalAnalytics.trackExternalLink(this.href, this.textContent);
            });
        }
    });
    
    // Track email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            UniversalAnalytics.trackContactClick('email');
        });
    });
    
    // Track scroll depth (25%, 50%, 75%, 100%)
    let scrollTracked = { 25: false, 50: false, 75: false, 100: false };
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent >= 25 && !scrollTracked[25]) {
            scrollTracked[25] = true;
            UniversalAnalytics.trackScrollDepth(25);
        }
        if (scrollPercent >= 50 && !scrollTracked[50]) {
            scrollTracked[50] = true;
            UniversalAnalytics.trackScrollDepth(50);
        }
        if (scrollPercent >= 75 && !scrollTracked[75]) {
            scrollTracked[75] = true;
            UniversalAnalytics.trackScrollDepth(75);
        }
        if (scrollPercent >= 95 && !scrollTracked[100]) {
            scrollTracked[100] = true;
            UniversalAnalytics.trackScrollDepth(100);
        }
    });
    
    // Track time on page (send every 30 seconds)
    let timeOnPage = 0;
    setInterval(function() {
        timeOnPage += 30;
        if (timeOnPage % 60 === 0) { // Every minute
            UniversalAnalytics.trackTimeOnPage(document.title, timeOnPage);
        }
    }, 30000);
    
    // Track page visibility (when user leaves/returns)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            UniversalAnalytics.trackTimeOnPage(document.title, timeOnPage);
        }
    });
}

// Auto-detect and track innovation pages
if (window.location.pathname.match(/\d{4}\.html/)) {
    const fileName = window.location.pathname.split('/').pop();
    const year = fileName.match(/\d{4}/)[0];
    const name = fileName.replace(/-\d{4}\.html/, '').replace(/-/g, ' ');
    UniversalAnalytics.trackInnovationView(name, year);
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.UniversalAnalytics = UniversalAnalytics;
    // Also export as Analytics for SPO compatibility
    window.Analytics = window.Analytics || UniversalAnalytics;
}

