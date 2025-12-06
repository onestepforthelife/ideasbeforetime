// Insert Nickel Specifications Tables into ESG Report
const fs = require('fs');

console.log('📋 Inserting Nickel Specifications Tables...\n');

// Read the main HTML file
const htmlFile = 'nickel-esg-report-open.html';
let html = fs.readFileSync(htmlFile, 'utf8');

// Read both table files
const table1 = fs.readFileSync('NICKEL_SPECIFICATIONS_TABLES.txt', 'utf8');
const table2 = fs.readFileSync('NICKEL_SPECIFICATIONS_TABLE2.txt', 'utf8');

// Extract just the HTML content (skip the header text)
const table1Html = table1.substring(table1.indexOf('<!-- Technical Specifications Section -->'));
const table2Html = table2.substring(table2.indexOf('    <h3 style="margin-top: 40px;'));

// Find the insertion point (after ESG Impact section, before Part 2)
const insertionMarker = '        </div>\n\n        <!-- Part 2: Detailed ESG Recycling Analysis -->';

if (html.includes(insertionMarker)) {
    // Insert both tables
    const replacement = `        </div>\n\n${table1Html}\n\n${table2Html}\n\n        <!-- Part 2: Detailed ESG Recycling Analysis -->`;
    html = html.replace(insertionMarker, replacement);
    
    // Write back to file
    fs.writeFileSync(htmlFile, html, 'utf8');
    
    console.log('✅ Successfully inserted both specification tables!');
    console.log('📊 Table 1: Nickel Oxides (NiO & Ni₂O₃)');
    console.log('📊 Table 2: Other Nickel Compounds (6 compounds)');
    console.log('\n📝 Next steps:');
    console.log('1. Test locally: Open nickel-esg-report-open.html in browser');
    console.log('2. Verify tables display correctly');
    console.log('3. Push to GitHub');
    console.log('4. Purge Cloudflare cache (MANDATORY!)');
    console.log('5. Test on live site\n');
} else {
    console.log('❌ Could not find insertion point!');
    console.log('Please check the file structure.');
}
