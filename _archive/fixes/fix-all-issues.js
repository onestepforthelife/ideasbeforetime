// AUTOMATED FIX SCRIPT - Fix all 62 issues
// Run: node fix-all-issues.js

const fs = require('fs');

console.log('🔧 FIXING ALL SITE ISSUES...\n');

// Files that need footer added (26 files)
const needFooter = [
    'BASF_IT_SECURITY_PROPOSAL.html',
    'cv.html',
    'email-sender-web.html',
    'Final_Acrylic_Market_Report.html',
    'job-credits-ui.html',
    'job-dashboard.html',
    'job-tools.html',
    'JOB_OUTREACH_AUTOMATION_TOOL.html',
    'JOB_POWER_FEATURES.html',
    'JOB_TRACKER_DAILY.html',
    'JOB_TRACKER_TOOL.html',
    'learning-with-kiro.html',
    'PAYMENT_VISUAL_GUIDE.html',
    'profile-optimizer.html',
    'request-access.html',
    'social-optimizer-admin.html',
    'social-optimizer-app.html',
    'social-optimizer-dashboard.html',
    'social-optimizer-index.html',
    'social-optimizer-quickstart.html',
    'social-optimizer-success.html',
    'Specialty_Chemicals_Market_Report_Merged.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'TEST_CREDITS.html',
    'timeline.html'
];

// Files that need analytics added (17 files)
const needAnalytics = [
    'BASF_IT_SECURITY_PROPOSAL.html',
    'business-insights.html',
    'business-news.html',
    'email-sender-web.html',
    'job-dashboard.html',
    'job-tools.html',
    'JOB_TRACKER_TOOL.html',
    'learning-with-kiro.html',
    'nickel-esg-report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Market_Report_Merged.html'
];

// Files that need navigation added (6 files)
const needNavigation = [
    'BASF_IT_SECURITY_PROPOSAL.html',
    'JOB_TRACKER_TOOL.html',
    'learning-with-kiro.html',
    'Specialty_Chemicals_Market_Report_Merged.html'
];

// Files that need watermark added (13 files)
const needWatermark = [
    'BASF_IT_SECURITY_PROPOSAL.html',
    'cv.html',
    'job-dashboard.html',
    'JOB_TRACKER_TOOL.html',
    'learning-with-kiro.html',
    'PAYMENT_VISUAL_GUIDE.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Market_Report_Merged.html',
    'TEST_CREDITS.html'
];

let fixed = 0;

// Function to add script before </body>
function addScriptBeforeBody(filename, scriptTag) {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found, skipping`);
        return false;
    }
    
    let content = fs.readFileSync(filename, 'utf8');
    
    // Check if already has it
    if (content.includes(scriptTag)) {
        return false;
    }
    
    // Add before </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', `${scriptTag}\n</body>`);
        fs.writeFileSync(filename, content, 'utf8');
        return true;
    }
    
    return false;
}

// Function to add CSS in <head>
function addCSSInHead(filename, cssLink) {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found, skipping`);
        return false;
    }
    
    let content = fs.readFileSync(filename, 'utf8');
    
    // Check if already has it
    if (content.includes(cssLink)) {
        return false;
    }
    
    // Add before </head>
    if (content.includes('</head>')) {
        content = content.replace('</head>', `    ${cssLink}\n</head>`);
        fs.writeFileSync(filename, content, 'utf8');
        return true;
    }
    
    return false;
}

// Fix Footer
console.log('📄 Adding footer...');
needFooter.forEach(file => {
    if (addScriptBeforeBody(file, '<script src="common-footer.js"></script>')) {
        console.log(`   ✅ ${file}`);
        fixed++;
    }
});

// Fix Analytics
console.log('\n📊 Adding analytics...');
needAnalytics.forEach(file => {
    if (addScriptBeforeBody(file, '<script src="universal-analytics.js"></script>')) {
        console.log(`   ✅ ${file}`);
        fixed++;
    }
});

// Fix Navigation
console.log('\n🧭 Adding navigation...');
needNavigation.forEach(file => {
    if (addScriptBeforeBody(file, '<script src="common-navigation.js"></script>')) {
        console.log(`   ✅ ${file}`);
        fixed++;
    }
});

// Fix Watermark
console.log('\n💧 Adding watermark...');
needWatermark.forEach(file => {
    if (addCSSInHead(file, '<link rel="stylesheet" href="common-watermark.css">')) {
        console.log(`   ✅ ${file}`);
        fixed++;
    }
});

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`✅ FIXED ${fixed} ISSUES!`);
console.log(`\nNow run: node test-site-consistency.js`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

