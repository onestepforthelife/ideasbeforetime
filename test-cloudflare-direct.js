// TEST CLOUDFLARE DIRECT URL
const https = require('https');

const tests = [
    {
        name: 'SPO Payment Button',
        url: 'https://e8e86ae5.ideasbeforetime.pages.dev/social-optimizer-app.html',
        check: 'Pay ₹21 Now'
    },
    {
        name: 'Astronomy Payment Button',
        url: 'https://e8e86ae5.ideasbeforetime.pages.dev/astronomy.html',
        check: 'Pay ₹21 Now'
    }
];

console.log('🔍 TESTING CLOUDFLARE DIRECT URL...\n');

async function testURL(test) {
    return new Promise((resolve) => {
        https.get(test.url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const found = data.includes(test.check);
                console.log(`${found ? '✅' : '❌'} ${test.name}`);
                console.log(`   ${found ? 'FOUND' : 'NOT FOUND'}\n`);
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
        console.log('✅ DEPLOYMENT SUCCESSFUL!');
        console.log('✅ Payment buttons are working on Cloudflare URL!');
        console.log('\n⚠️  Custom domain (onestepforthelife.com) needs DNS update');
        console.log('⚠️  Or wait 5-10 minutes for propagation\n');
    }
}

runTests();
