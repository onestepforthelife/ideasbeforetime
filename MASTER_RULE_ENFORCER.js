#!/usr/bin/env node
/**
 * MASTER RULE ENFORCER
 * Probes ALL rules, protocols, and standards
 * Blocks deployment if ANY rule violated
 * For lifetime of human race
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 MASTER RULE ENFORCER');
console.log('Probing all rules and protocols...\n');

const results = {
    passed: [],
    failed: [],
    warnings: []
};

function pass(check) {
    results.passed.push(check);
    console.log(`✅ ${check}`);
}

function fail(check, details) {
    results.failed.push({ check, details });
    console.log(`❌ ${check}`);
    if (details) console.log(`   ${details}`);
}

function warn(check, details) {
    results.warnings.push({ check, details });
    console.log(`⚠️  ${check}`);
    if (details) console.log(`   ${details}`);
}

// ============================================
// CATEGORY 1: NAVIGATION & STRUCTURE
// ============================================
console.log('📂 CATEGORY 1: Navigation & Structure\n');

// Rule 1.1: All HTML files have common-navigation.js
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const excludeFromNav = ['test-preview-system.html', 'ghar-ghar-complete.html', 'compare-homepage-conversion.html', 'compare-homepage-versions.html', 'admin-control-panel.html'];
let navMissing = htmlFiles.filter(f => {
    if (excludeFromNav.includes(f)) return false;
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('common-navigation.js');
});

if (navMissing.length === 0) {
    pass('All HTML files have navigation');
} else {
    fail('Navigation missing from files', `${navMissing.length} files: ${navMissing.slice(0, 3).join(', ')}...`);
}

// Rule 1.2: Navigation includes Blog and RO
if (fs.existsSync('common-navigation.js')) {
    const navContent = fs.readFileSync('common-navigation.js', 'utf8');
    const hasBlog = navContent.includes('blog.html');
    const hasRO = navContent.includes('ro.html');
    
    if (hasBlog && hasRO) {
        pass('Navigation includes Blog and RO links');
    } else {
        fail('Navigation missing required links', `Blog: ${hasBlog}, RO: ${hasRO}`);
    }
}

// Rule 1.3: All pages have footer
let footerMissing = htmlFiles.filter(f => {
    if (excludeFromNav.includes(f)) return false;
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('common-footer.js');
});

if (footerMissing.length === 0) {
    pass('All HTML files have footer');
} else {
    fail('Footer missing from files', `${footerMissing.length} files`);
}

// ============================================
// CATEGORY 2: REPORT BLUR SYSTEM
// ============================================
console.log('\n📊 CATEGORY 2: Report Blur System\n');

// Rule 2.1: All market reports have blur/preview system
const reportFiles = htmlFiles.filter(f => {
    // Exclude redirect files (small files that just redirect)
    if (fs.existsSync(f) && fs.statSync(f).size < 5000) return false;
    
    return (f.includes('Report') || f.includes('report') || 
            f.includes('nickel-esg') || f.includes('Final_Acrylic') || 
            f.includes('Poloxamer_Market') || f.includes('Paper_Pulp')) &&
           !f.includes('market-reports.html') && !f.includes('reports.html');
});

let blurMissing = reportFiles.filter(f => {
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('blur-overlay') && !content.includes('preview-overlay') && !content.includes('preview-message');
});

if (blurMissing.length === 0) {
    pass(`All ${reportFiles.length} reports have blur system`);
} else {
    fail('Reports missing blur system', `${blurMissing.length} files: ${blurMissing.join(', ')}`);
}

// Rule 2.2: Reports have request access button
let accessButtonMissing = reportFiles.filter(f => {
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('request-access') && !content.includes('Request Access') && !content.includes('access-message');
});

if (accessButtonMissing.length === 0) {
    pass('All reports have request access button');
} else {
    warn('Reports missing access button', `${accessButtonMissing.length} files`);
}

// ============================================
// CATEGORY 3: BLOG SYSTEM
// ============================================
console.log('\n📝 CATEGORY 3: Blog System\n');

// Rule 3.1: 100 blog posts exist
const blogPosts = htmlFiles.filter(f => f.startsWith('blog-post-'));
if (blogPosts.length >= 100) {
    pass(`${blogPosts.length} blog posts exist`);
} else {
    fail('Insufficient blog posts', `Only ${blogPosts.length}/100`);
}

// Rule 3.2: Blog posts have quick access widget
let blogWidgetMissing = blogPosts.slice(0, 10).filter(f => {
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('quick-links-widget');
});

if (blogWidgetMissing.length === 0) {
    pass('Blog posts have quick access widget');
} else {
    warn('Some blog posts missing widget', `${blogWidgetMissing.length}/10 sampled`);
}

// Rule 3.3: Blog.html has category filters
if (fs.existsSync('blog.html')) {
    const blogContent = fs.readFileSync('blog.html', 'utf8');
    if (blogContent.includes('category-filter') || blogContent.includes('Category')) {
        pass('Blog page has category filters');
    } else {
        warn('Blog page missing category filters');
    }
}

// ============================================
// CATEGORY 4: UX PRINCIPLES
// ============================================
console.log('\n🎨 CATEGORY 4: UX Principles\n');

// Rule 4.1: Major pages have quick access widget
const majorPages = ['about.html', 'cv.html', 'market-reports.html', 'blog.html', 'index.html'];
let uxWidgetMissing = majorPages.filter(f => {
    if (!fs.existsSync(f)) return true;
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('quick-links-widget') && !content.includes('Quick Access');
});

if (uxWidgetMissing.length === 0) {
    pass('Major pages have quick access widget');
} else {
    warn('Pages missing quick access', `${uxWidgetMissing.join(', ')}`);
}

// Rule 4.2: Forms are above fold (primary action first)
const formPages = ['request-access.html', 'email-sender-web.html'];
formPages.forEach(f => {
    if (fs.existsSync(f)) {
        const content = fs.readFileSync(f, 'utf8');
        // Check if form comes before long content
        const formIndex = content.indexOf('<form');
        const bodyIndex = content.indexOf('<body');
        if (formIndex > 0 && formIndex - bodyIndex < 2000) {
            pass(`${f}: Form above fold`);
        } else {
            warn(`${f}: Form may be below fold`);
        }
    }
});

// ============================================
// CATEGORY 5: ERROR TRACKING & ANALYTICS
// ============================================
console.log('\n📈 CATEGORY 5: Error Tracking & Analytics\n');

// Rule 5.1: Major pages have error tracking
let errorTrackingMissing = majorPages.filter(f => {
    if (!fs.existsSync(f)) return true;
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('error-tracker.js');
});

if (errorTrackingMissing.length === 0) {
    pass('Major pages have error tracking');
} else {
    warn('Pages missing error tracking', `${errorTrackingMissing.join(', ')}`);
}

// Rule 5.2: Pages have analytics
let analyticsMissing = majorPages.filter(f => {
    if (!fs.existsSync(f)) return true;
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('universal-analytics.js') && !content.includes('google-analytics');
});

if (analyticsMissing.length === 0) {
    pass('Major pages have analytics');
} else {
    warn('Pages missing analytics', `${analyticsMissing.join(', ')}`);
}

// ============================================
// CATEGORY 6: CONSISTENCY CHECKS
// ============================================
console.log('\n🔄 CATEGORY 6: Consistency Checks\n');

// Rule 6.1: All pages use same max-width (1400px)
let widthInconsistent = [];
majorPages.forEach(f => {
    if (fs.existsSync(f)) {
        const content = fs.readFileSync(f, 'utf8');
        if (!content.includes('1400px') && !content.includes('max-width: 1400')) {
            widthInconsistent.push(f);
        }
    }
});

if (widthInconsistent.length === 0) {
    pass('Pages use consistent max-width');
} else {
    warn('Width inconsistency detected', `${widthInconsistent.length} pages`);
}

// Rule 6.2: Pricing consistency (₹21 for SPO)
const spoPages = htmlFiles.filter(f => f.includes('social-optimizer') || f.includes('spo'));
let pricingInconsistent = spoPages.filter(f => {
    const content = fs.readFileSync(f, 'utf8');
    return content.includes('₹') && !content.includes('₹21');
});

if (pricingInconsistent.length === 0) {
    pass('SPO pricing consistent (₹21)');
} else {
    fail('SPO pricing inconsistent', `${pricingInconsistent.length} files`);
}

// ============================================
// CATEGORY 7: SECURITY & VALIDATION
// ============================================
console.log('\n🔒 CATEGORY 7: Security & Validation\n');

// Rule 7.1: Forms have validation
const formsToCheck = ['request-access.html', 'email-sender-web.html'];
formsToCheck.forEach(f => {
    if (fs.existsSync(f)) {
        const content = fs.readFileSync(f, 'utf8');
        if (content.includes('required') || content.includes('validate')) {
            pass(`${f}: Has form validation`);
        } else {
            warn(`${f}: Missing form validation`);
        }
    }
});

// Rule 7.2: No exposed API keys in HTML
let exposedKeys = htmlFiles.filter(f => {
    const content = fs.readFileSync(f, 'utf8');
    return content.match(/AIza[0-9A-Za-z-_]{35}/) || 
           content.match(/sk-[a-zA-Z0-9]{48}/);
});

if (exposedKeys.length === 0) {
    pass('No exposed API keys in HTML');
} else {
    fail('API keys exposed in HTML', `${exposedKeys.length} files - SECURITY RISK!`);
}

// ============================================
// CATEGORY 8: PERFORMANCE & SEO
// ============================================
console.log('\n⚡ CATEGORY 8: Performance & SEO\n');

// Rule 8.1: Major pages have meta descriptions
let metaMissing = majorPages.filter(f => {
    if (!fs.existsSync(f)) return true;
    const content = fs.readFileSync(f, 'utf8');
    return !content.includes('meta name="description"');
});

if (metaMissing.length === 0) {
    pass('Major pages have meta descriptions');
} else {
    warn('Pages missing meta descriptions', `${metaMissing.join(', ')}`);
}

// Rule 8.2: Sitemap exists and is recent
if (fs.existsSync('sitemap.xml')) {
    const stats = fs.statSync('sitemap.xml');
    const daysSinceUpdate = (Date.now() - stats.mtime) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 7) {
        pass('Sitemap exists and is recent');
    } else {
        warn('Sitemap outdated', `Last updated ${Math.floor(daysSinceUpdate)} days ago`);
    }
} else {
    fail('Sitemap missing');
}

// ============================================
// CATEGORY 9: BUSINESS RULES
// ============================================
console.log('\n💼 CATEGORY 9: Business Rules\n');

// Rule 9.1: SPO = ₹21, NO REFUNDS
if (fs.existsSync('social-optimizer-index.html')) {
    const content = fs.readFileSync('social-optimizer-index.html', 'utf8');
    if (content.includes('₹21') && content.includes('NO REFUND')) {
        pass('SPO pricing and refund policy correct');
    } else {
        fail('SPO business rules violated', 'Must show ₹21 and NO REFUNDS');
    }
}

// Rule 9.2: Contact email consistent
let emailInconsistent = majorPages.filter(f => {
    if (!fs.existsSync(f)) return true;
    const content = fs.readFileSync(f, 'utf8');
    return content.includes('@') && !content.includes('onestepforthelife@gmail.com');
});

if (emailInconsistent.length === 0) {
    pass('Contact email consistent');
} else {
    warn('Email inconsistency detected', `${emailInconsistent.length} pages`);
}

// ============================================
// FINAL VERDICT
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 MASTER RULE ENFORCEMENT RESULTS:');
console.log('='.repeat(60));
console.log(`✅ Passed:   ${results.passed.length} checks`);
console.log(`❌ Failed:   ${results.failed.length} checks`);
console.log(`⚠️  Warnings: ${results.warnings.length} checks`);
console.log('='.repeat(60));

if (results.failed.length > 0) {
    console.log('\n🚨 CRITICAL FAILURES:');
    results.failed.forEach(f => {
        console.log(`   ❌ ${f.check}`);
        if (f.details) console.log(`      ${f.details}`);
    });
}

if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (Should fix):');
    results.warnings.slice(0, 5).forEach(w => {
        console.log(`   ⚠️  ${w.check}`);
    });
    if (results.warnings.length > 5) {
        console.log(`   ... and ${results.warnings.length - 5} more warnings`);
    }
}

console.log('\n' + '='.repeat(60));

if (results.failed.length === 0) {
    console.log('🎉 ALL CRITICAL RULES ENFORCED');
    console.log('✅ SAFE TO DEPLOY');
    console.log('\nWarnings should be addressed but won\'t block deployment.');
    process.exit(0);
} else {
    console.log('🚨 RULE VIOLATIONS DETECTED');
    console.log('❌ DEPLOYMENT BLOCKED');
    console.log('\nFix all failed checks before deploying.');
    console.log('Run this script again after fixes.');
    process.exit(1);
}
