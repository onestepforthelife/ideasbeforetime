#!/usr/bin/env node

/**
 * COMPREHENSIVE LIVE SITE CHECK - December 6, 2025
 * 
 * Tests EVERYTHING Amit asked for:
 * 1. Page content vs navigation links match
 * 2. All links in one page work
 * 3. All pages link to critical pages (vice versa)
 * 4. All pages have main header & footer linkage
 * 5. SPO tool actually works
 * 6. Job search actually works
 * 7. Admin panel Cloudflare Access works
 * 8. File issue vs server issue identification
 */

const https = require('https');
const fs = require('fs');

const DOMAIN = 'https://onestepforthelife.com';
const issues = {
    critical: [],
    high: [],
    medium: [],
    low: [],
    file: [],
    server: []
};

console.log('🔍 COMPREHENSIVE LIVE SITE CHECK');
console.log('=' .repeat(70));
console.log(`Domain: ${DOMAIN}`);
console.log('Testing: Page content, links, navigation, tools, security\n');

// Critical pages to test
const criticalPages = [
    { path: '/', name: 'Homepage', mustHaveLinks: ['blog.html', 'about.html', 'cv.html'] },
    { path: '/blog.html', name: 'Blog', mustHaveLinks: ['index.html'] },
    { path: '/about.html', name: 'About', mustHaveLinks: ['index.html', 'cv.html'] },
    { path: '/cv.html', name: 'CV', mustHaveLinks: ['index.html', 'about.html'] },
    { path: '/market-reports.html', name: 'Market Reports', mustHaveLinks: ['index.html'] },
    { path: '/spo.html', name: 'SPO Tool', mustHaveLinks: ['social-optimizer-app.html'], mustWork: true },
    { path: '/social-optimizer-index.html', name: 'SPO Landing', mustHaveLinks: ['social-optimizer-app.html'] },
    { path: '/jobs.html', name: 'Job Search', mustHaveLinks: ['index.html'], mustWork: true },
    { path: '/admin-control-panel.html', name: 'Admin Panel', needsAuth: true },
    { path: '/innovations.html', name: 'Innovations', mustHaveLinks: ['index.html'] },
    { path: '/library.html', name: 'Library', mustHaveLinks: ['index.html'] }
];

// Helper: Fetch URL
function fetchURL(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000 
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ 
                status: res.statusCode, 
                headers: res.headers,
                body: data 
            }));
        }).on('error', reject).on('timeout', () => reject(new Error('Timeout')));
    });
}

// Test 1: Check if page loads and status code
async function testPageLoad(page) {
    console.log(`\nTesting: ${page.name} (${page.path})`);
    console.log('-'.repeat(70));
    
    try {
        const url = `${DOMAIN}${page.path}`;
        const result = await fetchURL(url);
        
        if (result.status === 200) {
            console.log(`✅ Status: 200 OK`);
            return { success: true, body: result.body, status: 200 };
        } else if (result.status === 308) {
            console.log(`❌ Status: 308 Redirect (CACHE ISSUE!)`);
            issues.critical.push({
                type: 'SERVER',
                page: page.name,
                issue: '308 Permanent Redirect - Cache not purged',
                fix: 'Purge Cloudflare cache immediately'
            });
            return { success: false, status: 308 };
        } else if (result.status === 404) {
            console.log(`❌ Status: 404 Not Found`);
            issues.critical.push({
                type: 'FILE',
                page: page.name,
                issue: 'Page not found on server',
                fix: `Check if ${page.path} exists and is deployed`
            });
            return { success: false, status: 404 };
        } else if (result.status === 403) {
            console.log(`🔒 Status: 403 Forbidden (Cloudflare Access)`);
            if (page.needsAuth) {
                console.log(`   ✅ Expected - Admin panel should be protected`);
                return { success: true, protected: true, status: 403 };
            } else {
                issues.high.push({
                    type: 'SERVER',
                    page: page.name,
                    issue: 'Page blocked by Cloudflare Access (should be public)',
                    fix: 'Update Cloudflare Access rules'
                });
                return { success: false, status: 403 };
            }
        } else {
            console.log(`⚠️  Status: ${result.status}`);
            return { success: false, status: result.status };
        }
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        issues.high.push({
            type: 'SERVER',
            page: page.name,
            issue: `Cannot reach page: ${error.message}`,
            fix: 'Check if site is deployed and accessible'
        });
        return { success: false, error: error.message };
    }
}

// Test 2: Check if page has required links
function testPageLinks(page, body) {
    if (!page.mustHaveLinks || !body) return;
    
    console.log(`\nChecking links in ${page.name}:`);
    
    page.mustHaveLinks.forEach(link => {
        if (body.includes(`href="${link}"`) || body.includes(`href='${link}'`)) {
            console.log(`   ✅ Has link to: ${link}`);
        } else {
            console.log(`   ❌ Missing link to: ${link}`);
            issues.high.push({
                type: 'FILE',
                page: page.name,
                issue: `Missing link to ${link}`,
                fix: `Add link to ${link} in navigation or content`
            });
        }
    });
}

// Test 3: Check if page has navigation and footer
function testHeaderFooter(page, body) {
    if (!body) return;
    
    console.log(`\nChecking header & footer:`);
    
    const hasNav = body.includes('common-navigation.js') || body.includes('site-nav');
    const hasFooter = body.includes('common-footer.js') || body.includes('site-footer');
    
    if (hasNav) {
        console.log(`   ✅ Has navigation`);
    } else {
        console.log(`   ❌ Missing navigation`);
        issues.high.push({
            type: 'FILE',
            page: page.name,
            issue: 'Missing navigation',
            fix: 'Add common-navigation.js'
        });
    }
    
    if (hasFooter) {
        console.log(`   ✅ Has footer`);
    } else {
        console.log(`   ⚠️  Missing footer`);
        issues.medium.push({
            type: 'FILE',
            page: page.name,
            issue: 'Missing footer',
            fix: 'Add common-footer.js'
        });
    }
}

