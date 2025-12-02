/* Fix Footer CSS - Add common-footer.css to all pages missing it */

const fs = require('fs');
const path = require('path');

const filesMissingFooterCSS = [
    'BASF_IT_SECURITY_PROPOSAL.html',
    'cv.html',
    'email-sender-web.html',
    'error-dashboard.html',
    'Final_Acrylic_Market_Report.html',
    'ghar-ghar-complete.html',
    'job-credits-ui.html',
    'job-dashboard.html',
    'job-tools.html',
    'JOB_OUTREACH_AUTOMATION_TOOL.html',
    'JOB_POWER_FEATURES.html',
    'JOB_TRACKER_DAILY.html',
    'KIRO_AWS_REPORT_CLEAN.html',
    'KIRO_IMPROVEMENT_REPORT_FOR_AWS.html',
    'nickel-esg-report.html',
    'PAYMENT_VISUAL_GUIDE.html',
    'Poloxamer_Market_Report.html',
    'profile-optimizer.html',
    'request-access.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'TEST_CREDITS.html',
    'timeline.html'
];

let fixed = 0;
let errors = 0;

filesMissingFooterCSS.forEach(filename => {
    try {
        const filepath = path.join(__dirname, filename);
        
        if (!fs.existsSync(filepath)) {
            console.log(`⚠️  ${filename} - File not found, skipping`);
            return;
        }
        
        let content = fs.readFileSync(filepath, 'utf8');
        
        // Check if it already has common-footer.css (double-check)
        if (content.includes('common-footer.css')) {
            console.log(`✅ ${filename} - Already has common-footer.css`);
            return;
        }
        
        // Find where to insert (after common-navigation.css or common-watermark.css or in <head>)
        let inserted = false;
        
        // Try after common-navigation.css
        if (content.includes('common-navigation.css')) {
            content = content.replace(
                /<link rel="stylesheet" href="common-navigation\.css">/,
                '<link rel="stylesheet" href="common-navigation.css">\n    <link rel="stylesheet" href="common-footer.css">'
            );
            inserted = true;
        }
        // Try after common-watermark.css
        else if (content.includes('common-watermark.css')) {
            content = content.replace(
                /<link rel="stylesheet" href="common-watermark\.css">/,
                '<link rel="stylesheet" href="common-watermark.css">\n    <link rel="stylesheet" href="common-footer.css">'
            );
            inserted = true;
        }
        // Try before </head>
        else if (content.includes('</head>')) {
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="common-footer.css">\n</head>'
            );
            inserted = true;
        }
        
        if (inserted) {
            fs.writeFileSync(filepath, content, 'utf8');
            console.log(`✅ ${filename} - Added common-footer.css`);
            fixed++;
        } else {
            console.log(`❌ ${filename} - Could not find insertion point`);
            errors++;
        }
        
    } catch (error) {
        console.log(`❌ ${filename} - Error: ${error.message}`);
        errors++;
    }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed: ${fixed} files`);
console.log(`❌ Errors: ${errors} files`);
console.log('='.repeat(60));
