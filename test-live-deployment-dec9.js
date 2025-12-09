// TEST LIVE DEPLOYMENT - December 9, 2025
// Check if payment buttons are live

const https = require('https');

const tests = [
    {
        name: 'SPO Payment Button',
        url: 'https://onestepforthelife.com/social-optimizer-app.html',
        check: 'Pay ₹21 Now'
    },
    {
        name: 'Astronomy Payment Button',
        url: 'https://onestepforthelife.com/astronomy.html',
        check: 'Pay ₹21 Now'
    },
    {
        name: 'Business News Auto-Update',
        url: 'https://onestepforthelife.com/business-news.html',
        check: 'business-insights-auto-updater.js'
    }
];

console.log('🔍 TESTING LIVE DEPLOYMENT...\n');

async function testURL(test) {
    return new Promise((resolve) => {
        https.get(test.url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                const found = data.includes(test.check);
                console.log(`${found ? '✅' : '❌'} ${test.name}`);
                console.log(`   URL: ${test.url}`);
                console.log(`   Looking for: "${test.check}"`);
                console.log(`   Status: ${found ? 'FOUND' : 'NOT FOUND'}`);
                console.log('');
                resolve(found);
            });
        }).on('error', (err) => {
            console.log(`❌ ${test.name}`);
            console.log(`   Error: ${err.message}`);
            console.log('');
            resolve(false);
        });
    });
}

async function runTests() {
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    let passed = 0;
    for (const test of tests) {
        const result = await testURL(test);
        if (result) passed++;
    }
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📊 RESULTS: ${passed}/${tests.length} tests passed\n`);
    
    if (passed === tests.length) {
        console.log('✅ ALL TESTS PASSED - Deployment successful!');
        console.log('✅ Payment buttons are LIVE');
        console.log('✅ Business news auto-update is LIVE');
        console.log('\n🎉 You can now accept payments at ₹21!\n');
    } else {
        console.log('⚠️  SOME TESTS FAILED');
        console.log('⚠️  Wait 2-3 minutes for Cloudflare cache');
        console.log('⚠️  Then run this test again');
        console.log('\n💡 Or manually check the URLs above\n');
    }
    
    console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
