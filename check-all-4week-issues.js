#!/usr/bin/env node

const https = require('https');

const issues = [
    // Week 1-2: Navigation/Footer consistency
    { check: 'navigation', pages: ['blog', 'about', 'cv', 'jobs', 'market-reports'] },
    // Week 2-3: Purple colors removed
    { check: 'purple', files: ['*.html', '*.css', '*.js'] },
    // Week 3: Double headers
    { check: 'double-headers', pages: ['all'] },
    // Week 3-4: Blue backgrounds
    { check: 'blue-bg', pages: ['blog', 'linkedin'] },
    // Week 4: 308 redirects
    { check: '308-redirects', pages: ['blog', 'about', 'cv', 'jobs', 'market-reports', 'spo', 'innovations', 'library'] }
];

console.log('🔍 CHECKING ALL ISSUES FROM LAST 4 WEEKS\n');

const testUrl = (path) => {
    return new Promise((resolve) => {
        https.get(`https://onestepforthelife.com${path}`, { 
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            resolve({ path, status: res.statusCode });
        }).on('error', () => {
            resolve({ path, status: 'ERROR' });
        });
    });
};

(async () => {
    const results = {
        '308-redirects': [],
        'other-issues': []
    };

    // Test 308 redirects
    console.log('Testing 308 redirects...');
    const pages = ['/', '/blog', '/about', '/cv', '/jobs', '/market-reports', '/spo', '/innovations', '/library'];
    
    for (const page of pages) {
        const result = await testUrl(page);
        if (result.status === 308 || result.status === 302) {
            results['308-redirects'].push(result);
            console.log(`❌ ${page}: ${result.status}`);
        } else if (result.status === 200) {
            console.log(`✅ ${page}: 200 OK`);
        } else {
            console.log(`⚠️  ${page}: ${result.status}`);
        }
    }

    console.log('\n============================================================');
    console.log('📊 SUMMARY');
    console.log('============================================================');
    console.log(`308/302 Redirects: ${results['308-redirects'].length}`);
    
    if (results['308-redirects'].length > 0) {
        console.log('\n🚨 CRITICAL: Still have 308 redirects!');
        console.log('Root cause: Changes not pushed to GitHub yet');
        console.log('\nFIX:');
        console.log('1. git add .');
        console.log('2. git commit -m "Fix: Update all links to extensionless URLs"');
        console.log('3. git push');
        console.log('4. Wait 2-5 min for deployment');
        console.log('5. Purge Cloudflare cache');
        console.log('6. Wait 5-10 min');
        console.log('7. Test again');
    } else {
        console.log('\n✅ All pages working!');
    }
})();
