#!/usr/bin/env node
/**
 * MASTER ENFORCEMENT - The ONLY system that matters
 * 
 * This script:
 * 1. Runs tests
 * 2. READS the output (not just runs and ignores)
 * 3. FIXES issues found automatically
 * 4. BLOCKS push if critical issues remain
 * 
 * NO MORE 26 STEERING FILES - THIS IS THE ONLY RULE
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔒 MASTER ENFORCEMENT - Running...\n');

// STEP 1: Run pre-commit check and CAPTURE output
console.log('📋 STEP 1: Running validation checks...\n');
let checkOutput = '';
let checkExitCode = 0;

try {
    checkOutput = execSync('node pre-commit-check.js', { encoding: 'utf8' });
} catch (error) {
    checkOutput = error.stdout || error.message;
    checkExitCode = error.status || 1;
}

console.log(checkOutput);

// STEP 2: PARSE the output and understand what's wrong
console.log('\n📊 STEP 2: Analyzing issues found...\n');

const issues = {
    oldDomain: checkOutput.match(/Found (\d+) files with old domain/),
    centeredHeaders: checkOutput.match(/Found (\d+) files with centered headers/),
    largeFiles: checkOutput.match(/Found (\d+) files over 20MB/),
    redirectIssues: checkOutput.includes('problematic /:path*')
};

let fixesApplied = 0;
let criticalIssuesRemain = false;

// STEP 3: AUTO-FIX issues found
console.log('🔧 STEP 3: Auto-fixing issues...\n');

// Fix 1: Old domain links
if (issues.oldDomain && parseInt(issues.oldDomain[1]) > 0) {
    console.log(`   Fixing ${issues.oldDomain[1]} files with old domain...`);
    try {
        execSync('node fix-old-domain-links.js', { stdio: 'inherit' });
        fixesApplied++;
        console.log('   ✅ Old domain links fixed\n');
    } catch (error) {
        console.log('   ❌ Failed to fix old domain links\n');
        criticalIssuesRemain = true;
    }
}

// Fix 2: Centered headers
if (issues.centeredHeaders && parseInt(issues.centeredHeaders[1]) > 0) {
    console.log(`   Fixing ${issues.centeredHeaders[1]} files with centered headers...`);
    try {
        execSync('node fix-header-alignment.js', { stdio: 'inherit' });
        fixesApplied++;
        console.log('   ✅ Header alignment fixed\n');
    } catch (error) {
        console.log('   ❌ Failed to fix headers\n');
        criticalIssuesRemain = true;
    }
}

// Fix 3: Large files (can't auto-fix, must block)
if (issues.largeFiles && parseInt(issues.largeFiles[1]) > 0) {
    console.log(`   ❌ CRITICAL: ${issues.largeFiles[1]} files over 20MB`);
    console.log('   Manual action required: Delete or move large files\n');
    criticalIssuesRemain = true;
}

// Fix 4: Redirect issues (can't auto-fix, must block)
if (issues.redirectIssues) {
    console.log('   ❌ CRITICAL: _redirects file has problematic pattern');
    console.log('   Manual action required: Fix _redirects file\n');
    criticalIssuesRemain = true;
}

// STEP 4: Re-run validation after fixes
if (fixesApplied > 0) {
    console.log('🔄 STEP 4: Re-validating after fixes...\n');
    try {
        execSync('node pre-commit-check.js', { stdio: 'inherit' });
        console.log('\n✅ All auto-fixes successful!\n');
    } catch (error) {
        console.log('\n⚠️  Some issues remain after auto-fix\n');
        criticalIssuesRemain = true;
    }
}

// STEP 5: Final decision - BLOCK or ALLOW
console.log('═══════════════════════════════════════════════════════════');
if (criticalIssuesRemain || checkExitCode !== 0) {
    console.log('❌ PUSH BLOCKED - Critical issues found');
    console.log('═══════════════════════════════════════════════════════════\n');
    console.log('Fix the issues above before pushing.\n');
    process.exit(1);
} else {
    console.log('✅ SAFE TO PUSH - All checks passed');
    console.log('═══════════════════════════════════════════════════════════\n');
    if (fixesApplied > 0) {
        console.log(`Applied ${fixesApplied} automatic fixes.`);
        console.log('Review the changes in GitHub Desktop before pushing.\n');
    }
    process.exit(0);
}
