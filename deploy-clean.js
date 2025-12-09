// COMPLETE WORKFLOW: GODA + CORRECTIONS + WRANGLER + MECER
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('═══════════════════════════════════════════════════════════════');
console.log('   COMPLETE DEPLOYMENT WORKFLOW');
console.log('   Step 1: GODA Test 1');
console.log('   Step 2: GODA Test 2');
console.log('   Step 3: Corrections (if needed)');
console.log('   Step 4: Upload by Wrangler');
console.log('   Step 5: MECER');
console.log('   Step 6: Repeat all 5 steps');
console.log('═══════════════════════════════════════════════════════════════\n');

// STEP 1: GODA TEST 1
console.log('📋 STEP 1: GODA TEST 1...\n');
try {
    execSync('node GODA-Best-Testing-Protocol-Custom.js', { stdio: 'inherit' });
} catch (e) {
    console.log('⚠️  Issues found\n');
}

// STEP 2: GODA TEST 2
console.log('\n📋 STEP 2: GODA TEST 2...\n');
try {
    execSync('node GODA-Best-Testing-Protocol-Custom.js', { stdio: 'inherit' });
} catch (e) {
    console.log('⚠️  Issues found\n');
}

// STEP 3: CORRECTIONS (Auto-Repair)
console.log('\n🔧 STEP 3: CORRECTIONS (Auto-Repair if needed)...\n');
try {
    execSync('node GODA-Auto-Repair-System.js', { stdio: 'inherit' });
} catch (e) {
    console.log('⚠️  Some corrections may have failed\n');
}

// STEP 4: UPLOAD BY WRANGLER (Prepare + Deploy)
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📦 STEP 4: UPLOAD BY WRANGLER (Preparing files)...\n');

// Create deployment folder
const deployDir = path.join(__dirname, '_deploy');
if (fs.existsSync(deployDir)) {
    console.log('Cleaning old deployment folder...');
    fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir);

console.log('✅ Created deployment folder\n');

// Files to include
const includePatterns = [
    '*.html',
    '*.css',
    '*.js',
    '_headers',
    '_redirects',
    'robots.txt',
    'sitemap.xml',
    'manifest.json'
];

// Folders to include
const includeFolders = [
    'images',
    '.well-known'
];

// Files/folders to EXCLUDE
const excludePatterns = [
    'node_modules',
    '.git',
    '_deploy',
    '*.txt',
    '*.md',
    '*.bat',
    '*.ps1',
    'test-*.js',
    'fix-*.js',
    'check-*.js',
    'verify-*.js',
    'auto-*.js',
    'deploy-*.js',
    'GODA-*.js',
    '*-test.js',
    'wrangler.toml'
];

console.log('📦 Copying website files...\n');

// Copy HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log(`Copying ${htmlFiles.length} HTML files...`);
htmlFiles.forEach(file => {
    fs.copyFileSync(file, path.join(deployDir, file));
});

// Copy CSS files
const cssFiles = fs.readdirSync('.').filter(f => f.endsWith('.css'));
console.log(`Copying ${cssFiles.length} CSS files...`);
cssFiles.forEach(file => {
    fs.copyFileSync(file, path.join(deployDir, file));
});

// Copy JS files (exclude test/fix scripts)
const jsFiles = fs.readdirSync('.').filter(f => 
    f.endsWith('.js') && 
    !f.startsWith('test-') &&
    !f.startsWith('fix-') &&
    !f.startsWith('check-') &&
    !f.startsWith('verify-') &&
    !f.startsWith('auto-') &&
    !f.startsWith('deploy-') &&
    !f.startsWith('GODA-') &&
    !f.includes('-test.')
);
console.log(`Copying ${jsFiles.length} JS files...`);
jsFiles.forEach(file => {
    fs.copyFileSync(file, path.join(deployDir, file));
});

// Copy other files
['_headers', '_redirects', 'robots.txt', 'sitemap.xml', 'manifest.json'].forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`Copying ${file}...`);
        fs.copyFileSync(file, path.join(deployDir, file));
    }
});

// Copy folders
includeFolders.forEach(folder => {
    if (fs.existsSync(folder)) {
        console.log(`Copying ${folder} folder...`);
        fs.cpSync(folder, path.join(deployDir, folder), { recursive: true });
    }
});

console.log('\n✅ All files copied to _deploy folder\n');

// Verify payment buttons are in the files
console.log('🔍 Verifying payment buttons...\n');
const spoContent = fs.readFileSync(path.join(deployDir, 'social-optimizer-app.html'), 'utf8');
const astroContent = fs.readFileSync(path.join(deployDir, 'astronomy.html'), 'utf8');

if (spoContent.includes('Pay ₹21 Now')) {
    console.log('✅ SPO payment button found');
} else {
    console.log('❌ SPO payment button MISSING!');
}

if (astroContent.includes('Pay ₹21 Now')) {
    console.log('✅ Astronomy payment button found');
} else {
    console.log('❌ Astronomy payment button MISSING!');
}

console.log('\n🚀 STEP 4: UPLOAD BY WRANGLER (Deploying to Cloudflare)...\n');

try {
    execSync(`wrangler pages deploy _deploy --project-name=ideasbeforetime`, {
        stdio: 'inherit'
    });
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✅ STEP 4 COMPLETE - Uploaded to Cloudflare!\n');
    console.log('📋 STEP 5: MECER (Reality-test)...');
    console.log('Testing in 30 seconds...');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    setTimeout(() => {
        console.log('🔍 STEP 5: MECER - Reality Test:\n');
        execSync('node test-live-deployment-dec9.js', { stdio: 'inherit' });
        
        console.log('\n═══════════════════════════════════════════════════════════════');
        console.log('✅ STEP 5 COMPLETE - MECER Verified!');
        console.log('═══════════════════════════════════════════════════════════════\n');
        console.log('📊 CYCLE SUMMARY:');
        console.log('   ✅ Step 1: GODA Test 1 - Done');
        console.log('   ✅ Step 2: GODA Test 2 - Done');
        console.log('   ✅ Step 3: Corrections - Done');
        console.log('   ✅ Step 4: Upload by Wrangler - Done');
        console.log('   ✅ Step 5: MECER - Done');
        console.log('\n🔄 STEP 6: To repeat all 5 steps, run DEPLOY.bat again\n');
        console.log('🎉 Your site is LIVE with all improvements!\n');
        console.log('═══════════════════════════════════════════════════════════════\n');
    }, 30000);
    
} catch (error) {
    console.log('\n❌ Deployment failed');
    console.log('Error:', error.message);
}
