#!/usr/bin/env node

/**
 * CHECK FOR TODAY'S MISTAKE PATTERNS
 * 
 * Checks all pages for similar mistakes to today:
 * 1. Vague naming (bad, wrong, broken in titles)
 * 2. Confusing labels (AI vs Tool confusion)
 * 3. Wrong categorization (blog labeled as tool)
 * 4. Missing clarification (unclear purpose)
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 CHECKING FOR TODAY\'S MISTAKE PATTERNS\n');

const issues = {
    vagueNaming: [],
    confusingLabels: [],
    wrongCategorization: [],
    missingClarification: [],
    oldDomain: [],
    missingDescription: []
};

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`Checking ${files.length} HTML files...\n`);

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // 1. Check for vague terms in titles/headings (but allow descriptive uses)
        const titleMatch = content.match(/<title>([^<]+)<\/title>/);
        if (titleMatch) {
            const title = titleMatch[1];
            // Flag only if vague term is the MAIN subject, not descriptive
            // Bad: "Error Dashboard", "Fix Problems"
            // OK: "Site Health Monitor - Real-Time Issue Detection"
            const vagueAsMain = /^(bad|wrong|broken|issue|problem|fix|error)\b/i.test(title);
            const vagueInMain = /^[^-|]+\b(bad|wrong|broken|fix|error)\b/i.test(title);
            
            if (vagueAsMain || vagueInMain) {
                // But allow if it's clearly descriptive (has context)
                if (!/(monitor|detection|solver|troubleshooter|guide)/i.test(title)) {
                    issues.vagueNaming.push({
                        file: file,
                        title: title,
                        issue: 'Vague term in title'
                    });
                }
            }
        }
        
        // 2. Check for AI vs Tool confusion (like GODA issue)
        if (content.includes('AI') && content.includes('tool')) {
            const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
            if (h1Match && /AI.*tool|tool.*AI/i.test(h1Match[1])) {
                // Check if it's actually an AI tool or troubleshooter
                if (!content.includes('AI-powered') && !content.includes('artificial intelligence')) {
                    issues.confusingLabels.push({
                        file: file,
                        heading: h1Match[1],
                        issue: 'Unclear if AI tool or troubleshooter'
                    });
                }
            }
        }
        
        // 3. Check for blog vs tool confusion
        if (file.includes('blog') || file.includes('post')) {
            if (content.includes('tool') && titleMatch) {
                const title = titleMatch[1].toLowerCase();
                if (title.includes('tool') && !title.includes('blog')) {
                    issues.wrongCategorization.push({
                        file: file,
                        title: titleMatch[1],
                        issue: 'Blog content labeled as tool'
                    });
                }
            }
        }
        
        // 4. Check for old domain references
        if (content.includes('ideasbeforetime.pages.dev')) {
            issues.oldDomain.push({
                file: file,
                issue: 'Still references old domain'
            });
        }
        
        // 5. Check for missing meta descriptions
        if (!content.includes('<meta name="description"')) {
            // Only flag main pages, not test files
            if (!file.startsWith('test-') && !file.includes('template')) {
                issues.missingDescription.push({
                    file: file,
                    issue: 'Missing meta description'
                });
            }
        }
        
    } catch (err) {
        // Skip files that can't be read
    }
});

// Report results
console.log('📋 VAGUE NAMING (titles with bad/wrong/broken):');
if (issues.vagueNaming.length === 0) {
    console.log('   ✅ None found\n');
} else {
    issues.vagueNaming.forEach(item => {
        console.log(`   ❌ ${item.file}`);
        console.log(`      Title: "${item.title}"`);
    });
    console.log('');
}

console.log('📋 CONFUSING LABELS (AI vs Tool confusion):');
if (issues.confusingLabels.length === 0) {
    console.log('   ✅ None found\n');
} else {
    issues.confusingLabels.forEach(item => {
        console.log(`   ⚠️  ${item.file}`);
        console.log(`      Heading: "${item.heading}"`);
    });
    console.log('');
}

console.log('📋 WRONG CATEGORIZATION (blog labeled as tool):');
if (issues.wrongCategorization.length === 0) {
    console.log('   ✅ None found\n');
} else {
    issues.wrongCategorization.forEach(item => {
        console.log(`   ❌ ${item.file}`);
        console.log(`      Title: "${item.title}"`);
    });
    console.log('');
}

console.log('📋 OLD DOMAIN REFERENCES (ideasbeforetime.pages.dev):');
if (issues.oldDomain.length === 0) {
    console.log('   ✅ None found\n');
} else {
    issues.oldDomain.forEach(item => {
        console.log(`   ⚠️  ${item.file}`);
    });
    console.log('');
}

console.log('📋 MISSING META DESCRIPTIONS (SEO issue):');
if (issues.missingDescription.length === 0) {
    console.log('   ✅ All main pages have descriptions\n');
} else {
    console.log(`   ⚠️  ${issues.missingDescription.length} pages missing descriptions`);
    // Show first 10
    issues.missingDescription.slice(0, 10).forEach(item => {
        console.log(`      - ${item.file}`);
    });
    if (issues.missingDescription.length > 10) {
        console.log(`      ... and ${issues.missingDescription.length - 10} more`);
    }
    console.log('');
}

const totalIssues = issues.vagueNaming.length + 
                    issues.confusingLabels.length + 
                    issues.wrongCategorization.length + 
                    issues.oldDomain.length;

console.log('='.repeat(60));
console.log(`📊 TOTAL PATTERN ISSUES: ${totalIssues}`);
console.log(`   (Not counting ${issues.missingDescription.length} missing descriptions)`);
console.log('='.repeat(60));

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    filesChecked: files.length,
    issues: issues,
    summary: {
        vagueNaming: issues.vagueNaming.length,
        confusingLabels: issues.confusingLabels.length,
        wrongCategorization: issues.wrongCategorization.length,
        oldDomain: issues.oldDomain.length,
        missingDescription: issues.missingDescription.length,
        total: totalIssues
    }
};

fs.writeFileSync('PATTERN_CHECK_REPORT_DEC7.json', JSON.stringify(report, null, 2));
console.log('\n📄 Detailed report saved: PATTERN_CHECK_REPORT_DEC7.json');

// Exit code
process.exit(totalIssues > 0 ? 1 : 0);
