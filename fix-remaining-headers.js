#!/usr/bin/env node
const fs = require('fs');

const files = [
    'BASF_IT_SECURITY_PROPOSAL.html',
    'blog.html',
    'index.html',
    'social-optimizer-index.html',
    'spo.html'
];

let fixed = 0;
files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const before = content;
        
        // More aggressive pattern matching
        content = content.replace(/(header\s*\{[^}]*?)text-align:\s*center/gi, '$1text-align: left');
        content = content.replace(/(\.header\s*\{[^}]*?)text-align:\s*center/gi, '$1text-align: left');
        
        if (content !== before) {
            fs.writeFileSync(file, content);
            fixed++;
            console.log(`✅ Fixed ${file}`);
        }
    }
});

console.log(`\n✅ Fixed ${fixed} files`);
