const fs = require('fs');

console.log('🔧 Standardizing header/footer on ALL pages...\n');

const filesToFix = {
    navigationCSS: [
        'access.html', 'acrylic.html', 'admin-control-panel.html', 'astronomy.html',
        'email.html', 'error-dashboard.html', 'innovations.html', 'job-credits-ui.html',
        'JOB_OUTREACH_AUTOMATION_TOOL.html', 'JOB_POWER_FEATURES.html', 'JOB_TRACKER_DAILY.html',
        'kiro-error-solver.html', 'kiro-improvement-guide.html', 'linkedin-auto-scroller.html',
        'linkedin-post-copier.html', 'nickel.html', 'paper.html', 'poloxamer.html',
        'profile-optimizer.html', 'reports.html', 'ro-guide.html', 'ro.html',
        'specialty.html', 'TEST_CREDITS.html', 'vertical-nav-option.html'
    ],
    footerCSS: [
        'access.html', 'acrylic.html', 'admin-control-panel.html', 'astronomy.html',
        'email.html', 'innovations.html', 'kiro-error-solver.html', 'kiro-improvement-guide.html',
        'linkedin-auto-scroller.html', 'linkedin-post-copier.html', 'nickel.html',
        'paper.html', 'poloxamer.html', 'reports.html', 'ro-guide.html', 'ro.html',
        'specialty.html', 'TEST_NEW_NAVIGATION.html', 'vertical-nav-option.html'
    ]
};

let fixed = 0;
let errors = 0;

// Fix navigation CSS
console.log('📝 Adding common-navigation.css...');
filesToFix.navigationCSS.forEach(file => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`   ⚠️  ${file} not found, skipping`);
            return;
        }
        
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has it
        if (content.includes('common-navigation.css')) {
            console.log(`   ✓ ${file} already has navigation CSS`);
            return;
        }
        
        // Add after common-navigation.js
        if (content.includes('common-navigation.js')) {
            content = content.replace(
                /<script src="common-navigation\.js"><\/script>/,
                '<script src="common-navigation.js"></script>\n    <link rel="stylesheet" href="common-navigation.css">'
            );
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ ${file} - Added navigation CSS`);
            fixed++;
        } else {
            console.log(`   ⚠️  ${file} - No navigation JS found`);
        }
    } catch (err) {
        console.log(`   ❌ ${file} - Error: ${err.message}`);
        errors++;
    }
});

// Fix footer CSS
console.log('\n📝 Adding common-footer.css...');
filesToFix.footerCSS.forEach(file => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`   ⚠️  ${file} not found, skipping`);
            return;
        }
        
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has it
        if (content.includes('common-footer.css')) {
            console.log(`   ✓ ${file} already has footer CSS`);
            return;
        }
        
        // Add after common-footer.js
        if (content.includes('common-footer.js')) {
            content = content.replace(
                /<script src="common-footer\.js"><\/script>/,
                '<script src="common-footer.js"></script>\n    <link rel="stylesheet" href="common-footer.css">'
            );
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ ${file} - Added footer CSS`);
            fixed++;
        } else {
            console.log(`   ⚠️  ${file} - No footer JS found`);
        }
    } catch (err) {
        console.log(`   ❌ ${file} - Error: ${err.message}`);
        errors++;
    }
});

console.log(`\n✅ COMPLETE:`);
console.log(`   Fixed: ${fixed} files`);
console.log(`   Errors: ${errors} files`);
console.log(`\n📊 All pages now have standard header/footer!`);
