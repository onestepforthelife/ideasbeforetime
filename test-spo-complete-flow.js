// SPO COMPLETE USER FLOW TEST
// Tests EVERY step of the Social Post Optimizer
// Run this before saying "SPO is ready"

const fs = require('fs');
const path = require('path');

console.log('🧪 SPO COMPLETE USER FLOW TEST');
console.log('================================\n');

const issues = [];
const warnings = [];
let testsRun = 0;
let testsPassed = 0;

// Test 1: Check all SPO files exist
console.log('📋 TEST 1: Checking SPO Files Exist...');
testsRun++;

const requiredFiles = [
    'social-optimizer-index.html',
    'social-optimizer-app.html',
    'social-optimizer-app.js',
    'social-optimizer-ai-engine.js'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        issues.push(`❌ Missing file: ${file}`);
        allFilesExist = false;
    }
});

if (allFilesExist) {
    testsPassed++;
    console.log('✅ All SPO files exist\n');
} else {
    console.log('❌ Some SPO files missing\n');
}

// Test 2: Check landing page structure
console.log('📋 TEST 2: Checking Landing Page Structure...');
testsRun++;

const indexContent = fs.readFileSync('social-optimizer-index.html', 'utf8');
const landingChecks = [
    { check: 'CTA button to start', pattern: /Start.*Preview|Try.*Preview|Start.*Optimizing|Get Started/i },
    { check: 'Link to app page', pattern: /social-optimizer-app\.html/ },
    { check: 'Pricing (₹21)', pattern: /₹21|Rs\.?\s*21/ },
    { check: 'Refund policy mentioned', pattern: /refund/i }
];

let landingPassed = true;
landingChecks.forEach(({ check, pattern }) => {
    if (!pattern.test(indexContent)) {
        issues.push(`❌ Landing page missing: ${check}`);
        landingPassed = false;
    }
});

if (landingPassed) {
    testsPassed++;
    console.log('✅ Landing page structure correct\n');
} else {
    console.log('❌ Landing page has issues\n');
}

// Test 3: Check app page has all required elements
console.log('📋 TEST 3: Checking App Page Elements...');
testsRun++;

const appContent = fs.readFileSync('social-optimizer-app.html', 'utf8');
const appChecks = [
    { check: 'Platform dropdown', pattern: /platform.*select|select.*platform/i },
    { check: 'Input method selection', pattern: /input.*method|method.*selection/i },
    { check: 'Text input field', pattern: /textarea|input.*text/i },
    { check: 'Next button', pattern: /button.*next|next.*button/i },
    { check: 'Back button', pattern: /button.*back|back.*button/i },
    { check: 'Validation', pattern: /validate|validation|required/i }
];

let appPassed = true;
appChecks.forEach(({ check, pattern }) => {
    if (!pattern.test(appContent)) {
        issues.push(`❌ App page missing: ${check}`);
        appPassed = false;
    }
});

if (appPassed) {
    testsPassed++;
    console.log('✅ App page has required elements\n');
} else {
    console.log('❌ App page missing elements\n');
}

// Test 4: Check JavaScript file structure
console.log('📋 TEST 4: Checking JavaScript Logic...');
testsRun++;

const jsContent = fs.readFileSync('social-optimizer-app.js', 'utf8');
const jsChecks = [
    { check: 'Page navigation logic', pattern: /showPage|changePage|navigateTo|currentStep|step.*=/i },
    { check: 'Data persistence (localStorage)', pattern: /localStorage/ },
    { check: 'Form validation', pattern: /validate|validation/i },
    { check: 'Error handling', pattern: /catch|error|try/i }
];

let jsPassed = true;
jsChecks.forEach(({ check, pattern }) => {
    if (!pattern.test(jsContent)) {
        warnings.push(`⚠️  JavaScript may be missing: ${check}`);
        jsPassed = false;
    }
});

if (jsPassed) {
    testsPassed++;
    console.log('✅ JavaScript logic looks complete\n');
} else {
    console.log('⚠️  JavaScript may have gaps\n');
}

