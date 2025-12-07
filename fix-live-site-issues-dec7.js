#!/usr/bin/env node

/**
 * FIX LIVE SITE ISSUES - December 7, 2025
 * 
 * Issues found by Amit on live site:
 * 1. Blue background on homepage
 * 2. Images not visible on about.html
 * 3. LinkedIn links not working on blog.html
 * 4. Text not centered on library.html
 * 5. Blue background on many pages
 * 6. Link not working on market-reports.html
 * 7. No header to go back on market-reports.html
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING LIVE SITE ISSUES...\n');

let fixed = 0;
let issues = [];

// Issue 1 & 5: Remove blue backgrounds (change to white)
console.log('1. Fixing blue backgrounds...');
const blueBackgroundFiles = [
    'index.html',
    'about.html', 
    'blog.html',
    'library.html',
    'market-reports.html'
];

blueBackgroundFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace blue gradient backgrounds with white
        const before = content;
        content = content.replace(/background:\s*linear-gradient\(135deg,\s*#2563eb\s+0%,\s*#1e40af\s+100%\)/gi, 'background: white');
        content = content.replace(/background:\s*#2563eb/gi, 'background: white');
        
        if (content !== before) {
            fs.writeFileSync(file, content, 'utf8');
            fixed++;
            console.log(`   ✅ Fixed blue background in ${file}`);
        }
    }
});

// Issue 2: Fix images on about.html
console.log('\n2. Checking images on about.html...');
if (fs.existsSync('about.html')) {
    const content = fs.readFileSync('about.html', 'utf8');
    
    // Check if images exist
    const imageMatches = content.match(/src="images\/[^"]+"/g);
    if (imageMatches) {
        imageMatches.forEach(match => {
            const imagePath = match.replace(/src="|"/g, '');
            if (!fs.existsSync(imagePath)) {
                issues.push(`Missing image: ${imagePath}`);
            }
        });
    }
}

// Issue 3: Fix LinkedIn links on blog.html
console.log('\n3. Fixing LinkedIn links on blog.html...');
if (fs.existsSync('blog.html')) {
    let content = fs.readFileSync('blog.html', 'utf8');
    
    // Ensure LinkedIn links are properly formatted
    const before = content;
    content = content.replace(/href="https:\/\/www\.linkedin\.com\/in\/leadershipexpertamit\/"/g, 
        'href="https://www.linkedin.com/in/leadershipexpertamit/" target="_blank" rel="noopener noreferrer"');
    
    if (content !== before) {
        fs.writeFileSync('blog.html', content, 'utf8');
        fixed++;
        console.log('   ✅ Fixed LinkedIn links');
    }
}

// Issue 4: Fix text centering on library.html
console.log('\n4. Fixing text alignment on library.html...');
if (fs.existsSync('library.html')) {
    let content = fs.readFileSync('library.html', 'utf8');
    
    // Change text-align: center to text-align: left for header
    const before = content;
    content = content.replace(/\.header\{[^}]*text-align:\s*center/g, 
        '.header{background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%);color:white;padding:30px;text-align:left');
    
    if (content !== before) {
        fs.writeFileSync('library.html', content, 'utf8');
        fixed++;
        console.log('   ✅ Fixed text alignment');
    }
}

// Issue 6 & 7: Fix market-reports.html
console.log('\n5. Fixing market-reports.html...');
if (fs.existsSync('market-reports.html')) {
    let content = fs.readFileSync('market-reports.html', 'utf8');
    
    // Add navigation if missing
    if (!content.includes('<div id="navigation"></div>')) {
        content = content.replace('<body>', '<body>\n    <div id="navigation"></div>\n');
        fixed++;
        console.log('   ✅ Added navigation');
    }
    
    // Fix "Explore Free Tools" link
    content = content.replace(/Explore Free Tools →/g, 
        '<a href="social-optimizer-index.html" style="color: white; text-decoration: underline;">Explore Free Tools →</a>');
    
    fs.writeFileSync('market-reports.html', content, 'utf8');
    fixed++;
    console.log('   ✅ Fixed links and navigation');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 FIX SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Fixed: ${fixed} issues`);
console.log(`⚠️  Issues found: ${issues.length}`);

if (issues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:');
    issues.forEach(issue => console.log(`   - ${issue}`));
}

console.log('\n✅ FIXES APPLIED - Push to GitHub now!');
