/* Add Logo Links to All HTML Pages */

const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(file => file.endsWith('.html') && file !== 'index.html');

console.log(`Found ${htmlFiles.length} HTML files to update`);

let updated = 0;
let skipped = 0;

htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Add favicon if not present
        if (!content.includes('rel="icon"') && !content.includes('favicon')) {
            const faviconLink = '<link rel="icon" type="image/jpeg" href="images/logo Goda 40 bs 32 pixel.jpg">\n<link rel="apple-touch-icon" href="images/Logo One Step for the life 180 by 84 Pixel.jpg">';
            
            // Try to add after <title> tag
            if (content.includes('</title>')) {
                content = content.replace('</title>', `</title>\n${faviconLink}`);
                modified = true;
            }
            // Or after <meta charset>
            else if (content.includes('<meta charset')) {
                content = content.replace(/(<meta charset[^>]*>)/, `$1\n${faviconLink}`);
                modified = true;
            }
        }

        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            updated++;
            console.log(`✅ Updated: ${file}`);
        } else {
            skipped++;
            console.log(`⏭️  Skipped: ${file} (already has favicon or no suitable location)`);
        }

    } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
    }
});

console.log('\n📊 Summary:');
console.log(`   Updated: ${updated} files`);
console.log(`   Skipped: ${skipped} files`);
console.log(`   Total: ${htmlFiles.length} files`);
console.log('\n✅ Logo integration complete!');
