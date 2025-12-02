// Fix remaining issues
const fs = require('fs');

console.log('🔧 FIXING REMAINING ISSUES...\n');

const remainingFiles = [
    'JOB_TRACKER_TOOL.html',
    'learning-with-kiro.html',
    'linkedin-network-map.html',
    'linkedin-skills-dashboard.html',
    'Specialty_Chemicals_Market_Report_Merged.html'
];

let fixed = 0;

remainingFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file} not found`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Add navigation if missing
    if (!content.includes('common-navigation.js') && content.includes('</body>')) {
        content = content.replace('</body>', '<script src="common-navigation.js"></script>\n</body>');
        changed = true;
        console.log(`   ✅ Added navigation to ${file}`);
        fixed++;
    }
    
    // Add footer if missing
    if (!content.includes('common-footer.js') && content.includes('</body>')) {
        content = content.replace('</body>', '<script src="common-footer.js"></script>\n</body>');
        changed = true;
        console.log(`   ✅ Added footer to ${file}`);
        fixed++;
    }
    
    // Add analytics if missing
    if (!content.includes('universal-analytics.js') && content.includes('</body>')) {
        content = content.replace('</body>', '<script src="universal-analytics.js"></script>\n</body>');
        changed = true;
        console.log(`   ✅ Added analytics to ${file}`);
        fixed++;
    }
    
    // Add watermark if missing
    if (!content.includes('common-watermark.css') && content.includes('</head>')) {
        content = content.replace('</head>', '    <link rel="stylesheet" href="common-watermark.css">\n</head>');
        changed = true;
        console.log(`   ✅ Added watermark to ${file}`);
        fixed++;
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log(`\n✅ FIXED ${fixed} MORE ISSUES!\n`);

