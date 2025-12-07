// Check Blog Visibility on Live Site
// December 5, 2025

const https = require('https');

console.log('🔍 CHECKING BLOG VISIBILITY ON LIVE SITE...\n');

const checks = [
    {
        name: 'Homepage has blog section',
        url: 'https://onestepforthelife.com/',
        test: (html) => html.includes('Latest from LinkedIn') || html.includes('📝 Latest Insights')
    },
    {
        name: 'Navigation has blog link',
        url: 'https://onestepforthelife.com/',
        test: (html) => html.includes('href="/blog.html"') || html.includes('href="blog.html"')
    },
    {
        name: 'Blog page exists',
        url: 'https://onestepforthelife.com/blog.html',
        test: (html) => html.includes('Blog & Insights') || html.includes('blog-post')
    },
    {
        name: 'Blog posts exist',
        url: 'https://onestepforthelife.com/blog-post-1.html',
        test: (html) => html.length > 1000
    }
];

async function checkUrl(check) {
    return new Promise((resolve) => {
        https.get(check.url, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const passed = check.test(data);
                resolve({
                    name: check.name,
                    url: check.url,
                    passed: passed,
                    status: res.statusCode
                });
            });
        }).on('error', (err) => {
            resolve({
                name: check.name,
                url: check.url,
                passed: false,
                error: err.message
            });
        });
    });
}

async function runChecks() {
    const results = [];
    
    for (const check of checks) {
        const result = await checkUrl(check);
        results.push(result);
        
        const icon = result.passed ? '✅' : '❌';
        console.log(`${icon} ${result.name}`);
        console.log(`   URL: ${result.url}`);
        console.log(`   Status: ${result.status || 'ERROR'}`);
        if (result.error) {
            console.log(`   Error: ${result.error}`);
        }
        console.log('');
    }
    
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    
    console.log('═══════════════════════════════════════');
    console.log(`RESULTS: ${passed}/${total} checks passed`);
    console.log('═══════════════════════════════════════\n');
    
    if (passed === total) {
        console.log('✅ ALL CHECKS PASSED - Blog is visible!');
        console.log('\nIf user still can\'t see blog:');
        console.log('1. Clear browser cache');
        console.log('2. Try incognito/private mode');
        console.log('3. Check different device');
    } else {
        console.log('❌ ISSUES FOUND:');
        results.filter(r => !r.passed).forEach(r => {
            console.log(`   - ${r.name}`);
        });
        console.log('\nNEXT STEPS:');
        console.log('1. Push latest changes to GitHub');
        console.log('2. Wait 2-3 minutes for Cloudflare Pages deployment');
        console.log('3. Run this check again');
    }
}

runChecks();
