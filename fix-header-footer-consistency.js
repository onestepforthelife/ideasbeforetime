/* Fix Header and Footer Consistency Issues
 * Issue 1: Home page header different from other pages
 * Issue 2: Footer left-aligned on some pages
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking header and footer consistency...\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let issuesFound = 0;
let issuesFixed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    let fileIssues = [];

    // Check 1: Home page (index.html) should have consistent padding
    if (file === 'index.html') {
        // Check if body has 80px top padding (different from other pages)
        if (content.includes('padding: 80px 20px 20px 20px')) {
            fileIssues.push('❌ Home page has different padding (80px top) - should be 20px like other pages');
            content = content.replace(
                'padding: 80px 20px 20px 20px',
                'padding: 20px'
            );
            modified = true;
            issuesFixed++;
        }
    }

    // Check 2: Pages with custom footer styles that might conflict
    const hasCommonFooter = content.includes('common-footer.js');
    const hasCustomFooterStyle = content.match(/\.footer\s*{[^}]*text-align:\s*left/);
    
    if (hasCommonFooter && hasCustomFooterStyle) {
        fileIssues.push('⚠️ Has both common-footer.js AND custom footer with left alignment');
        // This might cause conflicts - common-footer is center-aligned
    }

    // Check 3: Footer text-align conflicts
    if (content.includes('common-footer.js')) {
        // Check if there's a conflicting .site-footer style
        const conflictingFooterStyle = content.match(/\.site-footer\s*{[^}]*text-align:\s*left[^}]*}/);
        if (conflictingFooterStyle) {
            fileIssues.push('❌ Custom .site-footer style conflicts with common-footer (left vs center)');
            // Remove the conflicting style
            content = content.replace(conflictingFooterStyle[0], '');
            modified = true;
            issuesFixed++;
        }
    }

    // Check 4: Pages with inline footer styles
    const inlineFooterLeft = content.match(/<footer[^>]*style="[^"]*text-align:\s*left[^"]*"/);
    if (inlineFooterLeft && hasCommonFooter) {
        fileIssues.push('❌ Inline footer style conflicts with common-footer');
        content = content.replace(/text-align:\s*left/g, 'text-align: center');
        modified = true;
        issuesFixed++;
    }

    // Report issues
    if (fileIssues.length > 0) {
        console.log(`📄 ${file}:`);
        fileIssues.forEach(issue => console.log(`   ${issue}`));
        issuesFound += fileIssues.length;
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ Fixed and saved\n`);
        } else {
            console.log(`   ⚠️ Manual review needed\n`);
        }
    }
});

console.log('\n' + '='.repeat(60));
console.log(`📊 SUMMARY:`);
console.log(`   Total files checked: ${files.length}`);
console.log(`   Issues found: ${issuesFound}`);
console.log(`   Issues fixed: ${issuesFixed}`);
console.log(`   Manual review needed: ${issuesFound - issuesFixed}`);
console.log('='.repeat(60));

// Specific checks for common issues
console.log('\n🔍 SPECIFIC CHECKS:\n');

// Check index.html header
const indexContent = fs.readFileSync('index.html', 'utf8');
if (indexContent.includes('padding: 20px')) {
    console.log('✅ index.html: Header padding consistent with other pages');
} else {
    console.log('❌ index.html: Header padding still different');
}

// Check for pages with left-aligned footers
const leftFooterPages = files.filter(file => {
    const content = fs.readFileSync(file, 'utf8');
    return content.includes('common-footer.js') && 
           (content.includes('text-align: left') || content.includes('text-align:left'));
});

if (leftFooterPages.length > 0) {
    console.log(`\n⚠️ Pages that might have left-aligned footer conflicts:`);
    leftFooterPages.forEach(page => console.log(`   - ${page}`));
} else {
    console.log('✅ No footer alignment conflicts detected');
}

console.log('\n✅ Check complete!');
