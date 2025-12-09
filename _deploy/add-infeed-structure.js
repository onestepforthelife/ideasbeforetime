// Add proper feed structure for Google AdSense In-feed ads
const fs = require('fs');

console.log('🔧 Adding In-feed structure for Google AdSense...\n');

const blogFile = 'blog.html';
let content = fs.readFileSync(blogFile, 'utf8');

// Add proper feed container with data attributes that Google can detect
const feedStructure = `
    <!-- In-feed Ad Container (Google AdSense will detect this) -->
    <div class="blog-feed" data-ad-layout="in-feed" data-ad-format="fluid">
`;

// Replace the blog-grid div with proper feed structure
content = content.replace(
    '<div class="blog-grid">',
    feedStructure + '\n        <div class="blog-grid">'
);

// Close the feed container at the end
content = content.replace(
    '</div>\n\n    <!-- Quick Access Widget -->',
    '    </div>\n    </div>\n\n    <!-- Quick Access Widget -->'
);

// Add feed item markup to each blog card
content = content.replace(
    /<div class="blog-card" data-category="([^"]+)">/g,
    '<div class="blog-card feed-item" data-category="$1" itemscope itemtype="http://schema.org/BlogPosting">'
);

// Add proper schema markup to feed items
content = content.replace(
    /<div class="category">([^<]+)<\/div>/g,
    '<div class="category" itemprop="articleSection">$1</div>'
);

content = content.replace(
    /<h3>([^<]+)<\/h3>/g,
    '<h3 itemprop="headline">$1</h3>'
);

content = content.replace(
    /<div class="excerpt">/g,
    '<div class="excerpt" itemprop="description">'
);

content = content.replace(
    /<span>(\d{4}-\d{2}-\d{2})<\/span>/g,
    '<span><time itemprop="datePublished" datetime="$1">$1</time></span>'
);

// Add CSS for feed structure
const feedCSS = `
/* In-feed Ad Structure */
.blog-feed {
    position: relative;
}

.feed-item {
    position: relative;
}

/* Make feed items recognizable to Google */
.blog-card[itemscope] {
    display: block;
}
`;

content = content.replace(
    '</style>',
    feedCSS + '\n</style>'
);

fs.writeFileSync(blogFile, content);

console.log('✅ Added In-feed structure to blog.html');
console.log('✅ Added schema.org markup for better detection');
console.log('✅ Added data attributes for Google AdSense');
console.log('\n📋 What was added:');
console.log('   - blog-feed container with data-ad-layout="in-feed"');
console.log('   - feed-item class on all blog cards');
console.log('   - Schema.org BlogPosting markup');
console.log('   - Proper semantic HTML structure');
console.log('\n🎯 Now Google can detect your feed structure!');
console.log('\n📝 Next steps:');
console.log('   1. Push to GitHub');
console.log('   2. Try creating In-feed ad again');
console.log('   3. Use URL: https://onestepforthelife.com/blog.html');
