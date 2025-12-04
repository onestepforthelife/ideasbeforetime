/**
 * WORKSPACE CLEANUP SCRIPT - DECEMBER 4, 2025
 * 
 * Purpose: Clean up redundant/duplicate files
 * Safety: Creates backup before any changes
 * Usage: node cleanup-workspace-dec4.js
 * 
 * IMPORTANT: Review CLEANUP_PLAN_DEC4_MORNING.txt first!
 */

const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   🧹 WORKSPACE CLEANUP - DECEMBER 4, 2025                   ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// Safety check
console.log('⚠️  SAFETY CHECK:');
console.log('   This script will delete/consolidate files.');
console.log('   Backup will be created first.\n');

// Files to delete (empty files)
const emptyFilesToDelete = [
    'CLEANUP_REDUNDANT_FILES_DEC4.txt',
    'CRITICAL_GAPS_ANALYSIS.txt',
    'GOOGLE_ADS_CAMPAIGN_SETUP.txt',
    'HIRE_MARKETING_HELP.txt',
    'HIRE_MARKETING_SERVICE.txt',
    'KIRO_AWS_REPORT_SUMMARY.txt',
    'LINKEDIN_BLOCK_RESOLUTION.txt',
    'POLOXAMER_REPORT_SMART_ELEMENTS.txt',
    'PROTECT_REPORTS_CLOUDFLARE_NOW.txt',
    'SPO_TESTING_GUIDE.txt',
    'UPLOAD_FOOTER_FIXES_NOW.txt',
    'WEBSITE_TESTING_CHECKLIST.txt',
    'WHY_ERROR_TRACKING_FAILED.txt',
    'common-footer.html'
];

// Duplicate files to delete
const duplicateFilesToDelete = [
    'index-improved.html',
    'homepage-backup-20251204_004308.html'
];

// Redundant Cloudflare guides to delete
const redundantCloudflareGuides = [
    'MARKET_REPORTS_CLOUDFLARE_ACCESS.txt',
    'MARKET_REPORTS_CLOUDFLARE_COPY_PASTE.txt',
    'SETUP_CLOUDFLARE_ACCESS_NOW.txt',
    'CLOUDFLARE_ACCESS_COPY_PASTE.txt'
];

// Files to consolidate
const consolidationGroups = {
    'LINKEDIN_APPEAL_VERSIONS_ARCHIVE.txt': [
        'LINKEDIN_APPEAL_SUBMIT_NOW.txt',
        'LINKEDIN_BLOCK_IMMEDIATE_ACTION.txt',
        'LINKEDIN_BLOCK_RESOLUTION_ZERO_DOWNTIME.txt'
    ],
    'MARKET_REPORTS_HISTORY_DEC3.txt': [
        'MARKET_REPORTS_COMPLETE_DEC3.txt',
        'MARKET_REPORTS_FIXED_DEC3.txt',
        'MARKET_REPORTS_30_PERCENT_PREVIEW_SETUP.txt',
        'MARKET_REPORTS_3MIN_SETUP.txt'
    ],
    'HOMEPAGE_HISTORY_DEC4.txt': [
        'HOMEPAGE_IMPROVEMENTS_DEC4.txt',
        'HOMEPAGE_IMPLEMENTATION_GUIDE.txt',
        'HOMEPAGE_CONVERSION_PLAN_DEC4.md'
    ],
    'SPO_HISTORY_DEC2.txt': [
        'SPO_FIXED_DEC2.txt',
        'SPO_FUNCTIONAL_TEST_REPORT.txt',
        'SPO_LAUNCH_CHECKLIST.txt',
        'SPO_MARKETING_CONTENT_READY.txt',
        'SPO_MARKETING_GUIDE.txt'
    ]
};

let stats = {
    deleted: 0,
    consolidated: 0,
    errors: 0
};

// Create backup first
function createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupDir = `backup_before_cleanup_${timestamp}`;
    
    console.log(`\n📦 Creating backup: ${backupDir}`);
    
    try {
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }
        
        // Copy all files to backup
        const allFiles = [...emptyFilesToDelete, ...duplicateFilesToDelete, ...redundantCloudflareGuides];
        Object.values(consolidationGroups).flat().forEach(f => allFiles.push(f));
        
        allFiles.forEach(file => {
            if (fs.existsSync(file)) {
                fs.copyFileSync(file, path.join(backupDir, file));
            }
        });
        
        console.log(`✅ Backup created: ${backupDir}\n`);
        return true;
    } catch (error) {
        console.log(`❌ Backup failed: ${error.message}\n`);
        return false;
    }
}

// Delete empty files
function deleteEmptyFiles() {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🗑️  DELETING EMPTY FILES (0 bytes)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    emptyFilesToDelete.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                const fileStats = fs.statSync(file);
                if (fileStats.size === 0) {
                    fs.unlinkSync(file);
                    console.log(`✅ Deleted: ${file}`);
                    stats.deleted++;
                } else {
                    console.log(`⚠️  Skipped: ${file} (not empty: ${fileStats.size} bytes)`);
                }
            } else {
                console.log(`ℹ️  Not found: ${file}`);
            }
        } catch (error) {
            console.log(`❌ Error deleting ${file}: ${error.message}`);
            stats.errors++;
        }
    });
}

