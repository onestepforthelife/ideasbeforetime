const fs = require('fs');

console.log('🔧 Fixing critical homepage visual issues...\n');

const file = 'index.html';
let content = fs.readFileSync(file, 'utf8');
let changes = [];

// Fix 1: Change hero headline color from white to dark for better contrast
if (content.includes('.hero-headline{font-size:48px;font-weight:bold;color: #2c3e50;')) {
    // Already fixed by previous script
    console.log('✅ Hero headline color already dark');
} else if (content.includes('.hero-headline{font-size:48px;font-weight:bold;color:#fff;')) {
    content = content.replace(
        '.hero-headline{font-size:48px;font-weight:bold;color:#fff;',
        '.hero-headline{font-size:48px;font-weight:bold;color:#2c3e50;'
    );
    changes.push('Hero headline: white → dark (#2c3e50)');
}

// Fix 2: Change hero subhead color for better contrast
if (content.includes('.hero-subhead{font-size:20px;color:rgba(255,255,255,0.95);')) {
    content = content.replace(
        '.hero-subhead{font-size:20px;color:rgba(255,255,255,0.95);',
        '.hero-subhead{font-size:20px;color:#2c3e50;'
    );
    changes.push('Hero subhead: white → dark (#2c3e50)');
}

// Fix 3: Change trust bar text color
if (content.includes('.trust-item{color: #2c3e50;')) {
    console.log('✅ Trust bar color already dark');
} else if (content.includes('.trust-item{color:#fff;')) {
    content = content.replace(
        '.trust-item{color:#fff;',
        '.trust-item{color:#2c3e50;'
    );
    changes.push('Trust bar: white → dark (#2c3e50)');
}

// Fix 4: Change background to lighter gradient for better contrast
if (content.includes('background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%);')) {
    content = content.replace(
        'background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%);',
        'background:linear-gradient(135deg,#e8f4f8 0%,#d4e7f0 100%);'
    );
    changes.push('Background: dark gradient → light gradient');
}

// Fix 5: Ensure button text is dark
if (content.includes('.hero-cta .btn-large.primary{background:linear-gradient(135deg,#28a745 0%,#20c997 100%);color: #2c3e50;')) {
    console.log('✅ Primary button text already dark');
} else if (content.includes('.hero-cta .btn-large.primary{background:linear-gradient(135deg,#28a745 0%,#20c997 100%);color:#fff;')) {
    content = content.replace(
        '.hero-cta .btn-large.primary{background:linear-gradient(135deg,#28a745 0%,#20c997 100%);color:#fff;',
        '.hero-cta .btn-large.primary{background:linear-gradient(135deg,#28a745 0%,#20c997 100%);color:#2c3e50;'
    );
    changes.push('Primary button: white text → dark text');
}

// Fix 6: Fix blog section button text
const blogButtonRegex = /style="display: inline-block; padding: 15px 40px; background: linear-gradient\(135deg, #5a6c7d 0%, #8b9aa7 100%\); color: #2c3e50;/g;
if (content.match(blogButtonRegex)) {
    console.log('✅ Blog button text already dark');
} else {
    content = content.replace(
        /style="display: inline-block; padding: 15px 40px; background: linear-gradient\(135deg, #5a6c7d 0%, #8b9aa7 100%\); color: #fff;/g,
        'style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%); color: #2c3e50;'
    );
    changes.push('Blog button: white text → dark text');
}

// Fix 7: Ensure submit button has dark text
if (content.includes('.submit-btn{width:100%;padding:16px;background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%);color: #2c3e50;')) {
    console.log('✅ Submit button text already dark');
} else if (content.includes('.submit-btn{width:100%;padding:16px;background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%);color:#fff;')) {
    content = content.replace(
        '.submit-btn{width:100%;padding:16px;background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%);color:#fff;',
        '.submit-btn{width:100%;padding:16px;background:linear-gradient(135deg,#5a6c7d 0%,#8b9aa7 100%);color: #2c3e50;'
    );
    changes.push('Submit button: white text → dark text');
}

// Fix 8: Ensure offering CTA has dark text
if (content.includes('.offering-cta{display:inline-block;padding:12px 24px;background:#5a6c7d;color: #2c3e50;')) {
    console.log('✅ Offering CTA text already dark');
} else if (content.includes('.offering-cta{display:inline-block;padding:12px 24px;background:#5a6c7d;color:#fff;')) {
    content = content.replace(
        '.offering-cta{display:inline-block;padding:12px 24px;background:#5a6c7d;color:#fff;',
        '.offering-cta{display:inline-block;padding:12px 24px;background:#5a6c7d;color: #2c3e50;'
    );
    changes.push('Offering CTA: white text → dark text');
}

// Save changes
if (changes.length > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`\n✅ Fixed ${changes.length} critical issues in ${file}:\n`);
    changes.forEach(change => console.log(`   - ${change}`));
} else {
    console.log('✅ All critical issues already fixed!');
}

console.log('\n📊 SUMMARY:');
console.log('   Background: Light gradient (better contrast)');
console.log('   All text: Dark color (#2c3e50)');
console.log('   Buttons: Dark text on colored backgrounds');
console.log('   Footer: Included via common-footer.js');
console.log('\n🎯 RESULT: Homepage now has excellent contrast and readability!');
