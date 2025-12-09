#!/usr/bin/env node

/**
 * CRITICAL LIVE SITE DIAGNOSTIC
 * Tests ACTUAL live site functionality
 * Finds FILE vs SERVER issues
 */

const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════════');
console.log('🚨 CRITICAL LIVE SITE DIAGNOSTIC - December 6, 2025');
console.log('═══════════════════════════════════════════════════════════════\n');

const DOMAIN = 'https://onestepforthelife.com';
const issues = [];
const fileIssues = [];
const serverIssues = [];

// CRITICAL PAGES TO TEST
const criticalPages = [
    { name: 'SPO Tool', file: 'spo.html', url: '/spo.html' },
    { name: 'Job Search', file: 'jobs.html', url: '/jobs.html' },
    { name: 'Admin Panel', file: 'admin-control-panel.html', url: '/admin-control-panel.html' },
    { name: 'Market Reports', file: 'market-reports.html', url: '/market-reports.html' },
    { name: 'Blog', file: 'blog.html', url: '/blog.html' },
    { name: 'Homepage', file: 'index.html', url: '/' }
];

console.log('📋 STEP 1: CHECK IF FILES EXIST LOCALLY\n');

criticalPages.forEach(page => {
    const exists = fs.existsSync(page.file);
    console.log(`${exists ? '✅' : '❌'} ${page.name}: ${page.file} ${exists ? 'EXISTS' : 'MISSING'}`);
    
    if (!exists) {
        fileIssues.push(`${page.name} file missing: ${page.file}`);
    }
});

console.log('\n📋 STEP 2: CHECK FILE CONTENT (Are they real tools or redirects?)\n');

criticalPages.forEach(page => {
    if (fs.existsSync(page.file)) {
        const content = fs.readFileSync(page.file, 'utf8');
        
        // Check if it's a redirect
        if (content.includes('window.location') || content.includes('meta http-equiv="refresh"')) {
            console.log(`⚠️  ${page.name}: REDIRECT FILE (not actual tool)`);
            fileIssues.push(`${page.name} is redirect, not actual tool`);
        }
        // Check if it has actual functionality
        else if (content.includes('<form') || content.includes('function') || content.includes('const ')) {
            console.log(`✅ ${page.name}: ACTUAL TOOL with functionality`);
        }
        else {
            console.log(`⚠️  ${page.name}: Static page (no functionality)`);
        }
    }
});

console.log('\n📋 STEP 3: CHECK NAVIGATION & FOOTER CONSISTENCY\n');

let pagesWithNav = 0;
let pagesWithFooter = 0;
let pagesWithBoth = 0;

const allHtmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allHtmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hasNav = content.includes('common-navigation.js');
    const hasFooter = content.includes('common-footer.js');
    
    if (hasNav) pagesWithNav++;
    if (hasFooter) pagesWithFooter++;
    if (hasNav && hasFooter) pagesWithBoth++;
});

console.log(`Total HTML files: ${allHtmlFiles.length}`);
console.log(`Pages with navigation: ${pagesWithNav}/${allHtmlFiles.length}`);
console.log(`Pages with footer: ${pagesWithFooter}/${allHtmlFiles.length}`);
console.log(`Pages with both: ${pagesWithBoth}/${allHtmlFiles.length}`);

if (pagesWithBoth < allHtmlFiles.length) {
    fileIssues.push(`${allHtmlFiles.length - pagesWithBoth} pages missing navigation or footer`);
}

console.log('\n📋 STEP 4: CHECK CRITICAL TOOL FILES\n');

// Check SPO Tool
if (fs.existsSync('spo.html')) {
    const spoContent = fs.readFileSync('spo.html', 'utf8');
    console.log('SPO TOOL CHECKS:');
    console.log(`  ${spoContent.includes('social-optimizer-app.js') ? '✅' : '❌'} Has app.js`);
    console.log(`  ${spoContent.includes('social-optimizer-ai-engine.js') ? '✅' : '❌'} Has AI engine`);
    console.log(`  ${spoContent.includes('<form') ? '✅' : '❌'} Has form`);
    console.log(`  ${spoContent.includes('payment') ? '✅' : '❌'} Has payment logic`);
    
    if (!spoContent.includes('social-optimizer-app.js')) {
        fileIssues.push('SPO missing app.js - tool cannot work');
    }
}

