// TEST NEW DEPLOYMENT URL
const https = require('https');

const newDeploymentURL = 'https://8204aa14.ideasbeforetime.pages.dev';

const tests = [
    {
        name: 'SPO Payment Button',
        url: `${newDeploymentURL}/social-optimizer-app.html`,
        check: 'Pay ₹21 Now'
    },
    {
        name: 'Astronomy Payment Button',
        url: `${newDeploymentURL}/astronomy.html`,
        check: 'Pay ₹21 Now'
    },
    {
        name: 'Business News Auto-Update',
        url: `${newDeploymentURL}/business-news.html`,
        check: 'business-insights-auto-updater.js'
    }
];

console.log('🔍 TESTING NEW DEPLOYMENT...\n');
console.log(`URL: ${newDeploymentURL}\n`);

async function testURL(test) {
    return new Promise((resolve) => {
        https.get(test.url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const found = data.includes(test.check);
                console.log(`${found ? '✅' : '❌'} ${test.name}`);
                if (found) {
                    console.log(`   ✅ FOUND: "${test.check}"`);
                } else {
                    console.log(`   ❌ NOT FOUND: "${test.check}"`);
                }
                console.log('');
                resolve(found);
            });
        }).on('error', (err) => {
            console.log(`❌ ${test.name} - Error: ${err.message}\n`);
            resolve(false);
        });
    });
}

async function runTests() {
    let passed = 0;
    for (const test of tests) {
        if (await testURL(test)) passed++;
    }
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log(`\n📊 RESULTS: ${passed}/${tests.length} tests passed\n`);
    
    if (passed === tests.length) {
        console.log('🎉 ALL TESTS PASSED!');
        console.log('✅ Payment buttons are LIVE on Cloudflare!');
        console.log('\n📍 Your new deployment URL:');
        console.log(`   ${newDeploymentURL}`);
        console.log('\n⚠️  Custom domain (onestepforthelife.com) will update in 5-10 minutes');
        console.log('⚠️  Or set this as production deployment in Cloudflare dashboard\n');
    } else {
        console.log('⚠️  Some tests failed');
        console.log('⚠️  Wait 1-2 minutes and run again\n');
    }
    
    console.log('═══════════════════════════════════════════════════════════════');
}

runTests();
