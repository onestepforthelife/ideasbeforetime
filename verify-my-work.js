#!/usr/bin/env node

/**
 * VERIFY MY WORK - Find mistakes in what I just did
 * Run this AFTER every task to catch my own mistakes
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 VERIFYING MY WORK - Finding MY mistakes\n');

const issues = [];

// Check 1: Did I create files but not push them?
console.log('[1/5] Checking for unpushed changes...');
try {
    const gitPath = 'C:\\Program Files\\Git\\cmd\\git.exe';
    if (fs.existsSync(gitPath)) {
        const status = execSync(`"${gitPath}" status --short`, { encoding: 'utf8' });
        if (status.trim()) {
            issues.push({
                severity: 'CRITICAL',
                issue: 'Created files but NOT pushed to GitHub',
                files: status.trim().split('\n'),
                fix: 'Open GitHub Desktop and push changes'
            });
        }
    }
} catch (e) {
    console.log('   ⚠️  Cannot check git status');
}

// Check 2: Did I say "fixed" but tests still fail?
console.log('[2/5] Checking if tests actually pass...');
try {
    execSync('node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js', { stdio: 'pipe' });
    console.log('   ✅ Live site tests pass');
} catch (e) {
    issues.push({
        severity: 'CRITICAL',
        issue: 'Said "fixed" but live site tests FAIL',
        fix: 'Actually fix the issues before saying fixed'
    });
}

// Check 3: Did I create documentation instead of executing?
console.log('[3/5] Checking for unnecessary documentation...');
const recentDocs = [];
const files = fs.readdirSync('.');
const now = Date.now();
files.forEach(f => {
    if (f.endsWith('.md') || f.endsWith('.txt')) {
        const stat = fs.statSync(f);
        const age = (now - stat.mtimeMs) / 1000 / 60; // minutes
        if (age < 10 && f.includes('PLAN') || f.includes('STRATEGY') || f.includes('GUIDE')) {
            recentDocs.push(f);
        }
    }
});
if (recentDocs.length > 0) {
    issues.push({
        severity: 'HIGH',
        issue: 'Created documentation instead of executing',
        files: recentDocs,
        fix: 'Delete these and execute the task instead'
    });
}

// Check 4: Did I create tools but not use them?
console.log('[4/5] Checking if I used the tools I created...');
const thoughtBackups = fs.readdirSync('.').filter(f => f.startsWith('thought-backup-'));
if (thoughtBackups.length === 0) {
    issues.push({
        severity: 'HIGH',
        issue: 'Created thought router but never used it',
        fix: 'Run: node route-and-check.js "my thought"'
    });
}

// Check 5: Did I verify the complete workflow?
console.log('[5/5] Checking workflow completion...');
const checklistItems = [
    { name: 'Created fix', check: () => fs.existsSync('_redirects') },
    { name: 'Pushed to GitHub', check: () => false }, // Always false for now
    { name: 'Verified deployment', check: () => false },
    { name: 'Purged cache', check: () => false },
    { name: 'Tested live site', check: () => false }
];

const incomplete = checklistItems.filter(item => !item.check());
if (incomplete.length > 0) {
    issues.push({
        severity: 'CRITICAL',
        issue: 'Incomplete workflow - stopped halfway',
        missing: incomplete.map(i => i.name),
        fix: 'Complete all steps before saying done'
    });
}

// Report
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION REPORT\n');

if (issues.length === 0) {
    console.log('✅ No issues found - work is complete!\n');
} else {
    console.log(`❌ Found ${issues.length} issues in MY work:\n`);
    
    issues.forEach((issue, i) => {
        console.log(`${i + 1}. [${issue.severity}] ${issue.issue}`);
        if (issue.files) {
            console.log(`   Files: ${issue.files.join(', ')}`);
        }
        if (issue.missing) {
            console.log(`   Missing: ${issue.missing.join(', ')}`);
        }
        console.log(`   Fix: ${issue.fix}\n`);
    });
}

console.log('='.repeat(60));

process.exit(issues.length > 0 ? 1 : 0);
