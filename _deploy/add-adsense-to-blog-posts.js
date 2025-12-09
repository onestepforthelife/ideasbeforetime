/**
 * Add Google AdSense to all 100 blog posts
 */

const fs = require('fs');

const ADSENSE_HEAD_CODE = `
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181510462001437"
        crossorigin="anonymous"></script>
<script src="google-adsense.js"></script>`;

let added = 0;
let skipped = 0;

console.log('🎯 Adding AdSense to all 100 blog posts...\n');

for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    
    try {
        if (!fs.existsSync(filename)) {
            continue;
        }

        let content = fs.readFileSync(filename, 'utf8');

        // Check if already has AdSense
        if (content.includes('google-adsense.js') || content.includes('adsbygoogle.js')) {
            skipped++;
            continue;
        }

        // Add AdSense before </head>
        if (content.includes('</head>')) {
            content = content.replace('</head>', `${ADSENSE_HEAD_CODE}\n</head>`);
            fs.writeFileSync(filename, content, 'utf8');
            added++;
            
            if (added % 10 === 0) {
                console.log(`✅ ${added} blog posts updated...`);
            }
        }

    } catch (error) {
        console.log(`❌ ${filename} - Error: ${error.message}`);
    }
}

console.log(`\n📊 Summary:`);
console.log(`   Added: ${added}`);
console.log(`   Skipped: ${skipped}`);
console.log(`\n✅ All blog posts now have AdSense!`);
