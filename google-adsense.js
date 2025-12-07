/**
 * Google AdSense Integration for Ideas Before Time
 * 
 * SETUP INSTRUCTIONS:
 * 1. Sign up at: https://www.google.com/adsense/
 * 2. Add your site: ideasbeforetime.pages.dev
 * 3. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 4. Replace 'YOUR_PUBLISHER_ID' below with your actual ID
 * 5. Wait for approval (usually 1-2 weeks)
 * 
 * REVENUE POTENTIAL:
 * - RPM (Revenue per 1000 views): $1-$10 depending on niche
 * - Specialty chemicals/B2B content: Higher CPM ($5-$15)
 * - Expected: $50-$500/month with 10K-50K monthly visitors
 */

// Your Google AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = 'ca-pub-3181510462001437'; // Amit's Publisher ID

// Ad placement configuration
const AD_CONFIG = {
    // Homepage - Above fold
    homepage_top: {
        slot: '1234567890',
        format: 'horizontal',
        responsive: true
    },
    
    // Library page - Between content
    library_sidebar: {
        slot: '2345678901',
        format: 'vertical',
        responsive: true
    },
    
    // Article pages - In-content
    article_inline: {
        slot: '3456789012',
        format: 'rectangle',
        responsive: true
    },
    
    // Footer - All pages
    footer_banner: {
        slot: '4567890123',
        format: 'horizontal',
        responsive: true
    }
};

/**
 * Initialize Google AdSense
 */
function initializeAdSense() {
    // Load AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    
    console.log('✅ Google AdSense initialized');
}

/**
 * Create ad unit dynamically
 */
function createAdUnit(containerId, adConfig) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', ADSENSE_PUBLISHER_ID);
    ins.setAttribute('data-ad-slot', adConfig.slot);
    
    if (adConfig.format) {
        ins.setAttribute('data-ad-format', adConfig.format);
    }
    
    if (adConfig.responsive) {
        ins.setAttribute('data-full-width-responsive', 'true');
    }
    
    container.appendChild(ins);
    
    // Push ad
    try {
        (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
        console.error('AdSense error:', e);
    }
}

/**
 * Add ad placeholders to page
 * DISABLED: Only show ads after AdSense approval
 */
function addAdPlaceholders() {
    // Placeholders disabled until AdSense is approved
    // Once approved, uncomment the code below
    
    /*
    // Homepage top banner
    const homepageHero = document.querySelector('.access-container, .container');
    if (homepageHero && window.location.pathname === '/index.html') {
        const adDiv = document.createElement('div');
        adDiv.id = 'ad-homepage-top';
        adDiv.style.cssText = 'margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 10px; text-align: center;';
        homepageHero.insertBefore(adDiv, homepageHero.firstChild);
        createAdUnit('ad-homepage-top', AD_CONFIG.homepage_top);
    }
    
    // Library sidebar
    const libraryContainer = document.querySelector('.container');
    if (libraryContainer && window.location.pathname.includes('library')) {
        const adDiv = document.createElement('div');
        adDiv.id = 'ad-library-sidebar';
        adDiv.style.cssText = 'margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 10px;';
        libraryContainer.appendChild(adDiv);
        createAdUnit('ad-library-sidebar', AD_CONFIG.library_sidebar);
    }
    
    // Footer banner (all pages)
    const footer = document.querySelector('body');
    if (footer) {
        const adDiv = document.createElement('div');
        adDiv.id = 'ad-footer-banner';
        adDiv.style.cssText = 'margin: 40px auto; max-width: 1400px; padding: 20px; background: #f9f9f9; border-radius: 10px; text-align: center;';
        footer.appendChild(adDiv);
        createAdUnit('ad-footer-banner', AD_CONFIG.footer_banner);
    }
    */
}

/**
 * Revenue tracking
 */
function trackAdRevenue() {
    // This will be populated by AdSense automatically
    // Check your AdSense dashboard for earnings
    console.log('📊 Ad revenue tracking active');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initializeAdSense();
        setTimeout(addAdPlaceholders, 1000); // Wait for page to load
        trackAdRevenue();
    });
} else {
    initializeAdSense();
    setTimeout(addAdPlaceholders, 1000);
    trackAdRevenue();
}

/**
 * ALTERNATIVE: Ezoic (Higher Revenue)
 * 
 * Ezoic typically pays 2-3x more than AdSense
 * Sign up at: https://www.ezoic.com/
 * 
 * Benefits:
 * - AI-optimized ad placements
 * - Higher RPM ($5-$30)
 * - Better for niche B2B content
 * - Automatic A/B testing
 * 
 * Setup:
 * 1. Sign up with Ezoic
 * 2. Add your site
 * 3. Install Ezoic script (they provide it)
 * 4. Let AI optimize placements
 */

/**
 * REVENUE ESTIMATES (Monthly):
 * 
 * Traffic Level | AdSense | Ezoic | Affiliate
 * 5K visits     | $10-50  | $25-100 | $50-200
 * 10K visits    | $20-100 | $50-200 | $100-500
 * 50K visits    | $100-500| $250-1K | $500-2K
 * 100K visits   | $200-1K | $500-3K | $1K-5K
 * 
 * B2B/Chemical industry content typically has higher CPM
 * Social Profile Optimizer tool can generate direct revenue (₹21 per use)
 */

