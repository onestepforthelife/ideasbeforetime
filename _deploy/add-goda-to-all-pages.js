const fs = require('fs');
const path = require('path');

console.log('Adding GODA AI chatbot to all pages...\n');

function getAllHtmlFiles(dir = '.') {
    let results = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!file.startsWith('.') && !file.startsWith('node_modules') && !file.startsWith('backup')) {
                results = results.concat(getAllHtmlFiles(filePath));
            }
        } else if (file.endsWith('.html') && !file.includes('test-')) {
            results.push(filePath);
        }
    }
    
    return results;
}

const htmlFiles = getAllHtmlFiles();
let added = 0;
let skipped = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Check if already has goda-chatbot.js
    if (content.includes('goda-chatbot.js')) {
        console.log(`⏭️  Skipped: ${file} (already has GODA)`);
        skipped++;
        return;
    }
    
    // Add before </body>
    if (content.includes('</body>')) {
        content = content.replace('</body>', '<script src="goda-chatbot.js"></script>\n</body>');
        fs.writeFileSync(file, content);
        console.log(`✅ Added: ${file}`);
        added++;
    } else {
        console.log(`⚠️  No </body> tag: ${file}`);
    }
});

console.log(`\n✅ Added GODA to ${added} pages`);
console.log(`⏭️  Skipped ${skipped} pages (already had it)`);
