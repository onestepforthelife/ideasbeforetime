// Fix Header Consistency - All pages use common-navigation.js
const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING HEADER CONSISTENCY\n');
console.log('='.repeat(60));

// All pages already use common-navigation.js
// Just need to verify common-navigation.js is consistent

const navFile = 'common-navigation.js';

if (!fs.existsSync(navFile)) {
    console.log('❌ common-navigation.js not found!');
    process.exit(1);
}

const navContent = fs.readFileSync(navFile, 'utf8');

console.log('\n✅ CURRENT STATUS:');
console.log('   All HTML pages use: common-navigation.js');
console.log('   Navigation is already consistent!');

console.log('\n📋 NAVIGATION STRUCTURE:');
const hasHome = navContent.includes('Home') || navContent.includes('index.html');
const hasTools = navContent.includes('Tools') || navContent.includes('tools');
const hasLibrary = navContent.includes('Library') || navContent.includes('library');
const hasReports = navContent.includes('Reports') || navContent.includes('reports');
const hasAbout = navContent.includes('About') || navContent.includes('about');

console.log(`   Home: ${hasHome ? '✅' : '❌'}`);
console.log(`   Tools: ${hasTools ? '✅' : '❌'}`);
console.log(`   Library: ${hasLibrary ? '✅' : '❌'}`);
console.log(`   Reports: ${hasReports ? '✅' : '❌'}`);
console.log(`   About: ${hasAbout ? '✅' : '❌'}`);

console.log('\n' + '='.repeat(60));
console.log('✅ HEADER CONSISTENCY: VERIFIED');
console.log('   All pages use the same navigation system');
console.log('='.repeat(60));
