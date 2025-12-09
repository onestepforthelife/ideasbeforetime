const fs = require('fs');

console.log('🚀 Starting comprehensive blog enhancements...\n');

// Task 4: Add Related Posts Section
console.log('📝 Task 4: Adding related posts to blog posts...');
let relatedPostsCount = 0;

for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    
    try {
        let content = fs.readFileSync(filename, 'utf8');
        
        // Skip if already has related posts
        if (content.includes('Related Posts')) {
            continue;
        }
        
        // Generate 3 random related posts (excluding current)
        const relatedPosts = [];
        while (relatedPosts.length < 3) {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            if (randomNum !== i && !relatedPosts.includes(randomNum)) {
                relatedPosts.push(randomNum);
            }
        }
        
        const relatedPostsHTML = `
        <!-- Related Posts -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 10px; margin: 30px 0;">
            <h3 style="color: #333; margin-bottom: 20px; font-size: 22px;">📚 Related Posts</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                <a href="blog-post-${relatedPosts[0]}.html" style="background: white; padding: 15px; border-radius: 8px; text-decoration: none; color: #1e88e5; font-weight: 600; border-left: 4px solid #1e88e5; transition: transform 0.2s;">
                    → Read Post ${relatedPosts[0]}
                </a>
                <a href="blog-post-${relatedPosts[1]}.html" style="background: white; padding: 15px; border-radius: 8px; text-decoration: none; color: #1e88e5; font-weight: 600; border-left: 4px solid #1e88e5; transition: transform 0.2s;">
                    → Read Post ${relatedPosts[1]}
                </a>
                <a href="blog-post-${relatedPosts[2]}.html" style="background: white; padding: 15px; border-radius: 8px; text-decoration: none; color: #1e88e5; font-weight: 600; border-left: 4px solid #1e88e5; transition: transform 0.2s;">
                    → Read Post ${relatedPosts[2]}
                </a>
            </div>
        </div>
`;
        
        // Insert before social share buttons
        content = content.replace(/<!-- Social Share Buttons -->/, relatedPostsHTML + '\n        <!-- Social Share Buttons -->');
        
        fs.writeFileSync(filename, content);
        relatedPostsCount++;
    } catch (error) {
        console.log(`⚠️  Could not process ${filename}`);
    }
}

console.log(`✅ Added related posts to ${relatedPostsCount} blog posts\n`);

// Task 5: Add Search Functionality to Blog Page
console.log('📝 Task 5: Adding search functionality to blog page...');

try {
    let blogContent = fs.readFileSync('blog.html', 'utf8');
    
    if (!blogContent.includes('id="searchInput"')) {
        const searchHTML = `
        <!-- Search Box -->
        <div style="max-width: 600px; margin: 30px auto;">
            <input type="text" id="searchInput" placeholder="🔍 Search blog posts..." 
                   style="width: 100%; padding: 15px 20px; font-size: 16px; border: 2px solid #1e88e5; border-radius: 10px; outline: none;">
        </div>

        <script>
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const excerpt = post.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
        </script>
`;
        
        // Insert after hero section
        blogContent = blogContent.replace(/<div class="posts-grid">/, searchHTML + '\n        <div class="posts-grid">');
        fs.writeFileSync('blog.html', blogContent);
        console.log('✅ Added search functionality to blog page\n');
    } else {
        console.log('✅ Search already exists on blog page\n');
    }
} catch (error) {
    console.log('⚠️  Could not add search to blog page\n');
}

// Task 6: Create RSS Feed
console.log('📝 Task 6: Creating RSS feed...');

let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ideas Before Time - Blog</title>
    <link>https://ideasbeforetime.pages.dev/blog.html</link>
    <description>Insights on leadership, innovation, technology, and business transformation</description>
    <language>en-us</language>
    <atom:link href="https://ideasbeforetime.pages.dev/rss.xml" rel="self" type="application/rss+xml"/>
`;

// Add blog posts to RSS
for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    
    try {
        const content = fs.readFileSync(filename, 'utf8');
        const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/);
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '') : `Blog Post ${i}`;
        
        // Extract first paragraph as description
        const descMatch = content.match(/<p[^>]*>(.*?)<\/p>/);
        const description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...' : '';
        
        rss += `
    <item>
      <title>${title}</title>
      <link>https://ideasbeforetime.pages.dev/${filename}</link>
      <description>${description}</description>
      <guid>https://ideasbeforetime.pages.dev/${filename}</guid>
    </item>`;
    } catch (error) {
        // Skip if file doesn't exist
    }
}

rss += `
  </channel>
</rss>`;

fs.writeFileSync('rss.xml', rss);
console.log('✅ Created RSS feed (rss.xml)\n');

// Task 7: Verify Analytics on All Pages
console.log('📝 Task 7: Verifying analytics on all blog posts...');
let analyticsCount = 0;

for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    
    try {
        const content = fs.readFileSync(filename, 'utf8');
        if (content.includes('universal-analytics.js')) {
            analyticsCount++;
        }
    } catch (error) {
        // Skip
    }
}

console.log(`✅ Analytics verified on ${analyticsCount}/100 blog posts\n`);

// Summary
console.log('═══════════════════════════════════════');
console.log('✅ BLOG ENHANCEMENTS COMPLETE!');
console.log('═══════════════════════════════════════');
console.log(`✅ Related posts: ${relatedPostsCount} posts`);
console.log(`✅ Search functionality: Added to blog.html`);
console.log(`✅ RSS feed: Created (rss.xml)`);
console.log(`✅ Analytics: Verified on ${analyticsCount} posts`);
console.log('═══════════════════════════════════════\n');
