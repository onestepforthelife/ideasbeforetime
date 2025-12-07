#!/usr/bin/env node

/**
 * CRITICAL DIAGNOSTIC TOOL - December 6, 2025
 * 
 * Purpose: Find root cause of live site issues
 * - Check navigation links format (relative vs absolute)
 * - Verify page content matches navigation
 * - Check all pages have header/footer
 * - Identify file issues vs server issues
 * 
 * MANDATORY: Run this BEFORE every push!
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 CRITICAL DIAGNOSTIC STARTING...\n');
console.log('=' .repeat(60));

const issues = {
    file: [],
    server: [],
    critical: [],
    high: [],
    medium: [],
    low: []
};

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.startsWith('backup'));

console.log(`\n📊 Found ${htmlFiles.length} HTML files to check\n`);

// Check 1: Navigation Links Format
console.log('CHECK 1: Navigation Links Format (Relative vs Absolute)');
console.log('-'.repeat(60));

const navFile = 'common-navigation.js';
if (fs.existsSync(navFile)) {
    const navContent = fs.readFileSync(navFile, 'utf8');
    
    // Check for absolute paths (starting with /)
    const absolutePaths = navContent.match(/href="\/[^"]+"/g) || [];
    
    if (absolutePaths.length > 0) {
        issues.critical.push({
            type: 'FILE',
            file: navFile,
            issue: `Found ${absolutePaths.length} absolute paths (with "/" prefix)`,
            paths: absolutePaths,
            fix: 'Remove "/" prefix from all href attributes'
        });
        console.log(`❌ CRITICAL: Found ${absolutePaths.length} absolute paths in navigation`);
        absolutePaths.forEach(p => console.log(`   ${p}`));
    } else {
        console.log('✅ All navigation links are relative (no "/" prefix)');
    }
} else {
    issues.critical.push({
        type: 'FILE',
        file: navFile,
        issue: 'Navigation file missing',
        fix: 'Create common-navigation.js'
    });
    console.log(`❌ CRITICAL: ${navFile} not found`);
}

// Check 2: Page Content vs Navigation Match
console.log('\nCHECK 2: Page Content vs Navigation Links');
console.log('-'.repeat(60));

const navLinks = [
    'index.html',
    'blog.html',
    'astronomy.html',
    'ro.html',
    'social-optimizer-index.html',
    'email-sender-web.html',
    'market-reports.html',
    'innovations.html',
    'library.html',
    'about.html',
    'cv.html',
    'spo.html',
    'jobs.html',
    'admin-control-panel.html'
];

const missingPages = [];
const existingPages = [];

navLinks.forEach(link => {
    if (fs.existsSync(link)) {
        existingPages.push(link);
        console.log(`✅ ${link} exists`);
    } else {
        missingPages.push(link);
        issues.high.push({
            type: 'FILE',
            file: link,
            issue: 'Page linked in navigation but file missing',
            fix: `Create ${link} or remove from navigation`
        });
        console.log(`❌ ${link} MISSING (linked in nav but file not found)`);
    }
});

// Check 3: All Pages Have Navigation & Footer
console.log('\nCHECK 3: Header & Footer Linkage');
console.log('-'.repeat(60));

let pagesWithNav = 0;
let pagesWithFooter = 0;
const pagesWithoutNav = [];
const pagesWithoutFooter = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasNav = content.includes('common-navigation.js');
    const hasFooter = content.includes('common-footer.js');
    
    if (hasNav) pagesWithNav++;
    else pagesWithoutNav.push(file);
    
    if (hasFooter) pagesWithFooter++;
    else pagesWithoutFooter.push(file);
});

console.log(`✅ ${pagesWithNav}/${htmlFiles.length} pages have navigation`);
console.log(`✅ ${pagesWithFooter}/${htmlFiles.length} pages have footer`);

if (pagesWithoutNav.length > 0) {
    issues.high.push({
        type: 'FILE',
        files: pagesWithoutNav,
        issue: `${pagesWithoutNav.length} pages missing navigation`,
        fix: 'Add <script src="common-navigation.js"></script>'
    });
    console.log(`\n❌ Pages without navigation (${pagesWithoutNav.length}):`);
    pagesWithoutNav.forEach(f => console.log(`   - ${f}`));
}

if (pagesWithoutFooter.length > 0) {
    issues.medium.push({
        type: 'FILE',
        files: pagesWithoutFooter,
        issue: `${pagesWithoutFooter.length} pages missing footer`,
        fix: 'Add <script src="common-footer.js"></script>'
    });
    console.log(`\n⚠️  Pages without footer (${pagesWithoutFooter.length}):`);
    pagesWithoutFooter.forEach(f => console.log(`   - ${f}`));
}

// Check 4: Critical Tools Functionality
console.log('\nCHECK 4: Critical Tools Functionality');
console.log('-'.repeat(60));

const criticalTools = [
    { file: 'spo.html', name: 'SPO Tool', requiredFiles: ['social-optimizer-app.js', 'social-optimizer-ai-engine.js'] },
    { file: 'jobs.html', name: 'Job Search', requiredFiles: ['job-api-client.js'] },
    { file: 'admin-control-panel.html', name: 'Admin Panel', requiredFiles: [] }
];

criticalTools.forEach(tool => {
    if (fs.existsSync(tool.file)) {
        const content = fs.readFileSync(tool.file, 'utf8');
        
        // Check if it's a redirect file
        if (content.includes('window.location') && content.length < 1000) {
            issues.critical.push({
                type: 'FILE',
                file: tool.file,
                issue: `${tool.name} is a redirect file, not actual tool`,
                fix: `Replace with actual ${tool.name} implementation`
            });
            console.log(`❌ CRITICAL: ${tool.name} (${tool.file}) is a redirect file`);
        } else {
            console.log(`✅ ${tool.name} (${tool.file}) exists and is not a redirect`);
            
            // Check required files
            tool.requiredFiles.forEach(reqFile => {
                if (!content.includes(reqFile)) {
                    issues.high.push({
                        type: 'FILE',
                        file: tool.file,
                        issue: `Missing required file: ${reqFile}`,
                        fix: `Add <script src="${reqFile}"></script> to ${tool.file}`
                    });
                    console.log(`   ⚠️  Missing: ${reqFile}`);
                }
            });
        }
    } else {
        issues.critical.push({
            type: 'FILE',
            file: tool.file,
            issue: `${tool.name} file missing`,
            fix: `Create ${tool.file}`
        });
        console.log(`❌ CRITICAL: ${tool.name} (${tool.file}) NOT FOUND`);
    }
});

// Check 5: Server Issues (Cannot test from local)
console.log('\nCHECK 5: Server Issues (Cloudflare)');
console.log('-'.repeat(60));

issues.server.push({
    type: 'SERVER',
    issue: 'Cannot test server issues from local files',
    note: 'Must test on live site with browser DevTools',
    checks: [
        'HTTP status codes (200, 308, 404)',
        'Cloudflare Access configuration',
        'Cache purge status',
        'Actual page loading'
    ]
});

console.log('⚠️  Cannot test server issues from local files');
console.log('   Must test on live site: https://onestepforthelife.com');
console.log('   Use browser DevTools → Network tab');
console.log('   Check for:');
console.log('   - 308 redirects (cache issue)');
console.log('   - 404 errors (file not found)');
console.log('   - Cloudflare Access blocking');

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 DIAGNOSTIC SUMMARY');
console.log('='.repeat(60));

const totalIssues = issues.critical.length + issues.high.length + issues.medium.length + issues.low.length;

console.log(`\n🚨 CRITICAL Issues: ${issues.critical.length}`);
console.log(`⚠️  HIGH Issues: ${issues.high.length}`);
console.log(`📌 MEDIUM Issues: ${issues.medium.length}`);
console.log(`ℹ️  LOW Issues: ${issues.low.length}`);
console.log(`📡 SERVER Issues: ${issues.server.length} (need live testing)`);
console.log(`\n📊 TOTAL: ${totalIssues} file issues found`);

// Detailed Issues
if (issues.critical.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES (FIX IMMEDIATELY):');
    console.log('-'.repeat(60));
    issues.critical.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.issue}`);
        console.log(`   File: ${issue.file || issue.files?.join(', ')}`);
        console.log(`   Fix: ${issue.fix}`);
        if (issue.paths) {
            console.log(`   Paths found:`);
            issue.paths.forEach(p => console.log(`      ${p}`));
        }
    });
}

if (issues.high.length > 0) {
    console.log('\n⚠️  HIGH PRIORITY ISSUES:');
    console.log('-'.repeat(60));
    issues.high.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.issue}`);
        console.log(`   File: ${issue.file || issue.files?.join(', ')}`);
        console.log(`   Fix: ${issue.fix}`);
    });
}

// Save report
const report = {
    timestamp: new Date().toISOString(),
    totalFiles: htmlFiles.length,
    totalIssues,
    issues,
    summary: {
        critical: issues.critical.length,
        high: issues.high.length,
        medium: issues.medium.length,
        low: issues.low.length,
        server: issues.server.length
    }
};

fs.writeFileSync('DIAGNOSTIC_REPORT_DEC6.json', JSON.stringify(report, null, 2));
console.log('\n✅ Full report saved to: DIAGNOSTIC_REPORT_DEC6.json');

// Exit code
if (issues.critical.length > 0) {
    console.log('\n❌ DIAGNOSTIC FAILED: Critical issues found');
    console.log('   DO NOT PUSH until critical issues are fixed!');
    process.exit(1);
} else if (issues.high.length > 0) {
    console.log('\n⚠️  DIAGNOSTIC WARNING: High priority issues found');
    console.log('   Recommend fixing before push');
    process.exit(0);
} else {
    console.log('\n✅ DIAGNOSTIC PASSED: No critical issues found');
    console.log('   Safe to push (but test on live site after deployment)');
    process.exit(0);
}
