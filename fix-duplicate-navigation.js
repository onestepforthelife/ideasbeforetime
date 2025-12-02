#!/usr/bin/env node
/**
 * Fix Duplicate Navigation Scripts
 * Removes duplicate common-navigation.js from all files
 */

const fs = require('fs');

const filesToFix = [
    'index.html',
    'linkedin-network-map.html',
    'linkedin-skills-dashboard.html',
    'social-optimizer-dashboard.html',
    'social-optimizer-index.html'
];

console.log('\n🔧 Fixing duplicate navigation scripts...\n');

filesToFix.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Count occurrences
    const matches = content.match(/common-navigation\.js/g);
    if (!matches || matches.length <= 1) {
        console.log(`✅ ${file} - Already OK (${matches ? matches.length : 0} occurrence)`);
        return;
    }
    
    console.log(`🔧 ${file} - Found ${matches.length} occurrences, fixing...`);
    
    // Strategy: Keep only the LAST occurrence (at the end before </body>)
    // Remove all earlier occurrences
    
    const lines = content.split('\n');
    let lastNavIndex = -1;
    let navIndices = [];
    
    // Find all lines with common-navigation.js
    lines.forEach((line, index) => {
        if (line.includes('common-navigation.js')) {
            navIndices.push(index);
            lastNavIndex = index;
        }
    });
    
    // Remove all but the last one
    for (let i = navIndices.length - 2; i >= 0; i--) {
        const indexToRemove = navIndices[i];
        // Check if it's a standalone script tag line
        if (lines[indexToRemove].trim().startsWith('<script') && 
            lines[indexToRemove].includes('common-navigation.js')) {
            lines[indexToRemove] = ''; // Remove the line
        }
    }
    
    content = lines.join('\n');
    
    // Clean up multiple empty lines
    content = content.replace(/\n\n\n+/g, '\n\n');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`   ✅ Fixed! Kept only 1 occurrence at the end`);
});

console.log('\n✅ All files processed!\n');
console.log('Run: node test-for-common-mistakes.js to verify\n');
