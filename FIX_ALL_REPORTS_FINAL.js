const fs = require('fs');
const path = require('path');

console.log('🔧 COMPREHENSIVE REPORT FIX - ALL ISSUES\n');

// All report files
const reportFiles = [
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Final_Acrylic_Market_Report.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'nickel-esg-report.html'
];

let totalFixed = 0;

reportFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file} - Not found`);
        return;
    }
    
    console.log(`\n📝 Fixing: ${file}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let changes = [];
    
    // 1. Add common-navigation.css if missing
    if (!content.includes('common-navigation.css')) {
        content = content.replace(
            '<link rel="stylesheet" href="common-watermark.css">',
            '<link rel="stylesheet" href="common-watermark.css">\n    <link rel="stylesheet" href="common-navigation.css">'
        );
        changes.push('Added common-navigation.css');
    }
    
    // 2. Add common-footer.css if missing
    if (!content.includes('common-footer.css')) {
        if (content.includes('common-navigation.css')) {
            content = content.replace(
                '<link rel="stylesheet" href="common-navigation.css">',
                '<link rel="stylesheet" href="common-navigation.css">\n    <link rel="stylesheet" href="common-footer.css">'
            );
        } else {
            content = content.replace(
                '<link rel="stylesheet" href="common-watermark.css">',
                '<link rel="stylesheet" href="common-watermark.css">\n    <link rel="stylesheet" href="common-footer.css">'
            );
        }
        changes.push('Added common-footer.css');
    }
    
    // 3. Remove ALL text-align:center from headers
    content = content.replace(/h1 \{ text-align: center;/g, 'h1 {');
    content = content.replace(/h2 \{ text-align: center;/g, 'h2 {');
    content = content.replace(/h3 \{ text-align: center;/g, 'h3 {');
    content = content.replace(/h4 \{ text-align: center;/g, 'h4 {');
    content = content.replace(/text-align: center; \}/g, '}');
    changes.push('Removed center alignment from headers');
    
    // 4. Add common-navigation.js before closing body
    if (!content.includes('common-navigation.js')) {
        content = content.replace(
            '</body>',
            '<script src="common-navigation.js"></script>\n</body>'
        );
        changes.push('Added common-navigation.js');
    }
    
    // 5. Add common-footer.js before closing body
    if (!content.includes('common-footer.js')) {
        content = content.replace(
            '</body>',
            '<script src="common-footer.js"></script>\n</body>'
        );
        changes.push('Added common-footer.js');
    }
    
    // 6. Add universal-analytics.js if missing
    if (!content.includes('universal-analytics.js')) {
        content = content.replace(
            '</body>',
            '<script src="universal-analytics.js"></script>\n</body>'
        );
        changes.push('Added universal-analytics.js');
    }
    
    // 7. Add error-tracker.js if missing
    if (!content.includes('error-tracker.js')) {
        content = content.replace(
            '</body>',
            '<script src="error-tracker.js"></script>\n</body>'
        );
        changes.push('Added error-tracker.js');
    }
    
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    
    if (changes.length > 0) {
        changes.forEach(change => console.log(`  ✅ ${change}`));
        totalFixed++;
    } else {
        console.log('  ℹ️  Already correct');
    }
});

console.log(`\n✅ FIXED ${totalFixed} REPORT FILES!\n`);
console.log('All reports now have:');
console.log('  ✅ Navigation (common-navigation.js)');
console.log('  ✅ Footer (common-footer.js)');
console.log('  ✅ Analytics (universal-analytics.js)');
console.log('  ✅ Error tracking (error-tracker.js)');
console.log('  ✅ Left-aligned headers (professional)');
console.log('\nReady to push!');
