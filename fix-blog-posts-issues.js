#!/usr/bin/env node

/**
 * FIX BLOG POSTS ISSUES
 * 
 * Issues to fix:
 * 1. Content not available (truncated/incomplete)
 * 2. Header contrast not correct (background color)
 * 3. Background color verification (should match portfolio bright blue)
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING BLOG POSTS ISSUES\n');

// Get all blog post files
const files = fs.readdirSync('.')
    .filter(f => f.match(/^blog-post-\d+\.html$/))
    .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)[0]);
        const numB = parseInt(b.match(/\d+/)[0]);
        return numA - numB;
    });

console.log(`Found ${files.length} blog post files\n`);

let fixed = 0;
let issues = [];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        let fileIssues = [];
        
        // Issue 1: Check for incomplete content (repeated text or very short)
        const contentMatch = content.match(/<div class="content">([\s\S]*?)<\/div>/);
        if (contentMatch) {
            const textContent = contentMatch[1];
            // Check if content is suspiciously short or has obvious repetition
            if (textContent.length < 200 || textContent.includes('I I don\'t use')) {
                fileIssues.push('⚠️  Content appears incomplete or truncated');
            }
        }
        
        // Issue 2 & 3: Fix background color - change from gray-blue to bright blue (match portfolio)
        if (content.includes('background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%)')) {
            content = content.replace(
                /background:linear-gradient\(135deg,#5a6c7d 0%,#8b9aa7 100%\)/g,
                'background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%)'
            );
            modified = true;
            fileIssues.push('✅ Fixed background color (gray-blue → bright blue)');
        }
        
        // Also fix category badge color to match
        if (content.includes('background:#5a6c7d;color:white')) {
            content = content.replace(
                /background:#5a6c7d;color:white/g,
                'background:#2563eb;color:white'
            );
            modified = true;
            fileIssues.push('✅ Fixed category badge color');
        }
        
        // Fix back-link color
        if (content.includes('color:#5a6c7d')) {
            content = content.replace(
                /color:#5a6c7d/g,
                'color:#2563eb'
            );
            modified = true;
            fileIssues.push('✅ Fixed link colors');
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            fixed++;
            console.log(`✅ ${file}`);
            fileIssues.forEach(issue => console.log(`   ${issue}`));
        }
        
        if (fileIssues.length > 0 && !modified) {
            issues.push({ file, issues: fileIssues });
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
    }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed ${fixed} blog post files`);

if (issues.length > 0) {
    console.log(`\n⚠️  ${issues.length} files have content issues that need manual review:`);
    issues.forEach(({ file, issues: fileIssues }) => {
        console.log(`\n${file}:`);
        fileIssues.forEach(issue => console.log(`  ${issue}`));
    });
}

console.log('\n📋 SUMMARY:');
console.log(`   Background color: gray-blue → bright blue (#2563eb to #1e40af)`);
console.log(`   This matches linkedin-portfolio-index.html`);
console.log(`   Better header contrast with navigation`);
console.log(`\n⚠️  Note: Content truncation issues need manual review`);
console.log('   Check original LinkedIn posts for full content');
