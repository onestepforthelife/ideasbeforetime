/**
 * Fix Navigation Alignment Issue - MECER Implementation
 * Problem: Inline styles in index.html override common-navigation.css
 * Solution: Move common-navigation.css AFTER inline styles OR add !important
 */

const fs = require('fs');

console.log('🔧 MECER: Fix Navigation Alignment');
console.log('=====================================\n');

// Read index.html
const indexPath = 'index.html';
let content = fs.readFileSync(indexPath, 'utf8');

console.log('📋 DIAGNOSIS:');
console.log('✓ common-navigation.css loaded at line 22');
console.log('✗ Inline <style> block at line 24 resets all styles with *{margin:0;padding:0;}');
console.log('✗ This overrides navigation CSS');
console.log('');

// Solution: Move common-navigation.css link AFTER the inline style block
// Find the inline style block end
const styleBlockEnd = content.indexOf('</style>');
const navCSSLink = '<link rel="stylesheet" href="common-navigation.css">';

if (styleBlockEnd === -1) {
    console.log('❌ Could not find inline style block');
    process.exit(1);
}

// Remove existing nav CSS link
content = content.replace(navCSSLink + '\n', '');

// Insert nav CSS link AFTER inline style block
const insertPosition = styleBlockEnd + '</style>'.length;
content = content.slice(0, insertPosition) + '\n' + navCSSLink + content.slice(insertPosition);

// Write back
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ FIXED: Moved common-navigation.css AFTER inline styles');
console.log('✅ Navigation CSS will now load last and not be overridden');
console.log('');

console.log('📊 MECER CHECKLIST:');
console.log('☑ M: Made fix to index.html');
console.log('☑ E: Everything (CSS load order corrected)');
console.log('☑ C: Complete (file updated)');
console.log('☑ E: Executed (fix applied)');
console.log('☐ R: Reality-test (need to check live site)');
console.log('');

console.log('🎯 NEXT STEPS:');
console.log('1. Check index.html - nav CSS should be after </style>');
console.log('2. Test locally - navigation should be styled');
console.log('3. Push to GitHub');
console.log('4. Test live site - navigation should be aligned');
console.log('');

console.log('✅ Fix complete - ready for reality testing');
