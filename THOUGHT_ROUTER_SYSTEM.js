#!/usr/bin/env node

/**
 * THOUGHT ROUTER SYSTEM
 * Created: December 7, 2025
 * Purpose: Route my thoughts through checks before responding
 * 
 * Like an intelligent person:
 * - Check what I know (history)
 * - Check what I learned (rules)
 * - Check what I'm about to say (validation)
 * - Backup every step (recovery)
 */

const fs = require('fs');
const path = require('path');

class ThoughtRouter {
    constructor() {
        this.thoughtLog = [];
        this.checksPassed = {};
        this.checksSkipped = [];
        this.backupPoints = [];
    }

    // STEP 1: Load my history and rules
    loadKnowledge() {
        console.log('🧠 LOADING KNOWLEDGE...\n');
        
        const knowledge = {
            learnings: this.loadLearnings(),
            rules: this.loadRules(),
            tools: this.loadTools(),
            mistakes: this.loadMistakes()
        };
        
        console.log(`✅ Loaded ${knowledge.learnings.length} learnings`);
        console.log(`✅ Loaded ${knowledge.rules.length} rules`);
        console.log(`✅ Loaded ${knowledge.tools.length} tools`);
        console.log(`✅ Loaded ${knowledge.mistakes.length} past mistakes\n`);
        
        return knowledge;
    }

