const fs = require('fs');

console.log('🧹 CLEANING UP REDUNDANT FILES...\n');

const filesToDelete = [
    // Redundant steering files (merged into KIRO_MASTER_GUIDE.md)
    '.kiro/steering/AUTO_MODE_ALWAYS_ON.md',
    '.kiro/steering/BRUTAL_HONESTY.md',
    '.kiro/steering/COMPLETE_TESTING_RULESET.md',
    '.kiro/steering/INDUSTRY_STANDARD_RULEBOOKS.md',
    '.kiro/steering/LESSONS_LEARNED_DEC2.md',
    '.kiro/steering/WORLD_CLASS_BEST_PRACTICES.md',
    '.kiro/steering/TESTING_BACKEND_VS_FRONTEND.md',
    '.kiro/steering/MANDATORY_PRE_RESPONSE_CHECKLIST.md',
    '.kiro/steering/amit-working-patterns.md',
    '.kiro/steering/product-policies.md',
    '.kiro/steering/teamwork-rules.md',
    
    // Outdated status files
    'AMIT_MANUAL_WORK_REQUIRED.txt',
    'AMIT_NEXT_STEPS_PRIORITY.txt',
    'BRUTAL_TRUTH_APPS_STATUS.txt',
    'COMPLETE_AUTOMATION_ZERO_WORK.txt',
    'FIXING_ALL_3_APPS_NOW.txt',
    'HONEST_GAPS_REMAINING.txt',
    'HOW_I_IMPROVED_MYSELF.txt',
    'MASTER_LEARNING_SYSTEM.txt',
    'START_ALL_APPS_NOW.txt',
    'WHAT_IM_STILL_MISSING.txt',
    'WHAT_I_CAN_DO_NOW.txt',
    'WHY_APPS_NOT_WORKING.txt',
    'WORK_REMAINING_DEC2_NIGHT.txt',
    'ZERO_HUMAN_DEPENDENCY.txt',
    'UPLOAD_COMPLETE_DEC3.txt',
    'UPLOAD_NOW_DEC3_FINAL.txt',
    
    // One-time fix scripts (already used)
    'fix-all-48-issues.js',
    'fix-duplicate-footers.js',
    'fix-duplicate-navigation.js',
    'fix-footer-css.js',
    'fix-header-footer-consistency.js',
    'fix-remaining-issues.js',
    'fix-width-issues.js',
    'apply-width-fix.js',
    'improve-seo-mobile.js',
    'fix-all-report-passwords.js',
    'add-adsense-to-all.js',
    'add-error-tracking-to-all.js'
];

let deleted = 0;
let notFound = 0;

filesToDelete.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`✅ Deleted: ${file}`);
            deleted++;
        } else {
            console.log(`⏭️  Not found: ${file}`);
            notFound++;
        }
    } catch (error) {
        console.log(`❌ Error deleting ${file}: ${error.message}`);
    }
});

console.log('\n' + '='.repeat(60));
console.log('📊 CLEANUP SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Deleted: ${deleted} files`);
console.log(`⏭️  Not found: ${notFound} files`);
console.log('\n✅ WORKSPACE CLEANED!');
console.log('\n📁 REMAINING ESSENTIAL FILES:');
console.log('  Steering: KIRO_MASTER_GUIDE.md, 3_WEEKS_COMPLETE_LEARNINGS.md');
console.log('  Steering: GOLDEN_RULES.md, TRIGGER_KEYWORDS.md, UPLOAD_BAT_FILE_RULES.md');
console.log('  Status: AMIT_READ_THIS_FIRST.txt, SITE_READY_DEPLOY_NOW.txt');
console.log('  Scripts: test-site-consistency.js, error-tracker.js, auto-heal-system.js');
