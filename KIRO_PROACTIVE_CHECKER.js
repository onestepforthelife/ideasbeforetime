// 🔍 KIRO PROACTIVE CHECKER
// Checks for issues BEFORE Amit finds them
// Created: December 5, 2025

const fs = require('fs');
const path = require('path');

class ProactiveChecker {
    constructor() {
        this.issues = [];
        this.checks = 0;
        this.filesChecked = 0;
    }

    // ═══════════════════════════════════════════════════════════
    // CHECK 1: Personal Information Accuracy
    // ═══════════════════════════════════════════════════════════
    checkPersonalInformation(htmlFiles) {
        console.log('🔍 Checking personal information accuracy...');
        this.checks++;

        const knownCorrect = {
            name: 'Amit Kumar',  // NOT "Amit Kumar Agrawal"
            email: 'onestepforthelife@gmail.com',
            // Add other verified info here
        };

        const wrongPatterns = [
            { pattern: /Amit Kumar Agrawal/gi, correct: 'Amit Kumar', issue: 'Wrong name (includes Agrawal)' },
            { pattern: /amit\.kumar@/gi, correct: 'onestepforthelife@gmail.com', issue: 'Wrong email pattern' }
        ];

        htmlFiles.forEach(file => {
            if (!fs.existsSync(file)) return;
            const content = fs.readFileSync(file, 'utf8');
            this.filesChecked++;

            wrongPatterns.forEach(({pattern, correct, issue}) => {
                if (pattern.test(content)) {
                    this.issues.push({
                        severity: 'CRITICAL',
                        category: 'Personal Information',
                        file: path.basename(file),
                        issue: issue,
                        found: content.match(pattern)[0],
                        shouldBe: correct,
                        fix: `Replace with: ${correct}`
                    });
                }
            });
        });

        console.log(`   Checked ${htmlFiles.length} files\n`);
    }

    // ═══════════════════════════════════════════════════════════
    // CHECK 2: Repeated Corrections (Things Amit Already Told Me)
    // ═══════════════════════════════════════════════════════════
    checkRepeatedCorrections(htmlFiles) {
        console.log('🔍 Checking for repeated corrections...');
        this.checks++;

        const corrections = [
            {
                name: 'Footer CSS',
                check: (content) => {
                    const hasFooterJS = content.includes('common-footer.js');
                    const hasFooterCSS = content.includes('common-footer.css');
                    return hasFooterJS && !hasFooterCSS;
                },
                issue: 'Has footer JS but missing footer CSS',
                fix: 'Add: <link rel="stylesheet" href="common-footer.css">'
            },
            {
                name: 'Purple Colors',
                check: (content) => {
                    const purplePatterns = [
                        /#667eea/gi, /#764ba2/gi, /#8b5cf6/gi,
                        /rgb\(102,\s*126,\s*234\)/gi
                    ];
                    return purplePatterns.some(p => p.test(content));
                },
                issue: 'Contains purple colors (should be removed)',
                fix: 'Replace with approved colors from common-styles.css'
            },
            {
                name: 'Double Headers',
                check: (content) => {
                    const hasHeaderTag = /<header[^>]*>/i.test(content);
                    const hasCommonNav = /common-navigation\.js/i.test(content);
                    return hasHeaderTag && hasCommonNav;
                },
                issue: 'Has both <header> tag and common-navigation.js',
                fix: 'Remove <header> tag, use only common-navigation.js'
            },
            {
                name: 'Navigation Consistency',
                check: (content) => {
                    return !content.includes('common-navigation.js');
                },
                issue: 'Missing common-navigation.js',
                fix: 'Add: <script src="common-navigation.js"></script>'
            },
            {
                name: 'Footer Consistency',
                check: (content) => {
                    return !content.includes('common-footer.js');
                },
                issue: 'Missing common-footer.js',
                fix: 'Add: <script src="common-footer.js"></script>'
            }
        ];

        htmlFiles.forEach(file => {
            if (!fs.existsSync(file)) return;
            const content = fs.readFileSync(file, 'utf8');

            corrections.forEach(correction => {
                if (correction.check(content)) {
                    this.issues.push({
                        severity: 'HIGH',
                        category: 'Repeated Correction',
                        file: path.basename(file),
                        issue: `${correction.name}: ${correction.issue}`,
                        fix: correction.fix
                    });
                }
            });
        });

        console.log(`   Checked ${htmlFiles.length} files\n`);
    }