// Test 5: Check AI engine integration
console.log('📋 TEST 5: Checking AI Engine Integration...');
testsRun++;

const aiContent = fs.readFileSync('social-optimizer-ai-engine.js', 'utf8');
const aiChecks = [
    { check: 'API key handling', pattern: /API.*KEY|apiKey|GEMINI/i },
    { check: 'API call logic', pattern: /fetch|axios|XMLHttpRequest/i },
    { check: 'Response handling', pattern: /response|result|data/i },
    { check: 'Error handling', pattern: /catch|error|try/i }
];

let aiPassed = true;
aiChecks.forEach(({ check, pattern }) => {
    if (!pattern.test(aiContent)) {
        warnings.push(`⚠️  AI engine may be missing: ${check}`);
        aiPassed = false;
    }
});

if (aiPassed) {
    testsPassed++;
    console.log('✅ AI engine integration looks complete\n');
} else {
    console.log('⚠️  AI engine may have gaps\n');
}

// Test 6: Check for common mistakes
console.log('📋 TEST 6: Checking for Common Mistakes...');
testsRun++;

const commonMistakes = [
    { check: 'Hardcoded test data in production', pattern: /test.*data|demo.*data|sample.*data/i, file: jsContent },
    { check: 'Console.log statements', pattern: /console\.log/g, file: jsContent },
    { check: 'Alert statements', pattern: /alert\(/g, file: jsContent },
    { check: 'Commented out code', pattern: /\/\/.*TODO|\/\/.*FIXME|\/\/.*HACK/i, file: jsContent }
];

let mistakesPassed = true;
commonMistakes.forEach(({ check, pattern, file }) => {
    const matches = file.match(pattern);
    if (matches && matches.length > 3) {
        warnings.push(`⚠️  Found ${matches.length} instances of: ${check}`);
        mistakesPassed = false;
    }
});

if (mistakesPassed) {
    testsPassed++;
    console.log('✅ No major code issues found\n');
} else {
    console.log('⚠️  Some code cleanup needed\n');
}

// SUMMARY
console.log('\n' + '='.repeat(50));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(50));
console.log(`Tests Run: ${testsRun}`);
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Success Rate: ${Math.round((testsPassed/testsRun)*100)}%\n`);

if (issues.length > 0) {
    console.log('🚨 CRITICAL ISSUES:');
    issues.forEach(issue => console.log(issue));
    console.log('');
}

if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(warning => console.log(warning));
    console.log('');
}

// VERDICT
console.log('='.repeat(50));
if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ SPO AUTOMATED TESTS PASSED!');
    console.log('');
    console.log('⚠️  IMPORTANT: Automated tests passed, but you MUST:');
    console.log('1. Open social-optimizer-index.html in browser');
    console.log('2. Click "Start Free Preview"');
    console.log('3. Fill form and click "Next"');
    console.log('4. Verify page 2 loads with your data');
    console.log('5. Click "Back" and verify data persists');
    console.log('6. Complete entire flow to payment');
    console.log('7. Test on mobile device');
    console.log('');
    console.log('ONLY THEN say "SPO is ready"!');
} else if (issues.length > 0) {
    console.log('❌ SPO NOT READY - CRITICAL ISSUES FOUND');
    console.log('Fix all issues before testing in browser!');
} else {
    console.log('⚠️  SPO HAS WARNINGS - Review before launch');
    console.log('Consider fixing warnings for better quality');
}
console.log('='.repeat(50));

// Save results
const results = {
    timestamp: new Date().toISOString(),
    testsRun,
    testsPassed,
    successRate: Math.round((testsPassed/testsRun)*100),
    issues,
    warnings,
    verdict: issues.length === 0 ? 'PASSED' : 'FAILED'
};

fs.writeFileSync('SPO_TEST_RESULTS.json', JSON.stringify(results, null, 2));
console.log('\n📄 Results saved to SPO_TEST_RESULTS.json');
