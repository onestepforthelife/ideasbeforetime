const fs = require('fs');

// Read the HTML file
const filePath = 'nickel-esg-report-open.html';
let html = fs.readFileSync(filePath, 'utf8');

// Read both table files
const table1 = fs.readFileSync('NICKEL_SPECIFICATIONS_TABLES.txt', 'utf8');
const table2 = fs.readFileSync('NICKEL_SPECIFICATIONS_TABLE2.txt', 'utf8');

// Extract just the HTML content from table files (skip the header text)
const table1Start = table1.indexOf('<!-- Technical Specifications Section -->');
const table1Content = table1.substring(table1Start, table1.indexOf('SAVE THIS FILE'));

const table2Start = table2.indexOf('<h3 style="margin-top: 40px;');
const table2Content = table2.substring(table2Start, table2.indexOf('INSTRUCTIONS:'));

// Find the insertion point (after ESG Impact section, before Part 2)
const insertionMarker = '        <!-- Part 2: Detailed ESG Recycling Analysis -->';
const insertionIndex = html.indexOf(insertionMarker);

if (insertionIndex === -1) {
    console.error('❌ ERROR: Could not find insertion point!');
    console.log('Looking for:', insertionMarker);
    process.exit(1);
}

// Insert both tables before the Part 2 comment
const beforeInsertion = html.substring(0, insertionIndex);
const afterInsertion = html.substring(insertionIndex);

// Combine: before + table1 + table2 + after
const newHtml = beforeInsertion + '\n' + table1Content.trim() + '\n\n' + table2Content.trim() + '\n\n        ' + afterInsertion;

// Write the updated file
fs.writeFileSync(filePath, newHtml, 'utf8');

console.log('✅ SUCCESS: Both nickel specification tables inserted!');
console.log('📊 Table 1: Nickel Oxides (NiO & Ni₂O₃) - Primary & Recycled grades');
console.log('📊 Table 2: Other Nickel Compounds (6 compounds)');
console.log('📍 Location: After ESG Impact section, before Part 2');
console.log('');
console.log('✅ File updated: nickel-esg-report-open.html');
console.log('');
console.log('🔍 Next steps:');
console.log('1. Test locally: Open nickel-esg-report-open.html in browser');
console.log('2. Verify tables display correctly');
console.log('3. Push to GitHub');
console.log('4. Purge Cloudflare cache (MANDATORY)');
console.log('5. Test live: https://onestepforthelife.com/nickel-esg-report-open.html');
