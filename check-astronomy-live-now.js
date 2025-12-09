// CHECK ASTRONOMY PAGE - WHAT'S ACTUALLY WRONG?
// Run this to see real issues on live site

const fs = require('fs');

console.log('🔍 CHECKING ASTRONOMY.HTML - WHAT\'S WRONG?\n');

const html = fs.readFileSync('astronomy.html', 'utf8');

// Check 1: Navigation CSS
console.log('✅ Check 1: Navigation CSS in <head>');
if (html.includes('<link rel="stylesheet" href="common-navigation.css">')) {
    console.log('   ✅ PASS: common-navigation.css included in <head>');
} else {
    console.log('   ❌ FAIL: common-navigation.css MISSING from <head>');
}

// Check 2: Navigation JS
console.log('\n✅ Check 2: Navigation JS before </body>');
if (html.includes('<script src="common-navigation.js"></script>')) {
    console.log('   ✅ PASS: common-navigation.js included');
} else {
    console.log('   ❌ FAIL: common-navigation.js MISSING');
}

// Check 3: Header alignment
console.log('\n✅ Check 3: Header text-align');
if (html.includes('header{') && html.includes('text-align:center')) {
    console.log('   ✅ PASS: Header has text-align:center');
} else if (html.includes('text-align:left')) {
    console.log('   ❌ FAIL: Header has text-align:left (WRONG!)');
} else {
    console.log('   ⚠️  WARN: Cannot determine header alignment');
}

// Check 4: Divine examples buttons
console.log('\n✅ Check 4: Divine example buttons');
const hasKrishna = html.includes('loadExample(\'krishna\')');
const hasRama = html.includes('loadExample(\'rama\')');
const hasLakshmi = html.includes('loadExample(\'lakshmi\')');
const hasSaraswati = html.includes('loadExample(\'saraswati\')');

if (hasKrishna && hasRama && hasLakshmi && hasSaraswati) {
    console.log('   ✅ PASS: All 4 divine example buttons exist');
    console.log('      - Krishna ✅');
    console.log('      - Rama ✅');
    console.log('      - Lakshmi ✅');
    console.log('      - Saraswati ✅');
} else {
    console.log('   ❌ FAIL: Missing divine example buttons');
    if (!hasKrishna) console.log('      - Krishna ❌');
    if (!hasRama) console.log('      - Rama ❌');
    if (!hasLakshmi) console.log('      - Lakshmi ❌');
    if (!hasSaraswati) console.log('      - Saraswati ❌');
}

// Check 5: Auto-load Krishna
console.log('\n✅ Check 5: Auto-load Krishna on page load');
if (html.includes('loadExample(\'krishna\')') && html.includes('DOMContentLoaded')) {
    console.log('   ✅ PASS: Krishna auto-loads on page load');
} else {
    console.log('   ❌ FAIL: Krishna does NOT auto-load');
}

// Check 6: Payment button
console.log('\n✅ Check 6: Payment button (₹21)');
if (html.includes('razorpay') || html.includes('Pay Now')) {
    console.log('   ✅ PASS: Payment button exists');
} else {
    console.log('   ❌ FAIL: Payment button MISSING');
}

// Check 7: CSS load order
console.log('\n✅ Check 7: CSS load order (common-navigation.css position)');
const headEnd = html.indexOf('</head>');
const navCSSPos = html.indexOf('common-navigation.css');
const inlineStylePos = html.indexOf('<style>');

if (navCSSPos < inlineStylePos && navCSSPos < headEnd) {
    console.log('   ✅ PASS: common-navigation.css loads BEFORE inline styles');
} else if (navCSSPos > inlineStylePos) {
    console.log('   ❌ FAIL: common-navigation.css loads AFTER inline styles (will be overridden!)');
    console.log('   🔧 FIX: Move common-navigation.css BEFORE <style> tag');
} else {
    console.log('   ⚠️  WARN: Cannot determine CSS load order');
}

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY\n');

// Count issues
let issues = 0;
if (!html.includes('<link rel="stylesheet" href="common-navigation.css">')) issues++;
if (!html.includes('<script src="common-navigation.js"></script>')) issues++;
if (html.includes('text-align:left') && html.includes('header{')) issues++;
if (!(hasKrishna && hasRama && hasLakshmi && hasSaraswati)) issues++;
if (navCSSPos > inlineStylePos) issues++;

if (issues === 0) {
    console.log('✅ ALL CHECKS PASSED - File looks correct!');
    console.log('\n🤔 If page still looks wrong on LIVE site:');
    console.log('   1. Cache not purged in Cloudflare');
    console.log('   2. Changes not pushed to GitHub');
    console.log('   3. Browser cache (try incognito mode)');
} else {
    console.log(`❌ FOUND ${issues} ISSUE(S) - Fix needed!`);
}

console.log('\n💡 NEXT STEPS:');
console.log('   1. Fix issues found above');
console.log('   2. Push to GitHub');
console.log('   3. Purge Cloudflare cache');
console.log('   4. Wait 5-10 minutes');
console.log('   5. Test on live site: https://onestepforthelife.com/astronomy');
