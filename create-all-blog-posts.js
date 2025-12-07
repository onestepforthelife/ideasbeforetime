/**
 * Create individual blog post pages from linkedin-posts.txt
 */
const fs = require('fs');
const path = require('path');

console.log('=' .repeat(80));
console.log('📝 CREATING BLOG POSTS FROM LINKEDIN');
console.log('=' .repeat(80));

// Read the formatted posts
const postsFile = fs.readFileSync('linkedin-posts.txt', 'utf-8');

// Split into individual posts
const postSections = postsFile.split('---POST---').filter(s => s.trim());

console.log(`\n✅ Found ${postSections.length} posts to process\n`);

const posts = [];
let postCount = 0;

postSections.forEach((section, idx) => {
    const lines = section.trim().split('\n');
    
    // Extract metadata
    let title = '';
    let date = '';
    let category = '';
    let content = '';
    
    let inContent = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('TITLE:')) {
            title = line.replace('TITLE:', '').trim();
        } else if (line.startsWith('DATE:')) {
            date = line.replace('DATE:', '').trim();
        } else if (line.startsWith('CATEGORY:')) {
            category = line.replace('CATEGORY:', '').trim();
            inContent = true;
        } else if (inContent && line) {
            content += line + '\n\n';
        }
    }
    
    // Skip if no valid title or content
    if (!title || title.length < 10 || !content || content.length < 50) {
        return;
    }
    
    // Clean title (limit length, remove duplicates)
    title = title.substring(0, 150);
    
    // Create slug from title
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 60);
    
    // Create excerpt (first 200 chars)
    const excerpt = content.substring(0, 200).trim() + '...';
    
    posts.push({
        id: `post-${idx + 1}`,
        slug,
        title,
        date,
        category,
        excerpt,
        content: content.trim()
    });
    
    postCount++;
    if (postCount <= 10) {
        console.log(`✅ Post ${postCount}: ${title.substring(0, 60)}...`);
    }
});

console.log(`\n✅ Processed ${posts.length} valid posts`);

