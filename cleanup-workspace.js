const fs = require('fs');
const path = require('path');

// Phase 1: Safe immediate cleanup
function phase1SafeCleanup() {
    console.log('🧹 Phase 1: Safe Immediate Cleanup\n');
    
    let cleaned = 0;
    
    // Delete empty files
    const files = fs.readdirSync('.').filter(f => {
        try {
            return fs.statSync(f).isFile() && fs.statSync(f).size === 0;
        } catch (e) {
            return false;
        }
    });
    
    files.forEach(file => {
        try {
            fs.unlinkSync(file);
            console.log(`✅ Deleted empty: ${file}`);
            cleaned++;
        } catch (e) {
            console.log(`❌ Failed to delete: ${file}`);
        }
    });
    
    console.log(`\n📊 Phase 1 Complete: ${cleaned} files cleaned\n`);
    return cleaned;
}

// Phase 2: Archive old status files
function phase2ArchiveStatus() {
    console.log('📦 Phase 2: Archive Old Status Files\n');
    
    const archiveDir = '_archive/status_files';
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
    }
    
    let archived = 0;
    const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);
    
    const statusFiles = fs.readdirSync('.').filter(f => {
        try {
            return f.includes('STATUS') && f.endsWith('.txt') &&
                   fs.statSync(f).mtimeMs < threeDaysAgo;
        } catch (e) {
            return false;
        }
    });
    
    statusFiles.forEach(file => {
        try {
            fs.renameSync(file, path.join(archiveDir, file));
            console.log(`📦 Archived: ${file}`);
            archived++;
        } catch (e) {
            console.log(`❌ Failed to archive: ${file}`);
        }
    });
    
    console.log(`\n📊 Phase 2 Complete: ${archived} files archived\n`);
    return archived;
}

// Phase 3: Archive old files (EXECUTE, don't just list)
function phase3ArchiveOldFiles() {
    console.log('📦 Phase 3: Archive Old Files\n');
    
    const archiveDir = '_archive/old_files';
    if (!fs.existsSync(archiveDir)) {
        fs.mkdirSync(archiveDir, { recursive: true });
    }
    
    let archived = 0;
    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    
    const patterns = [
        /(DONE|COMPLETE|READY|SUCCESS).*DEC[0-9]\.txt$/,
        /(PROBLEM|ISSUE|FIX|SOLUTION).*DEC[0-9]\.txt$/,
        /(check|test|verify)-.*-dec[0-9]\.js$/
    ];
    
    fs.readdirSync('.').forEach(f => {
        try {
            const stats = fs.statSync(f);
            if (!stats.isFile()) return;
            
            const isOld = stats.mtimeMs < sevenDaysAgo;
            const matchesPattern = patterns.some(p => p.test(f));
            
            if (isOld && matchesPattern) {
                fs.renameSync(f, path.join(archiveDir, f));
                console.log(`📦 Archived: ${f}`);
                archived++;
            }
        } catch (e) {
            // Skip files we can't access
        }
    });
    
    console.log(`\n📊 Phase 3 Complete: ${archived} files archived\n`);
    return archived;
}

// Execute cleanup
console.log('🚀 WORKSPACE CLEANUP STARTING\n');
console.log('='.repeat(60) + '\n');

const phase1Count = phase1SafeCleanup();
const phase2Count = phase2ArchiveStatus();
const phase3Count = phase3ArchiveOldFiles();

console.log('='.repeat(60));
console.log(`\n✅ CLEANUP COMPLETE`);
console.log(`   Deleted: ${phase1Count} files`);
console.log(`   Archived: ${phase2Count + phase3Count} files`);
console.log(`\n💡 Workspace cleaned automatically\n`);
