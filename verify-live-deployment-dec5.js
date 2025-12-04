const https = require('https');

console.log('═══════════════════════════════════════════════════════════');
console.log('  🌐 LIVE SITE VERIFICATION - December 5, 2025');
console.log('═══════════════════════════════════════════════════════════\n');

const baseUrl = 'https://onestepforthelife.com';

// Key pages to check
const pagesToCheck = [
    { path: '/', name: 'Homepage' },
    { path: '/about.html', name: 'About' },
    { path: '/blog.html', name: 'Blog' },
    { path: '/cv.html', name: 'CV' },
    { path: '/market-reports.html', name: 'Market Reports' },
    { path: '/request-access.html', name: 'Request Access' },
    { path: '/family-lifetime-timeline.html', name: 'Family Timeline' },
    { path: '/family-prediction-report.html', name: 'Family Prediction' },
    { path: '/ro.html', name: 'RO Water Purifier' },
    { path: '/ro-water-purifier-guide.html', name: 'RO Guide' },
    { path: '/ro-service-checklist.html', name: 'RO Service Checklist' }
];

let results = {
    accessible: [],
    notAccessible: [],
    errors: []
};

function checkPage(url, name) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                results.accessible.push({ name, url, status: res.statusCode });
                console.log(`✅ ${name}: ${res.statusCode} OK`);
            } else {
                results.notAccessible.push({ name, url, status: res.statusCode });
                console.log(`⚠️  ${name}: ${res.statusCode}`);
            }
            resolve();
        }).on('error', (err) => {
            results.errors.push({ name, url, error: err.message });
            console.log(`❌ ${name}: ${err.message}`);
            resolve();
        });
    });
}

async function verifyAll() {
    console.log('🔍 Checking key pages...\n');
    
    for (const page of pagesToCheck) {
        await checkPage(baseUrl + page.path, page.name);
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('📊 VERIFICATION SUMMARY:');
    console.log('═══════════════════════════════════════════════════════════\n');
    
    console.log(`✅ Accessible: ${results.accessible.length}/${pagesToCheck.length}`);
    console.log(`⚠️  Issues: ${results.notAccessible.length}`);
    console.log(`❌ Errors: ${results.errors.length}`);
    
    if (results.notAccessible.length > 0) {
        console.log('\n⚠️  PAGES WITH ISSUES:');
        results.notAccessible.forEach(p => {
            console.log(`   - ${p.name}: Status ${p.status}`);
        });
    }
    
    if (results.errors.length > 0) {
        console.log('\n❌ PAGES WITH ERRORS:');
        results.errors.forEach(p => {
            console.log(`   - ${p.name}: ${p.error}`);
        });
    }
    
    console.log('\n═══════════════════════════════════════════════════════════');
    
    if (results.accessible.length === pagesToCheck.length) {
        console.log('✅ ALL PAGES ACCESSIBLE - DEPLOYMENT SUCCESSFUL!');
    } else {
        console.log('⚠️  SOME PAGES HAVE ISSUES - CHECK ABOVE');
    }
    
    console.log('═══════════════════════════════════════════════════════════\n');
}

verifyAll();
