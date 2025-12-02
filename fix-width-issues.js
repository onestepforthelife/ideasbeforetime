const fs = require('fs');
const path = require('path');

console.log('🔍 Finding files with width issues...\n');

const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .sort();

const filesToFix = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if file has max-width: 1400px
    const has1400 = content.includes('max-width: 1400px') || 
                    content.includes('max-width:1400px');
    
    if (!has1400) {
        filesToFix.push(file);
    }
});

console.log(`Found ${filesToFix.length} files without 1400px width:\n`);
filesToFix.forEach(file => console.log(`  - ${file}`));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('📝 Files to fix:');
console.log(JSON.stringify(filesToFix, null, 2));
