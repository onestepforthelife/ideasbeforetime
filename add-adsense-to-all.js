/**
 * Add Google AdSense to ALL HTML pages
 * Publisher ID: ca-pub-3181510462001437
 */

const fs = require('fs');
const path = require('path');

// AdSense script to add
const ADSENSE_SCRIPT = `
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181510462001437"
            crossorigin="anonymous"></script>
    <script src="google-adsense.js"></script>`;

// Find all HTML files
function findHTMLFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            // Skip certain directories
            if (!file.startsWith('.') && 
                file !== 'node_modules' && 
                file !== 'backup_before_improvements_20251202_193117') {
                findHTMLFiles(filePath, fileList);
            }
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Add AdSense to HTML file
function addAdSenseToFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if AdSense already added
    if (content.includes('ca-pub-3181510462001437')) {
        console.log(`⏭️  SKIP: ${filePath} (already has AdSense)`);
        return false;
    }
    
    // Check if file has </head> tag
    if (!content.includes('</head>')) {
        console.log(`⚠️  SKIP: ${filePath} (no </head> tag)`);
        return false;
    }
    
    // Add AdSense before </head>
    content = content.replace('</head>', `${ADSENSE_SCRIPT}\n</head>`);
    
    // Write back
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ADDED: ${filePath}`);
    return true;
}

// Main execution
console.log('🎯 Adding Google AdSense to all HTML pages...\n');
console.log('Publisher ID: ca-pub-3181510462001437\n');

const htmlFiles = findHTMLFiles('.');
console.log(`Found ${htmlFiles.length} HTML files\n`);

let added = 0;
let skipped = 0;

htmlFiles.forEach(file => {
    if (addAdSenseToFile(file)) {
        added++;
    } else {
        skipped++;
    }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✅ Added AdSense to: ${added} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`📁 Total files: ${htmlFiles.length}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🎉 DONE! Google AdSense added to all pages!');
console.log('\n📝 NEXT STEPS:');
console.log('1. Upload all files to Cloudflare Pages');
console.log('2. Wait for AdSense approval (1-2 weeks)');
console.log('3. Create ad units in AdSense dashboard');
console.log('4. Start earning! 💰\n');
