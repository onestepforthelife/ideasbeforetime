// CHECK ASTRONOMY DEPLOYMENT GAP
// Find why astronomy.html not deploying despite 12+ pushes

const fs = require('fs');
const path = require('path');

console.log('🔍 ASTRONOMY DEPLOYMENT GAP DIAGNOSTIC\n');
console.log('═'.repeat(70));

// 1. CHECK LOCAL FILE
console.log('\n📁 STEP 1: CHECK LOCAL FILE');
console.log('─'.repeat(70));

const astronomyPath = 'astronomy.html';
if (fs.existsSync(astronomyPath)) {
    const stats = fs.statSync(astronomyPath);
    const content = fs.readFileSync(astronomyPath, 'utf8');
    
    console.log(`✅ File exists: ${astronomyPath}`);
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   Modified: ${stats.mtime.toLocaleString()}`);
    
    // Check for text-align:center
    const hasCenterAlign = content.includes('text-align: center') || content.includes('text-align:center');
    if (hasCenterAlign) {
        console.log('   ✅ Contains text-align:center (CORRECT)');
    } else {
        console.log('   ❌ Missing text-align:center (WRONG)');
    }
    
    // Check for common-navigation.css
    const hasNavCSS = content.includes('common-navigation.css');
    if (hasNavCSS) {
        console.log('   ✅ Includes common-navigation.css');
    } else {
        console.log('   ❌ Missing common-navigation.css');
    }
    
    // Check for payment button
    const hasPaymentButton = content.includes('Pay Now') || content.includes('rzp_live');
    if (hasPaymentButton) {
        console.log('   ✅ Has payment button');
    } else {
        console.log('   ⚠️  Missing payment button');
    }
} else {
    console.log(`❌ File NOT found: ${astronomyPath}`);
}

// 2. CHECK .gitignore
console.log('\n📋 STEP 2: CHECK .gitignore');
console.log('─'.repeat(70));

if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    const lines = gitignore.split('\n');
    
    const blocksAstronomy = lines.some(line => {
        const trimmed = line.trim();
        return trimmed === 'astronomy.html' || 
               trimmed === '*.html' ||
               (trimmed.includes('astronomy') && !trimmed.startsWith('#'));
    });
    
    if (blocksAstronomy) {
        console.log('❌ .gitignore BLOCKS astronomy.html!');
        console.log('   This prevents Git from tracking the file');
        console.log('   FIX: Remove astronomy.html from .gitignore');
    } else {
        console.log('✅ .gitignore does NOT block astronomy.html');
    }
} else {
    console.log('⚠️  No .gitignore file found');
}

// 3. CHECK FILE SIZE LIMIT
console.log('\n📏 STEP 3: CHECK FILE SIZE (Cloudflare limit: 25MB)');
console.log('─'.repeat(70));

if (fs.existsSync(astronomyPath)) {
    const stats = fs.statSync(astronomyPath);
    const sizeMB = stats.size / (1024 * 1024);
    
    if (sizeMB > 25) {
        console.log(`❌ File TOO LARGE: ${sizeMB.toFixed(2)} MB`);
        console.log('   Cloudflare Pages limit: 25 MB');
        console.log('   This BLOCKS deployment!');
    } else {
        console.log(`✅ File size OK: ${sizeMB.toFixed(2)} MB (under 25 MB limit)`);
    }
}

// 4. CHECK _redirects FILE
console.log('\n🔀 STEP 4: CHECK _redirects FILE');
console.log('─'.repeat(70));

if (fs.existsSync('_redirects')) {
    const redirects = fs.readFileSync('_redirects', 'utf8');
    const lines = redirects.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
    
    if (lines.length > 0) {
        console.log(`⚠️  Found ${lines.length} redirect rules:`);
        lines.forEach(line => {
            console.log(`   ${line}`);
            
            // Check for problematic redirects
            if (line.includes('astronomy') || line.includes('*.html') || line.includes('/*')) {
                console.log('   ⚠️  This rule might affect astronomy.html!');
            }
        });
    } else {
        console.log('✅ _redirects file is empty (no redirect rules)');
    }
} else {
    console.log('✅ No _redirects file (no redirect rules)');
}

// 5. CHECK RELATED FILES
console.log('\n📦 STEP 5: CHECK RELATED FILES');
console.log('─'.repeat(70));

const relatedFiles = [
    'common-navigation.css',
    'common-navigation.js',
    'common-footer.css',
    'common-footer.js',
    'solar-system-3d.js',
    'solar-system-3d.css'
];

relatedFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        console.log(`✅ ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
        console.log(`❌ ${file} MISSING`);
    }
});

