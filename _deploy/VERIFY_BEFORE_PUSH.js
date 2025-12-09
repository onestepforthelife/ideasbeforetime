#!/usr/bin/env node

/**
 * VERIFY BEFORE PUSH - Automated Pre-Push Checklist
 * 
 * Prevents issues like:
 * - Large files blocking deployment
 * - Wrong _redirects syntax
 * - Forgetting to purge cache
 * - Not testing live site
 * 
 * Run this BEFORE every push to GitHub!
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFY BEFORE PUSH - Automated Checklist');
console.log('='.repeat(70));

let issues = [];
let warnings = [];

// CHECK 1: File Sizes
console.log('\n📁 CHECK 1: File Sizes (must be <20MB)');
console.log('-'.repeat(70));

function checkFileSizes(dir, results = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip node_modules, .git, etc.
            if (!file.startsWith('.') && file !== 'node_modules') {
                checkFileSizes(filePath, results);
            }
        } else {
            const sizeMB = stat.size / (1024 * 1024);
            if (sizeMB > 20) {
                results.push({
                    file: filePath,
                    size: sizeMB.toFixed(2) + ' MB'
                });
            }
        }
    }
    
    return results;
}

const largeFiles = checkFileSizes('.');

if (largeFiles.length > 0) {
    console.log('❌ CRITICAL: Large files found (will block deployment):');
    largeFiles.forEach(f => {
        console.log(`   - ${f.file}: ${f.size}`);
        issues.push({
            type: 'CRITICAL',
            check: 'File Size',
            issue: `${f.file} is ${f.size} (limit: 25MB)`,
            fix: 'Delete or move to external storage'
        });
    });
} else {
    console.log('✅ All files under 20MB');
}

// CHECK 2: _redirects File Syntax
console.log('\n📄 CHECK 2: _redirects File Syntax');
console.log('-'.repeat(70));

if (fs.existsSync('_redirects')) {
    const content = fs.readFileSync('_redirects', 'utf8');
    const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    
    let hasIssues = false;
    
    lines.forEach((line, i) => {
        // Check for wrong patterns
        if (line.includes('200') && !line.includes('http')) {
            console.log(`❌ Line ${i + 1}: Wrong syntax - "${line}"`);
            console.log('   _redirects is for REDIRECTS (301/302), not serving files');
            issues.push({
                type: 'HIGH',
                check: '_redirects Syntax',
                issue: `Line ${i + 1}: "${line}" uses 200 status (wrong)`,
                fix: 'Remove line - Cloudflare Pages serves .html automatically'
            });
            hasIssues = true;
        }
        
        // Check format: should be [source] [destination] [code]
        const parts = line.trim().split(/\s+/);
        if (parts.length < 2) {
            console.log(`⚠️  Line ${i + 1}: Incomplete redirect - "${line}"`);
            warnings.push({
                check: '_redirects Syntax',
                issue: `Line ${i + 1}: Incomplete redirect format`,
                fix: 'Format: [source] [destination] [code]'
            });
            hasIssues = true;
        }
    });
    
    if (!hasIssues) {
        console.log('✅ _redirects syntax looks correct');
    }
} else {
    console.log('ℹ️  No _redirects file (not needed for normal pages)');
}

// CHECK 3: Cloudflare Settings Reminder
console.log('\n☁️  CHECK 3: Cloudflare Settings (Manual Check Required)');
console.log('-'.repeat(70));
console.log('⚠️  REMINDER: After pushing, you MUST:');
console.log('');
console.log('1. Check Build Logs (30 seconds):');
console.log('   → Cloudflare Dashboard → Deployments → Latest → Build log');
console.log('   → Look for errors, warnings, file size issues');
console.log('');
console.log('2. Purge Cache (MANDATORY!):');
console.log('   → Cloudflare Dashboard → Caching → Purge Everything');
console.log('   → Wait 5-10 minutes for propagation');
console.log('');
console.log('3. Test Live Site:');
console.log('   → Run: node COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js');
console.log('   → Should show: 0 critical issues');
console.log('');

warnings.push({
    check: 'Post-Push Actions',
    issue: 'Manual steps required after push',
    fix: 'Check build logs → Purge cache → Wait 5-10 min → Test live site'
});

// CHECK 4: Critical Files Exist
console.log('\n📋 CHECK 4: Critical Files');
console.log('-'.repeat(70));

const criticalFiles = [
    'index.html',
    'blog.html',
    'about.html',
    'cv.html',
    'common-navigation.js',
    'common-footer.js'
];

let missingFiles = [];

criticalFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`❌ Missing: ${file}`);
        missingFiles.push(file);
        issues.push({
            type: 'CRITICAL',
            check: 'Critical Files',
            issue: `${file} is missing`,
            fix: 'Restore file before pushing'
        });
    }
});

if (missingFiles.length === 0) {
    console.log('✅ All critical files present');
}

// SUMMARY
console.log('\n' + '='.repeat(70));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(70));

console.log(`\n🚨 CRITICAL Issues: ${issues.filter(i => i.type === 'CRITICAL').length}`);
console.log(`⚠️  HIGH Issues: ${issues.filter(i => i.type === 'HIGH').length}`);
console.log(`📌 WARNINGS: ${warnings.length}`);

if (issues.length > 0) {
    console.log('\n🚨 ISSUES FOUND (FIX BEFORE PUSHING):');
    console.log('-'.repeat(70));
    issues.forEach((issue, i) => {
        console.log(`\n${i + 1}. [${issue.type}] ${issue.check}`);
        console.log(`   Issue: ${issue.issue}`);
        console.log(`   Fix: ${issue.fix}`);
    });
}

if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS (IMPORTANT):');
    console.log('-'.repeat(70));
    warnings.forEach((warning, i) => {
        console.log(`\n${i + 1}. ${warning.check}`);
        console.log(`   ${warning.issue}`);
        console.log(`   Action: ${warning.fix}`);
    });
}

// Save report
const report = {
    timestamp: new Date().toISOString(),
    issues: issues,
    warnings: warnings,
    summary: {
        critical: issues.filter(i => i.type === 'CRITICAL').length,
        high: issues.filter(i => i.type === 'HIGH').length,
        warnings: warnings.length
    }
};

fs.writeFileSync('VERIFY_BEFORE_PUSH_REPORT.json', JSON.stringify(report, null, 2));

// Exit code
if (issues.filter(i => i.type === 'CRITICAL').length > 0) {
    console.log('\n❌ VERIFICATION FAILED: Critical issues found');
    console.log('   DO NOT PUSH until issues are fixed!');
    process.exit(1);
} else if (issues.length > 0) {
    console.log('\n⚠️  VERIFICATION WARNING: Issues found');
    console.log('   Fix issues before pushing');
    process.exit(1);
} else {
    console.log('\n✅ VERIFICATION PASSED');
    console.log('   Safe to push to GitHub');
    console.log('');
    console.log('   REMEMBER AFTER PUSH:');
    console.log('   1. Check build logs');
    console.log('   2. Purge Cloudflare cache');
    console.log('   3. Wait 5-10 minutes');
    console.log('   4. Test live site');
    process.exit(0);
}