    // ═══════════════════════════════════════════════════════════
    // CHECK 3: Consistency Across All Files
    // ═══════════════════════════════════════════════════════════
    checkConsistency(htmlFiles) {
        console.log('🔍 Checking consistency across all files...');
        this.checks++;

        const requiredElements = [
            { name: 'common-navigation.js', pattern: /common-navigation\.js/ },
            { name: 'common-footer.js', pattern: /common-footer\.js/ },
            { name: 'common-footer.css', pattern: /common-footer\.css/ },
            { name: 'universal-analytics.js', pattern: /universal-analytics\.js/ }
        ];

        const filesWithout = {};
        requiredElements.forEach(elem => {
            filesWithout[elem.name] = [];
        });

        htmlFiles.forEach(file => {
            if (!fs.existsSync(file)) return;
            const content = fs.readFileSync(file, 'utf8');

            requiredElements.forEach(elem => {
                if (!elem.pattern.test(content)) {
                    filesWithout[elem.name].push(path.basename(file));
                }
            });
        });

        Object.entries(filesWithout).forEach(([element, files]) => {
            if (files.length > 0) {
                this.issues.push({
                    severity: 'MEDIUM',
                    category: 'Consistency',
                    file: `${files.length} files`,
                    issue: `Missing ${element}`,
                    fix: `Add to: ${files.slice(0, 3).join(', ')}${files.length > 3 ? '...' : ''}`
                });
            }
        });

        console.log(`   Checked ${htmlFiles.length} files\n`);
    }

    // ═══════════════════════════════════════════════════════════
    // CHECK 4: Visual Consistency (Alignment, Spacing)
    // ═══════════════════════════════════════════════════════════
    checkVisualConsistency(htmlFiles) {
        console.log('🔍 Checking visual consistency...');
        this.checks++;

        const visualChecks = [
            {
                name: 'Header Alignment',
                pattern: /text-align:\s*left/gi,
                context: /<header[^>]*>[\s\S]*?<\/header>/gi,
                issue: 'Header has left alignment (should be consistent)',
                fix: 'Check if this matches other pages'
            },
            {
                name: 'Max Width',
                pattern: /max-width:\s*(\d+)px/gi,
                issue: 'Inconsistent max-width',
                fix: 'Should be 1400px for consistency'
            }
        ];

        const widths = {};
        htmlFiles.forEach(file => {
            if (!fs.existsSync(file)) return;
            const content = fs.readFileSync(file, 'utf8');

            // Check max-width consistency
            const widthMatches = [...content.matchAll(/max-width:\s*(\d+)px/gi)];
            widthMatches.forEach(match => {
                const width = match[1];
                if (!widths[width]) widths[width] = [];
                widths[width].push(path.basename(file));
            });
        });

        // If multiple different widths found, flag inconsistency
        if (Object.keys(widths).length > 1) {
            this.issues.push({
                severity: 'LOW',
                category: 'Visual Consistency',
                file: 'Multiple files',
                issue: `Inconsistent max-width values: ${Object.keys(widths).join(', ')}px`,
                fix: 'Standardize to 1400px'
            });
        }

        console.log(`   Checked ${htmlFiles.length} files\n`);
    }

    // ═══════════════════════════════════════════════════════════
    // CHECK 5: Primary User Flow (Functional Testing)
    // ═══════════════════════════════════════════════════════════
    checkPrimaryUserFlow(htmlFiles) {
        console.log('🔍 Checking primary user flows...');
        this.checks++;

        const criticalPages = [
            {
                file: 'social-optimizer-index.html',
                flow: 'User enters data → Gets results',
                checks: [
                    { pattern: /form/i, required: true, issue: 'Missing form element' },
                    { pattern: /submit|next/i, required: true, issue: 'Missing submit/next button' }
                ]
            },
            {
                file: 'request-access.html',
                flow: 'User requests access → Gets confirmation',
                checks: [
                    { pattern: /form/i, required: true, issue: 'Missing form element' },
                    { pattern: /email/i, required: true, issue: 'Missing email field' }
                ]
            }
        ];

        criticalPages.forEach(page => {
            const filePath = htmlFiles.find(f => f.includes(page.file));
            if (!filePath || !fs.existsSync(filePath)) {
                this.issues.push({
                    severity: 'CRITICAL',
                    category: 'Primary User Flow',
                    file: page.file,
                    issue: 'File not found - cannot verify user flow',
                    fix: 'Ensure file exists and is accessible'
                });
                return;
            }

            const content = fs.readFileSync(filePath, 'utf8');
            page.checks.forEach(check => {
                if (check.required && !check.pattern.test(content)) {
                    this.issues.push({
                        severity: 'CRITICAL',
                        category: 'Primary User Flow',
                        file: page.file,
                        issue: `${page.flow}: ${check.issue}`,
                        fix: 'Verify primary user flow works end-to-end'
                    });
                }
            });
        });

        console.log(`   Checked ${criticalPages.length} critical flows\n`);
    }

