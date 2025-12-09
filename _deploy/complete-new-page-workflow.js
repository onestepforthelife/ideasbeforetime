// COMPLETE NEW PAGE WORKFLOW - NO MORE ORPHANED PAGES!
// This script ensures EVERY new page is properly integrated

const fs = require('fs');
const path = require('path');

console.log('🔍 CHECKING FOR ORPHANED PAGES...\n');

// Step 1: Find all HTML pages
const allPages = fs.readdirSync('.')
    .filter(f => f.endsWith('.html'))
    .filter(f => !f.includes('index') && !f.includes('compare-homepage'));

console.log(`Found ${allPages.length} HTML pages\n`);

// Step 2: Check navigation
const navFile = fs.readFileSync('common-navigation.js', 'utf8');
const missingFromNav = allPages.filter(page => !navFile.includes(page));

console.log('❌ MISSING FROM NAVIGATION:');
missingFromNav.forEach(page => console.log(`   - ${page}`));
console.log();

// Step 3: Check sitemap
const sitemapFile = fs.readFileSync('sitemap.xml', 'utf8');
const missingFromSitemap = allPages.filter(page => !sitemapFile.includes(page));

console.log('❌ MISSING FROM SITEMAP:');
missingFromSitemap.forEach(page => console.log(`   - ${page}`));
console.log();

// Step 4: Check which pages are truly orphaned (missing from BOTH)
const orphaned = allPages.filter(page => 
    !navFile.includes(page) && !sitemapFile.includes(page)
);

console.log('🚨 COMPLETELY ORPHANED (not in nav OR sitemap):');
orphaned.forEach(page => console.log(`   - ${page}`));
console.log();

// Step 5: Generate fixes
console.log('📋 FIXES NEEDED:\n');

if (orphaned.length > 0) {
    console.log('1. ADD TO NAVIGATION (common-navigation.js):');
    orphaned.forEach(page => {
        const name = page.replace('.html', '').replace(/-/g, ' ')
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        console.log(`   { name: '${name}', url: '${page}' },`);
    });
    console.log();
    
    console.log('2. ADD TO SITEMAP (sitemap.xml):');
    orphaned.forEach(page => {
        console.log(`   <url>`);
        console.log(`       <loc>https://ideasbeforetime.pages.dev/${page}</loc>`);
        console.log(`       <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>`);
        console.log(`       <priority>0.8</priority>`);
        console.log(`   </url>`);
    });
    console.log();
    
    console.log('3. UPLOAD TO GITHUB:');
    console.log('   - Run: .\\UPLOAD_TO_GITHUB.bat');
    console.log('   - Or use GitHub Desktop');
    console.log();
}

console.log('📊 SUMMARY:');
console.log(`   Total pages: ${allPages.length}`);
console.log(`   Missing from nav: ${missingFromNav.length}`);
console.log(`   Missing from sitemap: ${missingFromSitemap.length}`);
console.log(`   Completely orphaned: ${orphaned.length}`);
console.log();

if (orphaned.length === 0) {
    console.log('✅ NO ORPHANED PAGES - ALL GOOD!');
} else {
    console.log('❌ FIX THESE ISSUES BEFORE SAYING "DONE"!');
}
