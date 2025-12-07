#!/usr/bin/env node

/**
 * FIX ALL .HTML LINKS TO EXTENSIONLESS
 * 
 * Updates all href="*.html" to href="/*" (extensionless)
 * This fixes Cloudflare Pages 308 redirects
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING ALL .HTML LINKS TO EXTENSIONLESS...\n');

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.startsWith('test-'));

let totalFixed = 0;
let filesModified = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    let fixCount = 0;
    
    // Fix patterns:
    // href="blog.html" → href="/blog"
    // href="about.html" → href="/about"
    // href="./blog.html" → href="/blog"
    // href="innovations/innovation-1.html" → href="/innovations/innovation-1"
    
    const patterns = [
        // Simple links: blog.html → /blog
        { from: /href="([^"\/]+)\.html"/g, to: 'href="/$1"' },
        // Links with ./: ./blog.html → /blog
        { from: /href="\.\/([^"]+)\.html"/g, to: 'href="/$1"' },
        // Links with path: innovations/page.html → /innovations/page
        { from: /href="([^"]+)\.html"/g, to: 'href="/$1"' }
    ];
    
    patterns.forEach(pattern => {
        const matches = content.match(pattern.from);
        if (matches) {
            content = content.replace(pattern.from, pattern.to);
            fixCount += matches.length;
            modified = true;
        }
    });
    
    // Special case: index.html → /
    content = content.replace(/href="(\.\/)?index\.html"/g, 'href="/"');
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}: Fixed ${fixCount} links`);
        filesModified++;
        totalFixed += fixCount;
    }
});

console.log('\n============================================================');
console.log('📊 FIX SUMMARY');
console.log('============================================================');
console.log(`✅ Files modified: ${filesModified}`);
console.log(`✅ Total links fixed: ${totalFixed}`);
console.log('\n✅ ALL LINKS NOW EXTENSIONLESS - Push to GitHub!');
console.log('\nNEXT STEPS:');
console.log('1. git add .');
console.log('2. git commit -m "Fix: Update all links to extensionless URLs"');
console.log('3. git push');
console.log('4. Wait 2-5 minutes for Cloudflare deployment');
console.log('5. PURGE CLOUDFLARE CACHE (mandatory!)');
console.log('6. Wait 5-10 minutes for cache propagation');
console.log('7. Test: https://onestepforthelife.com/blog');