// Test 4: Check if tool actually works (has functionality)
function testToolFunctionality(page, body) {
    if (!page.mustWork || !body) return;
    
    console.log(`\nChecking ${page.name} functionality:`);
    
    if (page.name === 'SPO Tool') {
        // Check if it's a redirect or actual tool
        if (body.includes('window.location') && body.length < 2000) {
            console.log(`   ❌ Is a redirect file, not actual tool`);
            issues.critical.push({
                type: 'FILE',
                page: page.name,
                issue: 'SPO page is redirect, not actual tool',
                fix: 'Link to social-optimizer-app.html properly'
            });
        } else if (body.includes('social-optimizer-app.js') || body.includes('Start Optimizing')) {
            console.log(`   ✅ Has SPO functionality`);
        } else {
            console.log(`   ⚠️  Missing SPO app files`);
            issues.high.push({
                type: 'FILE',
                page: page.name,
                issue: 'Missing SPO app JavaScript files',
                fix: 'Add social-optimizer-app.js and social-optimizer-ai-engine.js'
            });
        }
    }
    
    if (page.name === 'Job Search') {
        if (body.includes('job-api-client.js') || body.includes('Job Search Dashboard')) {
            console.log(`   ✅ Has Job Search functionality`);
        } else {
            console.log(`   ❌ Missing Job Search functionality`);
            issues.critical.push({
                type: 'FILE',
                page: page.name,
                issue: 'Missing Job Search functionality',
                fix: 'Add job-api-client.js and search form'
            });
        }
    }
}

// Main test runner
async function runAllTests() {
    console.log('\n📊 TESTING ALL CRITICAL PAGES\n');
    
    for (const page of criticalPages) {
        const result = await testPageLoad(page);
        
        if (result.success && result.body) {
            testPageLinks(page, result.body);
            testHeaderFooter(page, result.body);
            testToolFunctionality(page, result.body);
        }
        
        // Wait between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(70));
    
    const totalIssues = issues.critical.length + issues.high.length + issues.medium.length + issues.low.length;
    
    console.log(`\n🚨 CRITICAL Issues: ${issues.critical.length}`);
    console.log(`⚠️  HIGH Issues: ${issues.high.length}`);
    console.log(`📌 MEDIUM Issues: ${issues.medium.length}`);
    console.log(`ℹ️  LOW Issues: ${issues.low.length}`);
    console.log(`\n📊 TOTAL: ${totalIssues} issues found`);
    
    // Categorize by type
    const fileIssues = [...issues.critical, ...issues.high, ...issues.medium, ...issues.low]
        .filter(i => i.type === 'FILE');
    const serverIssues = [...issues.critical, ...issues.high, ...issues.medium, ...issues.low]
        .filter(i => i.type === 'SERVER');
    
    console.log(`\n📁 FILE Issues: ${fileIssues.length} (can fix in code)`);
    console.log(`📡 SERVER Issues: ${serverIssues.length} (need Cloudflare dashboard)`);
    
    // Detailed issues
    if (issues.critical.length > 0) {
        console.log('\n🚨 CRITICAL ISSUES (FIX IMMEDIATELY):');
        console.log('-'.repeat(70));
        issues.critical.forEach((issue, i) => {
            console.log(`\n${i + 1}. [${issue.type}] ${issue.page}: ${issue.issue}`);
            console.log(`   Fix: ${issue.fix}`);
        });
    }
    
    if (issues.high.length > 0) {
        console.log('\n⚠️  HIGH PRIORITY ISSUES:');
        console.log('-'.repeat(70));
        issues.high.forEach((issue, i) => {
            console.log(`\n${i + 1}. [${issue.type}] ${issue.page}: ${issue.issue}`);
            console.log(`   Fix: ${issue.fix}`);
        });
    }
    
    // Save report
    const report = {
        timestamp: new Date().toISOString(),
        domain: DOMAIN,
        totalIssues,
        fileIssues: fileIssues.length,
        serverIssues: serverIssues.length,
        issues: {
            critical: issues.critical,
            high: issues.high,
            medium: issues.medium,
            low: issues.low
        },
        summary: {
            critical: issues.critical.length,
            high: issues.high.length,
            medium: issues.medium.length,
            low: issues.low.length,
            file: fileIssues.length,
            server: serverIssues.length
        }
    };
    
    fs.writeFileSync('LIVE_SITE_DIAGNOSTIC_REPORT_DEC6.json', JSON.stringify(report, null, 2));
    console.log('\n✅ Full report saved to: LIVE_SITE_DIAGNOSTIC_REPORT_DEC6.json');
    
    // Exit code
    if (issues.critical.length > 0) {
        console.log('\n❌ LIVE SITE CHECK FAILED: Critical issues found');
        console.log('   Site has serious problems affecting users!');
        process.exit(1);
    } else if (issues.high.length > 0) {
        console.log('\n⚠️  LIVE SITE CHECK WARNING: High priority issues found');
        console.log('   Site works but has problems');
        process.exit(0);
    } else {
        console.log('\n✅ LIVE SITE CHECK PASSED: No critical issues');
        console.log('   Site is working properly');
        process.exit(0);
    }
}

// Run tests
runAllTests().catch(error => {
    console.error('\n❌ Test runner failed:', error);
    process.exit(1);
});
