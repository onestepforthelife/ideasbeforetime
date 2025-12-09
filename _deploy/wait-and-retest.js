// WAIT AND RE-TEST - Checks every 30 seconds

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

async function testURL(test) {
    return new Promise((resolve) => {
        https.get(test.url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve(data.includes(test.check));
            });
        }).on('error', () => resolve(false));
    });
}

async function runTests() {
    let passed = 0;
    for (const test of tests) {
        const result = await testURL(test);
        console.log(`${result ? '✅' : '❌'} ${test.name}`);
        if (result) passed++;
    }
    return passed;
}

async function waitAndTest() {
    console.log('🔄 WAITING FOR DEPLOYMENT...\n');
    console.log('Testing every 30 seconds (max 5 minutes)...\n');
    
    for (let i = 1; i <= 10; i++) {
        console.log(`\n📍 Attempt ${i}/10 (${i * 30} seconds elapsed):`);
        const passed = await runTests();
        
        if (passed === 3) {
            console.log('\n✅ ALL TESTS PASSED!');
            console.log('✅ Deployment successful!');
            console.log('✅ Payment buttons are LIVE!');
            console.log('\n🎉 You can now accept payments at ₹21!\n');
            return;
        }
        
        if (i < 10) {
            console.log(`\n⏳ Waiting 30 seconds... (${passed}/3 passed)`);
            await new Promise(resolve => setTimeout(resolve, 30000));
        }
    }
    
    console.log('\n⚠️  Still not live after 5 minutes');
    console.log('⚠️  Please check:');
    console.log('   1. Cloudflare dashboard deployment status');
    console.log('   2. Purge Cloudflare cache manually');
    console.log('   3. Check GitHub Actions for errors\n');
}

waitAndTest();
