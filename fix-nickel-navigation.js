const fs = require('fs');

console.log('🔧 Fixing nickel-esg-report.html issues...\n');

// Read the file
const filePath = 'nickel-esg-report.html';
let content = fs.readFileSync(filePath, 'utf8');

let changes = [];

// Issue 1: Check for double header (static <header> tag)
if (content.includes('<header')) {
    console.log('❌ Found static <header> tag (conflicts with common-navigation.js)');
    changes.push('Remove static header tag');
} else {
    console.log('✅ No static <header> tag found');
}

// Issue 2: Update common-navigation.js to include Blog and RO links
const navFilePath = 'common-navigation.js';
let navContent = fs.readFileSync(navFilePath, 'utf8');

// Check if Blog and RO are missing
if (!navContent.includes('blog.html')) {
    console.log('❌ Blog link missing from navigation');
    changes.push('Add Blog link to navigation');
    
    // Add Blog and RO links after Home
    navContent = navContent.replace(
        '<li><a href="/index.html">Home</a></li>',
        `<li><a href="/index.html">Home</a></li>
                <li><a href="/blog.html">Blog</a></li>
                <li><a href="/ro.html">RO Water Guide</a></li>`
    );
    
    fs.writeFileSync(navFilePath, navContent, 'utf8');
    console.log('✅ Added Blog and RO links to common-navigation.js');
} else {
    console.log('✅ Blog link already in navigation');
}

console.log('\n📊 Summary:');
console.log(`Changes needed: ${changes.length}`);
if (changes.length > 0) {
    changes.forEach(change => console.log(`  - ${change}`));
    console.log('\n✅ Navigation updated! Blog and RO links now available on all pages.');
} else {
    console.log('✅ No changes needed - navigation already correct');
}
