/**
 * Test AdSense Implementation
 * Verify all 4 ad units are properly configured
 */

const fs = require('fs');

console.log('🧪 Testing AdSense Implementation...\n');

// Test 1: Check google-adsense.js exists and has all 4 ad units
console.log('Test 1: Checking google-adsense.js...');
try {
    const adsenseJs = fs.readFileSync('google-adsense.js', 'utf8');
    
    const adUnits = {
        'In-feed (5034645309)': adsenseJs.includes('5034645309'),
        'Display (9723865202)': adsenseJs.includes('9723865202'),
        'In-Article (5799371569)': adsenseJs.includes('5799371569'),
        'Multiplex (4786506942)': adsenseJs.includes('4786506942')
    };
    
    let allFound = true;
    for (const [name, found] of Object.entries(adUnits)) {
        console.log(`  ${found ? '✅' : '❌'} ${name}`);
        if (!found) allFound = false;
    }
    
    if (allFound) {
        console.log('✅ All 4 ad units found in google-adsense.js\n');
    } else {
        console.log('❌ Some ad units missing!\n');
        process.exit(1);
    }
} catch (error) {
    console.log('❌ google-adsense.js not found!\n');
    process.exit(1);
}

// Test 2: Check script is added to HTML pages
console.log('Test 2: Checking HTML pages have AdSense script...');
const testPages = [
    'index.html',
    'about.html',
    'blog.html',
    'kiro.html',
    'reports.html'
];

let pagesWithScript = 0;
let pagesWithoutScript = [];

testPages.forEach(page => {
    try {
        const content = fs.readFileSync(page, 'utf8');
        if (content.includes('google-adsense.js')) {
            pagesWithScript++;
            console.log(`  ✅ ${page}`);
        } else {
            pagesWithoutScript.push(page);
            console.log(`  ❌ ${page} - Missing script tag`);
        }
    } catch (error) {
        console.log(`  ⚠️  ${page} - Not found`);
    }
});

console.log(`\n📊 Summary: ${pagesWithScript}/${testPages.length} pages have AdSense script\n`);

// Test 3: Verify ad placement logic
console.log('Test 3: Checking ad placement logic...');
const adsenseJs = fs.readFileSync('google-adsense.js', 'utf8');

const checks = {
    'createInfeedAd function': adsenseJs.includes('function createInfeedAd()'),
    'createDisplayAd function': adsenseJs.includes('function createDisplayAd()'),
    'createInArticleAd function': adsenseJs.includes('function createInArticleAd()'),
    'createMultiplexAd function': adsenseJs.includes('function createMultiplexAd()'),
    'insertAds function': adsenseJs.includes('function insertAds()'),
    'Auto-initialization': adsenseJs.includes('init()')
};

let allChecks = true;
for (const [check, passed] of Object.entries(checks)) {
    console.log(`  ${passed ? '✅' : '❌'} ${check}`);
    if (!passed) allChecks = false;
}

console.log();

// Test 4: Check for syntax errors
console.log('Test 4: Checking for syntax errors...');
try {
    require('./google-adsense.js');
    console.log('  ❌ Cannot test in Node.js (browser-only code)\n');
} catch (error) {
    if (error.message.includes('document is not defined')) {
        console.log('  ✅ No syntax errors (browser code detected)\n');
    } else {
        console.log(`  ❌ Syntax error: ${error.message}\n`);
        allChecks = false;
    }
}

// Final result
console.log('═══════════════════════════════════════');
if (allChecks && pagesWithoutScript.length === 0) {
    console.log('✅ ALL TESTS PASSED!');
    console.log('✅ AdSense implementation is ready');
    console.log('✅ All 4 ad units configured');
    console.log('✅ Ready to upload to GitHub');
    console.log('═══════════════════════════════════════\n');
    process.exit(0);
} else {
    console.log('⚠️  SOME ISSUES FOUND');
    if (pagesWithoutScript.length > 0) {
        console.log(`⚠️  ${pagesWithoutScript.length} pages missing script tag`);
    }
    console.log('═══════════════════════════════════════\n');
    process.exit(1);
}