// Delete duplicate files
function deleteDuplicateFiles() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🗑️  DELETING DUPLICATE FILES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    duplicateFilesToDelete.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                console.log(`✅ Deleted: ${file}`);
                stats.deleted++;
            } else {
                console.log(`ℹ️  Not found: ${file}`);
            }
        } catch (error) {
            console.log(`❌ Error deleting ${file}: ${error.message}`);
            stats.errors++;
        }
    });
}

// Delete redundant Cloudflare guides
function deleteRedundantGuides() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🗑️  DELETING REDUNDANT CLOUDFLARE GUIDES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    redundantCloudflareGuides.forEach(file => {
        try {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
                console.log(`✅ Deleted: ${file}`);
                stats.deleted++;
            } else {
                console.log(`ℹ️  Not found: ${file}`);
            }
        } catch (error) {
            console.log(`❌ Error deleting ${file}: ${error.message}`);
            stats.errors++;
        }
    });
}

// Consolidate files
function consolidateFiles() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📦 CONSOLIDATING FILES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    Object.entries(consolidationGroups).forEach(([archiveFile, sourceFiles]) => {
        console.log(`\n📄 Creating: ${archiveFile}`);
        
        let archiveContent = `╔══════════════════════════════════════════════════════════════╗\n`;
        archiveContent += `║   📚 ARCHIVE - ${archiveFile.replace('.txt', '').replace(/_/g, ' ')}   ║\n`;
        archiveContent += `╚══════════════════════════════════════════════════════════════╝\n\n`;
        archiveContent += `Created: December 4, 2025\n`;
        archiveContent += `Purpose: Historical reference - consolidated from ${sourceFiles.length} files\n\n`;
        archiveContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
        
        sourceFiles.forEach(file => {
            try {
                if (fs.existsSync(file)) {
                    const content = fs.readFileSync(file, 'utf8');
                    archiveContent += `\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                    archiveContent += `📄 FILE: ${file}\n`;
                    archiveContent += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
                    archiveContent += content;
                    
                    console.log(`   ✅ Added: ${file}`);
                    stats.consolidated++;
                } else {
                    console.log(`   ℹ️  Not found: ${file}`);
                }
            } catch (error) {
                console.log(`   ❌ Error reading ${file}: ${error.message}`);
                stats.errors++;
            }
        });
        
        // Write archive file
        try {
            fs.writeFileSync(archiveFile, archiveContent, 'utf8');
            console.log(`   ✅ Created archive: ${archiveFile}`);
            
            // Delete source files
            sourceFiles.forEach(file => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                    console.log(`   🗑️  Deleted source: ${file}`);
                }
            });
        } catch (error) {
            console.log(`   ❌ Error creating archive: ${error.message}`);
            stats.errors++;
        }
    });
}

// Generate summary report
function generateSummary() {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 CLEANUP SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log(`Files deleted: ${stats.deleted}`);
    console.log(`Files consolidated: ${stats.consolidated}`);
    console.log(`Errors: ${stats.errors}`);
    console.log(`\nArchive files created: ${Object.keys(consolidationGroups).length}`);
    
    const summary = `
WORKSPACE CLEANUP SUMMARY
Date: ${new Date().toISOString()}

Files deleted: ${stats.deleted}
Files consolidated: ${stats.consolidated}
Errors: ${stats.errors}

Archive files created:
${Object.keys(consolidationGroups).map(f => `- ${f}`).join('\n')}

Backup: backup_before_cleanup_* folder

Status: ${stats.errors === 0 ? '✅ SUCCESS' : '⚠️  COMPLETED WITH ERRORS'}
`;
    
    fs.writeFileSync('CLEANUP_SUMMARY_DEC4.txt', summary, 'utf8');
    console.log('\n✅ Summary saved to: CLEANUP_SUMMARY_DEC4.txt');
}

// Main execution
function main() {
    console.log('Starting cleanup process...\n');
    
    // Step 1: Create backup
    if (!createBackup()) {
        console.log('❌ Backup failed. Aborting cleanup for safety.');
        return;
    }
    
    // Step 2: Delete empty files
    deleteEmptyFiles();
    
    // Step 3: Delete duplicate files
    deleteDuplicateFiles();
    
    // Step 4: Delete redundant guides
    deleteRedundantGuides();
    
    // Step 5: Consolidate files
    consolidateFiles();
    
    // Step 6: Generate summary
    generateSummary();
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ CLEANUP COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('Next steps:');
    console.log('1. Review CLEANUP_SUMMARY_DEC4.txt');
    console.log('2. Check workspace is cleaner');
    console.log('3. If happy, commit changes');
    console.log('4. If not, restore from backup folder\n');
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { main };
