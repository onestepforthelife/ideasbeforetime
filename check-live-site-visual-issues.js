// COMPREHENSIVE LIVE SITE VISUAL & FORMATTING CHECK
// Checks: Links, Beautification, Formatting, Consistency

const https = require('https');
const http = require('http');

const SITE_URL = 'https://onestepforthelife.com';

const issues = {
    critical: [],
    high: [],
    medium: [],
    low: []
};

// Pages to check
const pagesToCheck = [
    '/',
    '/blog.html',
    '/about.html',
    '/cv.html',
    '/market-reports.html',
    '/spo.html',
    '/social-optimizer-index.html',
    '/jobs.html',
    '/admin-control-panel.html',
    '/astronomy.html',
    '/ro.html',
    '/innovations.html',
    '/library.html',
    '/nickel-compounds-technical-data.html',
    '/nickel-esg-report-open.html'
];

console.log('🔍 COMPREHENSIVE LIVE SITE CHECK');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

// Check each page
let checkedPages = 0;
let totalIssues = 0;

pagesToCheck.forEach(page => {
    checkPage(page);
});

function checkPage(path) {
    const url = SITE_URL + path;
    
    console.log(`\n📄 Checking: ${path}`);
    console.log('─────────────────────────────────────────────────────────────────────────────');
    
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            checkedPages++;
            
            // Check HTTP status
            if (res.statusCode !== 200) {
                issues.critical.push(`${path}: HTTP ${res.statusCode}`);
                console.log(`❌ CRITICAL: HTTP ${res.statusCode}`);
            } else {
                console.log(`✅ HTTP 200 OK`);
            }
            
            // Check for common visual/formatting issues
            checkVisualIssues(path, data);
            checkFormattingIssues(path, data);
            checkLinkIssues(path, data);
            checkConsistencyIssues(path, data);
            
            // Show summary when all pages checked
            if (checkedPages === pagesToCheck.length) {
                showSummary();
            }
        });
    }).on('error', (err) => {
        issues.critical.push(`${path}: Connection error - ${err.message}`);
        console.log(`❌ CRITICAL: Connection error`);
        checkedPages++;
        
        if (checkedPages === pagesToCheck.length) {
            showSummary();
        }
    });
}

