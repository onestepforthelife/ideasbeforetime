#!/usr/bin/env node

/**
 * TEST 308 REDIRECT DETAILS
 * Shows exactly what's happening with the redirects
 */

const https = require('https');

const testURLs = [
    'https://onestepforthelife.com/blog.html',
    'https://onestepforthelife.com/about.html',
    'https://onestepforthelife.com/spo.html'
];

console.log('🔍 TESTING 308 REDIRECT DETAILS\n');
console.log('This will show WHERE the 308 redirects are pointing to\n');
console.log('='.repeat(70));

async function testURL(url) {
    return new Promise((resolve) => {
        console.log(`\n📍 Testing: ${url}`);
        console.log('-'.repeat(70));
        
        https.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            timeout: 10000
        }, (res) => {
            console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
            console.log(`\nResponse Headers:`);
            Object.keys(res.headers).forEach(key => {
                if (key === 'location' || key === 'cache-control' || key === 'cf-cache-status' || key === 'cf-ray') {
                    console.log(`  ${key}: ${res.headers[key]}`);
                }
            });
            
            if (res.statusCode === 308 && res.headers.location) {
                console.log(`\n🚨 REDIRECT TO: ${res.headers.location}`);
                console.log(`   This is the problem - it's redirecting instead of serving the page`);
            }
            
            if (res.headers['cf-cache-status']) {
                console.log(`\n💾 Cache Status: ${res.headers['cf-cache-status']}`);
                if (res.headers['cf-cache-status'] === 'HIT') {
                    console.log(`   ⚠️  Serving from cache - cache purge didn't work!`);
                } else if (res.headers['cf-cache-status'] === 'MISS') {
                    console.log(`   ✅ Not from cache - but still getting 308`);
                    console.log(`   This means: Page Rules or Transform Rules causing redirect`);
                }
            }
            
            resolve();
        }).on('error', (err) => {
            console.log(`❌ Error: ${err.message}`);
            resolve();
        });
    });
}

async function runTests() {
    for (const url of testURLs) {
        await testURL(url);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('📊 ANALYSIS\n');
    console.log('If you see:');
    console.log('  • "location: [URL]" → Shows where redirect is going');
    console.log('  • "cf-cache-status: HIT" → Cache purge didn\'t work');
    console.log('  • "cf-cache-status: MISS" → Not cache, check Page Rules');
    console.log('\nNext steps:');
    console.log('  1. Check Cloudflare Page Rules');
    console.log('  2. Check Cloudflare Transform Rules');
    console.log('  3. Enable Development Mode to bypass cache');
    console.log('  4. Force rebuild deployment');
}

runTests();