    // ═══════════════════════════════════════════════════════════
    // GENERATE REPORT
    // ═══════════════════════════════════════════════════════════
    generateReport() {
        console.log('═'.repeat(60));
        console.log('📊 PROACTIVE CHECK REPORT');
        console.log('═'.repeat(60));
        console.log('');

        const critical = this.issues.filter(i => i.severity === 'CRITICAL');
        const high = this.issues.filter(i => i.severity === 'HIGH');
        const medium = this.issues.filter(i => i.severity === 'MEDIUM');
        const low = this.issues.filter(i => i.severity === 'LOW');

        console.log('📈 SUMMARY:');
        console.log(`   Total Checks: ${this.checks}`);
        console.log(`   Files Checked: ${this.filesChecked}`);
        console.log(`   Issues Found: ${this.issues.length}`);
        console.log(`   - Critical: ${critical.length}`);
        console.log(`   - High: ${high.length}`);
        console.log(`   - Medium: ${medium.length}`);
        console.log(`   - Low: ${low.length}`);
        console.log('');

        if (this.issues.length === 0) {
            console.log('✅ No issues found! Site is clean.\n');
            return;
        }

        // Show issues by severity
        const showIssues = (issues, severity) => {
            if (issues.length === 0) return;

            console.log(`${severity === 'CRITICAL' ? '🚨' : severity === 'HIGH' ? '⚠️' : '📌'} ${severity} ISSUES (${issues.length}):`);
            console.log('');

            issues.forEach((issue, i) => {
                console.log(`   ${i + 1}. [${issue.category}] ${issue.file}`);
                console.log(`      Issue: ${issue.issue}`);
                if (issue.found) console.log(`      Found: ${issue.found}`);
                if (issue.shouldBe) console.log(`      Should be: ${issue.shouldBe}`);
                console.log(`      Fix: ${issue.fix}`);
                console.log('');
            });
        };

        showIssues(critical, 'CRITICAL');
        showIssues(high, 'HIGH');
        showIssues(medium, 'MEDIUM');
        showIssues(low, 'LOW');

        console.log('═'.repeat(60));
        console.log('💡 NEXT STEPS:');
        console.log('═'.repeat(60));
        console.log('');
        console.log('1. Fix CRITICAL issues immediately');
        console.log('2. Fix HIGH issues before deployment');
        console.log('3. Fix MEDIUM/LOW issues when possible');
        console.log('4. Re-run this check after fixes');
        console.log('5. Only push when 0 issues found');
        console.log('');
    }

    // ═══════════════════════════════════════════════════════════
    // MAIN CHECK FUNCTION
    // ═══════════════════════════════════════════════════════════
    runAllChecks(directory = '.') {
        console.log('🧠 Running Kiro Proactive Checker...\n');

        // Get all HTML files
        const htmlFiles = this.getAllHtmlFiles(directory);
        console.log(`Found ${htmlFiles.length} HTML files\n`);

        // Run all checks
        this.checkPersonalInformation(htmlFiles);
        this.checkRepeatedCorrections(htmlFiles);
        this.checkConsistency(htmlFiles);
        this.checkVisualConsistency(htmlFiles);
        this.checkPrimaryUserFlow(htmlFiles);

        // Generate report
        this.generateReport();

        return {
            totalIssues: this.issues.length,
            critical: this.issues.filter(i => i.severity === 'CRITICAL').length,
            issues: this.issues
        };
    }

    getAllHtmlFiles(directory) {
        const files = [];
        const items = fs.readdirSync(directory);

        items.forEach(item => {
            const fullPath = path.join(directory, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                // Skip certain directories
                if (!['node_modules', '.git', 'backup_', 'Cloudfare'].includes(item)) {
                    files.push(...this.getAllHtmlFiles(fullPath));
                }
            } else if (item.endsWith('.html')) {
                files.push(fullPath);
            }
        });

        return files;
    }
}

// ═══════════════════════════════════════════════════════════
// RUN CHECKS
// ═══════════════════════════════════════════════════════════
if (require.main === module) {
    const checker = new ProactiveChecker();
    const result = checker.runAllChecks('.');
    
    if (result.critical > 0) {
        console.log('❌ CRITICAL ISSUES FOUND - DO NOT PUSH!');
        process.exit(1);
    } else if (result.totalIssues > 0) {
        console.log('⚠️  Issues found - Fix before pushing');
        process.exit(1);
    } else {
        console.log('✅ All checks passed - Safe to push');
        process.exit(0);
    }
}

module.exports = ProactiveChecker;
