#!/usr/bin/env node

const https = require('https');

const urls = [
    'https://412e8206.ideasbeforetime.pages.dev',
    'https://412e8206.ideasbeforetime.pages.dev/index',
    'https://412e8206.ideasbeforetime.pages.dev/social-optimizer-app',
    'https://onestepforthelife.com',
    'https://onestepforthelife.com/index',
    'https://onestepforthelife.com/social-optimizer-app'
];

console.log('🔍 Testing URLs (with and without .html extension)\n');

async function test(url) {
    return new Promise((resolve) => {
        const req = https.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0' },
            followRedirect: false
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                resolve({ 
                    status: res.statusCode, 
                    location: res.headers.location,
                    hasContent: data.length > 100,
                    contentLength: data.length
                });
            });
        });
        req.on('error', (err) => {
            resolve({ error: err.message });
        });
    });
}

async function runTests() {
    for (const url of urls) {
        const result = await test(url);
        
        if (result.error) {
            console.log(`❌ ${url}`);
            console.log(`   Error: ${result.error}\n`);
        } else {
            const icon = result.hasContent ? '✅' : '⚠️';
            console.log(`${icon} ${url}`);
            console.log(`   Status: ${result.status}`);
            if (result.location) console.log(`   Redirect: ${result.location}`);
            console.log(`   Content: ${result.contentLength} bytes\n`);
        }
    }
}

runTests();
