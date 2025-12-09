#!/usr/bin/env node

/**
 * CHECK DEPLOYMENT STATUS
 * Tests both the new deployment URL and production URL
 */

const https = require('https');

console.log('🔍 CHECKING DEPLOYMENT STATUS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

const urls = [
    {
        name: 'New Deployment',
        base: 'https://67fa2d6d.ideasbeforetime.pages.dev',
        tests: [
            { page: '/social-optimizer-app.html', check: 'Pay ₹21 Now' },
            { page: '/astronomy.html', check: 'Pay ₹21 Now' },
            { page: '/index.html', check: 'Ideas Before Time' }
        ]
    },
    {
        name: 'Production Site',
        base: 'https://onestepforthelife.com',
        tests: [
            { page: '/social-optimizer-app.html', check: 'Pay ₹21 Now' },
            { page: '/astronomy.html', check: 'Pay ₹21 Now' },
            { page: '/index.html', check: 'Ideas Before Time' }
        ]
    }
];

async function testURL(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({ data, statusCode: res.statusCode });
            });
        }).on('error', (err) => {
            resolve({ error: err.message, statusCode: 0 });
        });
    });
}

async function checkDeployment() {
    for (const site of urls) {
        console.log(`\n📍 ${site.name}: ${site.base}`);
        console.log('─────────────────────────────────────────────────────────────\n');
        
        let passed = 0;
        for (const test of site.tests) {
            const fullUrl = site.base + test.page;
            const result = await testURL(fullUrl);
            
            if (result.error) {
                console.log(`❌ ${test.page}`);
                console.log(`   Error: ${result.error}\n`);
            } else {
                const found = result.data.includes(test.check);
                console.log(`${found ? '✅' : '❌'} ${test.page}`);
                console.log(`   Status: ${result.statusCode}`);
                console.log(`   Check: "${test.check}" - ${found ? 'FOUND' : 'NOT FOUND'}\n`);
                if (found) passed++;
            }
        }
        
        console.log(`📊 Result: ${passed}/${site.tests.length} tests passed`);
    }
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('\n💡 NEXT STEPS:');
    console.log('   1. If new deployment works: Promote to production');
    console.log('   2. If production not updated: Wait 2-3 min for cache');
    console.log('   3. Or purge Cloudflare cache manually\n');
}

checkDeployment();
