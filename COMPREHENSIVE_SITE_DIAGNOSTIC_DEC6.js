const fs = require('fs');
const https = require('https');

console.log('🔍 COMPREHENSIVE SITE DIAGNOSTIC - December 6, 2025');
console.log('Checking: Files vs Live Site vs Links vs Backend\n');
console.log('='.repeat(80));

const results = {
    httpStatus: [],
    fileContent: [],
    linkage: [],
    backend: [],
    security: [],
    issues: []
};

// Critical pages to check
const criticalPages = [
    'index.html',
    'blog.html',
    'social-optimizer-index.html',
    'email-sender-web.html',
    'job-tools.html',
    'admin-control-panel.html',
    'market-reports.html',
    'about.html',
    'cv.html',
    'astronomy.html'
];

console.log('\n📊 PHASE 1: HTTP STATUS CHECK (Live Site)');
console.log('-'.repeat(80));

// Function to check HTTP status
function checkHTTPStatus(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({
                url: url,
                status: res.statusCode,
                headers: res.headers
            });
        }).on('error', (err) => {
            resolve({
                url: url,
                status: 'ERROR',
                error: err.message
            });
        });
    });
}

// Check all critical pages
async function checkAllPages() {
    const baseUrl = 'https://ideasbeforetime.pages.dev/';
    
    for (const page of criticalPages) {
        const url = baseUrl + page;
        const result = await checkHTTPStatus(url);
        
        results.httpStatus.push(result);
        
        if (result.status === 200) {
            console.log(`✅ ${page}: 200 OK`);
        } else if (result.status === 308) {
            console.log(`❌ ${page}: 308 REDIRECT (CACHE ISSUE!)`);
            results.issues.push({
                page: page,
                issue: '308 Redirect',
                type: 'SERVER',
                cause: 'Cloudflare cache not purged',
                solution: 'Purge cache in Cloudflare dashboard'
            });
        } else if (result.status === 404) {
            console.log(`❌ ${page}: 404 NOT FOUND`);
            results.issues.push({
                page: page,
                issue: '404 Not Found',
                type: 'FILE',
                cause: 'File missing or wrong path',
                solution: 'Check if file exists and _redirects config'
            });
        } else {
            console.log(`⚠️  ${page}: ${result.status}`);
            results.issues.push({
                page: page,
                issue: `Status ${result.status}`,
                type: 'UNKNOWN',
                cause: 'Need investigation',
                solution: 'Check server logs'
            });
        }
    }
}

console.log('\n📄 PHASE 2: FILE CONTENT CHECK (Local Files)');
console.log('-'.repeat(80));

criticalPages.forEach(page => {
    if (fs.existsSync(page)) {
        const content = fs.readFileSync(page, 'utf8');
        const first100 = content.substring(0, 100);
        
        // Check if file has actual content
        if (content.length > 500) {
            console.log(`✅ ${page}: Has content (${content.length} bytes)`);
            results.fileContent.push({
                page: page,
                status: 'OK',
                size: content.length,
                preview: first100
            });
        } else {
            console.log(`⚠️  ${page}: Too small (${content.length} bytes)`);
            results.fileContent.push({
                page: page,
                status: 'WARNING',
                size: content.length,
                preview: first100
            });
        }
        
        // Check for common issues
        if (content.includes('window.location.href')) {
            console.log(`   ⚠️  Contains redirect code`);
        }
        if (!content.includes('common-navigation.js')) {
            console.log(`   ❌ Missing navigation`);
            results.issues.push({
                page: page,
                issue: 'Missing navigation',
                type: 'FILE',
                cause: 'common-navigation.js not included',
                solution: 'Add navigation script'
            });
        }
        if (!content.includes('common-footer.js')) {
            console.log(`   ❌ Missing footer`);
            results.issues.push({
                page: page,
                issue: 'Missing footer',
                type: 'FILE',
                cause: 'common-footer.js not included',
                solution: 'Add footer script'
            });
        }
    } else {
        console.log(`❌ ${page}: FILE MISSING`);
        results.fileContent.push({
            page: page,
            status: 'MISSING'
        });
        results.issues.push({
            page: page,
            issue: 'File missing',
            type: 'FILE',
            cause: 'File not in repository',
            solution: 'Create file'
        });
    }
});

console.log('\n🔗 PHASE 3: LINKAGE CHECK (Cross-references)');
console.log('-'.repeat(80));

// Check if index.html links to all critical pages
if (fs.existsSync('index.html')) {
    const index = fs.readFileSync('index.html', 'utf8');
    
    const expectedLinks = [
        { file: 'blog.html', name: 'Blog' },
        { file: 'social-optimizer-index.html', name: 'SPO Tool' },
        { file: 'email-sender-web.html', name: 'Job Search' },
        { file: 'market-reports.html', name: 'Reports' },
        { file: 'about.html', name: 'About' }
    ];
    
    expectedLinks.forEach(link => {
        if (index.includes(link.file)) {
            console.log(`✅ index.html → ${link.name}`);
            results.linkage.push({
                from: 'index.html',
                to: link.file,
                status: 'OK'
            });
        } else {
            console.log(`❌ index.html ✗ ${link.name}`);
            results.linkage.push({
                from: 'index.html',
                to: link.file,
                status: 'MISSING'
            });
            results.issues.push({
                page: 'index.html',
                issue: `No link to ${link.name}`,
                type: 'FILE',
                cause: 'Link not added to homepage',
                solution: `Add link to ${link.file}`
            });
        }
    });
}

