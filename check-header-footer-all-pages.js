const fs = require('fs');
const path = require('path');

console.log('🔍 Checking ALL pages for standard header/footer...\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const results = {
    hasNavigation: [],
    missingNavigation: [],
    hasFooter: [],
    missingFooter: [],
    hasNavigationCSS: [],
    missingNavigationCSS: [],
    hasFooterCSS: [],
    missingFooterCSS: []
};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for navigation
    const hasNavJS = content.includes('common-navigation.js');
    const hasNavCSS = content.includes('common-navigation.css');
    const hasFooterJS = content.includes('common-footer.js');
    const hasFooterCSS = content.includes('common-footer.css');
    
    if (hasNavJS) {
        results.hasNavigation.push(file);
    } else {
        results.missingNavigation.push(file);
    }
    
    if (hasNavCSS) {
        results.hasNavigationCSS.push(file);
    } else {
        results.missingNavigationCSS.push(file);
    }
    
    if (hasFooterJS) {
        results.hasFooter.push(file);
    } else {
        results.missingFooter.push(file);
    }
    
    if (hasFooterCSS) {
        results.hasFooterCSS.push(file);
    } else {
        results.missingFooterCSS.push(file);
    }
});

console.log('📊 RESULTS:\n');
console.log(`Total HTML files: ${files.length}\n`);

console.log('✅ NAVIGATION JS (common-navigation.js):');
console.log(`   Has: ${results.hasNavigation.length} files`);
console.log(`   Missing: ${results.missingNavigation.length} files\n`);

console.log('✅ NAVIGATION CSS (common-navigation.css):');
console.log(`   Has: ${results.hasNavigationCSS.length} files`);
console.log(`   Missing: ${results.missingNavigationCSS.length} files\n`);

console.log('✅ FOOTER JS (common-footer.js):');
console.log(`   Has: ${results.hasFooter.length} files`);
console.log(`   Missing: ${results.missingFooter.length} files\n`);

console.log('✅ FOOTER CSS (common-footer.css):');
console.log(`   Has: ${results.hasFooterCSS.length} files`);
console.log(`   Missing: ${results.missingFooterCSS.length} files\n`);

console.log('❌ FILES MISSING NAVIGATION JS:');
results.missingNavigation.forEach(f => console.log(`   - ${f}`));

console.log('\n❌ FILES MISSING NAVIGATION CSS:');
results.missingNavigationCSS.forEach(f => console.log(`   - ${f}`));

console.log('\n❌ FILES MISSING FOOTER JS:');
results.missingFooter.forEach(f => console.log(`   - ${f}`));

console.log('\n❌ FILES MISSING FOOTER CSS:');
results.missingFooterCSS.forEach(f => console.log(`   - ${f}`));

// Save report
const report = {
    totalFiles: files.length,
    summary: {
        navigationJS: {
            has: results.hasNavigation.length,
            missing: results.missingNavigation.length
        },
        navigationCSS: {
            has: results.hasNavigationCSS.length,
            missing: results.missingNavigationCSS.length
        },
        footerJS: {
            has: results.hasFooter.length,
            missing: results.missingFooter.length
        },
        footerCSS: {
            has: results.hasFooterCSS.length,
            missing: results.missingFooterCSS.length
        }
    },
    missingFiles: {
        navigationJS: results.missingNavigation,
        navigationCSS: results.missingNavigationCSS,
        footerJS: results.missingFooter,
        footerCSS: results.missingFooterCSS
    }
};

fs.writeFileSync('HEADER_FOOTER_CHECK_REPORT.json', JSON.stringify(report, null, 2));
console.log('\n✅ Report saved to: HEADER_FOOTER_CHECK_REPORT.json');
