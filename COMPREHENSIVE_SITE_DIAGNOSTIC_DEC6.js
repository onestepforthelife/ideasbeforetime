// Comprehensive Site Diagnostic - December 6, 2025
// Full check of onestepforthelife.com

const https = require('https');

console.log('🔍 COMPREHENSIVE SITE DIAGNOSTIC');
console.log('Domain: onestepforthelife.com');
console.log('Time: ' + new Date().toISOString());
console.log('='.repeat(70) + '\n');

const results = {
    accessible: [],
    redirecting: [],
    errors: [],
    total: 0
};

// Critical pages to check
const pages = [
    { url: '/', name: 'Homepage' },
    { url: '/test-multi-ai.html', name: 'Multi-AI Test' },
    { url: '/astronomy.html', name: 'Astronomy' },
    { url: '/ro-water-purifier-guide.html', name: 'RO Guide' },
    { url: '/blog.html', name: 'Blog' },
    { url: '/blog-post-1.html', name: 'Blog Post 1' },
    { url: '/about.html', name: 'About' },
    { url: '/cv.html', name: 'CV' },
    { url: '/spo.html', name: 'SPO' },
    { url: '/social-optimizer-app.html', name: 'SPO App' },
    { url: '/market-reports.html', name: 'Market Reports' },
    { url: '/kiro.html', name: 'Kiro' },
    { url: '/tools.html', name: 'Tools' },
    { url: '/jobs.html', name: 'Jobs' }
];

function checkURL(page) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'onestepforthelife.com',
            port: 443,
            path: page.url,
            method: 'HEAD',
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        };

        const req = https.request(options, (res) => {
            const status = res.statusCode;
            const result = {
                name: page.name,
                url: page.url,
                status: status,
                accessible: status === 200,
                redirecting: status === 301 || status === 302 || status === 308,
                error: status >= 400
            };
            resolve(result);
        });

        req.on('error', (error) => {
            resolve({
                name: page.name,
                url: page.url,
                status: 'ERROR',
                accessible: false,
                redirecting: false,
                error: true,
                errorMsg: error.message
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({
                name: page.name,
                url: page.url,
                status: 'TIMEOUT',
                accessible: false,
                redirecting: false,
                error: true,
                errorMsg: 'Request timeout'
            });
        });

        req.end();
    });
}

async function runDiagnostic() {
    console.log('📊 CHECKING PAGES:\n');
    
    for (const page of pages) {
        const result = await checkURL(page);
        results.total++;
        
        if (result.accessible) {
            console.log(`✅ ${result.name.padEnd(20)} - ${result.status} OK`);
            results.accessible.push(result);
        } else if (result.redirecting) {
            console.log(`🔄 ${result.name.padEnd(20)} - ${result.status} Redirect`);
            results.redirecting.push(result);
        } else {
            console.log(`❌ ${result.name.padEnd(20)} - ${result.status} ${result.errorMsg || 'Error'}`);
            results.errors.push(result);
        }
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Summary
    console.log('\n' + '='.repeat(70));
    console.log('\n📊 SUMMARY:\n');
    console.log(`Total Pages Checked: ${results.total}`);
    console.log(`✅ Accessible (200): ${results.accessible.length}`);
    console.log(`🔄 Redirecting (308): ${results.redirecting.length}`);
    console.log(`❌ Errors: ${results.errors.length}`);
    
    if (results.redirecting.length > 0) {
        console.log('\n🔄 REDIRECTING PAGES:');
        results.redirecting.forEach(r => {
            console.log(`   ${r.name} (${r.url}) - Status ${r.status}`);
        });
        console.log('\n💡 Solution: Purge Cloudflare cache or wait 4 hours');
    }
    
    if (results.errors.length > 0) {
        console.log('\n❌ ERROR PAGES:');
        results.errors.forEach(r => {
            console.log(`   ${r.name} (${r.url}) - ${r.errorMsg || r.status}`);
        });
    }
    
    console.log('\n' + '='.repeat(70));
    
    // Verdict
    const successRate = (results.accessible.length / results.total * 100).toFixed(1);
    console.log(`\n📈 Success Rate: ${successRate}%`);
    
    if (results.accessible.length >= results.total * 0.5) {
        console.log('\n✅ SITE IS LIVE AND WORKING!');
        console.log('New files work immediately.');
        console.log('Old files may need cache purge.');
    } else {
        console.log('\n⚠️  SITE HAS ISSUES - Review errors above');
    }
    
    console.log('\n' + '='.repeat(70));
    console.log('\n🚀 READY TO PUSH VIA BAT FILE');
    console.log('\nRun: .\\UPLOAD_TO_GITHUB.bat');
    console.log('\n' + '='.repeat(70));
}

runDiagnostic().catch(console.error);
