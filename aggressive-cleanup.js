#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

console.log('🔥 AGGRESSIVE CLEANUP - Reducing 740 → <570 files\n');

let deleted = 0;
let archived = 0;

// Archive folder
const archiveDir = '_archive/cleanup_dec7_' + Date.now();
if (!fs.existsSync('_archive')) fs.mkdirSync('_archive');
if (!fs.existsSync(archiveDir)) fs.mkdirSync(archiveDir);

// 1. Delete duplicate DONE/COMPLETE files (keep latest only)
const doneFiles = fs.readdirSync('.').filter(f => 
    f.match(/_(DONE|COMPLETE|STATUS|FINAL|SUCCESS|READY).*\.txt$/i) && 
    fs.statSync(f).isFile()
);

const grouped = {};
doneFiles.forEach(f => {
    const base = f.replace(/_DEC\d+.*\.txt$/i, '').replace(/_(DONE|COMPLETE|STATUS|FINAL|SUCCESS|READY).*\.txt$/i, '');
    if (!grouped[base]) grouped[base] = [];
    grouped[base].push(f);
});

Object.values(grouped).forEach(files => {
    if (files.length > 1) {
        files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
        files.slice(1).forEach(f => {
            fs.renameSync(f, path.join(archiveDir, f));
            archived++;
        });
    }
});

// 2. Archive old diagnostic files
const diagnostics = fs.readdirSync('.').filter(f => 
    f.match(/^(DIAGNOSTIC|CHECK|TEST|VERIFY).*\.(js|json|txt)$/i) &&
    fs.statSync(f).isFile() &&
    Date.now() - fs.statSync(f).mtimeMs > 7 * 24 * 60 * 60 * 1000
);
diagnostics.forEach(f => {
    fs.renameSync(f, path.join(archiveDir, f));
    archived++;
});

// 3. Archive duplicate guide files
const guides = fs.readdirSync('.').filter(f => 
    f.match(/_(GUIDE|INSTRUCTIONS|STEPS|CHECKLIST|PLAN).*\.txt$/i) &&
    fs.statSync(f).isFile()
);
const guideGroups = {};
guides.forEach(f => {
    const base = f.replace(/_(GUIDE|INSTRUCTIONS|STEPS|CHECKLIST|PLAN).*\.txt$/i, '');
    if (!guideGroups[base]) guideGroups[base] = [];
    guideGroups[base].push(f);
});
Object.values(guideGroups).forEach(files => {
    if (files.length > 1) {
        files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
        files.slice(1).forEach(f => {
            fs.renameSync(f, path.join(archiveDir, f));
            archived++;
        });
    }
});

// 4. Archive old backup folders
const backups = fs.readdirSync('.').filter(f => 
    f.match(/^backup_/) &&
    fs.statSync(f).isDirectory() &&
    Date.now() - fs.statSync(f).mtimeMs > 7 * 24 * 60 * 60 * 1000
);
backups.forEach(f => {
    fs.renameSync(f, path.join(archiveDir, f));
    archived++;
});

console.log(`✅ Archived ${archived} files/folders`);
console.log(`📊 Target: <570 files\n`);

const finalCount = fs.readdirSync('.').filter(f => fs.statSync(f).isFile()).length;
console.log(`Current: ${finalCount} files`);
console.log(finalCount < 570 ? '✅ Target achieved!' : `⚠️  Need to remove ${finalCount - 570} more`);
