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

// Phase 3: List candidates for review
function phase3ReviewCandidates() {
    console.log('🔍 Phase 3: Review Candidates\n');
    
    const patterns = [
        { name: 'Duplicate DONE/COMPLETE', pattern: /(DONE|COMPLETE|READY|SUCCESS).*\.txt$/ },
        { name: 'Old diagnostic files', pattern: /(PROBLEM|ISSUE|FIX|SOLUTION).*DEC[0-9]\.txt$/ },
        { name: 'One-time test scripts', pattern: /(check|test|verify)-.*-dec[0-9]\.js$/ },
        { name: 'Duplicate guides', pattern: /^(START_HERE|HOW_TO).*\.txt$/ }
    ];
    
    let totalCandidates = 0;
    
    patterns.forEach(({ name, pattern }) => {
        const matches = fs.readdirSync('.').filter(f => {
            try {
                return fs.statSync(f).isFile() && pattern.test(f);
            } catch (e) {
                return false;
            }
        });
        
        if (matches.length > 0) {
            console.log(`\n${name} (${matches.length} files):`);
            matches.slice(0, 10).forEach(f => console.log(`  - ${f}`));
            if (matches.length > 10) console.log(`  ... and ${matches.length - 10} more`);
            totalCandidates += matches.length;
        }
    });
    
    console.log(`\n📊 Phase 3: ${totalCandidates} review candidates found\n`);
    return totalCandidates;
}

// Execute cleanup
console.log('🚀 WORKSPACE CLEANUP STARTING\n');
console.log('='.repeat(60) + '\n');

const phase1Count = phase1SafeCleanup();
const phase2Count = phase2ArchiveStatus();
const phase3Count = phase3ReviewCandidates();

console.log('='.repeat(60));
console.log(`\n✅ CLEANUP COMPLETE`);
console.log(`   Deleted: ${phase1Count} files`);
console.log(`   Archived: ${phase2Count} files`);
console.log(`   Review candidates: ${phase3Count} files`);
console.log(`\n💡 Next: Review candidates and run aggressive cleanup if needed\n`);
