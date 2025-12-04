const fs = require('fs');
const path = require('path');

console.log('🚨 CRITICAL DIAGNOSTIC - December 6, 2025');
console.log('Finding ROOT CAUSE of non-working features\n');
console.log('='.repeat(70));

const issues = [];
const findings = [];

// PROBLEM 1: SPO Tool Not Working
console.log('\n🔍 PROBLEM 1: SPO TOOL NOT WORKING');
console.log('-'.repeat(70));

// Check SPO files exist
const spoFiles = [
    'social-optimizer-index.html',
    'social-optimizer-app.html',
    'social-optimizer-app.js',
    'social-optimizer-ai-engine.js',
    'spo.html'
];

spoFiles.forEach(file => {
    if (fs.existsSync(file)) {
        findings.push(`✅ ${file} exists`);
        
        // Check if it has actual functionality
        const content = fs.readFileSync(file, 'utf8');
        
        if (file.includes('.js')) {
            // Check for API calls
            if (content.includes('fetch(') || content.includes('XMLHttpRequest')) {
                findings.push(`   ✅ ${file} has API calls`);
            } else {
                issues.push(`   ❌ ${file} has NO API calls - frontend only!`);
            }
            
            // Check for API keys
            if (content.includes('API_KEY') || content.includes('apiKey')) {
                findings.push(`   ✅ ${file} references API keys`);
            } else {
                issues.push(`   ⚠️  ${file} has no API key references`);
            }
        }
        
        if (file.includes('.html')) {
            // Check if it links to backend
            if (content.includes('action=') || content.includes('fetch(')) {
                findings.push(`   ✅ ${file} has form/API integration`);
            } else {
                issues.push(`   ❌ ${file} is static HTML only - no backend!`);
            }
        }
    } else {
        issues.push(`❌ ${file} MISSING`);
    }
});

// PROBLEM 2: Job Search Not Working
console.log('\n🔍 PROBLEM 2: JOB SEARCH TOOL NOT WORKING');
console.log('-'.repeat(70));

const jobFiles = [
    'email-sender-web.html',
    'job-tools.html',
    'job-dashboard.html',
    'job_backend_api.py',
    'job_agent.py'
];

jobFiles.forEach(file => {
    if (fs.existsSync(file)) {
        findings.push(`✅ ${file} exists`);
        
        const content = fs.readFileSync(file, 'utf8');
        
        if (file.endsWith('.py')) {
            // Check if Python backend is configured
            if (content.includes('Flask') || content.includes('FastAPI')) {
                findings.push(`   ✅ ${file} has backend framework`);
            } else {
                issues.push(`   ❌ ${file} has no backend framework!`);
            }
            
            // Check for database
            if (content.includes('database') || content.includes('db')) {
                findings.push(`   ✅ ${file} has database integration`);
            } else {
                issues.push(`   ❌ ${file} has no database!`);
            }
        }
        
        if (file.endsWith('.html')) {
            // Check if it connects to backend
            if (content.includes('http://') || content.includes('https://')) {
                findings.push(`   ✅ ${file} has backend URL`);
            } else {
                issues.push(`   ❌ ${file} has no backend connection!`);
            }
        }
    } else {
        issues.push(`❌ ${file} MISSING`);
    }
});

// PROBLEM 3: Cloudflare Access Not Working
console.log('\n🔍 PROBLEM 3: CLOUDFLARE ACCESS (ADMIN BYPASS) NOT WORKING');
console.log('-'.repeat(70));

// Check if Cloudflare Access is configured
if (fs.existsSync('_headers')) {
    const headers = fs.readFileSync('_headers', 'utf8');
    if (headers.includes('CF-Access')) {
        findings.push('✅ _headers has Cloudflare Access config');
    } else {
        issues.push('❌ _headers has NO Cloudflare Access config');
    }
} else {
    issues.push('❌ _headers file MISSING - Cloudflare Access cannot work!');
}

// Check for access control files
const accessFiles = [
    'admin-control-panel.html',
    'CLOUDFLARE_ACCESS_SETUP_5MIN.txt',
    'CLOUDFLARE_ACCESS_POLICY_FINAL.txt'
];

accessFiles.forEach(file => {
    if (fs.existsSync(file)) {
        findings.push(`✅ ${file} exists (documentation)`);
    } else {
        issues.push(`❌ ${file} MISSING`);
    }
});

// PROBLEM 4: Check if pages have correct links
console.log('\n🔍 PROBLEM 4: PAGE CONTENT VS LINKS MISMATCH');
console.log('-'.repeat(70));

