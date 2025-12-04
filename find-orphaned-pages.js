// Find Orphaned Pages - December 5, 2025
// Pages without navigation or footer

const fs = require('fs');
const path = require('path');

console.log('🔍 Finding Orphaned Pages...\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const orphans = [];
const results = {
    total: files.length,
    withNav: 0,
    withFooter: 0,
    complete: 0,
    orphaned: 0
};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    const hasNav = content.includes('common-navigation.js') || 
                   content.includes('<nav') ||
                   content.includes('navigation');
    
    const hasFooter = content.includes('common-footer.js') || 
                      content.includes('<footer') ||
                      content.includes('footer');
    
    if (hasNav) results.withNav++;
    if (hasFooter) results.withFooter++;
    if (hasNav && hasFooter) results.complete++;
    
    if (!hasNav || !hasFooter) {
        orphans.push({
            file: file,
            hasNav: hasNav,
            hasFooter: hasFooter,
            missing: [
                !hasNav ? 'navigation' : null,
                !hasFooter ? 'footer' : null
            ].filter(Boolean)
        });
        results.orphaned++;
    }
});

console.log('📊 SUMMARY\n');
console.log('='.repeat(50));
console.log(`Total HTML files: ${results.total}`);
console.log(`With navigation: ${results.withNav}`);
console.log(`With footer: ${results.withFooter}`);
console.log(`Complete (both): ${results.complete}`);
console.log(`Orphaned: ${results.orphaned}`);
console.log('='.repeat(50));

if (orphans.length > 0) {
    console.log('\n❌ ORPHANED PAGES:\n');
    orphans.forEach((orphan, i) => {
        console.log(`${i + 1}. ${orphan.file}`);
        console.log(`   Missing: ${orphan.missing.join(', ')}`);
        console.log(`   Nav: ${orphan.hasNav ? '✅' : '❌'} | Footer: ${orphan.hasFooter ? '✅' : '❌'}`);
        console.log('');
    });
    
    // Save to file
    const report = {
        timestamp: new Date().toISOString(),
        summary: results,
        orphans: orphans
    };
    
    fs.writeFileSync('ORPHANED_PAGES_REPORT.json', JSON.stringify(report, null, 2));
    console.log('📄 Report saved to: ORPHANED_PAGES_REPORT.json\n');
    
} else {
    console.log('\n✅ NO ORPHANED PAGES! All pages have navigation and footer.\n');
}

console.log('✅ Check complete!');
