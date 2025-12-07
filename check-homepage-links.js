const fs = require('fs');

console.log('🔍 CHECKING HOMEPAGE, FOOTER & HEADER LINKS...\n');

const results = {
    issues: [],
    checked: 0
};

// Key pages to check
const pagesToCheck = [
    'index.html',
    'about.html',
    'market-reports.html',
    'library.html',
    'timeline.html'
];

// Check common-navigation.js
console.log('📋 CHECKING: common-navigation.js');
if (fs.existsSync('common-navigation.js')) {
    const navContent = fs.readFileSync('common-navigation.js', 'utf8');
    
    // Check for library.html links (should be index.html)
    if (navContent.includes('library.html')) {
        results.issues.push('❌ common-navigation.js: Contains "library.html" (should be "index.html")');
    }
    
    // Check for innovations link
    if (!navContent.includes('library.html') && !navContent.includes('index.html')) {
        results.issues.push('⚠️ common-navigation.js: No home link found');
    }
    
    results.checked++;
    console.log('✅ Checked common-navigation.js\n');
} else {
    results.issues.push('❌ common-navigation.js: FILE NOT FOUND');
}

// Check common-footer.js
console.log('📋 CHECKING: common-footer.js');
if (fs.existsSync('common-footer.js')) {
    const footerContent = fs.readFileSync('common-footer.js', 'utf8');
    
    // Check for library.html links
    if (footerContent.includes('library.html')) {
        results.issues.push('❌ common-footer.js: Contains "library.html" (should be "index.html")');
    }
    
    results.checked++;
    console.log('✅ Checked common-footer.js\n');
} else {
    results.issues.push('❌ common-footer.js: FILE NOT FOUND');
}

// Check each main page
pagesToCheck.forEach(page => {
    console.log(`📋 CHECKING: ${page}`);
    
    if (!fs.existsSync(page)) {
        results.issues.push(`❌ ${page}: FILE NOT FOUND`);
        return;
    }
    
    const content = fs.readFileSync(page, 'utf8');
    
    // Check for library.html links (should be index.html)
    const libraryMatches = content.match(/href=["']library\.html["']/g);
    if (libraryMatches && page !== 'library.html') {
        results.issues.push(`❌ ${page}: Has ${libraryMatches.length} link(s) to "library.html" (should be "index.html")`);
    }
    
    // Check for innovations/ links
    const innovationsMatches = content.match(/href=["']innovations\//g);
    if (innovationsMatches) {
        console.log(`   ✅ Has ${innovationsMatches.length} innovations/ link(s)`);
    }
    
    // Check for common-navigation.js
    if (!content.includes('common-navigation.js')) {
        results.issues.push(`⚠️ ${page}: Missing common-navigation.js`);
    }
    
    // Check for common-footer.js
    if (!content.includes('common-footer.js')) {
        results.issues.push(`⚠️ ${page}: Missing common-footer.js`);
    }
    
    results.checked++;
    console.log(`✅ Checked ${page}\n`);
});

console.log('='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Files checked: ${results.checked}`);
console.log(`❌ Issues found: ${results.issues.length}\n`);

if (results.issues.length > 0) {
    console.log('🚨 ISSUES FOUND:\n');
    results.issues.forEach(issue => console.log(issue));
    console.log('\n❌ NEEDS FIXING!');
} else {
    console.log('✅ ALL CHECKS PASSED! No issues found.');
}
