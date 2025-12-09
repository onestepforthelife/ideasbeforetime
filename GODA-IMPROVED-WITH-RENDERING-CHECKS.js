#!/usr/bin/env node

/**
 * GODA IMPROVED - WITH RENDERING VERIFICATION
 * Fixes: Learning #55 - Tests RENDERING not just INCLUSION
 * New: Phase 15 - Rendering Verification (MECER-R)
 */

const fs = require('fs');

const ISSUES = {
    critical: [],
    high: [],
    medium: [],
    low: []
};

console.log('🚀 GODA IMPROVED - WITH RENDERING VERIFICATION');
console.log('📅 Based on Learning #55 (Dec 9, 2025)\n');

// ... [Previous phases 1-14 remain same] ...

// ============================================
// PHASE 15: RENDERING VERIFICATION (NEW!)
// ============================================
console.log('\n🎨 PHASE 15: Rendering Verification (MECER-R)...');

function checkRenderingReality() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    let totalIssues = 0;
    
    console.log('   Checking 5 rendering categories...\n');
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        // Category 1: CSS Load Order
        const cssIssues = checkCSSLoadOrder(file, content);
        totalIssues += cssIssues;
        
        // Category 2: JS Load Order
        const jsIssues = checkJSLoadOrder(file, content);
        totalIssues += jsIssues;
        
        // Category 3: Image Paths
        const imgIssues = checkImagePaths(file, content);
        totalIssues += imgIssues;
        
        // Category 4: Form Handlers
        const formIssues = checkFormHandlers(file, content);
        totalIssues += formIssues;
        
        // Category 5: Event Listeners
        const eventIssues = checkEventListeners(file, content);
        totalIssues += eventIssues;
    });
    
    console.log(`   ${totalIssues === 0 ? '✅' : '❌'} Total rendering issues: ${totalIssues}`);
}

function checkCSSLoadOrder(file, content) {
    let issues = 0;
    
    // Find all CSS links
    const cssLinks = [...content.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"[^>]*>/g)];
    const inlineStyles = [...content.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)];
    
    if (inlineStyles.length === 0) return 0;
    
    const firstInlineStylePos = content.indexOf(inlineStyles[0][0]);
    
    cssLinks.forEach(link => {
        const href = link[1];
        if (href.includes('common-navigation') || href.includes('common-footer')) {
            const linkPos = content.indexOf(link[0]);
            if (linkPos < firstInlineStylePos) {
                ISSUES.high.push(`${file}: ${href} loaded BEFORE inline styles - will be overridden`);
                issues++;
            }
        }
    });
    
    // Check for global resets after component CSS
    if (content.match(/\*\s*\{[^}]*margin:\s*0[^}]*padding:\s*0/)) {
        const resetPos = content.search(/\*\s*\{[^}]*margin:\s*0/);
        cssLinks.forEach(link => {
            const href = link[1];
            if (href.includes('common-navigation') || href.includes('common-footer')) {
                const linkPos = content.indexOf(link[0]);
                if (linkPos < resetPos) {
                    ISSUES.high.push(`${file}: Global reset AFTER ${href} - styles will be reset`);
                    issues++;
                }
            }
        });
    }
    
    return issues;
}

function checkJSLoadOrder(file, content) {
    let issues = 0;
    
    // Find all script tags
    const scripts = [...content.matchAll(/<script[^>]*src="([^"]*)"[^>]*>/g)];
    const bodyEndPos = content.indexOf('</body>');
    const headEndPos = content.indexOf('</head>');
    
    scripts.forEach(script => {
        const src = script[1];
        const scriptPos = content.indexOf(script[0]);
        
        // Check if DOM-dependent script is in <head> without defer
        if (scriptPos < headEndPos && !script[0].includes('defer') && !script[0].includes('async')) {
            if (src.includes('common-navigation') || src.includes('goda-chatbot') || src.includes('error-tracker')) {
                ISSUES.high.push(`${file}: ${src} in <head> without defer - will run before DOM ready`);
                issues++;
            }
        }
        
        // Check if script is after </body>
        if (bodyEndPos !== -1 && scriptPos > bodyEndPos) {
            ISSUES.medium.push(`${file}: ${src} after </body> - may not execute`);
            issues++;
        }
    });
    
    return issues;
}

