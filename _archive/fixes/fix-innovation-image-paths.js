// Fix image paths in ALL innovation pages
// Change url('images/...) to url('../images/...)

const fs = require('fs');
const path = require('path');

const innovationsDir = path.join(__dirname, 'innovations');
const files = fs.readdirSync(innovationsDir).filter(f => f.endsWith('.html'));

let fixed = 0;

console.log('🖼️  Fixing image paths in innovation pages...\n');

files.forEach(file => {
    const filePath = path.join(innovationsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix: url('images/ → url('../images/
    if (content.includes("url('images/")) {
        content = content.replace(/url\('images\//g, "url('../images/");
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${file} - Fixed`);
        fixed++;
    } else if (content.includes("url('../images/")) {
        console.log(`✓  ${file} - Already correct`);
    } else {
        console.log(`⚠️  ${file} - No images`);
    }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed: ${fixed} files`);
console.log('='.repeat(60));
console.log('\n🎯 All innovation page images now use correct path: ../images/');
