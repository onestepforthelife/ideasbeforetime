/* Universal Footer - Ideas Before Time */

function addSiteFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <nav class="footer-links">
                <a href="index.html">Home</a>
                <a href="blog.html">Blog</a>
                <a href="cv.html">CV</a>
                <a href="ro-guide.html">RO Guide</a>
                <a href="astronomy.html">Astronomy</a>
                <a href="social-optimizer-index.html">SPO Tool</a>
                <a href="email-sender-web.html">Job Search Tool</a>
                <a href="market-reports.html">Chemical Reports</a>
                <a href="library.html">Innovation Library</a>
                <a href="about.html">About</a>
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="disclaimer.html">Terms & Disclaimer</a>
            </nav>
            <p class="footer-contact">Contact: <a href="mailto:onestepforthelife@gmail.com">onestepforthelife@gmail.com</a></p>
            <p class="footer-copyright">© 2025 Amit Kumar / Onestepforthelife</p>
        </div>
    `;
    document.body.appendChild(footer);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSiteFooter);
} else {
    addSiteFooter();
}



<!-- Advanced Analytics -->
<script>
// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', { 'value': maxScroll });
            }
        }
    }
});

// Track time on page
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', { 'value': timeSpent });
    }
});

// Track clicks on important elements
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href*="spo"], a[href*="job"], a[href*="report"]')) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'important_click', { 'link': e.target.href });
        }
    }
});
</script>


<script>
// Referral tracking
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function trackReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
        localStorage.setItem('referral_code', refCode);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'referral_visit', { 'referral_code': refCode });
        }
    }
}

function createShareLinks() {
    const userRefCode = localStorage.getItem('user_ref_code') || generateReferralCode();
    localStorage.setItem('user_ref_code', userRefCode);
    
    const shareUrl = window.location.origin + '?ref=' + userRefCode;
    
    return {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out Ideas Before Time!`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent('Check out Ideas Before Time! ' + shareUrl)}`,
        email: `mailto:?subject=Check this out&body=${encodeURIComponent('I thought you might like this: ' + shareUrl)}`
    };
}

// Track on page load
trackReferral();
</script>

<!-- GODA AI Chatbot - Available on all pages -->
<script src="goda-chatbot.js"></script>


<!-- Advanced Analytics -->
<script>
// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', { 'value': maxScroll });
            }
        }
    }
});

// Track time on page
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (typeof gtag !== 'undefined') {
        gtag('event', 'time_on_page', { 'value': timeSpent });
    }
});

// Track clicks on important elements
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href*="spo"], a[href*="job"], a[href*="report"]')) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'important_click', { 'link': e.target.href });
        }
    }
});
</script>


<script>
// Referral tracking
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function trackReferral() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
        localStorage.setItem('referral_code', refCode);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'referral_visit', { 'referral_code': refCode });
        }
    }
}

function createShareLinks() {
    const userRefCode = localStorage.getItem('user_ref_code') || generateReferralCode();
    localStorage.setItem('user_ref_code', userRefCode);
    
    const shareUrl = window.location.origin + '?ref=' + userRefCode;
    
    return {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out Ideas Before Time!`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent('Check out Ideas Before Time! ' + shareUrl)}`,
        email: `mailto:?subject=Check this out&body=${encodeURIComponent('I thought you might like this: ' + shareUrl)}`
    };
}

// Track on page load
trackReferral();
</script>

