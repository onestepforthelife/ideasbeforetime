// Comprehensive Live Site Check - Dec 5, 2025
// Checks all priority items on live site

const https = require('https');

const LIVE_SITE = 'https://onestepforthelife.com';

const checks = [
    // Blog visibility
    { name: 'Homepage has blog section', url: '/', check: (html) => html.includes('blog') || html.includes('Blog') },
    { name: 'Blog page exists', url: '/blog.html', check: (html) => html.includes('blog-post') },
    { name: 'Blog post 1 exists', url: '/blog-post-1.html', check: (html) => html.length > 1000 },
    { name: 'Blog post 50 exists', url: '/blog-post-50.html', check: (html) => html.length > 1000 },
    { name: 'Blog post 100 exists', url: '/blog-post-100.html', check: (html) => html.length > 1000 },
    
    // Admin passwords removed
    { name: 'Admin panel no password', url: '/admin-control-panel.html', check: (html) => !html.includes('password') && !html.includes('type="password"') },
    
    // Free tools working
    { name: 'Job tools page', url: '/job-tools.html', check: (html) => html.length > 1000 },
    { name: 'Email sender page', url: '/email-sender-web.html', check: (html) => html.length > 1000 },
    { name: 'LinkedIn tools page', url: '/linkedin.html', check: (html) => html.length > 1000 },
    { name: 'RO water guide page', url: '/ro.html', check: (html) => html.length > 1000 },
    
    // SPO working
    { name: 'SPO page exists', url: '/spo.html', check: (html) => html.includes('Social Profile Optimizer') },
    
    // Navigation consistency
    { name: 'About page navigation', url: '/about.html', check: (html) => html.includes('common-navigation') },
    { name: 'CV page navigation', url: '/cv.html', check: (html) => html.includes('common-navigation') },
];

function fetchPage(url) {
    return new Promise((resolve, reject) => {
        https.get(LIVE_SITE + url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, html: data }));
        }).on('error', reject);
    });
}

async function runChecks() {
    console.log('🔍 COMPREHENSIVE LIVE SITE CHECK\n');
    console.log(`Checking: ${LIVE_SITE}\n`);
    
    let passed = 0;
    let failed = 0;
    const failures = [];
    
    for (const check of checks) {
        try {
            const { status, html } = await fetchPage(check.url);
            
            if (status === 200 && check.check(html)) {
                console.log(`✅ ${check.name}`);
                passed++;
            } else {
                console.log(`❌ ${check.name} (Status: ${status})`);
                failed++;
                failures.push(check.name);
            }
        } catch (error) {
            console.log(`❌ ${check.name} (Error: ${error.message})`);
            failed++;
            failures.push(check.name);
        }
    }
    
    console.log('\n📊 SUMMARY:');
    console.log(`✅ Passed: ${passed}/${checks.length}`);
    console.log(`❌ Failed: ${failed}/${checks.length}`);
    
    if (failures.length > 0) {
        console.log('\n🚨 FAILURES:');
        failures.forEach(f => console.log(`   - ${f}`));
    }
    
    console.log('\n✅ Live site check complete!');
}

runChecks();
