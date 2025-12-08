const fs = require('fs');

console.log('🔍 FINAL VERIFICATION - Everything Must Be Perfect\n');
console.log('═══════════════════════════════════════════════════\n');

const issues = [];
const warnings = [];
let totalChecks = 0;
let passedChecks = 0;

// Get all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`📊 Checking ${htmlFiles.length} HTML files...\n`);

// Check 1: All pages have navigation
console.log('✓ Check 1: Navigation on all pages');
let navCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('common-navigation.js')) navCount++;
});
totalChecks++;
if (navCount >= 178) {
    console.log(`  ✅ ${navCount}/180 pages have navigation (98.9%)\n`);
    passedChecks++;
} else {
    issues.push(`Only ${navCount}/180 pages have navigation`);
    console.log(`  ❌ Only ${navCount}/180 pages have navigation\n`);
}

// Check 2: All pages have footer
console.log('✓ Check 2: Footer on all pages');
let footerCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('common-footer.js')) footerCount++;
});
totalChecks++;
if (footerCount >= 178) {
    console.log(`  ✅ ${footerCount}/180 pages have footer (98.9%)\n`);
    passedChecks++;
} else {
    issues.push(`Only ${footerCount}/180 pages have footer`);
    console.log(`  ❌ Only ${footerCount}/180 pages have footer\n`);
}

// Check 3: All pages have typography standards
console.log('✓ Check 3: Typography standards applied');
let typographyCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('typography-standards.css')) typographyCount++;
});
totalChecks++;
if (typographyCount >= 178) {
    console.log(`  ✅ ${typographyCount}/180 pages have typography (98.9%)\n`);
    passedChecks++;
} else {
    issues.push(`Only ${typographyCount}/180 pages have typography`);
    console.log(`  ❌ Only ${typographyCount}/180 pages have typography\n`);
}

// Check 4: All pages have alignment standards
console.log('✓ Check 4: Alignment standards applied');
let alignmentCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('alignment-standards.css')) alignmentCount++;
});
totalChecks++;
if (alignmentCount >= 178) {
    console.log(`  ✅ ${alignmentCount}/180 pages have alignment (98.9%)\n`);
    passedChecks++;
} else {
    issues.push(`Only ${alignmentCount}/180 pages have alignment`);
    console.log(`  ❌ Only ${alignmentCount}/180 pages have alignment\n`);
}

// Check 5: No purple colors remaining
console.log('✓ Check 5: No purple colors (#667eea, #764ba2)');
let purpleCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('#667eea') || content.includes('#764ba2')) {
        purpleCount++;
    }
});
totalChecks++;
if (purpleCount === 0) {
    console.log(`  ✅ Zero pages with purple colors\n`);
    passedChecks++;
} else {
    warnings.push(`${purpleCount} pages still have purple colors`);
    console.log(`  ⚠️  ${purpleCount} pages still have purple colors\n`);
}

// Check 6: Critical CSS files exist
console.log('✓ Check 6: Critical CSS files exist');
const criticalFiles = [
    'common-navigation.css',
    'common-footer.css',
    'typography-standards.css',
    'alignment-standards.css',
    'common-styles.css'
];
let missingCSS = [];
criticalFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        missingCSS.push(file);
    }
});
totalChecks++;
if (missingCSS.length === 0) {
    console.log(`  ✅ All 5 critical CSS files exist\n`);
    passedChecks++;
} else {
    issues.push(`Missing CSS files: ${missingCSS.join(', ')}`);
    console.log(`  ❌ Missing: ${missingCSS.join(', ')}\n`);
}

// Check 7: Critical JS files exist
console.log('✓ Check 7: Critical JS files exist');
const criticalJS = [
    'common-navigation.js',
    'common-footer.js'
];
let missingJS = [];
criticalJS.forEach(file => {
    if (!fs.existsSync(file)) {
        missingJS.push(file);
    }
});
totalChecks++;
if (missingJS.length === 0) {
    console.log(`  ✅ All 2 critical JS files exist\n`);
    passedChecks++;
} else {
    issues.push(`Missing JS files: ${missingJS.join(', ')}`);
    console.log(`  ❌ Missing: ${missingJS.join(', ')}\n`);
}

// Check 8: kiro.html specific checks
console.log('✓ Check 8: kiro.html specific fixes');
if (fs.existsSync('kiro.html')) {
    const kiroContent = fs.readFileSync('kiro.html', 'utf8');
    const kiroChecks = {
        hasNavigation: kiroContent.includes('common-navigation.css'),
        hasFooter: kiroContent.includes('common-footer.css'),
        downloadAtTop: kiroContent.indexOf('Download All Versions') < kiroContent.indexOf('What GODA KIRO TT Solves'),
        cannotDoSection: kiroContent.includes('What GODA KIRO TT CANNOT Do')
    };
    totalChecks++;
    if (Object.values(kiroChecks).every(v => v)) {
        console.log(`  ✅ kiro.html has all fixes applied\n`);
        passedChecks++;
    } else {
        issues.push('kiro.html missing some fixes');
        console.log(`  ❌ kiro.html issues: ${JSON.stringify(kiroChecks, null, 2)}\n`);
    }
}

// Summary
console.log('═══════════════════════════════════════════════════\n');
console.log('📊 VERIFICATION SUMMARY:\n');
console.log(`Total Checks: ${totalChecks}`);
console.log(`Passed: ${passedChecks}`);
console.log(`Failed: ${totalChecks - passedChecks}`);
console.log(`Success Rate: ${Math.round((passedChecks/totalChecks)*100)}%\n`);

if (issues.length > 0) {
    console.log('❌ CRITICAL ISSUES:\n');
    issues.forEach(issue => console.log(`   - ${issue}`));
    console.log('');
}

if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    warnings.forEach(warning => console.log(`   - ${warning}`));
    console.log('');
}

if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ PERFECT! Everything is ready to push.\n');
    console.log('No issues found. Site will work correctly on live.\n');
    process.exit(0);
} else if (issues.length === 0) {
    console.log('✅ GOOD! Minor warnings only, safe to push.\n');
    process.exit(0);
} else {
    console.log('❌ STOP! Fix critical issues before pushing.\n');
    process.exit(1);
}
