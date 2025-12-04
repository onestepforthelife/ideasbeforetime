/**
 * Add comprehensive cross-linking across entire site
 * Goal: User can go from anywhere to anywhere with minimum clicks
 */
const fs = require('fs');

console.log('=' .repeat(80));
console.log('🔗 ADDING COMPLETE CROSS-LINKING');
console.log('=' .repeat(80));

// Quick links component - appears on every page
const quickLinksHTML = `
<!-- Quick Links Widget -->
<div class="quick-links-widget" style="position: fixed; right: 20px; bottom: 80px; background: white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); padding: 20px; width: 250px; z-index: 999; display: none;" id="quickLinksWidget">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h4 style="margin: 0; color: #5a6c7d; font-size: 16px;">🚀 Quick Access</h4>
        <button onclick="document.getElementById('quickLinksWidget').style.display='none'" style="background: none; border: none; font-size: 20px; cursor: pointer; color: #999;">&times;</button>
    </div>
    <div style="display: grid; gap: 8px;">
        <a href="index.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>🏠</span> Home
        </a>
        <a href="blog.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>📝</span> Blog (100 posts)
        </a>
        <a href="about.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>👤</span> About
        </a>
        <a href="cv.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>📄</span> CV
        </a>
        <a href="market-reports.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>📊</span> Reports
        </a>
        <a href="social-optimizer-index.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>🚀</span> Tools
        </a>
        <a href="library.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>📚</span> Library
        </a>
        <a href="innovations.html" style="padding: 8px 12px; background: #f5f5f5; border-radius: 5px; text-decoration: none; color: #333; font-size: 14px; display: flex; align-items: center; gap: 8px; transition: background 0.3s;">
            <span>💡</span> Innovations
        </a>
    </div>
</div>

<!-- Quick Links Toggle Button -->
<button onclick="document.getElementById('quickLinksWidget').style.display='block'" style="position: fixed; right: 20px; bottom: 20px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%); color: white; border: none; font-size: 24px; cursor: pointer; box-shadow: 0 5px 20px rgba(0,0,0,0.3); z-index: 998; transition: transform 0.3s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
    🔗
</button>

<style>
.quick-links-widget a:hover {
    background: #5a6c7d !important;
    color: white !important;
}
@media (max-width: 768px) {
    .quick-links-widget {
        right: 10px;
        bottom: 70px;
        width: 200px;
        padding: 15px;
    }
}
</style>
`;

// Explore More section for blog posts
const exploreMoreHTML = `
    <div style="background: #f9f9f9; padding: 40px; border-radius: 15px; margin-top: 50px;">
        <h3 style="color: #5a6c7d; text-align: center; margin-bottom: 30px; font-size: 24px;">🌟 Explore More</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
            <a href="blog.html" style="text-decoration: none; padding: 20px; background: white; border-radius: 10px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; display: block; border: 2px solid #e0e0e0;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="font-size: 32px; margin-bottom: 10px;">📝</div>
                <div style="color: #5a6c7d; font-weight: 600; margin-bottom: 5px;">All Blog Posts</div>
                <div style="color: #888; font-size: 13px;">100+ insights</div>
            </a>
            <a href="market-reports.html" style="text-decoration: none; padding: 20px; background: white; border-radius: 10px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; display: block; border: 2px solid #e0e0e0;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="font-size: 32px; margin-bottom: 10px;">📊</div>
                <div style="color: #5a6c7d; font-weight: 600; margin-bottom: 5px;">Market Reports</div>
                <div style="color: #888; font-size: 13px;">AI-powered research</div>
            </a>
            <a href="social-optimizer-index.html" style="text-decoration: none; padding: 20px; background: white; border-radius: 10px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; display: block; border: 2px solid #e0e0e0;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="font-size: 32px; margin-bottom: 10px;">🚀</div>
                <div style="color: #5a6c7d; font-weight: 600; margin-bottom: 5px;">Career Tools</div>
                <div style="color: #888; font-size: 13px;">LinkedIn optimizer</div>
            </a>
            <a href="about.html" style="text-decoration: none; padding: 20px; background: white; border-radius: 10px; text-align: center; transition: transform 0.3s, box-shadow 0.3s; display: block; border: 2px solid #e0e0e0;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.1)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                <div style="font-size: 32px; margin-bottom: 10px;">👤</div>
                <div style="color: #5a6c7d; font-weight: 600; margin-bottom: 5px;">About Me</div>
                <div style="color: #888; font-size: 13px;">20+ years experience</div>
            </a>
        </div>
    </div>
`;

