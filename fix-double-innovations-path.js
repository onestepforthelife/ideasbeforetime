#!/usr/bin/env node
const fs = require('fs');

const files = ['about.html', 'library.html', 'timeline.html'];

console.log('\n🔧 Fixing double innovations/ path...\n');

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    const before = content;
    
    // Fix double path
    content = content.replace(/innovations\/innovations\//g, 'innovations/');
    
    if (content !== before) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}`);
    }
});

console.log('\n✅ Done!\n');
