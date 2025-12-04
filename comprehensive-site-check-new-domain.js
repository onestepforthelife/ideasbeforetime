// Comprehensive Site Check - New Domain
// December 5, 2025 - Using onestepforthelife.com

const https = require('https');
const fs = require('fs');

console.log('🔍 COMPREHENSIVE SITE CHECK - NEW DOMAIN');
console.log('Domain: onestepforthelife.com');
console.log('=' .repeat(70));

const results = {
    success: [],
    warnings: [],
    errors: []
};

// Pages to check on live site
const pagesToCheck = [
    '/',
    '/test-multi-ai.html',
    '/ro-water-purifier-guide.html',
    '/astronomy.html',
    '/blog.html',
    '/blog-post-1.html',
    '/about.html',
    '/cv.html',
    '/spo.html',
    '/market-reports.html'
];

// Function to check if URL is accessible
function checkURL(url) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'onestepforthelife.com',
            port: 443,
            path: url,
            method: 'HEAD',
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            resolve({
                url: url,
                status: res.statusCode,
                success: res.statusCode === 200
            });
        });

        req.on('error', (error) => {
            resolve({
                url: url,
                status: 'ERROR',
                success: false,
                error: error.message
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                url: url,
                status: 'TIMEOUT',
                success: false,
                error: 'Request timeout'
            });
        });

        req.end();
    });
}

// Check local files
console.log('\n📦 LOCAL FILE CHECK:\n');

const localFiles = [
    'AI_MULTI_PROVIDER_FAILOVER.js',
    'test-multi-ai.html',
    'ro-water-purifier-guide.html',
    'astronomy.html',
    'blog.html',
    'index.html',
    'about.html',
    'cv.html',
    'spo.html',
    'market-reports.html'
];

localFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for API keys in AI file
        if (file === 'AI_MULTI_PROVIDER_FAILOVER.js') {
            const hasGroq = content.includes('gsk_1p8qGfJWoN3kLZyX4rT9WGJyb3FYvM2aKdH5cN6pQ7sR8tU0vW');
            const hasGemini = content.includes('AIzaSyBi2TD5oDtTLKax9cj1ClxLtZYQRg0s9a8');
            const hasHF = content.includes('hf_EgCNxQzKpLmRsVwYtBnDfGhIjKlMnOpQrStUvWxYz');
            const hasCohere = content.includes('2XLIvK9mNpQrStUvWxYzAbCdEfGhIjKlMn');
            
            if (hasGroq && hasGemini && hasHF && hasCohere) {
                results.success.push(`✅ ${file} - All 4 API keys present`);
            } else {
                results.errors.push(`❌ ${file} - Missing API keys`);
            }
        }
        
        // Check for old domain references
        if (content.includes('ideasbeforetime.pages.dev')) {
            results.warnings.push(`⚠️  ${file} - Contains old domain reference`);
        } else {
            results.success.push(`✅ ${file} - No old domain references`);
        }
    } else {
        results.errors.push(`❌ ${file} - File missing`);
    }
});

// Check live site
console.log('\n🌐 LIVE SITE CHECK:\n');
console.log('Checking https://onestepforthelife.com...\n');

async function checkLiveSite() {
    for (const page of pagesToCheck) {
        const result = await checkURL(page);
        
        if (result.success) {
            console.log(`✅ ${page} - Status ${result.status}`);
            results.success.push(`Live: ${page} accessible`);
        } else {
            console.log(`❌ ${page} - ${result.error || 'Status ' + result.status}`);
            results.errors.push(`Live: ${page} not accessible`);
        }
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Print summary
    console.log('\n' + '='.repeat(70));
    console.log('\n📊 SUMMARY:\n');
    console.log(`✅ Success: ${results.success.length}`);
    console.log(`⚠️  Warnings: ${results.warnings.length}`);
    console.log(`❌ Errors: ${results.errors.length}`);
    
    if (results.warnings.length > 0) {
        console.log('\n⚠️  WARNINGS:');
        results.warnings.forEach(w => console.log(`   ${w}`));
    }
    
    if (results.errors.length > 0) {
        console.log('\n❌ ERRORS:');
        results.errors.forEach(e => console.log(`   ${e}`));
    }
    
    console.log('\n' + '='.repeat(70));
    
    if (results.errors.length === 0) {
        console.log('\n🎉 ALL CHECKS PASSED!');
        console.log('\n✅ Ready to push via GitHub Desktop');
        console.log('✅ New domain: onestepforthelife.com');
        console.log('✅ Multi-provider AI configured');
        console.log('✅ All pages accessible');
    } else {
        console.log('\n⚠️  SOME CHECKS FAILED - Review errors above');
    }
    
    console.log('\n' + '='.repeat(70));
}

checkLiveSite().catch(console.error);
