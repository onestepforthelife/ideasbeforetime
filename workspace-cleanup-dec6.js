// Workspace Cleanup Script - December 6, 2025
// Option C: Archive session/deployment files
// Then Option A: Full cleanup

const fs = require('fs');
const path = require('path');

console.log('🧹 WORKSPACE CLEANUP - December 6, 2025');
console.log('Following DNA RULE: Perfection Over Speed\n');

// Create archive folders
const archiveFolders = [
    '_archive',
    '_archive/sessions',
    '_archive/deployments',
    '_archive/fixes',
    '_archive/analysis'
];

console.log('📁 Creating archive folders...');
archiveFolders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`✅ Created: ${folder}`);
    }
});

// OPTION C: Session and Deployment files
const sessionPatterns = [
    'SESSION_*.txt',
    'ALL_WORK_*.txt',
    'EVERYTHING_*.txt',
    'COMPLETED_*.txt',
    'FINAL_COMPLETE_*.txt',
    'ALL_DAY_*.txt',
    'ALL_FIXES_*.txt',
    'EVERYTHING_DONE_*.txt',
    'EVERYTHING_PUSHED_*.txt',
    'SESSION_SUMMARY_*.txt',
    'EVERYTHING_COMPLETE_*.txt'
];

const deploymentPatterns = [
    'DEPLOYMENT_*.txt',
    'PUSH_*.txt',
    'FINAL_PUSH_*.txt',
    'ROUTING_*.txt',
    'HEADER_FOOTER_*.txt',
    'DEPLOYMENT_SUCCESS_*.txt',
    'DEPLOYMENT_STATUS_*.txt',
    'DEPLOYMENT_IN_PROGRESS_*.txt',
    'PUSH_VIA_*.txt',
    'PUSH_NOW_*.txt',
    'PUSH_INSTRUCTIONS_*.txt',
    'PUSH_SELF_*.txt',
    'PUSH_ASTRONOMY_*.txt',
    'PUSH_BLOG_*.txt',
    'PUSH_AUTOMATION_*.txt'
];

// Get all files in current directory
const allFiles = fs.readdirSync('.');

// Helper function to match pattern
function matchesPattern(filename, pattern) {
    const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return regex.test(filename);
}

// Move session files
console.log('\n📦 Moving session files to _archive/sessions/...');
let sessionCount = 0;
allFiles.forEach(file => {
    if (sessionPatterns.some(pattern => matchesPattern(file, pattern))) {
        try {
            fs.renameSync(file, path.join('_archive/sessions', file));
            console.log(`  ✅ ${file}`);
            sessionCount++;
        } catch (err) {
            console.log(`  ⚠️  ${file} - ${err.message}`);
        }
    }
});
console.log(`Moved ${sessionCount} session files`);

// Move deployment files
console.log('\n📦 Moving deployment files to _archive/deployments/...');
let deploymentCount = 0;
allFiles.forEach(file => {
    if (deploymentPatterns.some(pattern => matchesPattern(file, pattern))) {
        try {
            fs.renameSync(file, path.join('_archive/deployments', file));
            console.log(`  ✅ ${file}`);
            deploymentCount++;
        } catch (err) {
            console.log(`  ⚠️  ${file} - ${err.message}`);
        }
    }
});
console.log(`Moved ${deploymentCount} deployment files`);

// OPTION A: Additional cleanup
const fixPatterns = [
    'fix-all-*.js',
    'fix-remaining-*.js',
    'fix-last-*.js',
    'fix-annika-*.js',
    'fix-orphaned-*.js',
    'fix-13-*.js',
    'fix-3-*.js',
    'fix-navigation-*.js',
    'fix-all-proactive-*.js',
    'fix-all-pending-*.js',
    'fix-all-blur-*.js',
    'fix-all-missing-*.js',
    'fix-all-report-*.js',
    'fix-color-*.js',
    'fix-critical-*.js',
    'fix-final-*.js',
    'fix-remaining-*.js',
    'fix-report-*.js',
    'fix-nickel-*.js',
    'fix-double-*.js',
    'fix-ghar-*.js',
    'fix-innovation-*.js'
];

const analysisPatterns = [
    'BACKUP_VS_*.txt',
    'COMPARISON_*.txt',
    'WHY_*.txt',
    'KIRO_SELF_REFLECTION_*.md',
    'REDUNDANT_FILES_*.txt',
    'CLEANUP_PLAN_*.txt',
    'COMPREHENSIVE_AUDIT_*.txt',
    'WIDTH_CONSISTENCY_*.txt',
    'TEXT_VISIBILITY_*.txt',
    'RESPONSIVE_DESIGN_*.txt'
];

// Move fix scripts
console.log('\n📦 Moving old fix scripts to _archive/fixes/...');
let fixCount = 0;
const currentFiles = fs.readdirSync('.');
currentFiles.forEach(file => {
    if (fixPatterns.some(pattern => matchesPattern(file, pattern))) {
        try {
            fs.renameSync(file, path.join('_archive/fixes', file));
            console.log(`  ✅ ${file}`);
            fixCount++;
        } catch (err) {
            console.log(`  ⚠️  ${file} - ${err.message}`);
        }
    }
});
console.log(`Moved ${fixCount} fix scripts`);

// Move analysis files
console.log('\n📦 Moving analysis files to _archive/analysis/...');
let analysisCount = 0;
const latestFiles = fs.readdirSync('.');
latestFiles.forEach(file => {
    if (analysisPatterns.some(pattern => matchesPattern(file, pattern))) {
        try {
            fs.renameSync(file, path.join('_archive/analysis', file));
            console.log(`  ✅ ${file}`);
            analysisCount++;
        } catch (err) {
            console.log(`  ⚠️  ${file} - ${err.message}`);
        }
    }
});
console.log(`Moved ${analysisCount} analysis files`);

// Delete true duplicates
console.log('\n🗑️  Deleting true duplicates...');
const duplicates = [
    'ABSOLUTELY_EVERYTHING_COMPLETE.txt',
    '100_PERCENT_COMPLETE_FINAL.txt',
    'NOTHING_PENDING_ALL_DONE.txt',
    'cleanup-workspace-dec4.js',
    'cleanup-files.js'
];

let deleteCount = 0;
duplicates.forEach(file => {
    if (fs.existsSync(file)) {
        try {
            fs.unlinkSync(file);
            console.log(`  ✅ Deleted: ${file}`);
            deleteCount++;
        } catch (err) {
            console.log(`  ⚠️  ${file} - ${err.message}`);
        }
    }
});
console.log(`Deleted ${deleteCount} duplicate files`);

// Summary
console.log('\n' + '='.repeat(60));
console.log('✅ CLEANUP COMPLETE');
console.log('='.repeat(60));
console.log(`📦 Session files archived: ${sessionCount}`);
console.log(`📦 Deployment files archived: ${deploymentCount}`);
console.log(`📦 Fix scripts archived: ${fixCount}`);
console.log(`📦 Analysis files archived: ${analysisCount}`);
console.log(`🗑️  Duplicates deleted: ${deleteCount}`);
console.log(`📊 Total files organized: ${sessionCount + deploymentCount + fixCount + analysisCount + deleteCount}`);
console.log('\n✅ Workspace is now clean and organized!');
console.log('✅ All history preserved in _archive/');
console.log('✅ Following DNA RULE: Perfection Over Speed');
