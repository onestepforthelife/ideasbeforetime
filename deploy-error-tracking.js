// Deploy error tracking to all HTML pages
const fs = require('fs');
const path = require('path');

console.log('🚀 DEPLOYING ERROR TRACKING TO ALL PAGES\n');

const errorTrackerScript = '<script src="error-tracker.js"></script>';
let deployed = 0;
let skipped = 0;
let errors = 0;

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has error tracker
        if (content.includes('error-tracker.js')) {
            console.log(`⏭️  ${file} - Already has error tracking`);
            skipped++;
            return;
        }
        
        // Add before </body>
        if (content.includes('</body>')) {
            content = content.replace('</body>', `    ${errorTrackerScript}\n</body>`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ ${file} - Error tracking deployed`);
            deployed++;
        } else {
            console.log(`⚠️  ${file} - No </body> tag found`);
            errors++;
        }
    } catch (err) {
        console.log(`❌ ${file} - Error: ${err.message}`);
        errors++;
    }
});

console.log('\n' + '='.repeat(60));
console.log('📊 DEPLOYMENT SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Deployed: ${deployed} pages`);
console.log(`⏭️  Skipped: ${skipped} pages (already had it)`);
console.log(`❌ Errors: ${errors} pages`);
console.log(`📄 Total: ${files.length} pages`);
console.log('='.repeat(60));
