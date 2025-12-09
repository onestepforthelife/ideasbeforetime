const https = require('https');

console.log('═══════════════════════════════════════════════════════════');
console.log('  🔄 REDIRECT CHECKER - December 5, 2025');
console.log('═══════════════════════════════════════════════════════════\n');

const baseUrl = 'https://ideasbeforetime.pages.dev';

const pagesToCheck = [
    '/about.html',
    '/blog.html',
    '/cv.html',
    '/market-reports.html',
    '/request-access.html',
    '/ro-water-purifier-guide.html'
];

function checkRedirect(path) {
    return new Promise((resolve) => {
        const url = baseUrl + path;
        
        https.get(url, { 
            headers: { 'User-Agent': 'Mozilla/5.0' }
        }, (res) => {
            console.log(`\n📄 ${path}`);
            console.log(`   Status: ${res.statusCode}`);
            
            if (res.statusCode === 308 || res.statusCode === 301 || res.statusCode === 302) {
                console.log(`   ➡️  Redirects to: ${res.headers.location}`);
                
                // Follow redirect
                if (res.headers.location) {
                    const redirectUrl = res.headers.location.startsWith('http') 
                        ? res.headers.location 
                        : baseUrl + res.headers.location;
                    
                    https.get(redirectUrl, (res2) => {
                        console.log(`   Final Status: ${res2.statusCode}`);
                        resolve();
                    }).on('error', (err) => {
                        console.log(`   ❌ Error following redirect: ${err.message}`);
                        resolve();
                    });
                } else {
                    resolve();
                }
            } else if (res.statusCode === 200) {
                console.log(`   ✅ Accessible directly`);
                resolve();
            } else {
                console.log(`   ⚠️  Unexpected status`);
                resolve();
            }
        }).on('error', (err) => {
            console.log(`\n📄 ${path}`);
            console.log(`   ❌ Error: ${err.message}`);
            resolve();
        });
    });
}

async function checkAll() {
    for (const path of pagesToCheck) {
        await checkRedirect(path);
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ REDIRECT CHECK COMPLETE');
    console.log('═══════════════════════════════════════════════════════════\n');
}

checkAll();
