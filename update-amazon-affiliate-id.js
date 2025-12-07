// Update Amazon Affiliate ID in RO Water Purifier Guide
// Replace placeholder with real ID: onestepforthe-21

const fs = require('fs');

const file = 'ro-water-purifier-guide.html';
const oldTag = 'ideasbeforet-21';
const newTag = 'onestepforthe-21';

console.log('🔄 Updating Amazon Affiliate ID...\n');

// Read file
let content = fs.readFileSync(file, 'utf8');

// Count occurrences
const count = (content.match(new RegExp(oldTag, 'g')) || []).length;

console.log(`Found ${count} instances of placeholder tag: ${oldTag}`);

// Replace all occurrences
content = content.replace(new RegExp(oldTag, 'g'), newTag);

// Write back
fs.writeFileSync(file, content, 'utf8');

console.log(`✅ Updated all ${count} instances to: ${newTag}`);
console.log(`\n📄 File updated: ${file}`);
console.log('\n💰 Your affiliate links are now active!');
console.log('🎯 You will earn commission on all sales through these links');
