// Process LinkedIn posts from linkedin-posts.txt and add to blog
const fs = require('fs');

console.log('📝 PROCESSING LINKEDIN POSTS\n');

// Read the posts file
let content;
try {
    content = fs.readFileSync('linkedin-posts.txt', 'utf8');
} catch (err) {
    console.log('❌ Error: linkedin-posts.txt not found');
    console.log('Please create the file and add your posts!');
    process.exit(1);
}

// Parse posts
const posts = [];
const postBlocks = content.split('---POST---').filter(block => block.trim());

postBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    let title = '';
    let date = '';
    let category = '';
    let contentLines = [];
    let inContent = false;
    
    lines.forEach(line => {
        if (line.startsWith('TITLE:')) {
            title = line.replace('TITLE:', '').trim();
        } else if (line.startsWith('DATE:')) {
            date = line.replace('DATE:', '').trim();
        } else if (line.startsWith('CATEGORY:')) {
            category = line.replace('CATEGORY:', '').trim();
        } else if (line.trim() && !line.includes('PASTE YOUR POSTS') && !line.includes('━━━')) {
            if (title && date && category) {
                inContent = true;
            }
            if (inContent) {
                contentLines.push(line);
            }
        }
    });
    
    if (title && date && category && contentLines.length > 0) {
        posts.push({
            title,
            date,
            category,
            content: contentLines.join('\n').trim(),
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        });
    }
});

console.log(`Found ${posts.length} posts to process\n`);

if (posts.length === 0) {
    console.log('⚠️  No valid posts found!');
    console.log('Please check linkedin-posts.txt format');
    process.exit(1);
}

// Create individual blog post files
let created = 0;
posts.forEach(post => {
    const filename = `blog-${post.slug}.html`;
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Ideas Before Time</title>
    <meta name="description" content="${post.content.substring(0, 150)}...">
    <link rel="stylesheet" href="common-styles.css">
    <link rel="stylesheet" href="common-navigation.css">
    <link rel="stylesheet" href="common-footer.css">
    <style>
        .blog-post {
            max-width: 800px;
            margin: 100px auto 40px;
            padding: 40px 20px;
        }
        .post-header {
            margin-bottom: 30px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 20px;
        }
        .post-title {
            font-size: 2.5em;
            color: #2d3748;
            margin-bottom: 10px;
        }
        .post-meta {
            color: #718096;
            font-size: 0.9em;
        }
        .post-category {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            margin-right: 10px;
        }
        .post-content {
            font-size: 1.1em;
            line-height: 1.8;
            color: #2d3748;
            white-space: pre-wrap;
        }
        .back-link {
            display: inline-block;
            margin-top: 40px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="blog-post">
        <div class="post-header">
            <h1 class="post-title">${post.title}</h1>
            <div class="post-meta">
                <span class="post-category">${post.category}</span>
                <span class="post-date">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>
        
        <div class="post-content">${post.content}</div>
        
        <a href="blog.html" class="back-link">← Back to Blog</a>
    </div>

    <script src="common-navigation.js"></script>
    <script src="common-footer.js"></script>
    <script src="universal-analytics.js"></script>
    <script src="error-tracker.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(filename, html, 'utf8');
    console.log(`✅ Created: ${filename}`);
    created++;
});

console.log(`\n${'='.repeat(60)}`);
console.log(`📊 SUMMARY`);
console.log(`${'='.repeat(60)}`);
console.log(`✅ Created: ${created} blog post files`);
console.log(`📄 Files: blog-*.html`);
console.log(`\n🎯 NEXT STEP: Update blog.html to list these posts`);
console.log(`Tell Kiro: "update blog page"`);
console.log(`${'='.repeat(60)}`);
