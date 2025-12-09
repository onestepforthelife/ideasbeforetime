/**
 * Add Google AdSense to All Pages
 * Adds google-adsense.js script tag to all HTML files
 */

const fs = require('fs');
const path = require('path');

// AdSense script tag to add
const ADSENSE_SCRIPT = '<script src="google-adsense.js"></script>';

// Files to process
const htmlFiles = [
    'index.html',
    'about.html',
    'blog.html',
    'kiro.html',
    'linkedin.html',
    'astronomy.html',
    'market-reports.html',
    'reports.html',
    'ro-guide.html',
    'nickel.html',
    'acrylic.html',
    'poloxamer.html',
    'paper.html',
    'specialty.html',
    'cv.html',
    'jobs.html',
    'tools.html',
    'innovations.html',
    'business-insights.html',
    'social-optimizer-index.html',
    'teaching-ai-to-think.html'
];

let processed = 0;
let skipped = 0;
let errors = 0;

console.log('Adding Google AdSense to all pages...\n');

htmlFiles.forEach(file => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`⚠️  ${file} - Not found, skipping`);
            skipped++;
            return;
        }

        let content = fs.readFileSync(file, 'utf8');

        // Check if already has AdSense
        if (content.includes('google-adsense.js')) {
            console.log(`✓ ${file} - Already has AdSense`);
            skipped++;
            return;
        }

        // Add before </body>
        if (content.includes('</body>')) {
            content = content.replace('</body>', `    ${ADSENSE_SCRIPT}\n</body>`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ ${file} - AdSense added`);
            processed++;
        } else {
            console.log(`⚠️  ${file} - No </body> tag found`);
            skipped++;
        }

    } catch (error) {
        console.log(`❌ ${file} - Error: ${error.message}`);
        errors++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`   Processed: ${processed}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Errors: ${errors}`);
console.log(`\n✅ AdSense integration complete!`);
console.log(`\nNext steps:`);
console.log(`1. Push to GitHub`);
console.log(`2. Wait 20-30 minutes for ads to appear`);
console.log(`3. Check live site for ad placement`);
