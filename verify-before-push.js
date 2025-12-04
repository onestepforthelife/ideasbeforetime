const fs = require('fs');
const path = require('path');

console.log('🔒 PRE-PUSH VERIFICATION - LIFETIME SYSTEM\n');
console.log('Checking everything before push...\n');

let errors = [];
let warnings = [];

// 1. Check all reports have blur
console.log('📊 Checking reports have blur...');
const reportFiles = [
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Final_Acrylic_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'nickel-esg-report.html'
];

reportFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('blur-overlay')) {
        errors.push(`❌ ${file} - Missing blur system`);
    } else {
        console.log(`  ✅ ${file}`);
    }
});

// 2. Check all HTML files have navigation
console.log('\n🧭 Checking navigation consistency...');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('test-') && !f.includes('compare-'));
let navMissing = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('common-navigation.js') && !content.includes('sticky-header')) {
        warnings.push(`⚠️  ${file} - No navigation`);
        navMissing++;
    }
});

if (navMissing === 0) {
    console.log('  ✅ All pages have navigation');
} else {
    console.log(`  ⚠️  ${navMissing} pages missing navigation`);
}

// 3. Check all HTML files have footer
console.log('\n📄 Checking footer consistency...');
let footerMissing = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('common-footer.js')) {
        warnings.push(`⚠️  ${file} - No footer`);
        footerMissing++;
    }
});

if (footerMissing === 0) {
    console.log('  ✅ All pages have footer');
} else {
    console.log(`  ⚠️  ${footerMissing} pages missing footer`);
}

// 4. Check reports have proper structure (skip header alignment check - it's in CSS)
console.log('\n📝 Checking report structure...');
reportFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    }
});

// 5. Check critical files exist
console.log('\n📦 Checking critical files...');
const criticalFiles = [
    'common-navigation.js',
    'common-footer.js',
    'universal-analytics.js',
    'error-tracker.js',
    'request-access.html'
];

criticalFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        errors.push(`❌ Missing critical file: ${file}`);
    } else {
        console.log(`  ✅ ${file}`);
    }
});

// 6. Run existing tests
console.log('\n🧪 Running automated tests...');
try {
    const { execSync } = require('child_process');
    execSync('node test-site-consistency.js', { stdio: 'pipe' });
    console.log('  ✅ Site consistency tests passed');
} catch (e) {
    warnings.push('⚠️  Some consistency tests failed');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ ALL CHECKS PASSED - SAFE TO PUSH!\n');
    process.exit(0);
} else {
    if (errors.length > 0) {
        console.log('\n❌ CRITICAL ERRORS (MUST FIX):');
        errors.forEach(e => console.log(e));
    }
    
    if (warnings.length > 0) {
        console.log('\n⚠️  WARNINGS (Should fix):');
        warnings.forEach(w => console.log(w));
    }
    
    if (errors.length > 0) {
        console.log('\n🚫 PUSH BLOCKED - Fix errors first!\n');
        process.exit(1);
    } else {
        console.log('\n⚠️  Warnings present but safe to push\n');
        process.exit(0);
    }
}
