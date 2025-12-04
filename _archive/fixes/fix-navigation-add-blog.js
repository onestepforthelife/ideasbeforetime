const fs = require('fs');

console.log('🔧 Adding Blog link to common-navigation.js\n');

const navFile = 'common-navigation.js';
const content = fs.readFileSync(navFile, 'utf8');

// Add Blog link after Library
const updated = content.replace(
    '<a href="library.html">Library</a>',
    '<a href="library.html">Library</a>\n            <a href="blog.html">Blog</a>'
);

fs.writeFileSync(navFile, updated, 'utf8');
console.log('✅ Blog link added to navigation\n');
console.log('All pages now have: Home | Tools | Library | Blog | Reports | About');