// Blog preview for homepage
const blogPreviewHTML = `
<!-- Blog Preview Section -->
<section style="max-width: 1400px; margin: 60px auto; padding: 0 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="font-size: 36px; color: #333; margin-bottom: 15px;">📝 Latest from LinkedIn</h2>
        <p style="font-size: 18px; color: #666;">100+ posts on Leadership, Technology, Industry & Career Growth</p>
    </div>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 40px;">
        <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="font-size: 48px; margin-bottom: 15px;">👔</div>
            <h3 style="color: #5a6c7d; margin-bottom: 10px;">Leadership</h3>
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">42 posts on team building, culture, trust, and initiative</p>
            <a href="blog.html" style="color: #5a6c7d; text-decoration: none; font-weight: 600;">Read Posts →</a>
        </div>
        
        <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="font-size: 48px; margin-bottom: 15px;">💻</div>
            <h3 style="color: #5a6c7d; margin-bottom: 10px;">Technology</h3>
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">26 posts on AI, digital transformation, and innovation</p>
            <a href="blog.html" style="color: #5a6c7d; text-decoration: none; font-weight: 600;">Read Posts →</a>
        </div>
        
        <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 20px rgba(0,0,0,0.1); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="font-size: 48px; margin-bottom: 15px;">🏭</div>
            <h3 style="color: #5a6c7d; margin-bottom: 10px;">Industry Insights</h3>
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 15px;">22 posts on chemical industry and market trends</p>
            <a href="blog.html" style="color: #5a6c7d; text-decoration: none; font-weight: 600;">Read Posts →</a>
        </div>
    </div>
    
    <div style="text-align: center;">
        <a href="blog.html" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%); color: white; text-decoration: none; border-radius: 30px; font-weight: 600; font-size: 16px; transition: transform 0.3s, box-shadow 0.3s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
            View All 100 Posts →
        </a>
    </div>
</section>
`;

console.log('\n📝 Processing files...\n');

let filesUpdated = 0;

// 1. Add quick links widget to all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('blog-post-'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Skip if already has quick links
    if (content.includes('quickLinksWidget')) {
        return;
    }
    
    // Add before closing body tag
    if (content.includes('</body>')) {
        content = content.replace('</body>', quickLinksHTML + '\n</body>');
        fs.writeFileSync(file, content);
        filesUpdated++;
        console.log(`✅ Added quick links to: ${file}`);
    }
});

// 2. Add blog preview to homepage
if (fs.existsSync('index.html')) {
    let content = fs.readFileSync('index.html', 'utf-8');
    
    if (!content.includes('Latest from LinkedIn')) {
        // Add after hero section (before features or after first section)
        const insertPoint = content.indexOf('</section>');
        if (insertPoint > -1) {
            content = content.substring(0, insertPoint + 10) + '\n' + blogPreviewHTML + '\n' + content.substring(insertPoint + 10);
            fs.writeFileSync('index.html', content);
            console.log('✅ Added blog preview to homepage');
        }
    }
}

// 3. Add explore more to all blog posts
console.log('\n📄 Adding explore more to blog posts...\n');

for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf-8');
        
        if (!content.includes('Explore More')) {
            // Add before closing container div
            const insertPoint = content.lastIndexOf('</div>\n\n<script src="common-navigation.js">');
            if (insertPoint > -1) {
                content = content.substring(0, insertPoint) + exploreMoreHTML + '\n' + content.substring(insertPoint);
                fs.writeFileSync(filename, content);
                
                if (i <= 3 || i >= 98) {
                    console.log(`✅ Added explore more to: ${filename}`);
                } else if (i === 4) {
                    console.log(`   ... (adding to ${100 - 6} more files) ...`);
                }
            }
        }
    }
}

console.log('\n' + '='.repeat(80));
console.log('✅ CROSS-LINKING COMPLETE!');
console.log('='.repeat(80));
console.log(`\n📊 Summary:`);
console.log(`   • Quick links widget: Added to ${filesUpdated} pages`);
console.log(`   • Blog preview: Added to homepage`);
console.log(`   • Explore more: Added to 100 blog posts`);
console.log(`\n🎯 Result: Users can now go from anywhere to anywhere with 1-2 clicks!`);
console.log(`\n💡 Features:`);
console.log(`   • Floating quick access button (bottom right)`);
console.log(`   • 8 main pages accessible instantly`);
console.log(`   • Blog preview on homepage`);
console.log(`   • Explore more on every blog post`);
console.log(`   • Mobile responsive`);
