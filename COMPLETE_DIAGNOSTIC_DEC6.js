// COMPLETE SITE DIAGNOSTIC - December 6, 2025
// Check: File content vs Live site vs Links vs Navigation

const https = require('https');
const fs = require('fs');

const criticalPages = [
    'index.html',
    'spo.html',
    'jobs.html',
    'admin-control-panel.html',
    'astronomy.html',
    'blog-post-1.html',
    'ro.html',
    'about.html'
];

const results = {
    timestamp: new Date().toISOString(),
    checks: []
};

function checkURL(url) {
    return new Promise((resolve) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    content: data.substring(0, 500)
                });
            });
        }).on('error', (err) => {
            resolve({ status: 'ERROR', error: err.message });
        });
    });
}

async function checkPage(filename) {
    const check = {
        file: filename,
        fileExists: false,
        fileContent: '',
        liveStatus: 0,
        liveContent: '',
        hasNavigation: false,
        hasFooter: false,
        isRedirect: false,
        issue: 'UNKNOWN'
    };

    // Check local file
    try {
        const content = fs.readFileSync(filename, 'utf8');
        check.fileExists = true;
        check.fileContent = content.substring(0, 300);
        check.hasNavigation = content.includes('common-navigation.js');
        check.hasFooter = content.includes('common-footer.js');
        check.isRedirect = content.includes('Redirecting');
    } catch (err) {
        check.fileContent = 'FILE NOT FOUND';
    }

    // Check live site
    const url = `https://onestepforthelife.com/${filename}`;
    const live = await checkURL(url);
    check.liveStatus = live.status;
    check.liveContent = live.content || '';

    // Determine issue
    if (!check.fileExists) {
        check.issue = 'FILE_MISSING';
    } else if (check.isRedirect) {
        check.issue = 'FILE_IS_REDIRECT';
    } else if (check.liveStatus !== 200) {
        check.issue = 'LIVE_NOT_200';
    } else if (check.liveContent.includes('Ideas Before Time') && !check.fileContent.includes('Ideas Before Time')) {
        check.issue = 'SHOWING_HOMEPAGE';
    } else if (!check.hasNavigation || !check.hasFooter) {
        check.issue = 'MISSING_NAV_FOOTER';
    } else {
        check.issue = 'OK';
    }

    return check;
}

async function runDiagnostic() {
    console.log('🔍 COMPLETE SITE DIAGNOSTIC\n');
    console.log('Checking', criticalPages.length, 'critical pages...\n');

    for (const page of criticalPages) {
        const result = await checkPage(page);
        results.checks.push(result);
        
        const icon = result.issue === 'OK' ? '✅' : '❌';
        console.log(`${icon} ${page}`);
        console.log(`   File: ${result.fileExists ? 'EXISTS' : 'MISSING'}`);
        console.log(`   Live: ${result.liveStatus}`);
        console.log(`   Issue: ${result.issue}`);
        console.log('');
    }

    // Summary
    const issues = results.checks.filter(c => c.issue !== 'OK');
    console.log('\n📊 SUMMARY:');
    console.log(`Total pages checked: ${criticalPages.length}`);
    console.log(`Pages OK: ${criticalPages.length - issues.length}`);
    console.log(`Pages with issues: ${issues.length}`);
    
    if (issues.length > 0) {
        console.log('\n🚨 ISSUES FOUND:');
        issues.forEach(issue => {
            console.log(`   - ${issue.file}: ${issue.issue}`);
        });
    }

    // Save report
    fs.writeFileSync('DIAGNOSTIC_REPORT_DEC6.json', JSON.stringify(results, null, 2));
    console.log('\n📄 Full report saved to: DIAGNOSTIC_REPORT_DEC6.json');
}

runDiagnostic().catch(console.error);
