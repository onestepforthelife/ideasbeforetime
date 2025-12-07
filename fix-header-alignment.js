#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function fixHeaderAlignment(dir = '.') {
    let fixed = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            fixed += fixHeaderAlignment(filePath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(filePath, 'utf8');
            const before = content;
            
            // Fix header text-align: center to left
            content = content.replace(/(<style[^>]*>[\s\S]*?header[^}]*?)text-align:\s*center/gi, '$1text-align: left');
            
            if (content !== before) {
                fs.writeFileSync(filePath, content);
                fixed++;
            }
        }
    });
    
    return fixed;
}

const fixed = fixHeaderAlignment();
console.log(`✅ Fixed ${fixed} files with header alignment`);
