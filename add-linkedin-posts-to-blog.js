// ADD LINKEDIN POSTS TO BLOG PAGE
// Extracts posts from linkedin-portfolio and adds to blog.html

const fs = require('fs');

console.log('📝 ADDING LINKEDIN POSTS TO BLOG\n');

// Read blog.html
let blogContent = fs.readFileSync('blog.html', 'utf8');

// Read LinkedIn posts collector
let linkedinContent = fs.readFileSync('linkedin-portfolio/linkedin-posts-collector.html', 'utf8');

// Extract posts from LinkedIn collector
const postsMatch = linkedinContent.match(/<div class="post-card">[\s\S]*?<\/div>\s*<\/div>/g);

if (!postsMatch) {
    console.log('❌ No posts found in linkedin-posts-collector.html');
    process.exit(1);
}

console.log(`✅ Found ${postsMatch.length} LinkedIn posts\n`);

// Create blog posts section
let blogPosts = `
    <!-- LinkedIn Posts Section -->
    <section class="blog-section">
        <h2>Latest LinkedIn Posts</h2>
        <p>Insights on AI, leadership, and digital transformation from my LinkedIn.</p>
        
        <div class="posts-grid">
`;

postsMatch.forEach((post, index) => {
    // Convert post-card to blog-card styling
    const blogPost = post
        .replace('post-card', 'blog-card')
        .replace('post-title', 'blog-title')
        .replace('post-date', 'blog-date')
        .replace('post-excerpt', 'blog-excerpt');
    
    blogPosts += `            ${blogPost}\n`;
});

blogPosts += `        </div>
    </section>
`;

// Find where to insert (before footer or at end of main content)
if (blogContent.includes('<!-- Common Footer -->')) {
    blogContent = blogContent.replace('<!-- Common Footer -->', blogPosts + '\n    <!-- Common Footer -->');
} else if (blogContent.includes('</main>')) {
    blogContent = blogContent.replace('</main>', blogPosts + '\n    </main>');
} else {
    console.log('⚠️  Could not find insertion point, adding before </body>');
    blogContent = blogContent.replace('</body>', blogPosts + '\n</body>');
}

// Add CSS for blog cards if not present
if (!blogContent.includes('.blog-card')) {
    const blogCSS = `
    <style>
        .blog-section {
            margin: 40px 0;
            padding: 20px;
        }
        
        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .blog-card {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 20px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .blog-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .blog-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333;
        }
        
        .blog-date {
            font-size: 0.9em;
            color: #666;
            margin-bottom: 10px;
        }
        
        .blog-excerpt {
            color: #555;
            line-height: 1.6;
        }
        
        @media (max-width: 768px) {
            .posts-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
`;
    
    blogContent = blogContent.replace('</head>', blogCSS + '\n</head>');
}

// Write back
fs.writeFileSync('blog.html', blogContent, 'utf8');

console.log('✅ LinkedIn posts added to blog.html');
console.log(`✅ Added ${postsMatch.length} posts`);
console.log('✅ CSS styling added');
console.log('\n📊 SUMMARY\n');
console.log(`Posts added: ${postsMatch.length}`);
console.log('Location: Before footer section');
console.log('Styling: Grid layout, responsive');
console.log('\n🎯 NEXT STEPS\n');
console.log('1. Open blog.html in browser to verify');
console.log('2. Check mobile responsiveness');
console.log('3. Push to GitHub to deploy\n');
