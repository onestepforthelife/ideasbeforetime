/* Fix Duplicate Footer Issue
 * Some pages have BOTH custom footer div AND common-footer.js
 * This creates two footers - one left-aligned, one center-aligned
 */

const fs = require('fs');

console.log('🔍 Checking for duplicate footer issues...\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let issuesFound = 0;
let issuesFixed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    const hasCommonFooter = content.includes('common-footer.js');
    const hasCustomFooterDiv = content.includes('<div class="footer">');
    
    if (hasCommonFooter && hasCustomFooterDiv) {
        console.log(`📄 ${file}:`);
        console.log(`   ❌ Has BOTH common-footer.js AND custom <div class="footer">`);
        console.log(`   This creates duplicate footers!`);
        
        // Remove the custom footer div and its content
        // Match: <div class="footer">...</div> (including nested content)
        const footerRegex = /<div class="footer">[\s\S]*?<\/div>/;
        const match = content.match(footerRegex);
        
        if (match) {
            console.log(`   📝 Removing custom footer div...`);
            content = content.replace(footerRegex, '<!-- Custom footer removed - using common-footer.js -->');
            
            // Also remove the .footer CSS style if it exists
            const footerStyleRegex = /\.footer\s*{[^}]*}/g;
            if (content.match(footerStyleRegex)) {
                console.log(`   📝 Removing .footer CSS style...`);
                content = content.replace(footerStyleRegex, '');
            }
            
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ Fixed and saved\n`);
            issuesFixed++;
        }
        
        issuesFound++;
    }
});

console.log('\n' + '='.repeat(60));
console.log(`📊 SUMMARY:`);
console.log(`   Total files checked: ${files.length}`);
console.log(`   Duplicate footers found: ${issuesFound}`);
console.log(`   Duplicate footers fixed: ${issuesFixed}`);
console.log('='.repeat(60));

if (issuesFixed > 0) {
    console.log('\n✅ All duplicate footers removed!');
    console.log('   Now all pages use common-footer.js (center-aligned)');
} else if (issuesFound === 0) {
    console.log('\n✅ No duplicate footers found!');
}
