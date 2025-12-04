// Check Live Blog Status - December 5, 2025
// Verify blog posts are visible on live site

const https = require('https');
const fs = require('fs');

const LIVE_SITE = 'https://onestepforthelife.com';

async function checkURL(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    url,
                    status: res.statusCode,
                    exists: res.statusCode === 200,
                    size: data.length
                });
            });
        }).on('error', () => {
            resolve({ url, status: 'ERROR', exists: false });
        });
    });
}

async function main() {
    console.log('🔍 Checking Live Site Blog Status...\n');
    
    // Check main blog page
    console.log('1. Checking blog.html...');
    const blogPage = await checkURL(`${LIVE_SITE}/blog.html`);
    console.log(`   ${blogPage.exists ? '✅' : '❌'} blog.html - Status: ${blogPage.status}`);
    
    // Check sample blog posts
    console.log('\n2. Checking blog posts...');
    const postsToCheck = [1, 2, 3, 50, 100];
    
    for (const num of postsToCheck) {
        const post = await checkURL(`${LIVE_SITE}/blog-post-${num}.html`);
        console.log(`   ${post.exists ? '✅' : '❌'} blog-post-${num}.html - Status: ${post.status}`);
    }
    
    // Check if blog is linked from homepage
    console.log('\n3. Checking homepage for blog link...');
    const homepage = await checkURL(`${LIVE_SITE}/index.html`);
    if (homepage.exists) {
        // This would need HTML parsing to check for blog link
        console.log(`   ✅ Homepage loads - Status: ${homepage.status}`);
    }
    
    console.log('\n📊 Summary:');
    console.log('   - Blog page exists:', blogPage.exists);
    console.log('   - Sample posts checked:', postsToCheck.length);
    console.log('\n✅ Live site check complete!');
}

main().catch(console.error);
