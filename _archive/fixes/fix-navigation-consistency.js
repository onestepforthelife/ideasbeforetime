const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING NAVIGATION CONSISTENCY\n');

// Files that need common-navigation.js added
const filesToFix = [
    'index.html',
    'index-v2-conversion-optimized.html'
];

filesToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file} - Not found, skipping`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has sticky-header
    if (content.includes('sticky-header')) {
        console.log(`\n📝 ${file}:`);
        
        // Remove sticky header CSS
        content = content.replace(/\/\* Sticky Header \*\/[\s\S]*?\.btn-secondary:hover \{[^}]+\}/g, '');
        
        // Remove sticky header HTML
        content = content.replace(/<header class="sticky-header"[^>]*>[\s\S]*?<\/header>/g, '');
        
        // Add common-navigation.css if not present
        if (!content.includes('common-navigation.css')) {
            content = content.replace(
                '<link rel="stylesheet" href="common-watermark.css">',
                '<link rel="stylesheet" href="common-watermark.css">\n<link rel="stylesheet" href="common-navigation.css">'
            );
            console.log('  ✅ Added common-navigation.css');
        }
        
        // Add common-navigation.js before closing body tag if not present
        if (!content.includes('common-navigation.js')) {
            content = content.replace(
                '</body>',
                '<script src="common-navigation.js"></script>\n</body>'
            );
            console.log('  ✅ Added common-navigation.js');
        }
        
        // Write back
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('  ✅ Fixed!');
    } else {
        console.log(`✅ ${file} - Already using common-navigation`);
    }
});

console.log('\n✅ NAVIGATION CONSISTENCY FIXED!\n');
