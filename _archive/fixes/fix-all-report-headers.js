const fs = require('fs');
const path = require('path');

// Report files to fix
const reportFiles = [
    'Final_Acrylic_Market_Report.html',
    'nickel-esg-report.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Report_UPDATED.html'
];

let totalFixed = 0;
let results = [];

reportFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        results.push(`❌ ${file} - File not found`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changes = 0;
    
    // Fix 1: Center all headers (h1, h2, h3, h4)
    const headerPatterns = [
        {
            old: /h1 \{ ([^}]*?)(?:text-align: left;)?([^}]*?)\}/g,
            new: 'h1 { $1text-align: center;$2}'
        },
        {
            old: /h2 \{ ([^}]*?)(?:text-align: left;)?([^}]*?)\}/g,
            new: 'h2 { $1text-align: center;$2}'
        },
        {
            old: /h3 \{ ([^}]*?)(?:text-align: left;)?([^}]*?)\}/g,
            new: 'h3 { $1text-align: center;$2}'
        },
        {
            old: /h4 \{ ([^}]*?)(?:text-align: left;)?([^}]*?)\}/g,
            new: 'h4 { $1text-align: center;$2}'
        }
    ];
    
    headerPatterns.forEach(pattern => {
        if (pattern.old.test(content)) {
            content = content.replace(pattern.old, pattern.new);
            changes++;
        }
    });
    
    // Fix 2: Change mailto to request-access.html
    const mailtoPattern = /href="mailto:onestepforthelife@gmail\.com\?subject=Request Access to Market Report[^"]*"/g;
    if (mailtoPattern.test(content)) {
        content = content.replace(
            mailtoPattern,
            'href="https://ideasbeforetime.pages.dev/request-access.html"'
        );
        changes++;
    }
    
    // Fix 3: Update button text to mention email required
    const buttonTextPattern = /(📧 Request Access)(?!\s*\(Email Required\))/g;
    if (buttonTextPattern.test(content)) {
        content = content.replace(buttonTextPattern, '$1 (Email Required)');
        changes++;
    }
    
    if (changes > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalFixed++;
        results.push(`✅ ${file} - Fixed ${changes} issues`);
    } else {
        results.push(`⚪ ${file} - No changes needed`);
    }
});

console.log('\n📊 REPORT HEADER & ACCESS FIX RESULTS\n');
console.log('=' .repeat(60));
results.forEach(r => console.log(r));
console.log('=' .repeat(60));
console.log(`\n✅ Total files fixed: ${totalFixed}/${reportFiles.length}`);
console.log('\n🎯 FIXES APPLIED:');
console.log('1. ✅ Headers (h1, h2, h3, h4) centered');
console.log('2. ✅ Request Access links to request-access.html (collects emails)');
console.log('3. ✅ Button text updated to show "Email Required"');
console.log('\n📝 NOTE: The 30% blur is already working correctly.');
console.log('   Investment section is below 30% and should be blurred.');
