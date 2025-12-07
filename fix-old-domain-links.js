#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function fixOldDomainLinks(dir = '.') {
    let fixed = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            fixed += fixOldDomainLinks(filePath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            const before = content;
            content = content.replace(/https:\/\/ideasbeforetime\.pages\.dev/g, 'https://onestepforthelife.com');
            if (content !== before) {
                fs.writeFileSync(filePath, content);
                fixed++;
            }
        }
    });
    
    return fixed;
}

const fixed = fixOldDomainLinks();
console.log(`✅ Fixed ${fixed} files with old domain links`);
