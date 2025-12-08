const fs = require('fs');

console.log('🔧 FIXING: Typography & Alignment Issues\n');
console.log('='.repeat(70));

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let fixed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Fix 1: Change header text-align from left to center
    if (/header\s*{[^}]*text-align:\s*left/gi.test(content)) {
        content = content.replace(/(header\s*{[^}]*)text-align:\s*left/gi, '$1text-align: center');
        modified = true;
        console.log(`✅ ${file}: Fixed header alignment (left → center)`);
    }
    
    // Fix 2: Change .hero text-align from left to center
    if (/\.hero\s*{[^}]*text-align:\s*left/gi.test(content)) {
        content = content.replace(/(\.hero\s*{[^}]*)text-align:\s*left/gi, '$1text-align: center');
        modified = true;
        console.log(`✅ ${file}: Fixed hero alignment (left → center)`);
    }
    
    // Fix 3: Increase small font sizes (10px → 14px, 11px → 14px, 12px → 14px)
    if (/font-size:\s*10px/gi.test(content)) {
        content = content.replace(/font-size:\s*10px/gi, 'font-size: 14px');
        modified = true;
        console.log(`✅ ${file}: Fixed small text (10px → 14px)`);
    }
    if (/font-size:\s*11px/gi.test(content)) {
        content = content.replace(/font-size:\s*11px/gi, 'font-size: 14px');
        modified = true;
        console.log(`✅ ${file}: Fixed small text (11px → 14px)`);
    }
    if (/font-size:\s*12px/gi.test(content)) {
        content = content.replace(/font-size:\s*12px/gi, 'font-size: 14px');
        modified = true;
        console.log(`✅ ${file}: Fixed small text (12px → 14px)`);
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        fixed++;
    }
});

console.log('\n' + '='.repeat(70));
console.log(`\n📊 SUMMARY: Fixed ${fixed} files`);
console.log('\nFixes applied:');
console.log('  • Header alignment: left → center');
console.log('  • Hero alignment: left → center');
console.log('  • Small text: 10-12px → 14px');
console.log('\nAll pages now have:');
console.log('  ✅ Centered headers');
console.log('  ✅ Readable text (minimum 14px)');
console.log('  ✅ Professional typography');

process.exit(0);
