const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.startsWith('common-'));

console.log('Checking width consistency...\n');

const issues = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for max-width: 1400px in various places
    const hasWidth = content.includes('max-width: 1400px') || 
                     content.includes('max-width:1400px') ||
                     content.includes('maxWidth: "1400px"');
    
    if (!hasWidth) {
        issues.push(file);
        console.log(`❌ ${file} - Missing 1400px width`);
    }
});

console.log(`\n📊 Total files without 1400px: ${issues.length}`);
console.log('\nFiles needing fix:');
issues.forEach(f => console.log(`   - ${f}`));
