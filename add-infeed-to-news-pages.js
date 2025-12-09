// Add In-feed structure to business-news.html and business-insights.html
const fs = require('fs');

console.log('🔧 Adding In-feed structure to news pages...\n');

const pages = [
    'business-news.html',
    'business-insights.html'
];

let totalUpdated = 0;

pages.forEach(page => {
    if (!fs.existsSync(page)) {
        console.log(`⚠️  ${page} not found, skipping...`);
        return;
    }

    let content = fs.readFileSync(page, 'utf8');
    
    // Check if it has a grid/list of items
    const hasGrid = content.includes('grid') || content.includes('news-item') || content.includes('insight-card');
    
    if (!hasGrid) {
        console.log(`⚠️  ${page} - No grid structure found, skipping...`);
        return;
    }

    // Add feed container wrapper
    if (!content.includes('data-ad-layout="in-feed"')) {
        // Find the main content container
        const gridPatterns = [
            /<div class="news-grid">/g,
            /<div class="insights-grid">/g,
            /<div class="grid">/g,
            /<div style="display:\s*grid/g
        ];

        let updated = false;
        gridPatterns.forEach(pattern => {
            if (content.match(pattern)) {
                content = content.replace(
                    pattern,
                    `<div class="feed-container" data-ad-layout="in-feed" data-ad-format="fluid">\n        $&`
                );
                updated = true;
            }
        });

        if (updated) {
            // Close the feed container before footer
            content = content.replace(
                /<\/div>\s*<\/div>\s*<script/,
                '</div>\n    </div>\n</div>\n\n<script'
            );
        }
    }

    // Add feed-item class to cards
    const cardPatterns = [
        { from: /<div class="news-item">/g, to: '<div class="news-item feed-item" itemscope itemtype="http://schema.org/NewsArticle">' },
        { from: /<div class="insight-card">/g, to: '<div class="insight-card feed-item" itemscope itemtype="http://schema.org/Article">' },
        { from: /<div class="card">/g, to: '<div class="card feed-item" itemscope itemtype="http://schema.org/Article">' }
    ];

    cardPatterns.forEach(({ from, to }) => {
        if (content.match(from)) {
            content = content.replace(from, to);
        }
    });

    // Add schema markup to titles
    content = content.replace(
        /<h3>([^<]+)<\/h3>/g,
        '<h3 itemprop="headline">$1</h3>'
    );

    content = content.replace(
        /<h2>([^<]+)<\/h2>/g,
        '<h2 itemprop="headline">$1</h2>'
    );

    // Add schema markup to descriptions
    content = content.replace(
        /<p class="description">/g,
        '<p class="description" itemprop="description">'
    );

    content = content.replace(
        /<div class="excerpt">/g,
        '<div class="excerpt" itemprop="description">'
    );

    // Add CSS for feed structure if not present
    if (!content.includes('.feed-container')) {
        const feedCSS = `
/* In-feed Ad Structure */
.feed-container {
    position: relative;
}

.feed-item {
    position: relative;
}

.feed-item[itemscope] {
    display: block;
}
`;
        content = content.replace('</style>', feedCSS + '\n</style>');
    }

    fs.writeFileSync(page, content);
    console.log(`✅ ${page} - Added In-feed structure`);
    totalUpdated++;
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${totalUpdated} pages`);
console.log(`\n📋 What was added:`);
console.log(`   - Feed container with data-ad-layout="in-feed"`);
console.log(`   - feed-item class on all cards`);
console.log(`   - Schema.org markup (NewsArticle/Article)`);
console.log(`   - Proper semantic HTML structure`);
console.log(`\n🎯 Pages ready for In-feed ads:`);
pages.forEach(page => {
    if (fs.existsSync(page)) {
        console.log(`   - https://onestepforthelife.com/${page}`);
    }
});
console.log(`\n📝 Next: Try creating In-feed ad with any of these URLs!`);
