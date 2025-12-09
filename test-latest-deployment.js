#!/usr/bin/env node

const https = require('https');

const deploymentUrl = 'https://412e8206.ideasbeforetime.pages.dev';

const tests = [
    { page: '/index.html', check: 'Ideas Before Time' },
    { page: '/social-optimizer-app.html', check: 'Pay ₹21 Now' },
    { page: '/astronomy.html', check: 'Pay ₹21 Now' }
];

console.log(`🔍 Testing Latest Deployment: ${deploymentUrl}\n`);

async function test(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({ data, status: res.statusCode });
            });
        }).on('error', (err) => {
            resolve({ error: err.message, status: 0 });
        });
    });
}

async function runTests() {
    let passed = 0;
    
    for (const t of tests) {
        const result = await test(deploymentUrl + t.page);
        const found = result.data && result.data.includes(t.check);
        
        console.log(`${found ? '✅' : '❌'} ${t.page}`);
        console.log(`   Status: ${result.status}`);
        console.log(`   Check: "${t.check}" - ${found ? 'FOUND' : 'NOT FOUND'}`);
        console.log();
        
        if (found) passed++;
    }
    
    console.log(`\n📊 Result: ${passed}/${tests.length} tests passed\n`);
    
    if (passed === tests.length) {
        console.log('✅ ALL TESTS PASSED!');
        console.log('✅ Deployment is working correctly');
        console.log('\n💡 This deployment is ready to be promoted to production');
        console.log(`💡 Production URL: https://onestepforthelife.com\n`);
    }
}

runTests();