// Create blog post template
function createPostHTML(post) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} | Ideas Before Time</title>
<meta name="description" content="${post.excerpt}">
<meta name="keywords" content="${post.category}, LinkedIn, Amit Kumar, Ideas Before Time">
<link rel="stylesheet" href="common-watermark.css">
<link rel="stylesheet" href="common-navigation.css">
<link rel="stylesheet" href="common-footer.css">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);
    min-height: 100vh;
    padding: 20px;
}
.container {
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 50px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}
.back-link {
    display: inline-block;
    color: #5a6c7d;
    text-decoration: none;
    margin-bottom: 30px;
    font-weight: 600;
}
.back-link:hover { text-decoration: underline; }
.category {
    display: inline-block;
    background: #5a6c7d;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 20px;
}
h1 {
    color: #333;
    font-size: 36px;
    line-height: 1.3;
    margin-bottom: 20px;
}
.meta {
    color: #666;
    font-size: 14px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid #e0e0e0;
}
.content {
    color: #444;
    font-size: 16px;
    line-height: 1.8;
}
.content p {
    margin-bottom: 20px;
}
.linkedin-cta {
    background: #f0f7ff;
    padding: 25px;
    border-radius: 10px;
    border-left: 4px solid #0077b5;
    margin: 40px 0;
    text-align: center;
}
.linkedin-cta a {
    display: inline-block;
    padding: 12px 30px;
    background: #0077b5;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 600;
    margin-top: 15px;
}
.linkedin-cta a:hover { background: #005885; }
@media (max-width: 768px) {
    .container { padding: 30px 20px; }
    h1 { font-size: 28px; }
}
</style>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181510462001437" crossorigin="anonymous"></script>
<script src="google-adsense.js"></script>
</head>
<body>
<div class="container">
    <a href="blog.html" class="back-link">← Back to Blog</a>
    
    <div class="category">${post.category}</div>
    <h1>${post.title}</h1>
    
    <div class="meta">
        📅 ${post.date} • Originally posted on LinkedIn
    </div>
    
    <div class="content">
        ${post.content.split('\n\n').map(p => `<p>${p}</p>`).join('\n        ')}
    </div>
    
    <div class="linkedin-cta">
        <h3 style="color: #0077b5; margin-bottom: 10px;">💬 Join the Discussion</h3>
        <p style="color: #666;">This post was originally shared on LinkedIn. Connect with me there for more insights!</p>
        <a href="https://www.linkedin.com/in/leadershipexpertamit/" target="_blank">Follow on LinkedIn</a>
    </div>
    
    <div style="text-align: center; margin-top: 40px;">
        <a href="blog.html" style="display: inline-block; padding: 12px 30px; background: #5a6c7d; color: white; text-decoration: none; border-radius: 5px; font-weight: 600;">← Back to All Posts</a>
    </div>
</div>

<script src="common-navigation.js"></script>
<script src="common-footer.js"></script>
<script src="universal-analytics.js"></script>
<script src="error-tracker.js"></script>
</body>
</html>`;
}

// Create individual post files
console.log('\n📄 Creating individual post HTML files...\n');

posts.forEach((post, idx) => {
    const filename = `blog-post-${idx + 1}.html`;
    const html = createPostHTML(post);
    fs.writeFileSync(filename, html);
    
    if (idx < 5 || idx >= posts.length - 5) {
        console.log(`✅ Created: ${filename}`);
    } else if (idx === 5) {
        console.log(`   ... (creating ${posts.length - 10} more files) ...`);
    }
});

// Update blog.html with all posts
console.log('\n📝 Updating blog.html with all posts...\n');

const blogHTML = fs.readFileSync('blog.html', 'utf-8');

// Generate blog cards HTML
let cardsHTML = '';
posts.forEach((post, idx) => {
    const emoji = post.category === 'Leadership' ? '👔' :
                  post.category === 'Technology' ? '💻' :
                  post.category === 'Industry Insights' ? '🏭' :
                  post.category === 'Business Strategy' ? '📊' :
                  post.category === 'Career Advice' ? '🚀' : '📝';
    
    const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
    
    cardsHTML += `
        <!-- LinkedIn Post ${idx + 1} -->
        <div class="blog-card" data-category="${categorySlug}">
            <div class="image">${emoji}</div>
            <div class="content">
                <div class="category">${post.category}</div>
                <h3>${post.title.substring(0, 80)}${post.title.length > 80 ? '...' : ''}</h3>
                <div class="excerpt">
                    ${post.excerpt}
                </div>
                <div class="meta">
                    <span>${post.date}</span>
                    <a href="blog-post-${idx + 1}.html" class="read-link">Read More →</a>
                </div>
            </div>
        </div>
`;
});

// Find the blog-grid section and replace
const gridStart = blogHTML.indexOf('<div class="blog-grid">');
const gridEnd = blogHTML.indexOf('</div>', gridStart + 100);

if (gridStart > -1 && gridEnd > -1) {
    const newBlogHTML = blogHTML.substring(0, gridStart + 24) + 
                       '\n' + cardsHTML + '\n    ' +
                       blogHTML.substring(gridEnd);
    
    fs.writeFileSync('blog.html', newBlogHTML);
    console.log('✅ Updated blog.html with all posts');
} else {
    console.log('⚠️ Could not find blog-grid section');
}

// Create summary
const summary = {
    totalPosts: posts.length,
    categories: {},
    dateRange: {
        earliest: posts[posts.length - 1]?.date,
        latest: posts[0]?.date
    },
    filesCreated: posts.map((p, i) => `blog-post-${i + 1}.html`)
};

posts.forEach(post => {
    summary.categories[post.category] = (summary.categories[post.category] || 0) + 1;
});

fs.writeFileSync('BLOG_POSTS_CREATED.json', JSON.stringify(summary, null, 2));

console.log('\n' + '='.repeat(80));
console.log('✅ BLOG CREATION COMPLETE!');
console.log('='.repeat(80));
console.log(`\n📊 Summary:`);
console.log(`   • Total Posts: ${posts.length}`);
console.log(`   • Date Range: ${summary.dateRange.earliest} to ${summary.dateRange.latest}`);
console.log(`   • Categories:`);
Object.entries(summary.categories).forEach(([cat, count]) => {
    console.log(`     - ${cat}: ${count} posts`);
});
console.log(`\n📁 Files Created:`);
console.log(`   • ${posts.length} individual post HTML files (blog-post-1.html to blog-post-${posts.length}.html)`);
console.log(`   • Updated blog.html with all posts`);
console.log(`   • Created BLOG_POSTS_CREATED.json (summary)`);
console.log(`\n🎯 Next: Open blog.html in browser to see all ${posts.length} posts!`);
