const https = require('https');

console.log('Checking blog posts on live site...\n');

const baseUrl = 'https://ideasbeforetime.pages.dev';
const postsToCheck = [1, 2, 3, 50, 100]; // Sample posts

let results = { success: 0, fail: 0 };

function checkPost(num) {
    return new Promise((resolve) => {
        const url = `${baseUrl}/blog-post-${num}.html`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`✅ blog-post-${num}.html: ${res.statusCode} OK`);
                results.success++;
            } else {
                console.log(`❌ blog-post-${num}.html: ${res.statusCode}`);
                results.fail++;
            }
            resolve();
        }).on('error', (err) => {
            console.log(`❌ blog-post-${num}.html: ${err.message}`);
            results.fail++;
            resolve();
        });
    });
}

async function checkAll() {
    for (const num of postsToCheck) {
        await checkPost(num);
    }
    
    console.log(`\n📊 Results: ${results.success}/${postsToCheck.length} accessible`);
    
    if (results.success === postsToCheck.length) {
        console.log('✅ All blog posts are LIVE!');
    } else {
        console.log('⚠️  Some blog posts not accessible yet');
    }
}

checkAll();
