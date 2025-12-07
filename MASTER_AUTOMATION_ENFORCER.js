#!/usr/bin/env node

/**
 * MASTER AUTOMATION ENFORCER
 * "Automation on Automation" - Ensures all prevention systems are active
 * 
 * This is the meta-layer that checks:
 * 1. Are hooks enabled?
 * 2. Are verification scripts working?
 * 3. Are steering rules up to date?
 * 4. Are all automation systems active?
 * 
 * Run this weekly to ensure automation stays automated!
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🤖 MASTER AUTOMATION ENFORCER');
console.log('Checking that automation systems are active...');
console.log('='.repeat(70));

let issues = [];
let checks = 0;
let passed = 0;

// CHECK 1: Kiro Hooks Exist and Enabled
console.log('\n🪝 CHECK 1: Kiro Hooks');
console.log('-'.repeat(70));
checks++;

const hooksDir = '.kiro/hooks';
const requiredHooks = [
    'pre-push-verification.json'
];

if (!fs.existsSync(hooksDir)) {
    console.log('❌ .kiro/hooks directory missing!');
    issues.push({
        type: 'CRITICAL',
        system: 'Kiro Hooks',
        issue: 'Hooks directory missing',
        fix: 'Create .kiro/hooks/ directory'
    });
} else {
    let allHooksOk = true;
    
    requiredHooks.forEach(hook => {
        const hookPath = path.join(hooksDir, hook);
        if (!fs.existsSync(hookPath)) {
            console.log(`❌ Missing hook: ${hook}`);
            issues.push({
                type: 'CRITICAL',
                system: 'Kiro Hooks',
                issue: `${hook} missing`,
                fix: 'Recreate hook file'
            });
            allHooksOk = false;
        } else {
            const hookContent = JSON.parse(fs.readFileSync(hookPath, 'utf8'));
            if (!hookContent.enabled) {
                console.log(`⚠️  Hook disabled: ${hook}`);
                issues.push({
                    type: 'HIGH',
                    system: 'Kiro Hooks',
                    issue: `${hook} is disabled`,
                    fix: 'Set "enabled": true in hook file'
                });
                allHooksOk = false;
            } else {
                console.log(`✅ ${hook} - enabled`);
            }
        }
    });
    
    if (allHooksOk) passed++;
}

// CHECK 2: Verification Scripts Exist and Executable
console.log('\n📜 CHECK 2: Verification Scripts');
console.log('-'.repeat(70));
checks++;

const requiredScripts = [
    'VERIFY_BEFORE_PUSH.js',
    'COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js',
    'AUTO_CHECK_BEFORE_RESPONSE.js'
];

let allScriptsOk = true;

requiredScripts.forEach(script => {
    if (!fs.existsSync(script)) {
        console.log(`❌ Missing script: ${script}`);
        issues.push({
            type: 'CRITICAL',
            system: 'Verification Scripts',
            issue: `${script} missing`,
            fix: 'Recreate script file'
        });
        allScriptsOk = false;
    } else {
        // Test if script is executable (has valid syntax)
        try {
            execSync(`node --check ${script}`, { stdio: 'pipe' });
            console.log(`✅ ${script} - valid syntax`);
        } catch (error) {
            console.log(`❌ ${script} - syntax error`);
            issues.push({
                type: 'HIGH',
                system: 'Verification Scripts',
                issue: `${script} has syntax errors`,
                fix: 'Fix script syntax'
            });
            allScriptsOk = false;
        }
    }
});

if (allScriptsOk) passed++;

// CHECK 3: Steering Rules Exist and Updated
console.log('\n📚 CHECK 3: Steering Rules');
console.log('-'.repeat(70));
checks++;

const steeringDir = '.kiro/steering';
const requiredRules = [
    'CLOUDFLARE_DEPLOYMENT_RULES.md',
    '3_WEEKS_COMPLETE_LEARNINGS.md',
    'MASTER_RULES.md'
];

if (!fs.existsSync(steeringDir)) {
    console.log('❌ .kiro/steering directory missing!');
    issues.push({
        type: 'CRITICAL',
        system: 'Steering Rules',
        issue: 'Steering directory missing',
        fix: 'Create .kiro/steering/ directory'
    });
} else {
    let allRulesOk = true;
    
    requiredRules.forEach(rule => {
        const rulePath = path.join(steeringDir, rule);
        if (!fs.existsSync(rulePath)) {
            console.log(`❌ Missing rule: ${rule}`);
            issues.push({
                type: 'HIGH',
                system: 'Steering Rules',
                issue: `${rule} missing`,
                fix: 'Recreate rule file'
            });
            allRulesOk = false;
        } else {
            const stat = fs.statSync(rulePath);
            const daysSinceUpdate = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24);
            
            if (daysSinceUpdate > 30) {
                console.log(`⚠️  ${rule} - not updated in ${Math.floor(daysSinceUpdate)} days`);
                issues.push({
                    type: 'MEDIUM',
                    system: 'Steering Rules',
                    issue: `${rule} outdated (${Math.floor(daysSinceUpdate)} days)`,
                    fix: 'Review and update rule file'
                });
            } else {
                console.log(`✅ ${rule} - updated ${Math.floor(daysSinceUpdate)} days ago`);
            }
        }
    });
    
    if (allRulesOk) passed++;
}

// CHECK 4: Critical Files Protected
console.log('\n🛡️  CHECK 4: Critical Files');
console.log('-'.repeat(70));
checks++;

const criticalFiles = [
    '_redirects',
    'index.html',
    'common-navigation.js',
    'common-footer.js'
];

let allFilesOk = true;

criticalFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`❌ Missing: ${file}`);
        issues.push({
            type: 'CRITICAL',
            system: 'Critical Files',
            issue: `${file} missing`,
            fix: 'Restore file immediately'
        });
        allFilesOk = false;
    } else {
        console.log(`✅ ${file} - exists`);
    }
});

if (allFilesOk) passed++;

// CHECK 5: Automation Documentation
console.log('\n📖 CHECK 5: Automation Documentation');
console.log('-'.repeat(70));
checks++;

const docFiles = [
    'FIX_308_NOW_SIMPLE_STEPS.txt',
    'CHECK_THESE_CLOUDFLARE_SETTINGS.txt'
];

let allDocsOk = true;

docFiles.forEach(doc => {
    if (!fs.existsSync(doc)) {
        console.log(`⚠️  Missing doc: ${doc}`);
        issues.push({
            type: 'MEDIUM',
            system: 'Documentation',
            issue: `${doc} missing`,
            fix: 'Recreate documentation file'
        });
        allDocsOk = false;
    } else {
        console.log(`✅ ${doc} - exists`);
    }
});

if (allDocsOk) passed++;

// SUMMARY
console.log('\n' + '='.repeat(70));
console.log('📊 AUTOMATION HEALTH SUMMARY');
console.log('='.repeat(70));

const score = Math.round((passed / checks) * 100);

console.log(`\n✅ Checks Passed: ${passed}/${checks} (${score}%)`);
console.log(`🚨 Issues Found: ${issues.length}`);

if (issues.length > 0) {
    console.log('\n🚨 ISSUES TO FIX:');
    console.log('-'.repeat(70));
    
    const critical = issues.filter(i => i.type === 'CRITICAL');
    const high = issues.filter(i => i.type === 'HIGH');
    const medium = issues.filter(i => i.type === 'MEDIUM');
    
    if (critical.length > 0) {
        console.log('\n🔴 CRITICAL (Fix Immediately):');
        critical.forEach((issue, i) => {
            console.log(`\n${i + 1}. ${issue.system}`);
            console.log(`   Issue: ${issue.issue}`);
            console.log(`   Fix: ${issue.fix}`);
        });
    }
    
    if (high.length > 0) {
        console.log('\n🟠 HIGH (Fix Soon):');
        high.forEach((issue, i) => {
            console.log(`\n${i + 1}. ${issue.system}`);
            console.log(`   Issue: ${issue.issue}`);
            console.log(`   Fix: ${issue.fix}`);
        });
    }
    
    if (medium.length > 0) {
        console.log('\n🟡 MEDIUM (Fix When Possible):');
        medium.forEach((issue, i) => {
            console.log(`\n${i + 1}. ${issue.system}`);
            console.log(`   Issue: ${issue.issue}`);
            console.log(`   Fix: ${issue.fix}`);
        });
    }
}

// Save report
const report = {
    timestamp: new Date().toISOString(),
    score: score,
    checks: {
        total: checks,
        passed: passed,
        failed: checks - passed
    },
    issues: issues,
    systems: {
        hooks: issues.filter(i => i.system === 'Kiro Hooks').length === 0,
        scripts: issues.filter(i => i.system === 'Verification Scripts').length === 0,
        rules: issues.filter(i => i.system === 'Steering Rules').length === 0,
        files: issues.filter(i => i.system === 'Critical Files').length === 0,
        docs: issues.filter(i => i.system === 'Documentation').length === 0
    }
};

fs.writeFileSync('AUTOMATION_HEALTH_REPORT.json', JSON.stringify(report, null, 2));

console.log('\n📄 Report saved: AUTOMATION_HEALTH_REPORT.json');

// Recommendations
console.log('\n💡 RECOMMENDATIONS:');
console.log('-'.repeat(70));

if (score === 100) {
    console.log('✅ All automation systems are healthy!');
    console.log('   Run this check weekly to maintain health.');
} else if (score >= 80) {
    console.log('⚠️  Automation mostly healthy, but needs attention.');
    console.log('   Fix issues to reach 100% health.');
} else if (score >= 60) {
    console.log('🟠 Automation degraded - fix issues soon!');
    console.log('   Some prevention systems may not be working.');
} else {
    console.log('🔴 CRITICAL: Automation systems failing!');
    console.log('   Fix immediately to prevent deployment issues.');
}

console.log('\n🔄 NEXT STEPS:');
console.log('1. Fix all CRITICAL issues immediately');
console.log('2. Fix HIGH issues within 24 hours');
console.log('3. Fix MEDIUM issues within 1 week');
console.log('4. Run this check weekly: node MASTER_AUTOMATION_ENFORCER.js');
console.log('5. Keep automation health at 100%');

// Exit code
const critical = issues.filter(i => i.type === 'CRITICAL');

if (critical.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND - Automation at risk!');
    process.exit(1);
} else if (score < 80) {
    console.log('\n⚠️  AUTOMATION HEALTH BELOW 80% - Needs attention!');
    process.exit(1);
} else {
    console.log('\n✅ AUTOMATION SYSTEMS HEALTHY');
    process.exit(0);
}
