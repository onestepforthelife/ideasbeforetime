/**
 * Google AdSense Integration - ALL 3 Ad Units
 * Publisher ID: ca-pub-3181510462001437
 * 
 * Ad Units (Google's Exact Code):
 * 1. Display Ad: 9723865202 (auto, responsive)
 * 2. Multiplex Ad: 4786506942 (autorelaxed)
 * 3. In-Article Ad: 5799371569 (fluid, in-article)
 */

(function() {
    'use strict';

    const ADSENSE_CLIENT = 'ca-pub-3181510462001437';
    const AD_UNITS = {
        DISPLAY: '9723865202',        // Display ad (auto format)
        MULTIPLEX: '4786506942',      // Multiplex (autorelaxed)
        IN_ARTICLE: '5799371569'      // In-article (fluid)
    };
    
    /**
     * Initialize AdSense script
     */
    function initializeAdSense() {
        if (document.querySelector('script[src*="adsbygoogle.js"]')) {
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
    }

    /**
     * Create Display Ad (Google's exact code)
     * Slot: 9723865202
     */
    function createDisplayAd() {
        const container = document.createElement('div');
        container.className = 'adsense-display';
        container.style.cssText = 'margin: 30px auto; padding: 20px; text-align: center; max-width: 1200px;';

        container.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"
                 crossorigin="anonymous"></script>
            <!-- Display ad preview -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${ADSENSE_CLIENT}"
                 data-ad-slot="${AD_UNITS.DISPLAY}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        `;

        return container;
    }

    /**
     * Create Multiplex Ad (Google's exact code)
     * Slot: 4786506942
     */
    function createMultiplexAd() {
        const container = document.createElement('div');
        container.className = 'adsense-multiplex';
        container.style.cssText = 'margin: 30px auto; padding: 20px; text-align: center; max-width: 1200px;';

        container.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"
                 crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-format="autorelaxed"
                 data-ad-client="${ADSENSE_CLIENT}"
                 data-ad-slot="${AD_UNITS.MULTIPLEX}"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        `;

        return container;
    }

    /**
     * Create In-Article Ad (Google's exact code)
     * Slot: 5799371569
     */
    function createInArticleAd() {
        const container = document.createElement('div');
        container.className = 'adsense-in-article';
        container.style.cssText = 'margin: 30px auto; padding: 20px; text-align: center;';

        container.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}"
                 crossorigin="anonymous"></script>
            <ins class="adsbygoogle"
                 style="display:block; text-align:center;"
                 data-ad-layout="in-article"
                 data-ad-format="fluid"
                 data-ad-client="${ADSENSE_CLIENT}"
                 data-ad-slot="${AD_UNITS.IN_ARTICLE}"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
        `;

        return container;
    }

    /**
     * Insert all 3 ad types into page content
     */
    function insertAds() {
        const main = document.querySelector('main') || 
                     document.querySelector('article') || 
                     document.querySelector('.content') ||
                     document.body;

        const paragraphs = main.querySelectorAll('p');
        
        if (paragraphs.length < 4) {
            console.log('AdSense: Not enough content for ads');
            return;
        }

        // Ad 1: Display ad after 2nd paragraph
        if (paragraphs[1]) {
            const displayAd = createDisplayAd();
            paragraphs[1].after(displayAd);
        }

        // Ad 2: In-Article ad in middle
        const middleIndex = Math.floor(paragraphs.length / 2);
        if (paragraphs[middleIndex]) {
            const inArticleAd = createInArticleAd();
            paragraphs[middleIndex].after(inArticleAd);
        }

        // Ad 3: Multiplex ad near end
        const endIndex = paragraphs.length - 2;
        if (paragraphs[endIndex] && endIndex > middleIndex + 2) {
            const multiplexAd = createMultiplexAd();
            paragraphs[endIndex].after(multiplexAd);
        }
    }

    /**
     * Initialize everything
     */
    function init() {
        initializeAdSense();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(insertAds, 500);
            });
        } else {
            setTimeout(insertAds, 500);
        }
    }

    init();

    // Export for manual use
    window.GoogleAdsense = {
        createDisplayAd,
        createMultiplexAd,
        createInArticleAd,
        client: ADSENSE_CLIENT,
        units: AD_UNITS
    };
})();
