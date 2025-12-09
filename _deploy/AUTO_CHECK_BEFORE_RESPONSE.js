#!/usr/bin/env node

/**
 * AUTO CHECK BEFORE RESPONSE
 * Run this AUTOMATICALLY before every response
 * 
 * This prevents issues from going unnoticed
 */

const fs = require('fs');

console.log('🤖 AUTO-CHECK RUNNING...\n');

// Get ALL HTML files
const files = fs.readdirSync('.')
    .filter(f => f.endsWith('.html'))
    .sort();

const issues = {
    critical: [],
    high: [],
    medium: []
};

const skipFiles = ['email-template.html', 'TEST_NEW_NAVIGATION.html'];

files.forEach(file => {
    if (skipFiles.includes(file)) return;
    
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // CRITICAL: Missing navigation/footer
        if (!content.includes('common-navigation.js')) {
            issues.critical.push(`${file}: Missing navigation`);
        }
        if (!content.includes('common-footer.js')) {
            issues.critical.push(`${file}: Missing footer`);
        }
        
        // HIGH: Wrong background color
        if (content.includes('background:linear-gradient(135deg,#5a6c7d')) {
            issues.high.push(`${file}: Gray background (should be blue)`);
        }
        
        // MEDIUM: Missing widgets (only check if not already has quick-access)
        if (!content.includes('quick-access') && !content.includes('Quick Access')) {
            issues.medium.push(`${file}: Missing Quick Access`);
        }
        if (!content.includes('goda-chatbot.js')) {
            issues.medium.push(`${file}: Missing GODA`);
        }
        
    } catch (error) {
        // Skip
    }
});

// Report
const totalIssues = issues.critical.length + issues.high.length + issues.medium.length;

if (totalIssues === 0) {
    console.log('✅ ALL PAGES PERFECT!\n');
    process.exit(0);
} else {
    console.log(`⚠️  FOUND ${totalIssues} ISSUES:\n`);
    
    if (issues.critical.length > 0) {
        console.log(`🚨 CRITICAL (${issues.critical.length}):`);
        issues.critical.slice(0, 5).forEach(i => console.log(`   ${i}`));
        if (issues.critical.length > 5) console.log(`   ... and ${issues.critical.length - 5} more`);
        console.log();
    }
    
    if (issues.high.length > 0) {
        console.log(`⚠️  HIGH (${issues.high.length}):`);
        issues.high.slice(0, 5).forEach(i => console.log(`   ${i}`));
        if (issues.high.length > 5) console.log(`   ... and ${issues.high.length - 5} more`);
        console.log();
    }
    
    if (issues.medium.length > 0) {
        console.log(`📋 MEDIUM (${issues.medium.length}):`);
        console.log(`   ${issues.medium.length} files need widgets`);
        console.log();
    }
    
    console.log('💡 Run: node fix-all-pages-comprehensive.js\n');
    process.exit(1);
}