console.log('\n⚙️  PHASE 4: BACKEND CHECK (API Integration)');
console.log('-'.repeat(80));

// Check SPO backend
if (fs.existsSync('social-optimizer-app.js')) {
    const spo = fs.readFileSync('social-optimizer-app.js', 'utf8');
    
    if (spo.includes('fetch(') || spo.includes('XMLHttpRequest')) {
        console.log('✅ SPO: Has API calls');
        results.backend.push({
            tool: 'SPO',
            hasAPI: true
        });
    } else {
        console.log('❌ SPO: NO API calls');
        results.backend.push({
            tool: 'SPO',
            hasAPI: false
        });
        results.issues.push({
            page: 'SPO Tool',
            issue: 'No backend integration',
            type: 'BACKEND',
            cause: 'Frontend only, no API server',
            solution: 'Deploy backend API or use Cloudflare Workers'
        });
    }
}

// Check Job Search backend
if (fs.existsSync('job_backend_api.py')) {
    console.log('✅ Job Search: Backend file exists');
    results.backend.push({
        tool: 'Job Search',
        hasBackend: true,
        deployed: false
    });
    results.issues.push({
        page: 'Job Search',
        issue: 'Backend not deployed',
        type: 'DEPLOYMENT',
        cause: 'Python API exists but not running',
        solution: 'Deploy to Heroku/Railway/Render'
    });
} else {
    console.log('❌ Job Search: No backend file');
    results.backend.push({
        tool: 'Job Search',
        hasBackend: false
    });
}

console.log('\n🔒 PHASE 5: SECURITY CHECK (Cloudflare Access)');
console.log('-'.repeat(80));

// Check _headers file
if (fs.existsSync('_headers')) {
    const headers = fs.readFileSync('_headers', 'utf8');
    if (headers.includes('CF-Access')) {
        console.log('✅ _headers: Cloudflare Access configured');
        results.security.push({
            feature: 'Cloudflare Access',
            configured: true
        });
    } else {
        console.log('❌ _headers: NO Cloudflare Access config');
        results.security.push({
            feature: 'Cloudflare Access',
            configured: false
        });
        results.issues.push({
            page: 'Admin Panel',
            issue: 'No access control',
            type: 'SECURITY',
            cause: '_headers missing CF-Access config',
            solution: 'Add Cloudflare Access headers + configure in dashboard'
        });
    }
} else {
    console.log('❌ _headers: FILE MISSING');
    results.security.push({
        feature: 'Cloudflare Access',
        configured: false
    });
    results.issues.push({
        page: 'Security',
        issue: '_headers file missing',
        type: 'FILE',
        cause: 'No _headers file',
        solution: 'Create _headers with security config'
    });
}

// Run async checks
checkAllPages().then(() => {
    console.log('\n' + '='.repeat(80));
    console.log('📊 DIAGNOSTIC SUMMARY\n');
    
    console.log(`HTTP Status Checks: ${results.httpStatus.length}`);
    console.log(`File Content Checks: ${results.fileContent.length}`);
    console.log(`Linkage Checks: ${results.linkage.length}`);
    console.log(`Backend Checks: ${results.backend.length}`);
    console.log(`Security Checks: ${results.security.length}`);
    console.log(`\n🚨 TOTAL ISSUES FOUND: ${results.issues.length}\n`);
    
    // Group issues by type
    const issuesByType = {};
    results.issues.forEach(issue => {
        if (!issuesByType[issue.type]) {
            issuesByType[issue.type] = [];
        }
        issuesByType[issue.type].push(issue);
    });
    
    console.log('📋 ISSUES BY TYPE:\n');
    Object.keys(issuesByType).forEach(type => {
        console.log(`${type}: ${issuesByType[type].length} issues`);
        issuesByType[type].forEach(issue => {
            console.log(`   ❌ ${issue.page}: ${issue.issue}`);
            console.log(`      Cause: ${issue.cause}`);
            console.log(`      Solution: ${issue.solution}\n`);
        });
    });
    
    // Save results to JSON
    fs.writeFileSync('DIAGNOSTIC_RESULTS_DEC6.json', JSON.stringify(results, null, 2));
    console.log('✅ Results saved to: DIAGNOSTIC_RESULTS_DEC6.json\n');
    
    console.log('='.repeat(80));
    
    if (results.issues.length > 0) {
        console.log('\n❌ SITE HAS ISSUES - See solutions above');
        process.exit(1);
    } else {
        console.log('\n✅ SITE IS WORKING CORRECTLY');
        process.exit(0);
    }
});
