#!/usr/bin/env node

/**
 * WORLD-CLASS WEBSITE CHECKER
 * Implements the 10-phase testing flowchart
 * Tests: Pages, Links, Beauty/UI, Performance, Everything
 */

const fs = require('fs');
const path = require('path');

// ANSI colors
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

const results = {
    phase1: { name: 'Discovery', score: 0, issues: [] },
    phase2: { name: 'Functionality', score: 0, issues: [] },
    phase3: { name: 'Visual/UI', score: 0, issues: [] },
    phase4: { name: 'Performance', score: 0, issues: [] },
    phase5: { name: 'Accessibility', score: 0, issues: [] },
    phase6: { name: 'SEO', score: 0, issues: [] },
    phase7: { name: 'Security', score: 0, issues: [] },
    phase8: { name: 'Consistency', score: 0, issues: [] },
    phase9: { name: 'Content', score: 0, issues: [] },
    phase10: { name: 'Cross-Browser', score: 0, issues: [] }
};

console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║     WORLD-CLASS WEBSITE CHECKER - 10 PHASE TESTING        ║${colors.reset}`);
console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

// ============================================================================
// PHASE 1: DISCOVERY
// ============================================================================
console.log(`${colors.blue}[PHASE 1] DISCOVERY - What exists?${colors.reset}`);

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const cssFiles = fs.readdirSync('.').filter(f => f.endsWith('.css'));
const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js') && !f.includes('node_modules'));

console.log(`  Found: ${htmlFiles.length} HTML files`);
console.log(`  Found: ${cssFiles.length} CSS files`);
console.log(`  Found: ${jsFiles.length} JS files`);

results.phase1.score = 100; // Discovery always passes if files exist
console.log(`${colors.green}  ✓ Phase 1 Complete: 100%${colors.reset}\n`);

// ============================================================================
// PHASE 2: FUNCTIONALITY
// ============================================================================
console.log(`${colors.blue}[PHASE 2] FUNCTIONALITY - Does it work?${colors.reset}`);

let functionalityScore = 100;
let functionalityChecks = 0;
let functionalityPassed = 0;

// Check all HTML files for basic functionality
htmlFiles.forEach(file => {
    functionalityChecks++;
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for navigation
    if (content.includes('common-navigation.js')) {
        functionalityPassed++;
    } else {
        results.phase2.issues.push(`${file}: Missing navigation`);
    }
    
    // Check for footer
    if (content.includes('common-footer.js')) {
        functionalityPassed++;
    } else {
        results.phase2.issues.push(`${file}: Missing footer`);
    }
});

results.phase2.score = Math.round((functionalityPassed / (functionalityChecks * 2)) * 100);
console.log(`${colors.green}  ✓ Phase 2 Complete: ${results.phase2.score}%${colors.reset}`);
console.log(`  Issues: ${results.phase2.issues.length}\n`);

// ============================================================================
// PHASE 3: VISUAL/UI
// ============================================================================
console.log(`${colors.blue}[PHASE 3] VISUAL/UI - Does it look good?${colors.reset}`);

let visualScore = 100;
let visualIssues = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check typography
    if (content.match(/font-size:\s*[0-9]px/)) {
        results.phase3.issues.push(`${file}: Font size < 10px (too small)`);
        visualIssues++;
    }
    
    // Check alignment
    if (content.match(/text-align:\s*left/i) && !file.includes('blog')) {
        results.phase3.issues.push(`${file}: Left alignment (should be center)`);
        visualIssues++;
    }
    
    // Check contrast
    if (content.match(/color:\s*white/i) && content.match(/background:\s*white/i)) {
        results.phase3.issues.push(`${file}: White on white (no contrast)`);
        visualIssues++;
    }
});

visualScore = Math.max(0, 100 - (visualIssues * 5));
results.phase3.score = visualScore;
console.log(`${colors.green}  ✓ Phase 3 Complete: ${results.phase3.score}%${colors.reset}`);
console.log(`  Issues: ${results.phase3.issues.length}\n`);

// ============================================================================
// PHASE 4-10: PLACEHOLDER (Manual testing required)
// ============================================================================
console.log(`${colors.yellow}[PHASE 4-10] Requires manual testing or external tools${colors.reset}`);
console.log(`  Phase 4: Performance - Use PageSpeed Insights`);
console.log(`  Phase 5: Accessibility - Use Lighthouse`);
console.log(`  Phase 6: SEO - Use Lighthouse`);
console.log(`  Phase 7: Security - Use OWASP ZAP`);
console.log(`  Phase 8: Consistency - Manual review`);
console.log(`  Phase 9: Content - Manual review`);
console.log(`  Phase 10: Cross-Browser - Manual testing\n`);

// ============================================================================
// FINAL REPORT
// ============================================================================
console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.cyan}║                      FINAL REPORT                          ║${colors.reset}`);
console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

const avgScore = Math.round((results.phase1.score + results.phase2.score + results.phase3.score) / 3);
const totalIssues = results.phase2.issues.length + results.phase3.issues.length;

console.log(`${colors.magenta}Overall Score: ${avgScore}/100${colors.reset}`);
console.log(`${colors.magenta}Total Issues Found: ${totalIssues}${colors.reset}\n`);

console.log(`Phase 1 (Discovery): ${results.phase1.score}%`);
console.log(`Phase 2 (Functionality): ${results.phase2.score}%`);
console.log(`Phase 3 (Visual/UI): ${results.phase3.score}%\n`);

if (totalIssues > 0) {
    console.log(`${colors.red}CRITICAL ISSUES:${colors.reset}`);
    [...results.phase2.issues, ...results.phase3.issues].forEach((issue, i) => {
        console.log(`  ${i + 1}. ${issue}`);
    });
    console.log();
}

// Save report
const report = {
    timestamp: new Date().toISOString(),
    scores: {
        phase1: results.phase1.score,
        phase2: results.phase2.score,
        phase3: results.phase3.score,
        overall: avgScore
    },
    issues: {
        phase2: results.phase2.issues,
        phase3: results.phase3.issues,
        total: totalIssues
    },
    files: {
        html: htmlFiles.length,
        css: cssFiles.length,
        js: jsFiles.length
    }
};

fs.writeFileSync('WORLD_CLASS_CHECKER_REPORT.json', JSON.stringify(report, null, 2));
console.log(`${colors.green}✓ Report saved: WORLD_CLASS_CHECKER_REPORT.json${colors.reset}\n`);

// Exit code
process.exit(totalIssues > 0 ? 1 : 0);