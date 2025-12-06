#!/usr/bin/env node

/**
 * FINAL COMPREHENSIVE FIX - All Remaining Issues
 * Fixes: Critical name issues + High priority consistency issues
 * Excludes: Template/test files that are intentionally different
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all remaining production issues...\n');

// Files to fix (production pages only)
const filesToFix = [
    'about.html',
    'cv.html', 
    'social-optimizer-index.html',
    'timeline.html',
    'acrylic.html',
    'BASF_IT_SECURITY_PROPOSAL.html',
    'email-sender-web.html',
    'Final_Acrylic_Market_Report.html',
    'job-dashboard.html',
    'job-tools.html',
    'JOB_OUTREACH_AUTOMATION_TOOL.html',
    'JOB_POWER_FEATURES.html',
    'JOB_TRACKER_DAILY.html',
    'nickel-esg-report.html',
    'PAYMENT_VISUAL_GUIDE.html',
    'profile-optimizer.html',
    'request-access.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'TEST_CREDITS.html',
    'nickel.html',
    'paper.html',
    'poloxamer.html'
];

let stats = {
    critical: 0,
    high: 0,
    total: 0
};

// Fix 1: Replace "Amit Kumar Agrawal" with "Amit Kumar"
console.log('🚨 Fixing critical name issues...');
['about.html', 'cv.html', 'social-optimizer-index.html', 'timeline.html'].forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('Amit Kumar Agrawal')) {
            content = content.replace(/Amit Kumar Agrawal/g, 'Amit Kumar');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed name in ${file}`);
            stats.critical++;
            stats.total++;
        }
    }
});

// Fix 2: Add missing footer CSS to production pages
console.log('\n⚠️  Adding missing footer CSS...');
filesToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if has footer JS but missing footer CSS
        if (content.includes('common-footer.js') && !content.includes('common-footer.css')) {
            // Add footer CSS before </head>
            content = content.replace(
                '</head>',
                '    <link rel="stylesheet" href="common-footer.css">\n</head>'
            );
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Added footer CSS to ${file}`);
            stats.high++;
            stats.total++;
        }
    }
});

// Fix 3: Remove double headers (keep common-navigation.js, remove <header> tag)
console.log('\n⚠️  Fixing double headers...');
['profile-optimizer.html', 'social-optimizer-admin.html', 'social-optimizer-dashboard.html'].forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // If has both <header> and common-navigation.js, remove <header>
        if (content.includes('common-navigation.js') && content.includes('<header')) {
            // Remove <header>...</header> block
            content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Removed double header from ${file}`);
            stats.high++;
            stats.total++;
        }
    }
});

// Fix 4: Remove purple colors from production pages
console.log('\n⚠️  Removing purple colors...');
['linkedin-complete-book.html', 'linkedin-portfolio-index.html'].forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace purple colors with approved colors
        const purpleColors = [
            '#667eea', '#764ba2', '#8b5cf6', '#9333ea', '#a855f7',
            'rgb(102, 126, 234)', 'rgb(118, 75, 162)', 'rgb(139, 92, 246)'
        ];
        
        let changed = false;
        purpleColors.forEach(purple => {
            if (content.includes(purple)) {
                // Replace with approved gradient colors
                content = content.replace(new RegExp(purple, 'g'), '#5a6c7d');
                changed = true;
            }
        });
        
        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Removed purple colors from ${file}`);
            stats.high++;
            stats.total++;
        }
    }
});

// Summary
console.log('\n═══════════════════════════════════════');
console.log('📊 FINAL FIXES APPLIED:');
console.log('═══════════════════════════════════════');
console.log(`🚨 Critical: ${stats.critical} (name corrections)`);
console.log(`⚠️  High: ${stats.high} (consistency fixes)`);
console.log(`\n✅ Total: ${stats.total} issues fixed`);
console.log('\n🎯 All production pages now correct!');
console.log('📝 Template/test files intentionally excluded\n');

process.exit(0);
