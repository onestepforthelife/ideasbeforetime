// Add error tracking to ALL HTML files automatically
// Run this with: node add-error-tracking-to-all.js

const fs = require('fs');
const path = require('path');

// List of all HTML files that need error tracking
const htmlFiles = [
    'about.html',
    'BASF_IT_SECURITY_PROPOSAL.html',
    'business-insights.html',
    'business-news.html',
    'cv-preview.html',
    'cv.html',
    'disclaimer.html',
    'email-sender-web.html',
    'Final_Acrylic_Market_Report.html',
    'index.html',
    'job-credits-ui.html',
    'job-dashboard.html',
    'job-tools.html',
    'JOB_OUTREACH_AUTOMATION_TOOL.html',
    'JOB_POWER_FEATURES.html',
    'JOB_TRACKER_DAILY.html',
    'library.html',
    'linkedin-complete-book.html',
    'linkedin-network-map.html',
    'linkedin-portfolio-index.html',
    'linkedin-skills-dashboard.html',
    'market-reports.html',
    'nickel-esg-report.html',
    'PAYMENT_VISUAL_GUIDE.html',
    'privacy-policy.html',
    'profile-optimizer.html',
    'refund-policy.html',
    'request-access.html',
    'research-preview.html',
    'social-optimizer-admin.html',
    'social-optimizer-app.html',
    'social-optimizer-dashboard.html',
    'social-optimizer-index.html',
    'social-optimizer-quickstart.html',
    'social-optimizer-success.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'terms-and-disclaimer.html',
    'TEST_CREDITS.html',
    'timeline.html'
];

const errorTrackerScript = '    <!-- Error Tracking System -->\n    <script src="error-tracker.js"></script>\n    <script src="auto-heal-system.js"></script>\n';

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

console.log('🚀 Adding error tracking to ALL HTML files...\n');

htmlFiles.forEach(file => {
    try {
        const filePath = path.join(__dirname, file);
        
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  SKIP: ${file} (file not found)`);
            skipCount++;
            return;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if already has error tracking
        if (content.includes('error-tracker.js')) {
            console.log(`✅ SKIP: ${file} (already has error tracking)`);
            skipCount++;
            return;
        }
        
        // Add error tracking before </body>
        content = content.replace('</body>', errorTrackerScript + '</body>');
        
        // Write back
        fs.writeFileSync(filePath, content, 'utf8');
        
        console.log(`✅ ADDED: ${file}`);
        successCount++;
        
    } catch (error) {
        console.log(`❌ ERROR: ${file} - ${error.message}`);
        errorCount++;
    }
});

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY:');
console.log(`✅ Added to: ${successCount} files`);
console.log(`⚠️  Skipped: ${skipCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log('='.repeat(60));

if (successCount > 0) {
    console.log('\n🎉 SUCCESS! Error tracking added to all files!');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Upload error-tracker.js to Cloudflare Pages');
    console.log('2. Upload auto-heal-system.js to Cloudflare Pages');
    console.log('3. Upload error-dashboard.html to Cloudflare Pages');
    console.log('4. Upload all modified HTML files');
    console.log('\n✅ Then error tracking will be LIVE!');
}
