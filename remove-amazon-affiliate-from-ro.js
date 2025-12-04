// Remove Amazon affiliate tag from RO guide
// You don't have Amazon affiliate account

const fs = require('fs');

const file = 'ro-water-purifier-guide.html';
let content = fs.readFileSync(file, 'utf8');

// Remove affiliate tag from all Amazon links
content = content.replace(/&tag=ideasbeforet-21/g, '');

fs.writeFileSync(file, content, 'utf8');

console.log('✅ Removed Amazon affiliate tag from RO guide');
console.log('   Links now point to regular Amazon (no commission)');
console.log('   You can still earn from AdSense on this page!');
