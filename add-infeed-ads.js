// Add Google AdSense In-feed ads to blog and business-news pages
const fs = require('fs');

console.log('🎯 Adding In-feed ads to pages...\n');

const infeedAdCode = `
<!-- Google AdSense In-feed Ad -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-gx-5+29-24-33"
     data-ad-client="ca-pub-3181510462001437"
     data-ad-slot="5034645309"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
`;

const pages = [
    { file: 'blog.html', insertAfter: 6 }, // After 6th blog card
    { file: 'business-news.html', insertAfter: 3 } // After 3rd insight
];

let totalAdsAdded = 0;

pages.forEach(({ file, insertAfter }) => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file} not found, skipping...`);
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    
    // Count existing blog cards or insight items
    const cardPattern = /<div class="(blog-card|insight-item)/g;
    const cards = content.match(cardPattern);
    
    if (!cards || cards.length < insertAfter) {
        console.log(`⚠️  ${file} - Not enough items (${cards?.length || 0}), skipping...`);
        return;
    }

    // Find position to insert ad (after Nth card)
    let cardCount = 0;
    let insertPosition = -1;
    let lastIndex = 0;

    while (cardCount < insertAfter) {
        const match = cardPattern.exec(content);
        if (!match) break;
        
        cardCount++;
        if (cardCount === insertAfter) {
            // Find the closing </div> of this card
            let depth = 1;
            let pos = match.index + match[0].length;
            
            while (depth > 0 && pos < content.length) {
                if (content.substr(pos, 5) === '<div ') depth++;
                if (content.substr(pos, 6) === '</div>') depth--;
                pos++;
            }
            
            insertPosition = pos + 5; // After </div>
        }
    }

    if (insertPosition > 0) {
        // Insert ad code
        content = content.slice(0, insertPosition) + '\n\n' + infeedAdCode + '\n' + content.slice(insertPosition);
        
        fs.writeFileSync(file, content);
        console.log(`✅ ${file} - Added In-feed ad after item ${insertAfter}`);
        totalAdsAdded++;
    } else {
        console.log(`⚠️  ${file} - Could not find insertion point`);
    }
});

console.log(`\n📊 Summary:`);
console.log(`   Ads added: ${totalAdsAdded} pages`);
console.log(`\n📋 Ad placement:`);
console.log(`   - blog.html: After 6th blog post`);
console.log(`   - business-news.html: After 3rd insight`);
console.log(`\n⏱️  Wait 20-30 minutes for ads to appear`);
console.log(`\n🎯 Next: Push to GitHub!`);
