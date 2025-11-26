/**
 * Innovations Page Generator for Ideas Before Time
 * Reads innovations.json and updates innovations-table.html with current data
 */

const fs = require('fs');
const path = require('path');

// Configuration
const INNOVATIONS_FILE = path.join(__dirname, '../innovations.json');
const TEMPLATE_FILE = path.join(__dirname, '../innovations-table.html');

/**
 * Read and parse innovations.json
 */
function readInnovations() {
    try {
        const data = fs.readFileSync(INNOVATIONS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading innovations.json:', error.message);
        process.exit(1);
    }
}

/**
 * Update innovations-table.html with current data
 */
function updateInnovationsPage(innovations) {
    try {
        let html = fs.readFileSync(TEMPLATE_FILE, 'utf8');
        
        // Find and replace the innovations data array
        const dataStart = html.indexOf('const innovations = [');
        const dataEnd = html.indexOf('];', dataStart) + 2;
        
        if (dataStart === -1 || dataEnd === -1) {
            throw new Error('Could not find innovations data in template');
        }
        
        const innovationsData = JSON.stringify(innovations.innovations, null, 4);
        const newData = `const innovations = ${innovationsData};`;
        
        html = html.substring(0, dataStart) + newData + html.substring(dataEnd);
        
        fs.writeFileSync(TEMPLATE_FILE, html, 'utf8');
        console.log('✓ Innovations page updated successfully');
        console.log(`  Updated ${innovations.innovations.length} innovations`);
    } catch (error) {
        console.error('Error updating innovations page:', error.message);
        process.exit(1);
    }
}

/**
 * Main execution
 */
function main() {
    console.log('Updating innovations page...');
    
    const innovations = readInnovations();
    updateInnovationsPage(innovations);
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { updateInnovationsPage, readInnovations };
