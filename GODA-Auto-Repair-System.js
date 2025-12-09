#!/usr/bin/env node

/**
 * GODA AUTO-REPAIR SYSTEM
 * Automatically fixes issues found by GODA testing protocols
 * MECER Framework: Make Everything Complete, Execute, Reality-test
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 GODA AUTO-REPAIR SYSTEM');
console.log('📋 MECER: Make Everything Complete, Execute, Reality-test\n');

const FIXES_APPLIED = {
    adsense: 0,
    navigation: 0,
    footer: 0,
    footerCSS: 0,
    total: 0
};

// ============================================
// FIX 1: Add Google AdSense to Missing Pages
// ============================================
console.log('💰 [FIX 1] Adding Google AdSense to missing pages...');

function addAdsenseToPages() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has AdSense
        if (content.includes('google-adsense.js')) return;
        
        // Add before </body>
        if (content.includes('</body>')) {
            content = content.replace(
                '</body>',
                '    <script src="google-adsense.js"></script>\n</body>'
            );
            
            fs.writeFileSync(file, content, 'utf8');
            FIXES_APPLIED.adsense++;
            FIXES_APPLIED.total++;
        }
    });
    
    console.log(`   ✅ Added AdSense to ${FIXES_APPLIED.adsense} pages`);
}

addAdsenseToPages();

// ============================================
// FIX 2: Add Navigation to Missing Pages
// ============================================
console.log('\n🧭 [FIX 2] Adding navigation to missing pages...');

function addNavigationToPages() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has navigation
        if (content.includes('common-navigation.js')) return;
        
        // Add navigation CSS in <head> and JS after <body>
        if (content.includes('</head>')) {
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="common-navigation.css">\n</head>'
            );
        }
        
        if (content.includes('<body>')) {
            content = content.replace(
                '<body>',
                '<body>\n    <script src="common-navigation.js"></script>'
            );
            
            fs.writeFileSync(file, content, 'utf8');
            FIXES_APPLIED.navigation++;
            FIXES_APPLIED.total++;
        }
    });
    
    console.log(`   ✅ Added navigation to ${FIXES_APPLIED.navigation} pages`);
}

addNavigationToPages();

// ============================================
// FIX 3: Add Footer JS to Missing Pages
// ============================================
console.log('\n📄 [FIX 3] Adding footer JS to missing pages...');

function addFooterJSToPages() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has footer JS
        if (content.includes('common-footer.js')) return;
        
        // Add footer CSS in <head> and JS before </body>
        if (content.includes('</head>') && !content.includes('common-footer.css')) {
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="common-footer.css">\n</head>'
            );
        }
        
        if (content.includes('</body>')) {
            content = content.replace(
                '</body>',
                '    <script src="common-footer.js"></script>\n</body>'
            );
            
            fs.writeFileSync(file, content, 'utf8');
            FIXES_APPLIED.footer++;
            FIXES_APPLIED.total++;
        }
    });
    
    console.log(`   ✅ Added footer JS to ${FIXES_APPLIED.footer} pages`);
}

addFooterJSToPages();

// ============================================
// FIX 4: Add Footer CSS to Missing Pages
// ============================================
console.log('\n🎨 [FIX 4] Adding footer CSS to missing pages...');

function addFooterCSSToPages() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    
    htmlFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has footer CSS
        if (content.includes('common-footer.css')) return;
        
        // Add in <head>
        if (content.includes('</head>')) {
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="common-footer.css">\n</head>'
            );
            
            fs.writeFileSync(file, content, 'utf8');
            FIXES_APPLIED.footerCSS++;
            FIXES_APPLIED.total++;
        }
    });
    
    console.log(`   ✅ Added footer CSS to ${FIXES_APPLIED.footerCSS} pages`);
}

addFooterCSSToPages();

// ============================================
// MECER VALIDATION
// ============================================
console.log('\n🎯 MECER VALIDATION...');

console.log('   ✅ M: Made EVERYTHING - All HTML files processed');
console.log('   ✅ E: EVERYTHING - All 4 fix types applied');
console.log(`   ✅ C: COMPLETE - ${FIXES_APPLIED.total} fixes applied`);
console.log('   ✅ E: EXECUTED - Fixes written to files');
console.log('   ⚠️  R: REALITY - Run GODA tests again to verify');

// ============================================
// FINAL REPORT
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 AUTO-REPAIR COMPLETE');
console.log('='.repeat(60));
console.log(`\n✅ Total Fixes Applied: ${FIXES_APPLIED.total}`);
console.log(`   - AdSense added: ${FIXES_APPLIED.adsense} pages`);
console.log(`   - Navigation added: ${FIXES_APPLIED.navigation} pages`);
console.log(`   - Footer JS added: ${FIXES_APPLIED.footer} pages`);
console.log(`   - Footer CSS added: ${FIXES_APPLIED.footerCSS} pages`);

console.log('\n🔄 NEXT STEPS:');
console.log('   1. Run: node GODA-Best-Testing-Protocol-Custom.js');
console.log('   2. Verify: Issues reduced');
console.log('   3. Test: Live site functionality');
console.log('   4. Push: To GitHub if all pass\n');

process.exit(0);
