const fs = require('fs');

console.log('🎨 Fixing Color Issues...\n');

let fixCount = 0;

// Fix 1: Change yellow to green in email-sender-web.html
console.log('1️⃣ Fixing email-sender-web.html - Yellow alert to green...');
let emailFile = fs.readFileSync('email-sender-web.html', 'utf8');

// Change yellow alert background to green (matching the success style)
const oldAlert = '.alert { background: #fff3cd; border-left: 4px solid #ffc107;';
const newAlert = '.alert { background: #d4edda; border-left: 4px solid #28a745;';

if (emailFile.includes(oldAlert)) {
    emailFile = emailFile.replace(oldAlert, newAlert);
    fs.writeFileSync('email-sender-web.html', emailFile, 'utf8');
    console.log('   ✅ Changed yellow (#fff3cd) to green (#d4edda)');
    console.log('   ✅ Changed yellow border (#ffc107) to green (#28a745)');
    fixCount++;
} else {
    console.log('   ⚠️ Alert style not found or already fixed');
}

// Fix 2: Change purple gradient to standard green in library.html
console.log('\n2️⃣ Fixing library.html - Purple hero-banner to green...');
let libraryFile = fs.readFileSync('library.html', 'utf8');

// Change purple gradient to standard site green gradient
const oldGradient = 'background: linear-gradient(135deg, rgba(102, 126, 234, 0.85), rgba(118, 75, 162, 0.85)),';
const newGradient = 'background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%),';

if (libraryFile.includes(oldGradient)) {
    libraryFile = libraryFile.replace(oldGradient, newGradient);
    fs.writeFileSync('library.html', libraryFile, 'utf8');
    console.log('   ✅ Changed purple gradient to standard green gradient');
    console.log('   ✅ Matches site-wide color scheme (#5a6c7d to #8b9aa7)');
    fixCount++;
} else {
    console.log('   ⚠️ Hero-banner gradient not found or already fixed');
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Fixed ${fixCount}/2 color issues`);
console.log('='.repeat(50));

if (fixCount === 2) {
    console.log('\n🎉 All color issues fixed!');
    console.log('   • Email security message: Yellow → Green');
    console.log('   • Innovation Library banner: Purple → Green');
    console.log('\n✅ Consistent color scheme across site');
} else {
    console.log('\n⚠️ Some issues may already be fixed');
}
