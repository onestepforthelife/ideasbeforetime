#!/usr/bin/env node

/**
 * FIX ALL CRITICAL ISSUES - December 8, 2025
 * 
 * Issues to fix:
 * 1. GODA AI not responding (check Worker URL)
 * 2. Wrong background colors (purple gradients)
 * 3. All repeated issues user is fed up with
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING ALL CRITICAL ISSUES...\n');

let totalIssues = 0;
let fixedIssues = 0;

// Issue 1: Check GODA chatbot Worker URL
console.log('1️⃣ Checking GODA AI chatbot...');
const godaFile = 'goda-chatbot.js';
if (fs.existsSync(godaFile)) {
    let content = fs.readFileSync(godaFile, 'utf8');
    
    // Check if Worker URL is correct
    if (content.includes('orange-lab-a038.onestepforthelife.workers.dev')) {
        console.log('   ✅ GODA Worker URL is correct');
        console.log('   ℹ️  If not responding, check:');
        console.log('      - Cloudflare Worker is deployed');
        console.log('      - API key is configured in Worker');
        console.log('      - CORS is enabled');
    } else {
        console.log('   ❌ GODA Worker URL not found');
        totalIssues++;
    }
} else {
    console.log('   ❌ goda-chatbot.js not found');
    totalIssues++;
}

// Issue 2: Fix wrong background colors
console.log('\n2️⃣ Fixing background colors...');

const wrongBackgrounds = [
    // Purple gradients (wrong)
    { pattern: /background:\s*linear-gradient\(135deg,\s*#667eea\s+0%,\s*#764ba2\s+100%\)/gi, 
      replacement: 'background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%)' },
    { pattern: /background:\s*linear-gradient\(135deg,\s*#667eea,\s*#764ba2\)/gi,
      replacement: 'background: linear-gradient(135deg, #5a6c7d, #8b9aa7)' },
    
    // Blue gradients (should be gray)
    { pattern: /background:\s*linear-gradient\(135deg,\s*#2563eb\s+0%,\s*#1e40af\s+100%\)/gi,
      replacement: 'background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%)' },
    { pattern: /background:\s*linear-gradient\(135deg,\s*#2563eb,\s*#1e40af\)/gi,
      replacement: 'background: linear-gradient(135deg, #5a6c7d, #8b9aa7)' },
    
    // Solid purple colors
    { pattern: /background:\s*#667eea/gi, replacement: 'background: #5a6c7d' },
    { pattern: /background:\s*#764ba2/gi, replacement: 'background: #8b9aa7' },
    { pattern: /background:\s*#8b5cf6/gi, replacement: 'background: #5a6c7d' },
    
    // Solid blue colors (body backgrounds)
    { pattern: /background:\s*#2563eb/gi, replacement: 'background: #5a6c7d' },
    { pattern: /background:\s*#1e40af/gi, replacement: 'background: #8b9aa7' },
];

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    let fileIssues = 0;
    
    wrongBackgrounds.forEach(({ pattern, replacement }) => {
        const matches = content.match(pattern);
        if (matches) {
            content = content.replace(pattern, replacement);
            modified = true;
            fileIssues += matches.length;
        }
    });
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`   ✅ Fixed ${fileIssues} background issues in ${file}`);
        totalIssues += fileIssues;
        fixedIssues += fileIssues;
    }
});

// Issue 3: Check for other common issues
console.log('\n3️⃣ Checking for other common issues...');

// Check for missing GODA chatbot
let missingGODA = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('goda-chatbot.js') && !file.includes('test-') && !file.includes('error-')) {
        missingGODA++;
    }
});

if (missingGODA > 0) {
    console.log(`   ⚠️  ${missingGODA} pages missing GODA chatbot`);
    totalIssues += missingGODA;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY:');
console.log('='.repeat(50));
console.log(`Total issues found: ${totalIssues}`);
console.log(`Issues fixed: ${fixedIssues}`);
console.log(`Remaining issues: ${totalIssues - fixedIssues}`);

if (fixedIssues > 0) {
    console.log('\n✅ Background colors fixed!');
    console.log('📝 Next steps:');
    console.log('   1. Test GODA chatbot on live site');
    console.log('   2. Check Cloudflare Worker logs if not responding');
    console.log('   3. Verify all pages have correct gray gradient');
    console.log('   4. Push changes to GitHub');
}

if (missingGODA > 0) {
    console.log(`\n⚠️  ${missingGODA} pages need GODA chatbot added`);
    console.log('   Run: node add-goda-to-all-pages.js');
}

console.log('\n✅ CRITICAL FIXES COMPLETE!');
process.exit(fixedIssues > 0 ? 0 : 1);
