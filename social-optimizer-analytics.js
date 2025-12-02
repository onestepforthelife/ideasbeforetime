// Google Analytics 4 - Complete Event Tracking
// Tracks ALL user actions and combinations

// Google Analytics 4 Measurement ID
// Property: Ideas Before Time - All Projects
const GA4_MEASUREMENT_ID = 'G-YGVH0QGSGP';

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
    
    console.log('✅ Google Analytics 4 initialized:', GA4_MEASUREMENT_ID);
})();

// Analytics Helper Functions
const Analytics = {
    
    // Track wizard start
    trackWizardStart() {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'wizard_started', {
            event_category: 'engagement',
            event_label: 'User started profile optimization'
        });
        console.log('📊 Analytics: Wizard started');
    },
    
    // Track step completion
    trackStepCompleted(stepNumber, stepName) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'step_completed', {
            event_category: 'engagement',
            event_label: stepName,
            step_number: stepNumber
        });
        console.log(`📊 Analytics: Step ${stepNumber} completed - ${stepName}`);
    },
    
    // Track platform selection
    trackPlatformSelected(platform) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'platform_selected', {
            event_category: 'selection',
            event_label: platform,
            platform: platform
        });
        console.log('📊 Analytics: Platform selected -', platform);
    },
    
    // Track input method
    trackInputMethod(method) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'input_method_selected', {
            event_category: 'selection',
            event_label: method,
            input_method: method
        });
        console.log('📊 Analytics: Input method -', method);
    },
    
    // Track persona selection
    trackPersonaSelected(persona) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'persona_selected', {
            event_category: 'selection',
            event_label: persona,
            persona: persona
        });
        console.log('📊 Analytics: Persona selected -', persona);
    },
    
    // Track tone selection
    trackToneSelected(tone) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'tone_selected', {
            event_category: 'selection',
            event_label: tone,
            tone: tone
        });
        console.log('📊 Analytics: Tone selected -', tone);
    },
    
    // Track goal selection
    trackGoalSelected(goal) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'goal_selected', {
            event_category: 'selection',
            event_label: goal,
            goal: goal
        });
        console.log('📊 Analytics: Goal selected -', goal);
    },
    
    // Track complete combination
    trackCombination(platform, persona, tone, goal) {
        if (typeof gtag === 'undefined') return;
        const combination = `${platform}_${persona}_${tone}_${goal}`;
        gtag('event', 'combination_selected', {
            event_category: 'selection',
            event_label: combination,
            platform: platform,
            persona: persona,
            tone: tone,
            goal: goal
        });
        console.log('📊 Analytics: Combination -', combination);
    },
    
    // Track preview generation
    trackPreviewGenerated(userData) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'preview_generated', {
            event_category: 'engagement',
            event_label: `${userData.platform}_${userData.persona}`,
            platform: userData.platform,
            persona: userData.persona,
            tone: userData.tone,
            goal: userData.goal
        });
        console.log('📊 Analytics: Preview generated');
    },
    
    // Track payment initiated
    trackPaymentInitiated(userData, pricing) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'begin_checkout', {
            event_category: 'ecommerce',
            currency: pricing.currency,
            value: pricing.amount,
            items: [{
                item_id: 'profile_optimization',
                item_name: 'Social Profile Optimization',
                item_category: userData.platform,
                item_variant: userData.persona,
                price: pricing.amount,
                quantity: 1
            }]
        });
        console.log('📊 Analytics: Payment initiated -', pricing.currency, pricing.amount);
    },
    
    // Track payment method selection
    trackPaymentMethodSelected(method, pricing) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'payment_method_selected', {
            event_category: 'ecommerce',
            event_label: method,
            payment_method: method,
            currency: pricing.currency,
            value: pricing.amount
        });
        console.log('📊 Analytics: Payment method -', method);
    },
    
    // Track successful payment
    trackPaymentCompleted(paymentId, userData, pricing, paymentMethod) {
        if (typeof gtag === 'undefined') return;
        
        // Standard purchase event
        gtag('event', 'purchase', {
            transaction_id: paymentId,
            value: pricing.amount,
            currency: pricing.currency,
            payment_method: paymentMethod,
            items: [{
                item_id: 'profile_optimization',
                item_name: 'Social Profile Optimization',
                item_category: userData.platform,
                item_variant: userData.persona,
                price: pricing.amount,
                quantity: 1
            }]
        });
        
        // Custom payment completed event
        gtag('event', 'payment_completed', {
            event_category: 'ecommerce',
            event_label: paymentMethod,
            transaction_id: paymentId,
            platform: userData.platform,
            persona: userData.persona,
            tone: userData.tone,
            goal: userData.goal,
            payment_method: paymentMethod,
            currency: pricing.currency,
            value: pricing.amount
        });
        
        console.log('📊 Analytics: Payment completed -', paymentId, pricing.currency, pricing.amount);
    },
    
    // Track profile download
    trackProfileDownloaded(userData) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'profile_downloaded', {
            event_category: 'engagement',
            event_label: `${userData.platform}_${userData.persona}`,
            platform: userData.platform,
            persona: userData.persona
        });
        console.log('📊 Analytics: Profile downloaded');
    },
    
    // Track feedback submission
    trackFeedbackSubmitted(feedbackLength, userData) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'feedback_submitted', {
            event_category: 'engagement',
            event_label: userData.platform,
            platform: userData.platform,
            feedback_length: feedbackLength
        });
        console.log('📊 Analytics: Feedback submitted');
    },
    
    // Track copy to clipboard
    trackCopyToClipboard(contentType) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'copy_to_clipboard', {
            event_category: 'engagement',
            event_label: contentType,
            content_type: contentType
        });
        console.log('📊 Analytics: Copied -', contentType);
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
    },
    
    // Track page views
    trackPageView(pageName) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'page_view', {
            page_title: pageName,
            page_location: window.location.href
        });
        console.log('📊 Analytics: Page view -', pageName);
    },
    
    // Track time spent on step
    trackTimeOnStep(stepNumber, seconds) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'time_on_step', {
            event_category: 'engagement',
            event_label: `Step ${stepNumber}`,
            step_number: stepNumber,
            time_seconds: seconds
        });
        console.log(`📊 Analytics: Time on step ${stepNumber} - ${seconds}s`);
    },
    
    // Track user demographics (from currency detector)
    trackUserDemographics(country, currency) {
        if (typeof gtag === 'undefined') return;
        gtag('event', 'user_demographics', {
            event_category: 'user_info',
            country: country,
            currency: currency
        });
        console.log('📊 Analytics: User from', country);
    }
};

// Auto-track page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        Analytics.trackPageView(document.title);
    });
} else {
    Analytics.trackPageView(document.title);
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Analytics = Analytics;
}

// Track wizard start when user lands on app page
if (window.location.pathname.includes('social-optimizer-app.html')) {
    setTimeout(() => {
        Analytics.trackWizardStart();
    }, 1000);
}

