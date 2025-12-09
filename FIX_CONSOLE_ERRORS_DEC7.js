const fs = require('fs');

console.log('🔧 FIXING CONSOLE ERRORS - December 7, 2025\n');

let fixed = 0;

// Fix: error-dashboard.html - Script not found: user-error-tracker.js
try {
    let content = fs.readFileSync('error-dashboard.html', 'utf8');
    content = content.replace(/user-error-tracker\.js/g, '<!-- REMOVED: user-error-tracker.js -->');
    fs.writeFileSync('error-dashboard.html', content);
    console.log('✅ Fixed: error-dashboard.html');
    fixed++;
} catch (err) { console.log('❌ Error fixing error-dashboard.html'); }

console.log('\n📊 SUMMARY:');
console.log(`✅ Fixed ${fixed} issues`);
