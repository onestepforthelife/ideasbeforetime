// 🧠 KIRO SELF-ENFORCEMENT CHECKLIST
// Runs BEFORE every response to enforce rules
// Created: December 5, 2025

const fs = require('fs');
const path = require('path');

class KiroEnforcementSystem {
    constructor() {
        this.violations = [];
        this.warnings = [];
        this.checks = 0;
    }

    // ═══════════════════════════════════════════════════════════
    // BLOCK 1: Never Say "Fixed/Done/Ready" Without Testing
    // ═══════════════════════════════════════════════════════════
    checkClaimWithoutTesting(response, testsRun) {
        this.checks++;
        const claimWords = ['fixed', 'done', 'ready', 'complete', 'finished', 'working'];
        const hasClaim = claimWords.some(word => 
            response.toLowerCase().includes(word)
        );

        if (hasClaim && !testsRun) {
            this.violations.push({
                block: 'BLOCK 1',
                rule: 'Never say "fixed/done/ready" without testing',
                found: 'Response contains claim words but no tests run',
                action: 'BLOCKED - Run tests first, show results'
            });
            return false;
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // BLOCK 2: Never Use Unverified Personal Information
    // ═══════════════════════════════════════════════════════════
    checkUnverifiedPersonalInfo(response, verifiedData) {
        this.checks++;
        const personalInfoPatterns = [
            /name[:\s]+([A-Z][a-z]+\s[A-Z][a-z]+)/gi,
            /email[:\s]+([a-z0-9@.]+)/gi,
            /phone[:\s]+([0-9\-\+\(\)]+)/gi,
            /₹\s*\d+/g,  // Pricing
            /\$\s*\d+/g   // Pricing
        ];

        const foundInfo = [];
        personalInfoPatterns.forEach(pattern => {
            const matches = response.match(pattern);
            if (matches) {
                foundInfo.push(...matches);
            }
        });

        if (foundInfo.length > 0 && !verifiedData) {
            this.violations.push({
                block: 'BLOCK 2',
                rule: 'Never use unverified personal information',
                found: `Found: ${foundInfo.join(', ')}`,
                action: 'BLOCKED - Verify with user first'
            });
            return false;
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // BLOCK 3: Never Check One When Should Check All
    // ═══════════════════════════════════════════════════════════
    checkPartialWhenShouldBeComplete(userRequest, filesChecked, totalFiles) {
        this.checks++;
        const allKeywords = ['all', 'every', 'entire', 'complete', 'whole'];
        const needsAll = allKeywords.some(word => 
            userRequest.toLowerCase().includes(word)
        );

        if (needsAll && filesChecked < totalFiles) {
            this.violations.push({
                block: 'BLOCK 3',
                rule: 'Never check one when should check all',
                found: `Checked ${filesChecked}/${totalFiles} files`,
                action: 'BLOCKED - Check ALL files first'
            });
            return false;
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // BLOCK 4: Never Skip Live Site Check
    // ═══════════════════════════════════════════════════════════
    checkLiveSiteVerification(userRequest, liveSiteChecked) {
        this.checks++;
        const liveSiteKeywords = [
            'live site', 'production', 'deploy', 'push', 'upload',
            'ideasbeforetime.pages.dev', 'github', 'publish'
        ];
        
        const needsLiveCheck = liveSiteKeywords.some(word => 
            userRequest.toLowerCase().includes(word)
        );

        if (needsLiveCheck && !liveSiteChecked) {
            this.violations.push({
                block: 'BLOCK 4',
                rule: 'Never skip live site check',
                found: 'Request mentions deployment but no live site check',
                action: 'BLOCKED - Check live site first'
            });
            return false;
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // BLOCK 5: Never Repeat Documented Mistakes
    // ═══════════════════════════════════════════════════════════
    checkRepeatedMistakes(action, learningsFile) {
        this.checks++;
        if (!fs.existsSync(learningsFile)) {
            this.warnings.push('Learnings file not found - cannot check repeated mistakes');
            return true;
        }

        const learnings = fs.readFileSync(learningsFile, 'utf8');
        
        // Check for common repeated patterns
        const repeatedPatterns = [
            { pattern: 'footer', mistake: 'Footer CSS missing' },
            { pattern: 'purple', mistake: 'Purple colors not removed' },
            { pattern: 'double header', mistake: 'Double headers' },
            { pattern: 'name.*agrawal', mistake: 'Wrong name used' },
            { pattern: 'all.*one file', mistake: 'Checked one instead of all' }
        ];

        for (const {pattern, mistake} of repeatedPatterns) {
            if (learnings.includes(mistake) && 
                new RegExp(pattern, 'i').test(action)) {
                this.violations.push({
                    block: 'BLOCK 5',
                    rule: 'Never repeat documented mistakes',
                    found: `Action matches documented mistake: ${mistake}`,
                    action: 'BLOCKED - Re-read learning, apply it'
                });
                return false;
            }
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // PATTERN DETECTION
    // ═══════════════════════════════════════════════════════════
    detectBadPatterns(response) {
        this.checks++;
        const badPatterns = [
            {
                pattern: /looks good|seems fine|appears correct/i,
                warning: 'Saying "looks good" without proof'
            },
            {
                pattern: /probably|maybe|should be|might be/i,
                warning: 'Using uncertain language - verify instead'
            },
            {
                pattern: /I think|I assume|I believe/i,
                warning: 'Assuming instead of verifying'
            },
            {
                pattern: /understood|got it|okay/i,
                warning: 'Responding before checking'
            }
        ];

        badPatterns.forEach(({pattern, warning}) => {
            if (pattern.test(response)) {
                this.warnings.push(warning);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════
    // SELF-AWARENESS QUESTIONS
    // ═══════════════════════════════════════════════════════════
    runSelfAwarenessCheck(context) {
        this.checks++;
        const questions = [];

        if (!context.verified) {
            questions.push('❌ Am I assuming or verifying? → ASSUMING (bad)');
        }

        if (!context.tested) {
            questions.push('❌ Am I testing or guessing? → GUESSING (bad)');
        }

        if (context.checkedFiles < context.totalFiles) {
            questions.push('❌ Am I checking one or all? → ONE (bad)');
        }

        if (!context.steeringFilesChecked) {
            questions.push('❌ Did I check steering files? → NO (bad)');
        }

        if (questions.length > 0) {
            this.violations.push({
                block: 'SELF-AWARENESS',
                rule: 'Answer self-awareness questions',
                found: questions.join('\n'),
                action: 'BLOCKED - Fix these issues first'
            });
            return false;
        }
        return true;
    }

    // ═══════════════════════════════════════════════════════════
    // GENERATE REPORT
    // ═══════════════════════════════════════════════════════════
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalChecks: this.checks,
            violations: this.violations.length,
            warnings: this.warnings.length,
            passed: this.violations.length === 0,
            details: {
                violations: this.violations,
                warnings: this.warnings
            }
        };

        return report;
    }

    // ═══════════════════════════════════════════════════════════
    // MAIN ENFORCEMENT CHECK
    // ═══════════════════════════════════════════════════════════
    enforce(context) {
        console.log('🧠 Running Kiro Self-Enforcement Checklist...\n');

        // Run all blocks
        const block1 = this.checkClaimWithoutTesting(
            context.response || '', 
            context.testsRun || false
        );

        const block2 = this.checkUnverifiedPersonalInfo(
            context.response || '', 
            context.verifiedData || false
        );

        const block3 = this.checkPartialWhenShouldBeComplete(
            context.userRequest || '',
            context.checkedFiles || 0,
            context.totalFiles || 0
        );

        const block4 = this.checkLiveSiteVerification(
            context.userRequest || '',
            context.liveSiteChecked || false
        );

        const block5 = this.checkRepeatedMistakes(
            context.action || '',
            context.learningsFile || '.kiro/steering/3_WEEKS_COMPLETE_LEARNINGS.md'
        );

        // Pattern detection
        this.detectBadPatterns(context.response || '');

        // Self-awareness check
        const selfAware = this.runSelfAwarenessCheck(context);

        // Generate report
        const report = this.generateReport();

        // Display results
        console.log('═══════════════════════════════════════════════════════════');
        console.log('📊 ENFORCEMENT RESULTS');
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`Total Checks: ${report.totalChecks}`);
        console.log(`Violations: ${report.violations}`);
        console.log(`Warnings: ${report.warnings}`);
        console.log(`Status: ${report.passed ? '✅ PASSED' : '❌ BLOCKED'}`);
        console.log('═══════════════════════════════════════════════════════════\n');

        if (report.violations > 0) {
            console.log('🚨 VIOLATIONS FOUND:\n');
            report.details.violations.forEach((v, i) => {
                console.log(`${i + 1}. ${v.block}: ${v.rule}`);
                console.log(`   Found: ${v.found}`);
                console.log(`   Action: ${v.action}\n`);
            });
        }

        if (report.warnings.length > 0) {
            console.log('⚠️  WARNINGS:\n');
            report.details.warnings.forEach((w, i) => {
                console.log(`${i + 1}. ${w}`);
            });
            console.log('');
        }

        if (report.passed) {
            console.log('✅ All checks passed! Safe to respond.\n');
        } else {
            console.log('❌ BLOCKED! Fix violations before responding.\n');
        }

        return report;
    }
}

// ═══════════════════════════════════════════════════════════
// EXAMPLE USAGE
// ═══════════════════════════════════════════════════════════
function exampleUsage() {
    const enforcer = new KiroEnforcementSystem();

    // Example 1: Bad response (should be blocked)
    console.log('Example 1: Response claiming "fixed" without testing\n');
    const badContext = {
        userRequest: 'fix the navigation',
        response: 'Fixed the navigation on all pages',
        testsRun: false,
        verifiedData: false,
        checkedFiles: 1,
        totalFiles: 47,
        liveSiteChecked: false,
        verified: false,
        tested: false,
        steeringFilesChecked: false,
        action: 'fixing navigation'
    };
    enforcer.enforce(badContext);

    console.log('\n' + '═'.repeat(60) + '\n');

    // Example 2: Good response (should pass)
    console.log('Example 2: Proper response with verification\n');
    const goodContext = {
        userRequest: 'check the site',
        response: 'Checked 47 files, ran 5 tests, found 0 issues',
        testsRun: true,
        verifiedData: true,
        checkedFiles: 47,
        totalFiles: 47,
        liveSiteChecked: true,
        verified: true,
        tested: true,
        steeringFilesChecked: true,
        action: 'checking site'
    };
    const enforcer2 = new KiroEnforcementSystem();
    enforcer2.enforce(goodContext);
}

// Run examples if called directly
if (require.main === module) {
    exampleUsage();
}

module.exports = KiroEnforcementSystem;
