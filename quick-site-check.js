const fs = require('fs');
const path = require('path');

console.log('🔍 QUICK SITE CHECK\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log(`📄 Found ${files.length} HTML files\n`);

let issues = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for common issues
    if (!content.includes('common-navigation.js')) {
        issues.push(`❌ ${file}: Missing navigation`);
    }
    if (!content.includes('common-footer.js')) {
        issues.push(`❌ ${file}: Missing footer`);
    }
    if (content.includes('#667eea') || content.includes('#764ba2') || content.includes('purple')) {
        issues.push(`⚠️  ${file}: Contains purple`);
    }
});

if (issues.length === 0) {
    console.log('✅ All checks passed!');
} else {
    console.log(`Found ${issues.length} issues:\n`);
    issues.forEach(i => console.log(i));
}

console.log(`\n📊 Summary: ${files.length - issues.length}/${files.length} files clean`);