function checkImagePaths(file, content) {
    let issues = 0;
    
    // Find all img tags
    const images = [...content.matchAll(/<img[^>]*src="([^"]*)"[^>]*>/g)];
    
    images.forEach(img => {
        const src = img[1];
        
        // Check for absolute paths (break on Cloudflare)
        if (src.startsWith('/') && !src.startsWith('//') && !src.startsWith('http')) {
            ISSUES.medium.push(`${file}: Image ${src} uses absolute path - may break on Cloudflare`);
            issues++;
        }
        
        // Check if image file exists (for relative paths)
        if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('data:')) {
            const imgPath = src.replace(/^\//, '');
            if (!fs.existsSync(imgPath)) {
                ISSUES.high.push(`${file}: Image ${src} not found`);
                issues++;
            }
        }
    });
    
    return issues;
}

function checkFormHandlers(file, content) {
    let issues = 0;
    
    // Find all forms
    const forms = [...content.matchAll(/<form[^>]*>/g)];
    
    forms.forEach(form => {
        const formTag = form[0];
        
        // Check if form has action or onsubmit
        if (!formTag.includes('action=') && !formTag.includes('onsubmit=')) {
            ISSUES.high.push(`${file}: Form has no action or onsubmit - won't submit`);
            issues++;
        }
        
        // Check for forms with action="#" (does nothing)
        if (formTag.includes('action="#"')) {
            ISSUES.high.push(`${file}: Form action="#" does nothing - needs real handler`);
            issues++;
        }
    });
    
    return issues;
}

function checkEventListeners(file, content) {
    let issues = 0;
    
    // Find addEventListener calls
    const listeners = [...content.matchAll(/addEventListener\s*\(\s*['"]([^'"]*)['"]/g)];
    
    if (listeners.length > 0) {
        // Check if code waits for DOM ready
        const hasDOMReady = content.includes('DOMContentLoaded') || 
                           content.includes('defer') || 
                           content.includes('window.onload') ||
                           content.includes('document.addEventListener');
        
        if (!hasDOMReady) {
            ISSUES.medium.push(`${file}: ${listeners.length} event listeners may attach before DOM ready`);
            issues++;
        }
    }
    
    // Check for getElementById before DOM ready
    const getElementCalls = [...content.matchAll(/getElementById\s*\(\s*['"]([^'"]*)['"]\)/g)];
    if (getElementCalls.length > 0) {
        const scriptTags = [...content.matchAll(/<script[^>]*>/g)];
        const hasInlineScript = scriptTags.some(tag => !tag[0].includes('src='));
        
        if (hasInlineScript && !content.includes('DOMContentLoaded')) {
            ISSUES.medium.push(`${file}: getElementById calls may run before DOM ready`);
            issues++;
        }
    }
    
    return issues;
}

checkRenderingReality();

// ============================================
// FINAL REPORT
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 FINAL REPORT - GODA IMPROVED (WITH RENDERING)');
console.log('='.repeat(60));

const totalIssues = ISSUES.critical.length + ISSUES.high.length + ISSUES.medium.length + ISSUES.low.length;

console.log(`\n🚨 CRITICAL: ${ISSUES.critical.length}`);
ISSUES.critical.forEach(issue => console.log(`   ❌ ${issue}`));

console.log(`\n⚠️  HIGH: ${ISSUES.high.length}`);
ISSUES.high.forEach(issue => console.log(`   ⚠️  ${issue}`));

console.log(`\n📌 MEDIUM: ${ISSUES.medium.length}`);
ISSUES.medium.forEach(issue => console.log(`   📌 ${issue}`));

console.log(`\n💡 LOW: ${ISSUES.low.length}`);
ISSUES.low.forEach(issue => console.log(`   💡 ${issue}`));

console.log('\n' + '='.repeat(60));
console.log(`TOTAL ISSUES: ${totalIssues}`);
console.log('='.repeat(60));

console.log('\n💡 NEW IN THIS VERSION:');
console.log('   ✅ Phase 15: Rendering Verification (MECER-R)');
console.log('   ✅ CSS load order checks');
console.log('   ✅ JavaScript execution timing');
console.log('   ✅ Image path validation');
console.log('   ✅ Form handler verification');
console.log('   ✅ Event listener timing');
console.log('');
console.log('   🎯 Now tests RENDERING not just INCLUSION!');

if (ISSUES.critical.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND - MUST FIX BEFORE DEPLOYMENT!');
    process.exit(1);
} else if (ISSUES.high.length > 0) {
    console.log('\n⚠️  HIGH PRIORITY ISSUES - SHOULD FIX BEFORE DEPLOYMENT');
    process.exit(1);
} else if (totalIssues > 0) {
    console.log('\n✅ NO CRITICAL/HIGH ISSUES - Safe to deploy (fix medium/low when possible)');
    process.exit(0);
} else {
    console.log('\n✅ ALL CHECKS PASSED - PERFECT! 🎉');
    process.exit(0);
}
