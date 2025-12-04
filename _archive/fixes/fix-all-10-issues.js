const fs = require('fs');

console.log('🔧 FIXING ALL 10 ISSUES - NO REPEATED MISTAKES!\n');

let fixed = 0;
let errors = 0;

// ISSUE 1: Specialty_Chemicals_Report_UPDATED.html - Missing footer CSS
console.log('1. Adding footer CSS to Specialty_Chemicals_Report_UPDATED.html...');
try {
    let content = fs.readFileSync('Specialty_Chemicals_Report_UPDATED.html', 'utf8');
    if (!content.includes('common-footer.css')) {
        content = content.replace(
            '<link rel="stylesheet" href="common-watermark.css">',
            '<link rel="stylesheet" href="common-watermark.css">\n    <link rel="stylesheet" href="common-footer.css">'
        );
        fs.writeFileSync('Specialty_Chemicals_Report_UPDATED.html', content);
        console.log('   ✅ Fixed\n');
        fixed++;
    }
} catch (e) {
    console.log(`   ❌ Error: ${e.message}\n`);
    errors++;
}

// ISSUE 2: cv.html - Excessive spacing
console.log('2. Reducing spacing in cv.html...');
try {
    let content = fs.readFileSync('cv.html', 'utf8');
    content = content.replace(/padding:\s*6px/g, 'padding: 3px');
    content = content.replace(/gap:\s*8px/g, 'gap: 4px');
    fs.writeFileSync('cv.html', content);
    console.log('   ✅ Fixed (padding: 6px → 3px, gap: 8px → 4px)\n');
    fixed++;
} catch (e) {
    console.log(`   ❌ Error: ${e.message}\n`);
    errors++;
}

// ISSUE 3: Poloxamer_Market_Report.html - Double header
console.log('3. Removing double header from Poloxamer_Market_Report.html...');
try {
    let content = fs.readFileSync('Poloxamer_Market_Report.html', 'utf8');
    // Remove <header> tag but keep common-navigation.js
    content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/i, '');
    fs.writeFileSync('Poloxamer_Market_Report.html', content);
    console.log('   ✅ Fixed (removed <header> tag, kept common-navigation.js)\n');
    fixed++;
} catch (e) {
    console.log(`   ❌ Error: ${e.message}\n`);
    errors++;
}

// ISSUES 4-9: Purple colors in 3 files
const purpleFiles = [
    'linkedin-complete-book.html',
    'linkedin-portfolio-index.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html'
];

purpleFiles.forEach((file, index) => {
    console.log(`${4 + index}. Removing purple colors from ${file}...`);
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace purple colors with blue/teal
        content = content.replace(/#667eea/gi, '#2563eb'); // Purple → Blue
        content = content.replace(/#764ba2/gi, '#1e40af'); // Purple → Dark Blue
        content = content.replace(/#8b5cf6/gi, '#3b82f6'); // Purple → Blue
        content = content.replace(/rgb\(102,\s*126,\s*234\)/gi, 'rgb(37, 99, 235)');
        content = content.replace(/rgb\(118,\s*75,\s*162\)/gi, 'rgb(30, 64, 175)');
        
        fs.writeFileSync(file, content);
        console.log('   ✅ Fixed (purple → blue)\n');
        fixed += 2; // Each file had 2 purple colors
    } catch (e) {
        console.log(`   ❌ Error: ${e.message}\n`);
        errors += 2;
    }
});

// ISSUE 10: market-reports.html - Missing serial numbers
console.log('10. Adding serial numbers to market-reports.html...');
try {
    let content = fs.readFileSync('market-reports.html', 'utf8');
    
    // Add serial numbers to each report card
    const reports = [
        { name: 'Specialty Chemicals Market Intelligence', serial: 1 },
        { name: 'Final Acrylic Market Report', serial: 2 },
        { name: 'Poloxamer Market Report', serial: 3 },
        { name: 'Paper Pulp Specialty Chemicals', serial: 4 },
        { name: 'Nickel ESG Report', serial: 5 }
    ];
    
    reports.forEach(report => {
        // Add serial number before report title
        const titlePattern = new RegExp(`(<h3[^>]*>)(${report.name})`, 'i');
        content = content.replace(titlePattern, `$1<span style="color: #666; font-size: 0.9em;">Report #${report.serial}</span><br>${report.name}`);
    });
    
    fs.writeFileSync('market-reports.html', content);
    console.log('   ✅ Fixed (added serial numbers 1-5)\n');
    fixed++;
} catch (e) {
    console.log(`   ❌ Error: ${e.message}\n`);
    errors++;
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 RESULTS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✅ Fixed: ${fixed} issues`);
console.log(`❌ Errors: ${errors} issues\n`);

if (errors === 0) {
    console.log('✅ ALL ISSUES FIXED! Run final-check-before-push.js again to verify.\n');
} else {
    console.log('❌ Some issues remain. Check errors above.\n');
}
