const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   📊 COMPARING BACKUP vs CURRENT FILES                      ║');
console.log('║      Backup = Benchmark (after all your corrections)        ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const backupDir = 'backup_before_improvements_20251202_193117';
const currentDir = '.';

// Get all HTML files from backup (benchmark)
const backupFiles = fs.readdirSync(backupDir)
    .filter(f => f.endsWith('.html'));

// Get all HTML files from current
const currentFiles = fs.readdirSync(currentDir)
    .filter(f => f.endsWith('.html'));

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📋 FILE COUNT COMPARISON');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`Backup (benchmark):  ${backupFiles.length} HTML files`);
console.log(`Current workspace:   ${currentFiles.length} HTML files`);
console.log(`Difference:          ${currentFiles.length - backupFiles.length} files\n`);

// Check for missing files (files in backup but not in current)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('⚠️  FILES IN BACKUP BUT MISSING IN CURRENT');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const missingFiles = backupFiles.filter(f => !currentFiles.includes(f));

if (missingFiles.length === 0) {
    console.log('✅ No files missing - All backup files exist in current workspace\n');
} else {
    console.log(`❌ ${missingFiles.length} files are missing:\n`);
    missingFiles.forEach(f => {
        console.log(`   ❌ ${f}`);
    });
    console.log('');
}

// Check for new files (files in current but not in backup)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✨ NEW FILES IN CURRENT (not in backup)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const newFiles = currentFiles.filter(f => !backupFiles.includes(f));

if (newFiles.length === 0) {
    console.log('No new files added\n');
} else {
    console.log(`${newFiles.length} new files added:\n`);
    newFiles.forEach(f => {
        console.log(`   ✨ ${f}`);
    });
    console.log('');
}

// Check for content differences in common files
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔍 CONTENT COMPARISON (Common Files)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const commonFiles = backupFiles.filter(f => currentFiles.includes(f));
let identicalCount = 0;
let modifiedCount = 0;
const modifiedFiles = [];

commonFiles.forEach(file => {
    const backupPath = path.join(backupDir, file);
    const currentPath = path.join(currentDir, file);
    
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    const currentContent = fs.readFileSync(currentPath, 'utf8');
    
    if (backupContent === currentContent) {
        identicalCount++;
    } else {
        modifiedCount++;
        modifiedFiles.push({
            name: file,
            backupSize: backupContent.length,
            currentSize: currentContent.length,
            sizeDiff: currentContent.length - backupContent.length
        });
    }
});

console.log(`Identical files:  ${identicalCount} files (no changes)`);
console.log(`Modified files:   ${modifiedCount} files (content changed)\n`);

if (modifiedFiles.length > 0) {
    console.log('Modified files details:\n');
    modifiedFiles.forEach(f => {
        const diffSign = f.sizeDiff > 0 ? '+' : '';
        console.log(`   📝 ${f.name}`);
        console.log(`      Backup:  ${f.backupSize.toLocaleString()} bytes`);
        console.log(`      Current: ${f.currentSize.toLocaleString()} bytes`);
        console.log(`      Diff:    ${diffSign}${f.sizeDiff.toLocaleString()} bytes\n`);
    });
}

// Check critical files
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎯 CRITICAL FILES CHECK');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const criticalFiles = [
    'index.html',
    'market-reports.html',
    'cv.html',
    'social-optimizer-app.html',
    'Final_Acrylic_Market_Report.html',
    'Poloxamer_Market_Report.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'nickel-esg-report.html'
];

criticalFiles.forEach(file => {
    const inBackup = backupFiles.includes(file);
    const inCurrent = currentFiles.includes(file);
    
    if (inBackup && inCurrent) {
        console.log(`   ✅ ${file} - Present in both`);
    } else if (inBackup && !inCurrent) {
        console.log(`   ❌ ${file} - MISSING in current!`);
    } else if (!inBackup && inCurrent) {
        console.log(`   ✨ ${file} - New file (not in backup)`);
    }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`Total files in backup:    ${backupFiles.length}`);
console.log(`Total files in current:   ${currentFiles.length}`);
console.log(`Missing from current:     ${missingFiles.length}`);
console.log(`New in current:           ${newFiles.length}`);
console.log(`Identical content:        ${identicalCount}`);
console.log(`Modified content:         ${modifiedCount}\n`);

if (missingFiles.length > 0) {
    console.log('⚠️  WARNING: Some files from backup are missing!');
    console.log('   Review the missing files list above.');
    console.log('   These files had your corrections and inputs.\n');
} else {
    console.log('✅ All backup files exist in current workspace\n');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('Comparison complete!');
console.log('Review the results above carefully.\n');