// 6. DEPLOYMENT GAP ANALYSIS
console.log('\n🎯 STEP 6: DEPLOYMENT GAP ANALYSIS');
console.log('─'.repeat(70));

console.log('\n📊 DEPLOYMENT CHAIN:');
console.log('   Local File → Git Add → Git Commit → Git Push → GitHub → Cloudflare Build → CDN → Live Site');
console.log('   ✅ Local    ?         ?            ?          ?        ?                ?     ❌ Live');

console.log('\n🔍 POSSIBLE GAPS:');

console.log('\n1️⃣  GAP: Git Not Tracking File');
console.log('   Cause: File in .gitignore or not added to Git');
console.log('   Check: Run "git status" - is astronomy.html listed?');
console.log('   Fix: git add astronomy.html && git commit -m "Update astronomy"');

console.log('\n2️⃣  GAP: GitHub Not Updated');
console.log('   Cause: Git push failed or pushed to wrong branch');
console.log('   Check: Visit https://github.com/YOUR_REPO/blob/main/astronomy.html');
console.log('   Fix: Verify file on GitHub has text-align:center');

console.log('\n3️⃣  GAP: Cloudflare Build Failed');
console.log('   Cause: Build error, file too large, or configuration issue');
console.log('   Check: Cloudflare Dashboard → Deployments → Latest build log');
console.log('   Fix: Read build log for errors');

console.log('\n4️⃣  GAP: Cloudflare Redirect Rule');
console.log('   Cause: _redirects file or Cloudflare Pages settings');
console.log('   Check: Cloudflare Dashboard → Settings → Redirects');
console.log('   Fix: Remove redirect rules for /*.html');

console.log('\n5️⃣  GAP: CDN Cache Not Purged');
console.log('   Cause: Old version cached in Cloudflare CDN');
console.log('   Check: Test in incognito mode');
console.log('   Fix: Purge cache + wait 10 minutes');

console.log('\n6️⃣  GAP: Browser Cache (308 Permanent Redirect)');
console.log('   Cause: Browser cached 308 redirect permanently');
console.log('   Check: Test in incognito mode');
console.log('   Fix: Clear browser cache or wait 24-48 hours');

// 7. IMMEDIATE ACTIONS
console.log('\n\n⚡ IMMEDIATE ACTIONS TO TAKE:');
console.log('═'.repeat(70));

console.log('\n✅ WHAT YOU CAN DO NOW (5 minutes):');
console.log('   1. Check Cloudflare Dashboard → Workers & Pages → onestepforthelife');
console.log('   2. Click: Deployments tab');
console.log('   3. Check: Latest deployment status (Success or Failed?)');
console.log('   4. Click: View details → Build log');
console.log('   5. Look for: Errors mentioning astronomy.html');
console.log('   6. Screenshot: Build log and send to me');

console.log('\n✅ WHAT TO CHECK IN CLOUDFLARE:');
console.log('   1. Settings → Redirects (any rules removing .html?)');
console.log('   2. Settings → Build configuration (correct settings?)');
console.log('   3. Settings → Custom domains (onestepforthelife.com configured?)');

console.log('\n✅ WHAT TO TEST:');
console.log('   1. Open incognito window');
console.log('   2. Visit: https://onestepforthelife.com/astronomy.html');
console.log('   3. If works: Cache issue (purge + wait)');
console.log('   4. If broken: Deployment issue (check build logs)');

console.log('\n\n🎯 MOST LIKELY CAUSE (Based on 4 weeks + 12 pushes):');
console.log('═'.repeat(70));
console.log('   ❌ Cloudflare Pages has a redirect rule removing .html extensions');
console.log('   ❌ This creates 308 Permanent Redirect (cached forever)');
console.log('   ❌ Even after fixing, browser cache keeps redirecting');
console.log('   ✅ FIX: Disable redirect rule + purge cache + wait 24 hours');

console.log('\n\n📸 SEND ME SCREENSHOTS OF:');
console.log('═'.repeat(70));
console.log('   1. Cloudflare Dashboard → Deployments → Latest build log');
console.log('   2. Cloudflare Dashboard → Settings → Redirects section');
console.log('   3. Cloudflare Dashboard → Settings → Build configuration');
console.log('   4. Browser DevTools → Network tab when loading astronomy.html');
console.log('      (Shows HTTP status code: 200 OK or 308 Redirect)');

console.log('\n\n✅ DIAGNOSTIC COMPLETE');
console.log('═'.repeat(70));
console.log('Next: Check Cloudflare Dashboard and send screenshots\n');