    loadLearnings() {
        const file = '.kiro/steering/3_WEEKS_COMPLETE_LEARNINGS.md';
        if (!fs.existsSync(file)) return [];
        
        const content = fs.readFileSync(file, 'utf8');
        const learnings = content.match(/### Learning #\d+:/g) || [];
        return learnings.map(l => l.replace('### ', '').replace(':', ''));
    }

    loadRules() {
        const rulesDir = '.kiro/steering';
        if (!fs.existsSync(rulesDir)) return [];
        
        const files = fs.readdirSync(rulesDir).filter(f => f.endsWith('.md'));
        return files.map(f => f.replace('.md', ''));
    }

    loadTools() {
        const tools = [
            'CRITICAL_DIAGNOSTIC_DEC6.js',
            'COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js',
            'check-config-files.js',
            'check-redirects-file.js',
            'KIRO_PROACTIVE_CHECKER.js',
            'check-site-beauty-quality.js',
            'verify-before-push.js',
            'TEST.bat'
        ];
        return tools.filter(t => fs.existsSync(t));
    }

    loadMistakes() {
        // Extract common mistake patterns
        return [
            { pattern: 'cache issue', mustCheck: ['deployment logs', '_redirects file'] },
            { pattern: 'fixed', mustCheck: ['run tests', 'verify on live site'] },
            { pattern: 'ready', mustCheck: ['test user flow', 'run all tests'] },
            { pattern: '308 redirect', mustCheck: ['_redirects file', 'deployment status'] }
        ];
    }

    // STEP 2: Route my thought through checks
    routeThought(thought) {
        console.log('🔄 ROUTING THOUGHT THROUGH CHECKS...\n');
        console.log(`Thought: "${thought}"\n`);
        
        this.thoughtLog.push({
            timestamp: new Date().toISOString(),
            thought: thought,
            checks: []
        });

        // Check 1: Am I repeating a past mistake?
        const repeatingMistake = this.checkRepeatingMistake(thought);
        if (repeatingMistake) {
            console.log('❌ BLOCKED: Repeating past mistake!');
            console.log(`   Pattern: ${repeatingMistake.pattern}`);
            console.log(`   Must check: ${repeatingMistake.mustCheck.join(', ')}\n`);
            return { blocked: true, reason: repeatingMistake };
        }

        // Check 2: Did I run required tools?
        const missingTools = this.checkRequiredTools(thought);
        if (missingTools.length > 0) {
            console.log('⚠️  WARNING: Required tools not run!');
            missingTools.forEach(tool => {
                console.log(`   - ${tool}`);
            });
            console.log();
            return { blocked: true, reason: { type: 'missing_tools', tools: missingTools } };
        }

        // Check 3: Am I making claims without proof?
        const unprovenClaims = this.checkUnprovenClaims(thought);
        if (unprovenClaims.length > 0) {
            console.log('⚠️  WARNING: Unproven claims detected!');
            unprovenClaims.forEach(claim => {
                console.log(`   - "${claim.claim}" needs: ${claim.proof}`);
            });
            console.log();
            return { blocked: true, reason: { type: 'unproven_claims', claims: unprovenClaims } };
        }

        // Check 4: Did I check what I'm NOT checking?
        const uncheckedAreas = this.checkUncheckedAreas(thought);
        if (uncheckedAreas.length > 0) {
            console.log('💡 SUGGESTION: Consider checking these too:');
            uncheckedAreas.forEach(area => {
                console.log(`   - ${area}`);
            });
            console.log();
        }

        console.log('✅ All checks passed!\n');
        return { blocked: false, suggestions: uncheckedAreas };
    }

    checkRepeatingMistake(thought) {
        const mistakes = this.loadMistakes();
        
        for (const mistake of mistakes) {
            if (thought.toLowerCase().includes(mistake.pattern)) {
                // Check if I verified what I should have
                const verified = mistake.mustCheck.every(check => {
                    return this.checksPassed[check] === true;
                });
                
                if (!verified) {
                    return mistake;
                }
            }
        }
        
        return null;
    }

    checkRequiredTools(thought) {
        const missing = [];
        
        // If saying "fixed" or "ready", must have run tests
        if (thought.match(/fixed|ready|done|complete/i)) {
            if (!this.checksPassed['tests_run']) {
                missing.push('Run tests (TEST.bat or CRITICAL_DIAGNOSTIC_DEC6.js)');
            }
            if (!this.checksPassed['live_site_checked']) {
                missing.push('Check live site (COMPREHENSIVE_LIVE_SITE_CHECK_DEC6.js)');
            }
        }

        // If diagnosing issues, must have run diagnostics
        if (thought.match(/issue|problem|broken|not working/i)) {
            if (!this.checksPassed['diagnostic_run']) {
                missing.push('Run diagnostic (CRITICAL_DIAGNOSTIC_DEC6.js)');
            }
        }

        // If mentioning redirects, must have checked _redirects
        if (thought.match(/redirect|308|301|302/i)) {
            if (!this.checksPassed['redirects_checked']) {
                missing.push('Check _redirects file (check-redirects-file.js)');
            }
        }

        return missing;
    }

    checkUnprovenClaims(thought) {
        const claims = [];
        
        const claimPatterns = [
            { pattern: /it works|working|functional/i, proof: 'Test results or live site verification' },
            { pattern: /fixed|resolved|corrected/i, proof: 'Before/after test results' },
            { pattern: /ready|complete|done/i, proof: 'All tests passed' },
            { pattern: /no issues|all good|looks good/i, proof: 'Diagnostic report' }
        ];

        claimPatterns.forEach(({ pattern, proof }) => {
            if (pattern.test(thought)) {
                claims.push({ claim: thought.match(pattern)[0], proof });
            }
        });

        return claims;
    }

    checkUncheckedAreas(thought) {
        const suggestions = [];
        
        // If checking files, suggest checking live site too
        if (thought.match(/file|code|script/i) && !thought.match(/live|deployed/i)) {
            suggestions.push('Check live site (files correct ≠ live site working)');
        }

        // If checking one thing, suggest checking related things
        if (thought.match(/navigation/i)) {
            suggestions.push('Also check: footer, links, consistency');
        }

        if (thought.match(/cache/i)) {
            suggestions.push('Also check: deployment logs, _redirects, build status');
        }

        return suggestions;
    }

    // STEP 3: Create backup point
    createBackup(step, data) {
        const backup = {
            timestamp: new Date().toISOString(),
            step: step,
            data: data,
            thoughtLog: [...this.thoughtLog],
            checksPassed: { ...this.checksPassed }
        };

        this.backupPoints.push(backup);
        
        // Save to file
        const backupFile = `thought-backup-${Date.now()}.json`;
        fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
        
        console.log(`💾 Backup created: ${backupFile}\n`);
        return backupFile;
    }

    // STEP 4: Mark check as passed
    markCheckPassed(checkName) {
        this.checksPassed[checkName] = true;
        console.log(`✅ Check passed: ${checkName}\n`);
    }

    // STEP 5: Generate thought report
    generateReport() {
        console.log('='.repeat(60));
        console.log('📊 THOUGHT ROUTING REPORT\n');
        
        console.log('Thoughts processed:', this.thoughtLog.length);
        console.log('Checks passed:', Object.keys(this.checksPassed).length);
        console.log('Checks skipped:', this.checksSkipped.length);
        console.log('Backup points:', this.backupPoints.length);
        
        console.log('\n✅ Checks Passed:');
        Object.keys(this.checksPassed).forEach(check => {
            console.log(`   - ${check}`);
        });

        if (this.checksSkipped.length > 0) {
            console.log('\n⚠️  Checks Skipped:');
            this.checksSkipped.forEach(check => {
                console.log(`   - ${check}`);
            });
        }

        console.log('\n💾 Backup Points:');
        this.backupPoints.forEach((bp, i) => {
            console.log(`   ${i + 1}. ${bp.step} (${bp.timestamp})`);
        });

        console.log('\n' + '='.repeat(60));
    }
}

// Example usage
if (require.main === module) {
    const router = new ThoughtRouter();
    
    // Load knowledge
    const knowledge = router.loadKnowledge();
    
    // Create backup before starting
    router.createBackup('session_start', { knowledge });
    
    // Example: Route a thought
    console.log('='.repeat(60));
    console.log('EXAMPLE: Routing a thought\n');
    
    const thought = "It's a cache issue, purge the cache";
    const result = router.routeThought(thought);
    
    if (result.blocked) {
        console.log('❌ THOUGHT BLOCKED!');
        console.log('Reason:', JSON.stringify(result.reason, null, 2));
        console.log('\nWhat I should do instead:');
        if (result.reason.mustCheck) {
            result.reason.mustCheck.forEach(check => {
                console.log(`   1. Check: ${check}`);
            });
        }
        if (result.reason.tools) {
            result.reason.tools.forEach(tool => {
                console.log(`   2. Run: ${tool}`);
            });
        }
    } else {
        console.log('✅ THOUGHT APPROVED!');
        if (result.suggestions && result.suggestions.length > 0) {
            console.log('\n💡 Suggestions:');
            result.suggestions.forEach(s => console.log(`   - ${s}`));
        }
    }
    
    // Generate report
    console.log();
    router.generateReport();
}

module.exports = ThoughtRouter;
