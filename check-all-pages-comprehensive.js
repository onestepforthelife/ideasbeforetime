#!/usr/bin/env node

/**
 * COMPREHENSIVE PAGE CHECKER
 * Check ALL pages for common issues
 */

const fs = require('fs');

console.log('🔍 COMPREHENSIVE PAGE CHECK\n');

// Get ALL HTML files
const files = fs.readdirSync('.')
    .filter(f => f.endsWith('.html'))
    .sort();

console.log(`Found ${files.length} HTML files\n`);

const issues = {
    missingNavigation: [],
    missingFooter: [],
    wrongBackground: [],
    missingQuickAccess: [],
    missingGoda: [],
    truncatedContent: [],
    poorContrast: []
};

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check 1: Navigation
        if (!content.includes('common-navigation.js')) {
            issues.missingNavigation.push(file);
        }
        
        // Check 2: Footer
        if (!content.includes('common-footer.js')) {
            issues.missingFooter.push(file);
        }
        
        // Check 3: Background color (should be bright blue for consistency)
        if (content.includes('background:linear-gradient(135deg,#5a6c7d')) {
            issues.wrongBackground.push(file);
        }
        
        // Check 4: Quick Access Widget
        if (!content.includes('quick-access-widget') && !content.includes('Quick Access')) {
            issues.missingQuickAccess.push(file);
        }
        
        // Check 5: GODA Chatbot
        if (!content.includes('goda-chatbot.js')) {
            issues.missingGoda.push(file);
        }
        
        // Check 6: Truncated content (blog posts)
        if (file.startsWith('blog-post-')) {
            const contentMatch = content.match(/<div class="content">([\s\S]*?)<\/div>/);
            if (contentMatch && contentMatch[1].length < 200) {
                issues.truncatedContent.push(file);
            }
        }
        
        // Check 7: Poor contrast (gray backgrounds)
        if (content.includes('#5a6c7d') || content.includes('#8b9aa7')) {
            issues.poorContrast.push(file);
        }
        
    } catch (error) {
        console.error(`❌ Error reading ${file}:`, error.message);
    }
});

// Report results
console.log('📊 RESULTS:\n');

let totalIssues = 0;

if (issues.missingNavigation.length > 0) {
    console.log(`❌ Missing Navigation (${issues.missingNavigation.length}):`);
    issues.missingNavigation.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.missingNavigation.length > 10) console.log(`   ... and ${issues.missingNavigation.length - 10} more`);
    totalIssues += issues.missingNavigation.length;
    console.log();
}

if (issues.missingFooter.length > 0) {
    console.log(`❌ Missing Footer (${issues.missingFooter.length}):`);
    issues.missingFooter.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.missingFooter.length > 10) console.log(`   ... and ${issues.missingFooter.length - 10} more`);
    totalIssues += issues.missingFooter.length;
    console.log();
}

if (issues.wrongBackground.length > 0) {
    console.log(`⚠️  Wrong Background Color (${issues.wrongBackground.length}):`);
    issues.wrongBackground.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.wrongBackground.length > 10) console.log(`   ... and ${issues.wrongBackground.length - 10} more`);
    totalIssues += issues.wrongBackground.length;
    console.log();
}

if (issues.missingQuickAccess.length > 0) {
    console.log(`⚠️  Missing Quick Access (${issues.missingQuickAccess.length}):`);
    issues.missingQuickAccess.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.missingQuickAccess.length > 10) console.log(`   ... and ${issues.missingQuickAccess.length - 10} more`);
    totalIssues += issues.missingQuickAccess.length;
    console.log();
}

if (issues.missingGoda.length > 0) {
    console.log(`⚠️  Missing GODA Chatbot (${issues.missingGoda.length}):`);
    issues.missingGoda.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.missingGoda.length > 10) console.log(`   ... and ${issues.missingGoda.length - 10} more`);
    totalIssues += issues.missingGoda.length;
    console.log();
}

if (issues.truncatedContent.length > 0) {
    console.log(`⚠️  Truncated Content (${issues.truncatedContent.length}):`);
    issues.truncatedContent.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.truncatedContent.length > 10) console.log(`   ... and ${issues.truncatedContent.length - 10} more`);
    totalIssues += issues.truncatedContent.length;
    console.log();
}

if (issues.poorContrast.length > 0) {
    console.log(`⚠️  Poor Contrast Colors (${issues.poorContrast.length}):`);
    issues.poorContrast.slice(0, 10).forEach(f => console.log(`   - ${f}`));
    if (issues.poorContrast.length > 10) console.log(`   ... and ${issues.poorContrast.length - 10} more`);
    totalIssues += issues.poorContrast.length;
    console.log();
}

console.log('='.repeat(60));
if (totalIssues === 0) {
    console.log('✅ ALL PAGES PERFECT!');
} else {
    console.log(`⚠️  Total Issues: ${totalIssues}`);
    console.log('\n💡 Run fix scripts to resolve these issues');
}

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    totalFiles: files.length,
    totalIssues,
    issues
};

fs.writeFileSync('ALL_PAGES_CHECK_REPORT.json', JSON.stringify(report, null, 2));
console.log('\n📄 Detailed report saved: ALL_PAGES_CHECK_REPORT.json');