function checkVisualIssues(path, html) {
    const visualIssues = [];
    
    // Check for missing CSS
    if (!html.includes('common-styles.css')) {
        visualIssues.push('Missing common-styles.css');
        issues.high.push(`${path}: Missing common-styles.css`);
    }
    
    // Check for missing navigation CSS
    if (!html.includes('common-navigation.css') && !html.includes('email-template')) {
        visualIssues.push('Missing common-navigation.css');
        issues.medium.push(`${path}: Missing common-navigation.css`);
    }
    
    // Check for missing footer CSS
    if (!html.includes('common-footer.css') && !html.includes('email-template')) {
        visualIssues.push('Missing common-footer.css');
        issues.medium.push(`${path}: Missing common-footer.css`);
    }
    
    // Check for inline styles (bad practice)
    const inlineStyleCount = (html.match(/style="/g) || []).length;
    if (inlineStyleCount > 10) {
        visualIssues.push(`Too many inline styles (${inlineStyleCount})`);
        issues.low.push(`${path}: ${inlineStyleCount} inline styles (should use CSS classes)`);
    }
    
    // Check for missing viewport meta tag
    if (!html.includes('viewport')) {
        visualIssues.push('Missing viewport meta tag');
        issues.high.push(`${path}: Missing viewport meta tag (mobile broken)`);
    }
    
    // Check for missing favicon
    if (!html.includes('favicon')) {
        visualIssues.push('Missing favicon');
        issues.low.push(`${path}: Missing favicon`);
    }
    
    if (visualIssues.length > 0) {
        console.log(`⚠️  Visual Issues: ${visualIssues.join(', ')}`);
        totalIssues += visualIssues.length;
    } else {
        console.log('✅ Visual: OK');
    }
}

function checkFormattingIssues(path, html) {
    const formattingIssues = [];
    
    // Check for double spaces
    if (html.includes('  ')) {
        formattingIssues.push('Double spaces in content');
        issues.low.push(`${path}: Double spaces in content`);
    }
    
    // Check for missing alt tags on images
    const imgTags = html.match(/<img[^>]*>/g) || [];
    const missingAlt = imgTags.filter(img => !img.includes('alt=')).length;
    if (missingAlt > 0) {
        formattingIssues.push(`${missingAlt} images missing alt text`);
        issues.medium.push(`${path}: ${missingAlt} images missing alt text (accessibility)`);
    }
    
    // Check for empty headings
    if (html.match(/<h[1-6]>\s*<\/h[1-6]>/)) {
        formattingIssues.push('Empty headings found');
        issues.medium.push(`${path}: Empty headings (bad SEO)`);
    }
    
    // Check for missing title tag
    if (!html.includes('<title>') || html.includes('<title></title>')) {
        formattingIssues.push('Missing or empty title tag');
        issues.critical.push(`${path}: Missing or empty title tag (SEO critical)`);
    }
    
    // Check for missing meta description
    if (!html.includes('meta name="description"')) {
        formattingIssues.push('Missing meta description');
        issues.high.push(`${path}: Missing meta description (SEO)`);
    }
    
    if (formattingIssues.length > 0) {
        console.log(`⚠️  Formatting Issues: ${formattingIssues.join(', ')}`);
        totalIssues += formattingIssues.length;
    } else {
        console.log('✅ Formatting: OK');
    }
}

function checkLinkIssues(path, html) {
    const linkIssues = [];
    
    // Check for broken internal links (href="#" or href="")
    const emptyLinks = (html.match(/href="#"/g) || []).length + (html.match(/href=""/g) || []).length;
    if (emptyLinks > 0) {
        linkIssues.push(`${emptyLinks} empty/placeholder links`);
        issues.medium.push(`${path}: ${emptyLinks} empty links (href="#" or href="")`);
    }
    
    // Check for links without text
    if (html.match(/<a[^>]*>\s*<\/a>/)) {
        linkIssues.push('Links without text');
        issues.medium.push(`${path}: Links without text (accessibility)`);
    }
    
    // Check for external links without rel="noopener"
    const externalLinks = html.match(/<a[^>]*href="http[^"]*"[^>]*>/g) || [];
    const unsafeExternal = externalLinks.filter(link => 
        link.includes('target="_blank"') && !link.includes('rel="noopener')
    ).length;
    if (unsafeExternal > 0) {
        linkIssues.push(`${unsafeExternal} unsafe external links`);
        issues.low.push(`${path}: ${unsafeExternal} external links missing rel="noopener" (security)`);
    }
    
    if (linkIssues.length > 0) {
        console.log(`⚠️  Link Issues: ${linkIssues.join(', ')}`);
        totalIssues += linkIssues.length;
    } else {
        console.log('✅ Links: OK');
    }
}

function checkConsistencyIssues(path, html) {
    const consistencyIssues = [];
    
    // Check for navigation
    if (!html.includes('common-navigation.js') && !path.includes('email-template')) {
        consistencyIssues.push('Missing navigation');
        issues.high.push(`${path}: Missing navigation (user can't navigate)`);
    }
    
    // Check for footer
    if (!html.includes('common-footer.js') && !path.includes('email-template')) {
        consistencyIssues.push('Missing footer');
        issues.medium.push(`${path}: Missing footer (inconsistent)`);
    }
    
    // Check for analytics
    if (!html.includes('universal-analytics.js') && !html.includes('gtag')) {
        consistencyIssues.push('Missing analytics');
        issues.low.push(`${path}: Missing analytics (can't track users)`);
    }
    
    // Check for error tracking
    if (!html.includes('error-tracker.js')) {
        consistencyIssues.push('Missing error tracking');
        issues.low.push(`${path}: Missing error tracking (can't detect issues)`);
    }
    
    if (consistencyIssues.length > 0) {
        console.log(`⚠️  Consistency Issues: ${consistencyIssues.join(', ')}`);
        totalIssues += consistencyIssues.length;
    } else {
        console.log('✅ Consistency: OK');
    }
}

function showSummary() {
    console.log('\n\n═══════════════════════════════════════════════════════════════════════════════');
    console.log('📊 COMPREHENSIVE LIVE SITE CHECK SUMMARY');
    console.log('═══════════════════════════════════════════════════════════════════════════════\n');
    
    console.log(`Pages Checked: ${checkedPages}/${pagesToCheck.length}`);
    console.log(`Total Issues Found: ${totalIssues}\n`);
    
    console.log(`🚨 CRITICAL Issues: ${issues.critical.length}`);
    if (issues.critical.length > 0) {
        issues.critical.forEach(issue => console.log(`   - ${issue}`));
    }
    console.log('');
    
    console.log(`⚠️  HIGH Priority Issues: ${issues.high.length}`);
    if (issues.high.length > 0) {
        issues.high.forEach(issue => console.log(`   - ${issue}`));
    }
    console.log('');
    
    console.log(`📌 MEDIUM Priority Issues: ${issues.medium.length}`);
    if (issues.medium.length > 0) {
        issues.medium.forEach(issue => console.log(`   - ${issue}`));
    }
    console.log('');
    
    console.log(`ℹ️  LOW Priority Issues: ${issues.low.length}`);
    if (issues.low.length > 0) {
        issues.low.forEach(issue => console.log(`   - ${issue}`));
    }
    console.log('');
    
    console.log('═══════════════════════════════════════════════════════════════════════════════');
    
    // Calculate pass percentage
    const totalChecks = checkedPages * 4; // 4 checks per page
    const passedChecks = totalChecks - totalIssues;
    const passPercentage = Math.round((passedChecks / totalChecks) * 100);
    
    console.log(`\n📊 PASS RATE: ${passPercentage}%`);
    console.log(`   Passed: ${passedChecks}/${totalChecks} checks`);
    console.log(`   Failed: ${totalIssues}/${totalChecks} checks\n`);
    
    if (issues.critical.length > 0 || issues.high.length > 0) {
        console.log('❌ SITE HAS CRITICAL/HIGH PRIORITY ISSUES - FIX IMMEDIATELY!\n');
        process.exit(1);
    } else if (issues.medium.length > 0) {
        console.log('⚠️  SITE HAS MEDIUM PRIORITY ISSUES - FIX SOON\n');
        process.exit(0);
    } else {
        console.log('✅ SITE LOOKS GOOD - ONLY MINOR ISSUES\n');
        process.exit(0);
    }
}
