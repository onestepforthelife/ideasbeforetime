// 🔍 KIRO MISTAKE PATTERN ANALYZER
// Analyzes all my mistakes to find patterns
// Created: December 5, 2025

const fs = require('fs');
const path = require('path');

class MistakePatternAnalyzer {
    constructor() {
        this.mistakes = [];
        this.patterns = {};
        this.rootCauses = {};
        this.solutions = {};
    }

    // ═══════════════════════════════════════════════════════════
    // LOAD LEARNINGS FROM FILE
    // ═══════════════════════════════════════════════════════════
    loadLearnings(filePath) {
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filePath}`);
            return false;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract learnings (format: ### Learning X:)
        const learningRegex = /### Learning (\d+):(.*?)(?=### Learning|\n---|\Z)/gs;
        const matches = [...content.matchAll(learningRegex)];

        matches.forEach(match => {
            const number = match[1];
            const content = match[2];

            // Extract key information
            const whatHappened = this.extractSection(content, 'What happened:');
            const feedback = this.extractSection(content, "Amit's feedback:");
            const lesson = this.extractSection(content, 'Lesson:');
            const keyInsight = this.extractSection(content, 'Key insight:');

            this.mistakes.push({
                number: parseInt(number),
                whatHappened,
                feedback,
                lesson,
                keyInsight,
                rawContent: content
            });
        });

        console.log(`✅ Loaded ${this.mistakes.length} learnings from file\n`);
        return true;
    }

    extractSection(content, sectionName) {
        const regex = new RegExp(`\\*\\*${sectionName}\\*\\*\\s*(.+?)(?=\\*\\*|\\n\\n|$)`, 's');
        const match = content.match(regex);
        return match ? match[1].trim() : '';
    }

    // ═══════════════════════════════════════════════════════════
    // ANALYZE PATTERNS
    // ═══════════════════════════════════════════════════════════
    analyzePatterns() {
        console.log('🔍 Analyzing mistake patterns...\n');

        // Pattern 1: "Said X without Y"
        const saidWithoutPattern = this.mistakes.filter(m => 
            m.whatHappened.toLowerCase().includes('said') &&
            m.whatHappened.toLowerCase().includes('without')
        );

        // Pattern 2: "Didn't check/verify"
        const didntCheckPattern = this.mistakes.filter(m =>
            m.whatHappened.toLowerCase().includes("didn't check") ||
            m.whatHappened.toLowerCase().includes("didn't verify") ||
            m.whatHappened.toLowerCase().includes("never tested")
        );

        // Pattern 3: "Assumed instead of"
        const assumedPattern = this.mistakes.filter(m =>
            m.whatHappened.toLowerCase().includes('assumed') ||
            m.lesson.toLowerCase().includes('assume')
        );

        // Pattern 4: "Checked one instead of all"
        const partialCheckPattern = this.mistakes.filter(m =>
            m.whatHappened.toLowerCase().includes('missed') ||
            m.whatHappened.toLowerCase().includes('only checked') ||
            m.feedback.toLowerCase().includes('check all')
        );

        // Pattern 5: "Amit said 'still'"
        const stillBrokenPattern = this.mistakes.filter(m =>
            m.feedback.toLowerCase().includes('still')
        );

        this.patterns = {
            'Said X without Y': {
                count: saidWithoutPattern.length,
                examples: saidWithoutPattern.slice(0, 3),
                severity: 'CRITICAL'
            },
            "Didn't check/verify": {
                count: didntCheckPattern.length,
                examples: didntCheckPattern.slice(0, 3),
                severity: 'HIGH'
            },
            'Assumed instead of verified': {
                count: assumedPattern.length,
                examples: assumedPattern.slice(0, 3),
                severity: 'HIGH'
            },
            'Checked one instead of all': {
                count: partialCheckPattern.length,
                examples: partialCheckPattern.slice(0, 3),
                severity: 'MEDIUM'
            },
            'Still broken (repeated mistake)': {
                count: stillBrokenPattern.length,
                examples: stillBrokenPattern.slice(0, 3),
                severity: 'CRITICAL'
            }
        };

        return this.patterns;
    }

    // ═══════════════════════════════════════════════════════════
    // IDENTIFY ROOT CAUSES
    // ═══════════════════════════════════════════════════════════
    identifyRootCauses() {
        console.log('🎯 Identifying root causes...\n');

        this.rootCauses = {
            'Passive Learning': {
                description: 'I document mistakes but don\'t enforce prevention',
                evidence: this.mistakes.filter(m => 
                    m.keyInsight && m.keyInsight.toLowerCase().includes('document')
                ).length,
                impact: 'I repeat same mistakes despite documentation'
            },
            'No Pre-Response Verification': {
                description: 'I respond before checking, then find issues',
                evidence: this.mistakes.filter(m =>
                    m.whatHappened.toLowerCase().includes('said') &&
                    m.lesson.toLowerCase().includes('test')
                ).length,
                impact: 'Amit finds issues I should have caught'
            },
            'Assumption Without Verification': {
                description: 'I use information without verifying source',
                evidence: this.mistakes.filter(m =>
                    m.whatHappened.toLowerCase().includes('assumed')
                ).length,
                impact: 'Wrong data on live site (names, pricing, etc.)'
            },
            'Incomplete Checking': {
                description: 'I check one file when should check all',
                evidence: this.mistakes.filter(m =>
                    m.whatHappened.toLowerCase().includes('missed')
                ).length,
                impact: 'Inconsistent site, issues remain in unchecked files'
            },
            'Testing Process Not Primary Flow': {
                description: 'I test cosmetic things, miss functional issues',
                evidence: this.mistakes.filter(m =>
                    m.lesson.toLowerCase().includes('primary') ||
                    m.lesson.toLowerCase().includes('functional')
                ).length,
                impact: 'Site looks good but doesn\'t work'
            }
        };

        return this.rootCauses;
    }

    // ═══════════════════════════════════════════════════════════
    // GENERATE SOLUTIONS
    // ═══════════════════════════════════════════════════════════
    generateSolutions() {
        console.log('💡 Generating solutions...\n');

        this.solutions = {
            'For Passive Learning': {
                problem: 'Rules documented but not enforced',
                solution: 'Create enforcement checklist that BLOCKS response',
                implementation: 'KIRO_ENFORCEMENT_CHECKLIST.js (created)',
                status: '✅ DONE'
            },
            'For No Pre-Response Verification': {
                problem: 'Respond before checking',
                solution: 'SILENT check → Fix → Verify → THEN respond',
                implementation: 'Update workflow: Check FIRST, respond SECOND',
                status: '⏳ IN PROGRESS'
            },
            'For Assumption Without Verification': {
                problem: 'Use unverified personal information',
                solution: 'Block if source = "assumed" or "inferred"',
                implementation: 'Add to enforcement checklist (Block 2)',
                status: '✅ DONE'
            },
            'For Incomplete Checking': {
                problem: 'Check one file instead of all',
                solution: 'List ALL files first, check ALL, show count',
                implementation: 'Add to enforcement checklist (Block 3)',
                status: '✅ DONE'
            },
            'For Testing Process': {
                problem: 'Test cosmetic, miss functional',
                solution: 'Test PRIMARY USER FLOW first, then cosmetic',
                implementation: 'Add to enforcement checklist (Self-awareness)',
                status: '✅ DONE'
            }
        };

        return this.solutions;
    }

    // ═══════════════════════════════════════════════════════════
    // CALCULATE IMPROVEMENT METRICS
    // ═══════════════════════════════════════════════════════════
    calculateMetrics() {
        const totalMistakes = this.mistakes.length;
        const criticalPatterns = Object.values(this.patterns)
            .filter(p => p.severity === 'CRITICAL')
            .reduce((sum, p) => sum + p.count, 0);
        
        const highPatterns = Object.values(this.patterns)
            .filter(p => p.severity === 'HIGH')
            .reduce((sum, p) => sum + p.count, 0);

        const solutionsImplemented = Object.values(this.solutions)
            .filter(s => s.status === '✅ DONE').length;

        const solutionsTotal = Object.keys(this.solutions).length;

        return {
            totalMistakes,
            criticalPatterns,
            highPatterns,
            solutionsImplemented,
            solutionsTotal,
            implementationRate: Math.round((solutionsImplemented / solutionsTotal) * 100)
        };
    }

    // ═══════════════════════════════════════════════════════════
    // GENERATE FULL REPORT
    // ═══════════════════════════════════════════════════════════
    generateReport() {
        console.log('═'.repeat(60));
        console.log('📊 KIRO MISTAKE PATTERN ANALYSIS REPORT');
        console.log('═'.repeat(60));
        console.log('');

        // Metrics
        const metrics = this.calculateMetrics();
        console.log('📈 METRICS:');
        console.log(`   Total Learnings Analyzed: ${metrics.totalMistakes}`);
        console.log(`   Critical Pattern Instances: ${metrics.criticalPatterns}`);
        console.log(`   High Priority Instances: ${metrics.highPatterns}`);
        console.log(`   Solutions Implemented: ${metrics.solutionsImplemented}/${metrics.solutionsTotal} (${metrics.implementationRate}%)`);
        console.log('');

        // Patterns
        console.log('🔍 MISTAKE PATTERNS FOUND:');
        console.log('');
        Object.entries(this.patterns).forEach(([name, data]) => {
            console.log(`   ${data.severity === 'CRITICAL' ? '🚨' : data.severity === 'HIGH' ? '⚠️' : '📌'} ${name}`);
            console.log(`      Count: ${data.count}`);
            console.log(`      Severity: ${data.severity}`);
            if (data.examples.length > 0) {
                console.log(`      Example: Learning #${data.examples[0].number}`);
            }
            console.log('');
        });

        // Root Causes
        console.log('🎯 ROOT CAUSES IDENTIFIED:');
        console.log('');
        Object.entries(this.rootCauses).forEach(([name, data]) => {
            console.log(`   • ${name}`);
            console.log(`     ${data.description}`);
            console.log(`     Evidence: ${data.evidence} instances`);
            console.log(`     Impact: ${data.impact}`);
            console.log('');
        });

        // Solutions
        console.log('💡 SOLUTIONS IMPLEMENTED:');
        console.log('');
        Object.entries(this.solutions).forEach(([name, data]) => {
            console.log(`   ${data.status} ${name}`);
            console.log(`      Problem: ${data.problem}`);
            console.log(`      Solution: ${data.solution}`);
            console.log(`      Implementation: ${data.implementation}`);
            console.log('');
        });

        // Summary
        console.log('═'.repeat(60));
        console.log('📝 SUMMARY:');
        console.log('═'.repeat(60));
        console.log('');
        console.log(`After analyzing ${metrics.totalMistakes} learnings:`);
        console.log('');
        console.log('✅ IDENTIFIED:');
        console.log(`   - ${Object.keys(this.patterns).length} mistake patterns`);
        console.log(`   - ${Object.keys(this.rootCauses).length} root causes`);
        console.log(`   - ${Object.keys(this.solutions).length} solutions`);
        console.log('');
        console.log('✅ IMPLEMENTED:');
        console.log(`   - ${metrics.solutionsImplemented}/${metrics.solutionsTotal} solutions (${metrics.implementationRate}%)`);
        console.log('   - Enforcement checklist with 5 hard blocks');
        console.log('   - Pattern detection system');
        console.log('   - Self-awareness questions');
        console.log('');
        console.log('🎯 EXPECTED RESULT:');
        console.log('   - 95/5 ratio reversed (I find 95%, Amit finds 5%)');
        console.log('   - No repeated mistakes');
        console.log('   - Proactive issue detection');
        console.log('   - Verified responses only');
        console.log('');
        console.log('═'.repeat(60));
    }

    // ═══════════════════════════════════════════════════════════
    // MAIN ANALYSIS FUNCTION
    // ═══════════════════════════════════════════════════════════
    analyze(learningsFile) {
        console.log('🧠 Starting Kiro Mistake Pattern Analysis...\n');

        // Load learnings
        if (!this.loadLearnings(learningsFile)) {
            return false;
        }

        // Analyze patterns
        this.analyzePatterns();

        // Identify root causes
        this.identifyRootCauses();

        // Generate solutions
        this.generateSolutions();

        // Generate report
        this.generateReport();

        return true;
    }
}

// ═══════════════════════════════════════════════════════════
// RUN ANALYSIS
// ═══════════════════════════════════════════════════════════
if (require.main === module) {
    const analyzer = new MistakePatternAnalyzer();
    const learningsFile = path.join(__dirname, '.kiro', 'steering', '3_WEEKS_COMPLETE_LEARNINGS.md');
    analyzer.analyze(learningsFile);
}

module.exports = MistakePatternAnalyzer;
