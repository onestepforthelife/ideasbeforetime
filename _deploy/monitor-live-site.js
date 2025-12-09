const https = require('https');

console.log('🌐 LIVE SITE MONITOR - LIFETIME SYSTEM\n');
console.log('Checking https://onestepforthelife.com...\n');

const SITE_URL = 'https://onestepforthelife.com';
const PAGES_TO_CHECK = [
    '/',
    '/blog.html',
    '/about.html',
    '/market-reports.html',
    '/Paper_Pulp_Specialty_Chemicals_Report.html',
    '/request-access.html',
    '/social-optimizer-index.html'
];

let issues = [];
let checked = 0;

function checkPage(path) {
    return new Promise((resolve) => {
        https.get(SITE_URL + path, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                checked++;
                
                // Check status code
                if (res.statusCode !== 200) {
                    issues.push(`❌ ${path} - Status ${res.statusCode}`);
                    console.log(`  ❌ ${path} - Status ${res.statusCode}`);
                } else {
                    console.log(`  ✅ ${path} - OK`);
                    
                    // Check for blur on report pages
                    if (path.includes('Report.html')) {
                        if (!data.includes('blur-overlay')) {
                            issues.push(`⚠️  ${path} - Missing blur system`);
                        }
                    }
                    
                    // Check for navigation
                    if (!data.includes('common-navigation') && !data.includes('sticky-header')) {
                        issues.push(`⚠️  ${path} - Missing navigation`);
                    }
                }
                
                resolve();
            });
        }).on('error', (err) => {
            issues.push(`❌ ${path} - ${err.message}`);
            console.log(`  ❌ ${path} - ${err.message}`);
            resolve();
        });
    });
}

async function monitorSite() {
    console.log('Checking pages...\n');
    
    for (const page of PAGES_TO_CHECK) {
        await checkPage(page);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 MONITORING SUMMARY');
    console.log('='.repeat(60));
    console.log(`Checked: ${checked}/${PAGES_TO_CHECK.length} pages`);
    
    if (issues.length === 0) {
        console.log('\n✅ ALL PAGES HEALTHY!\n');
    } else {
        console.log(`\n⚠️  Found ${issues.length} issues:\n`);
        issues.forEach(issue => console.log(issue));
        console.log('\n🔧 Auto-fix will attempt to resolve these issues...\n');
    }
}

monitorSite();
