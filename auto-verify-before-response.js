#!/usr/bin/env node
/**
 * AUTOMATED VERIFICATION SYSTEM
 * Runs BEFORE any "done" claim
 * Blocks response if verification fails
 * For lifetime of human race
 */

const fs = require('fs');
const path = require('path');

console.log('🤖 AUTOMATED VERIFICATION SYSTEM');
console.log('Running comprehensive checks...\n');

let passed = 0;
let failed = 0;
let warnings = 0;

// CHECK 1: All HTML files have navigation
console.log('📋 CHECK 1: Navigation Consistency');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let navMissing = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('common-navigation.js')) {
        navMissing.push(file);
    }
});
if (navMissing.length === 0) {
    console.log('✅ PASS: All HTML files have navigation');
    passed++;
} else {
    console.log(`❌ FAIL: ${navMissing.length} files missing navigation`);
    console.log(`   Files: ${navMissing.slice(0, 5).join(', ')}${navMissing.length > 5 ? '...' : ''}`);
    failed++;
}

// CHECK 2: Navigation includes Blog and RO
console.log('\n📋 CHECK 2: Navigation Content');
if (fs.existsSync('common-navigation.js')) {
    const navContent = fs.readFileSync('common-navigation.js', 'utf8');
    const hasBlog = navContent.includes('blog.html');
    const hasRO = navContent.includes('ro.html');
    
    if (hasBlog && hasRO) {
        console.log('✅ PASS: Navigation includes Blog and RO');
        passed++;
    } else {
        console.log('❌ FAIL: Navigation missing Blog or RO');
        if (!hasBlog) console.log('   Missing: blog.html');
        if (!hasRO) console.log('   Missing: ro.html');
        failed++;
    }
} else {
    console.log('⚠️  WARN: common-navigation.js not found');
    warnings++;
}

// CHECK 3: All report files have blur system
console.log('\n📋 CHECK 3: Report Blur System');
const reportFiles = htmlFiles.filter(f => 
    f.includes('Report') || f.includes('report') || 
    f.includes('nickel') || f.includes('acrylic') || 
    f.includes('poloxamer') || f.includes('paper')
);
let blurMissing = [];
reportFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('preview-overlay') && !content.includes('blur')) {
        blurMissing.push(file);
    }
});
if (blurMissing.length === 0) {
    console.log(`✅ PASS: All ${reportFiles.length} reports have blur system`);
    passed++;
} else {
    console.log(`❌ FAIL: ${blurMissing.length} reports missing blur`);
    console.log(`   Files: ${blurMissing.join(', ')}`);
    failed++;
}

// CHECK 4: Blog posts exist
console.log('\n📋 CHECK 4: Blog Posts');
const blogPosts = htmlFiles.filter(f => f.startsWith('blog-post-'));
if (blogPosts.length >= 100) {
    console.log(`✅ PASS: ${blogPosts.length} blog posts exist`);
    passed++;
} else {
    console.log(`❌ FAIL: Only ${blogPosts.length} blog posts (expected 100)`);
    failed++;
}

// CHECK 5: Quick access widget on pages
console.log('\n📋 CHECK 5: Quick Access Widget');
let widgetMissing = [];
const majorPages = ['about.html', 'cv.html', 'market-reports.html', 'blog.html'];
majorPages.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (!content.includes('quick-links-widget') && !content.includes('Quick Access')) {
            widgetMissing.push(file);
        }
    }
});
if (widgetMissing.length === 0) {
    console.log('✅ PASS: Major pages have quick access widget');
    passed++;
} else {
    console.log(`⚠️  WARN: ${widgetMissing.length} pages missing widget`);
    console.log(`   Files: ${widgetMissing.join(', ')}`);
    warnings++;
}

// CHECK 6: Error tracking on pages
console.log('\n📋 CHECK 6: Error Tracking');
let errorTrackingMissing = [];
majorPages.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (!content.includes('error-tracker.js')) {
            errorTrackingMissing.push(file);
        }
    }
});
if (errorTrackingMissing.length === 0) {
    console.log('✅ PASS: Major pages have error tracking');
    passed++;
} else {
    console.log(`⚠️  WARN: ${errorTrackingMissing.length} pages missing error tracking`);
    warnings++;
}

// FINAL VERDICT
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION RESULTS:');
console.log(`   ✅ Passed: ${passed}`);
console.log(`   ❌ Failed: ${failed}`);
console.log(`   ⚠️  Warnings: ${warnings}`);
console.log('='.repeat(50));

if (failed === 0) {
    console.log('\n🎉 ALL CRITICAL CHECKS PASSED');
    console.log('✅ Safe to claim "done"');
    process.exit(0);
} else {
    console.log('\n🚨 VERIFICATION FAILED');
    console.log('❌ DO NOT claim "done" until issues fixed');
    console.log('\nFix the failed checks and run again.');
    process.exit(1);
}