// Check Job Search
if (fs.existsSync('jobs.html')) {
    const jobsContent = fs.readFileSync('jobs.html', 'utf8');
    console.log('\nJOB SEARCH CHECKS:');
    console.log(`  ${jobsContent.includes('job-api-client.js') ? '✅' : '❌'} Has API client`);
    console.log(`  ${jobsContent.includes('<form') ? '✅' : '❌'} Has search form`);
    console.log(`  ${jobsContent.includes('function') ? '✅' : '❌'} Has JavaScript functions`);
    
    if (!jobsContent.includes('function')) {
        fileIssues.push('Job Search has no JavaScript - cannot work');
    }
}

// Check Admin Panel
if (fs.existsSync('admin-control-panel.html')) {
    const adminContent = fs.readFileSync('admin-control-panel.html', 'utf8');
    console.log('\nADMIN PANEL CHECKS:');
    console.log(`  ${adminContent.includes('Cloudflare Access') ? '✅' : '❌'} Mentions Cloudflare Access`);
    console.log(`  ${adminContent.includes('password') ? '⚠️' : '✅'} ${adminContent.includes('password') ? 'Still has password code' : 'No password code'}`);
    console.log(`  ${adminContent.includes('dashboard') ? '✅' : '❌'} Has dashboard`);
    
    if (adminContent.includes('password') && adminContent.includes('prompt')) {
        fileIssues.push('Admin Panel still has password prompts - should use Cloudflare Access only');
    }
}

console.log('\n📋 STEP 5: CHECK LINKS CONSISTENCY\n');

// Check if all pages link to critical pages
const criticalLinks = [
    { name: 'Blog', href: 'blog.html' },
    { name: 'SPO', href: 'spo.html' },
    { name: 'Jobs', href: 'jobs.html' },
    { name: 'Reports', href: 'market-reports.html' }
];

let pagesChecked = 0;
const linkCoverage = {};

criticalLinks.forEach(link => {
    linkCoverage[link.name] = 0;
});

allHtmlFiles.slice(0, 20).forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    pagesChecked++;
    
    criticalLinks.forEach(link => {
        if (content.includes(link.href)) {
            linkCoverage[link.name]++;
        }
    });
});

console.log(`Checked ${pagesChecked} pages for critical links:`);
Object.keys(linkCoverage).forEach(name => {
    const coverage = Math.round((linkCoverage[name] / pagesChecked) * 100);
    console.log(`  ${name}: ${linkCoverage[name]}/${pagesChecked} pages (${coverage}%)`);
    
    if (coverage < 80) {
        fileIssues.push(`${name} link missing from ${100-coverage}% of pages`);
    }
});

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📊 DIAGNOSTIC SUMMARY');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('FILE ISSUES (Can fix locally):');
if (fileIssues.length === 0) {
    console.log('  ✅ No file issues found');
} else {
    fileIssues.forEach((issue, i) => {
        console.log(`  ${i+1}. ❌ ${issue}`);
    });
}

console.log('\nSERVER ISSUES (Need Cloudflare/deployment fix):');
console.log('  ⚠️  Cannot test server issues from local files');
console.log('  ⚠️  Need to test live site with browser DevTools');
console.log('  ⚠️  Check: https://onestepforthelife.com/spo.html');
console.log('  ⚠️  Check: https://onestepforthelife.com/jobs.html');
console.log('  ⚠️  Check: https://onestepforthelife.com/admin-control-panel.html');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('🎯 NEXT STEPS');
console.log('═══════════════════════════════════════════════════════════════\n');

if (fileIssues.length > 0) {
    console.log('1. FIX FILE ISSUES (found above)');
    console.log('2. Push fixes to GitHub');
    console.log('3. Wait for Cloudflare deployment');
    console.log('4. Test live site with browser');
} else {
    console.log('1. Files look OK locally');
    console.log('2. Problem is likely SERVER/DEPLOYMENT');
    console.log('3. Check Cloudflare Pages build logs');
    console.log('4. Check Cloudflare Access configuration');
    console.log('5. Purge Cloudflare cache');
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`Total file issues found: ${fileIssues.length}`);
console.log('═══════════════════════════════════════════════════════════════\n');

// Save report
const report = {
    timestamp: new Date().toISOString(),
    domain: DOMAIN,
    fileIssues: fileIssues,
    serverIssues: ['Cannot test from local - need live site testing'],
    criticalPages: criticalPages,
    linkCoverage: linkCoverage,
    totalHtmlFiles: allHtmlFiles.length,
    pagesWithNavigation: pagesWithNav,
    pagesWithFooter: pagesWithFooter
};

fs.writeFileSync('DIAGNOSTIC_REPORT_DEC6.json', JSON.stringify(report, null, 2));
console.log('📄 Full report saved to: DIAGNOSTIC_REPORT_DEC6.json\n');
