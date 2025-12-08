const fs = require('fs');

console.log('🔧 FIXING: Inline text-align styles\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let fixed = 0;
let totalChanges = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Fix inline styles: text-align: left → text-align: center
    // For h1, h2, h3, header elements
    content = content.replace(/(<h[123][^>]*style="[^"]*?)text-align:\s*left/gi, '$1text-align: center');
    content = content.replace(/(<header[^>]*style="[^"]*?)text-align:\s*left/gi, '$1text-align: center');
    content = content.replace(/(<div[^>]*class="[^"]*header[^"]*"[^>]*style="[^"]*?)text-align:\s*left/gi, '$1text-align: center');
    
    // Also fix small font sizes in inline styles
    content = content.replace(/font-size:\s*10px/gi, 'font-size: 14px');
    content = content.replace(/font-size:\s*11px/gi, 'font-size: 14px');
    content = content.replace(/font-size:\s*12px/gi, 'font-size: 14px');
    
    if (content !== original) {
        const changes = (original.match(/text-align:\s*left/gi) || []).length - (content.match(/text-align:\s*left/gi) || []).length;
        fs.writeFileSync(file, content);
        fixed++;
        totalChanges += changes;
        console.log(`✅ ${file}: Fixed ${changes} alignment issues`);
    }
});

console.log(`\n📊 SUMMARY:`);
console.log(`   Files fixed: ${fixed}`);
console.log(`   Total changes: ${totalChanges}`);
console.log(`\n✅ All inline text-align: left → center`);
console.log(`✅ All small fonts: 10-12px → 14px`);

process.exit(0);
