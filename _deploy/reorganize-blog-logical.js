/**
 * Reorganize blog posts by logical flow (category-based) instead of date
 */
const fs = require('fs');

console.log('=' .repeat(80));
console.log('📝 REORGANIZING BLOG BY LOGICAL FLOW');
console.log('=' .repeat(80));

// Read the summary to get all posts
const summary = JSON.parse(fs.readFileSync('BLOG_POSTS_CREATED.json', 'utf-8'));

console.log(`\n✅ Found ${summary.totalPosts} posts`);
console.log(`\n📊 Categories:`);
Object.entries(summary.categories).forEach(([cat, count]) => {
    console.log(`   • ${cat}: ${count} posts`);
});

// Define logical order of categories
const categoryOrder = [
    { name: 'Leadership', emoji: '👔', priority: 1 },
    { name: 'Technology', emoji: '💻', priority: 2 },
    { name: 'Industry Insights', emoji: '🏭', priority: 3 },
    { name: 'Career Advice', emoji: '🚀', priority: 4 },
    { name: 'Business Strategy', emoji: '📊', priority: 5 }
];

// Read all post files and categorize
const posts = [];
for (let i = 1; i <= summary.totalPosts; i++) {
    const filename = `blog-post-${i}.html`;
    if (fs.existsSync(filename)) {
        const content = fs.readFileSync(filename, 'utf-8');
        
        // Extract category
        const categoryMatch = content.match(/<div class="category">([^<]+)<\/div>/);
        const titleMatch = content.match(/<h1>([^<]+)<\/h1>/);
        const dateMatch = content.match(/📅 ([0-9-]+)/);
        
        if (categoryMatch && titleMatch) {
            posts.push({
                filename,
                number: i,
                category: categoryMatch[1],
                title: titleMatch[1],
                date: dateMatch ? dateMatch[1] : '',
                content
            });
        }
    }
}

console.log(`\n✅ Loaded ${posts.length} posts`);

// Sort posts by category priority, then by title
posts.sort((a, b) => {
    const catA = categoryOrder.find(c => c.name === a.category);
    const catB = categoryOrder.find(c => c.name === b.category);
    
    const priorityA = catA ? catA.priority : 999;
    const priorityB = catB ? catB.priority : 999;
    
    if (priorityA !== priorityB) {
        return priorityA - priorityB;
    }
    
    return a.title.localeCompare(b.title);
});

console.log('\n📋 Reorganized order:');
console.log('\nLEADERSHIP POSTS:');
posts.filter(p => p.category === 'Leadership').slice(0, 3).forEach(p => {
    console.log(`   • ${p.title.substring(0, 60)}...`);
});

console.log('\nTECHNOLOGY POSTS:');
posts.filter(p => p.category === 'Technology').slice(0, 3).forEach(p => {
    console.log(`   • ${p.title.substring(0, 60)}...`);
});

console.log('\nINDUSTRY INSIGHTS:');
posts.filter(p => p.category === 'Industry Insights').slice(0, 3).forEach(p => {
    console.log(`   • ${p.title.substring(0, 60)}...`);
});

// Generate new blog cards HTML organized by category
let cardsHTML = '';

categoryOrder.forEach(catInfo => {
    const categoryPosts = posts.filter(p => p.category === catInfo.name);
    
    if (categoryPosts.length === 0) return;
    
    // Add category header
    cardsHTML += `
        <!-- ${catInfo.name} Section -->
        <div style="grid-column: 1 / -1; margin-top: 30px; margin-bottom: 10px;">
            <h2 style="color: #5a6c7d; font-size: 28px; border-bottom: 3px solid #5a6c7d; padding-bottom: 10px;">
                ${catInfo.emoji} ${catInfo.name} <span style="font-size: 18px; color: #888;">(${categoryPosts.length} posts)</span>
            </h2>
        </div>
`;
    
    // Add posts in this category
    categoryPosts.forEach(post => {
        const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
        const excerpt = post.content.match(/<p>([^<]+)<\/p>/);
        const excerptText = excerpt ? excerpt[1].substring(0, 200) + '...' : '';
        
        cardsHTML += `
        <!-- ${post.category}: ${post.title.substring(0, 40)} -->
        <div class="blog-card" data-category="${categorySlug}">
            <div class="image">${catInfo.emoji}</div>
            <div class="content">
                <div class="category">${post.category}</div>
                <h3>${post.title.substring(0, 80)}${post.title.length > 80 ? '...' : ''}</h3>
                <div class="excerpt">
                    ${excerptText}
                </div>
                <div class="meta">
                    <span>${post.date}</span>
                    <a href="${post.filename}" class="read-link">Read More →</a>
                </div>
            </div>
        </div>
`;
    });
});

// Update blog.html
console.log('\n📝 Updating blog.html...');

const blogHTML = fs.readFileSync('blog.html', 'utf-8');

// Find and replace the blog-grid section
const gridStart = blogHTML.indexOf('<div class="blog-grid">');
const gridEnd = blogHTML.indexOf('</div>', gridStart + 100);

if (gridStart > -1 && gridEnd > -1) {
    const newBlogHTML = blogHTML.substring(0, gridStart + 24) + 
                       '\n' + cardsHTML + '\n    ' +
                       blogHTML.substring(gridEnd);
    
    fs.writeFileSync('blog.html', newBlogHTML);
    console.log('✅ Updated blog.html with logical flow');
} else {
    console.log('⚠️ Could not find blog-grid section');
}

// Update summary
summary.organization = 'logical-flow-by-category';
summary.categoryOrder = categoryOrder.map(c => c.name);
fs.writeFileSync('BLOG_POSTS_CREATED.json', JSON.stringify(summary, null, 2));

console.log('\n' + '='.repeat(80));
console.log('✅ REORGANIZATION COMPLETE!');
console.log('=' .repeat(80));
console.log('\n📊 New Organization:');
console.log('   1. Leadership (42 posts) - Team, culture, trust, initiative');
console.log('   2. Technology (26 posts) - AI, digital, innovation');
console.log('   3. Industry Insights (22 posts) - Chemical industry, BASF, supply');
console.log('   4. Career Advice (8 posts) - Job search, interviews, growth');
console.log('   5. Business Strategy (2 posts) - Sales, governance, strategy');
console.log('\n🎯 Blog now flows logically by topic instead of chronologically!');
