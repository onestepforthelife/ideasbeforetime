const fs = require('fs');

console.log('🔍 TESTING FOR DOUBLE HEADERS\n');
console.log('Checking if pages have both <header> tag AND common-navigation.js\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html'))
    .sort();

let issues = [];
let passed = 0;

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if has both <header> tag AND navigation
    const hasHeaderTag = content.includes('<header>') || content.includes('<header ');
    const hasNavigation = content.includes('common-navigation.js');
    
    if (hasHeaderTag && hasNavigation) {
        issues.push({
            file: file,
            problem: 'Has both <header> tag AND common-navigation.js (double header!)'
        });
    } else {
        passed++;
    }
});

if (issues.length === 0) {
    console.log('✅ NO DOUBLE HEADERS FOUND!\n');
    console.log(`All ${htmlFiles.length} files checked - no conflicts.\n`);
} else {
    console.log(`❌ FOUND ${issues.length} DOUBLE HEADER ISSUES:\n`);
    issues.forEach(issue => {
        console.log(`   ❌ ${issue.file}`);
        console.log(`      ${issue.problem}\n`);
    });
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${issues.length}`);
console.log(`📊 Total: ${htmlFiles.length}`);

if (issues.length > 0) {
    process.exit(1);
}
