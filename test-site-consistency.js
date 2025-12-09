// AUTOMATED SITE CONSISTENCY CHECKER
// Run: node test-site-consistency.js

const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║     AUTOMATED WEBSITE CONSISTENCY TEST                      ║');
console.log('║     Ideas Before Time - Quality Assurance                   ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`📊 Found ${files.length} HTML files\n`);

// Test results
const results = {
    total: files.length,
    navigation: { pass: [], fail: [] },
    footer: { pass: [], fail: [] },
    analytics: { pass: [], fail: [] },
    watermark: { pass: [], fail: [] },
    width1400: { pass: [], fail: [] }
};

// Files that should be excluded from certain checks
const excludeFromFooter = [
    'common-footer.html',
    'ghar-ghar-complete.html',
    'ghar-ghar-game-enhanced.html'
];

const excludeFromNav = [
    'common-footer.html',
    'ghar-ghar-complete.html',
    'ghar-ghar-game-enhanced.html'
];

// Check each file
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check navigation
    if (!excludeFromNav.includes(file)) {
        if (content.includes('common-navigation.js')) {
            results.navigation.pass.push(file);
        } else {
            results.navigation.fail.push(file);
        }
    }
    
    // Check footer
    if (!excludeFromFooter.includes(file)) {
        if (content.includes('common-footer.js')) {
            results.footer.pass.push(file);
        } else {
            results.footer.fail.push(file);
        }
    }
    
    // Check analytics
    if (content.includes('universal-analytics.js')) {
        results.analytics.pass.push(file);
    } else {
        results.analytics.fail.push(file);
    }
    
    // Check watermark
    if (content.includes('common-watermark.css')) {
        results.watermark.pass.push(file);
    } else {
        results.watermark.fail.push(file);
    }
    
    // Check 1400px width
    if (content.includes('max-width: 1400px') || content.includes('max-width:1400px')) {
        results.width1400.pass.push(file);
    } else {
        results.width1400.fail.push(file);
    }
});

// Print results
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🧭 NAVIGATION (common-navigation.js)');
console.log(`   ✅ Pass: ${results.navigation.pass.length}`);
console.log(`   ❌ Fail: ${results.navigation.fail.length}`);
if (results.navigation.fail.length > 0) {
    console.log('   Missing from:');
    results.navigation.fail.forEach(f => console.log(`      - ${f}`));
}
console.log('');

console.log('📄 FOOTER (common-footer.js)');
console.log(`   ✅ Pass: ${results.footer.pass.length}`);
console.log(`   ❌ Fail: ${results.footer.fail.length}`);
if (results.footer.fail.length > 0) {
    console.log('   Missing from:');
    results.footer.fail.forEach(f => console.log(`      - ${f}`));
}
console.log('');

console.log('📊 ANALYTICS (universal-analytics.js)');
console.log(`   ✅ Pass: ${results.analytics.pass.length}`);
console.log(`   ❌ Fail: ${results.analytics.fail.length}`);
if (results.analytics.fail.length > 0) {
    console.log('   Missing from:');
    results.analytics.fail.forEach(f => console.log(`      - ${f}`));
}
console.log('');

console.log('💧 WATERMARK (common-watermark.css)');
console.log(`   ✅ Pass: ${results.watermark.pass.length}`);
console.log(`   ❌ Fail: ${results.watermark.fail.length}`);
if (results.watermark.fail.length > 0) {
    console.log('   Missing from:');
    results.watermark.fail.forEach(f => console.log(`      - ${f}`));
}
console.log('');

console.log('📏 WIDTH 1400px');
console.log(`   ✅ Pass: ${results.width1400.pass.length}`);
console.log(`   ❌ Fail: ${results.width1400.fail.length}`);
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Overall score
const totalChecks = results.navigation.fail.length + results.footer.fail.length + 
                    results.analytics.fail.length + results.watermark.fail.length;

if (totalChecks === 0) {
    console.log('✅ ALL TESTS PASSED! Site is consistent.\n');
    process.exit(0);
} else {
    console.log(`❌ FOUND ${totalChecks} ISSUES - Need to fix!\n`);
    process.exit(1);
}