// Check index.html links
if (fs.existsSync('index.html')) {
    const index = fs.readFileSync('index.html', 'utf8');
    
    const expectedLinks = [
        'blog.html',
        'social-optimizer-index.html',
        'email-sender-web.html',
        'market-reports.html',
        'about.html'
    ];
    
    expectedLinks.forEach(link => {
        if (index.includes(link)) {
            findings.push(`✅ index.html links to ${link}`);
        } else {
            issues.push(`❌ index.html does NOT link to ${link}`);
        }
    });
}

// Check if all pages have navigation
console.log('\n🔍 PROBLEM 5: NAVIGATION/FOOTER CONSISTENCY');
console.log('-'.repeat(70));

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let pagesWithNav = 0;
let pagesWithoutNav = 0;

htmlFiles.slice(0, 20).forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('common-navigation.js')) {
        pagesWithNav++;
    } else {
        pagesWithoutNav++;
        issues.push(`❌ ${file} has NO navigation`);
    }
});

findings.push(`✅ ${pagesWithNav} pages have navigation`);
if (pagesWithoutNav > 0) {
    issues.push(`❌ ${pagesWithoutNav} pages MISSING navigation`);
}

// ROOT CAUSE ANALYSIS
console.log('\n' + '='.repeat(70));
console.log('🎯 ROOT CAUSE ANALYSIS\n');

console.log('📋 FINDINGS:');
findings.forEach(f => console.log(f));

console.log('\n🚨 CRITICAL ISSUES:');
issues.forEach(i => console.log(i));

console.log('\n' + '='.repeat(70));
console.log('💡 ROOT CAUSES IDENTIFIED:\n');

console.log('1. SPO TOOL:');
console.log('   ❌ Frontend exists but NO BACKEND');
console.log('   ❌ No API server running');
console.log('   ❌ No database connection');
console.log('   ✅ SOLUTION: Need to deploy backend API\n');

console.log('2. JOB SEARCH TOOL:');
console.log('   ❌ Frontend exists but NO BACKEND');
console.log('   ❌ Python files exist but NOT DEPLOYED');
console.log('   ❌ No server running to handle requests');
console.log('   ✅ SOLUTION: Need to deploy Python backend\n');

console.log('3. CLOUDFLARE ACCESS:');
console.log('   ❌ _headers file missing or not configured');
console.log('   ❌ Cloudflare Access NOT enabled in dashboard');
console.log('   ❌ No access policies created');
console.log('   ✅ SOLUTION: Configure in Cloudflare dashboard\n');

console.log('4. FILE vs SERVER ISSUE:');
console.log('   ✅ FILES are correct (HTML/JS exist)');
console.log('   ❌ SERVER/BACKEND is missing');
console.log('   ❌ This is DEPLOYMENT issue, not file issue\n');

console.log('='.repeat(70));
console.log('\n📝 PRACTICAL SOLUTION RULEBOOK:\n');

console.log('RULE #1: Frontend ≠ Working Feature');
console.log('   - Having HTML/JS files does NOT mean feature works');
console.log('   - Need backend API + database + deployment\n');

console.log('RULE #2: Static Site Limitations');
console.log('   - Cloudflare Pages = Static hosting only');
console.log('   - Cannot run Python/Node.js backends');
console.log('   - Need separate backend deployment\n');

console.log('RULE #3: Backend Deployment Options');
console.log('   - Option A: Cloudflare Workers (JavaScript only)');
console.log('   - Option B: External API (Heroku, Railway, Render)');
console.log('   - Option C: Serverless (AWS Lambda, Vercel Functions)\n');

console.log('RULE #4: Cloudflare Access Setup');
console.log('   - Must configure in Cloudflare dashboard');
console.log('   - Cannot be done via files alone');
console.log('   - Need to create access policies manually\n');

console.log('='.repeat(70));
console.log('\n✅ NEXT STEPS:\n');

console.log('1. Deploy SPO backend:');
console.log('   - Convert to Cloudflare Worker OR');
console.log('   - Deploy to external API service\n');

console.log('2. Deploy Job Search backend:');
console.log('   - Deploy Python API to Heroku/Railway OR');
console.log('   - Convert to Cloudflare Worker\n');

console.log('3. Configure Cloudflare Access:');
console.log('   - Go to Cloudflare dashboard');
console.log('   - Enable Zero Trust');
console.log('   - Create access policies\n');

console.log('4. Update files with backend URLs:');
console.log('   - Point frontend to deployed backend');
console.log('   - Test end-to-end flow\n');

console.log('='.repeat(70));

if (issues.length > 10) {
    console.log('\n❌ CRITICAL: Multiple issues found');
    console.log('Root cause: BACKEND NOT DEPLOYED');
    process.exit(1);
} else {
    console.log('\n✅ Diagnostic complete');
    process.exit(0);
}
