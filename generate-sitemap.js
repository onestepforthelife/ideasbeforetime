/**
 * Generate sitemap.xml with all blog posts
 */
const fs = require('fs');

console.log('📄 Generating sitemap.xml with blog posts...\n');

const baseURL = 'https://ideasbeforetime.pages.dev';
const today = new Date().toISOString().split('T')[0];

// Main pages
const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about.html', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog.html', priority: '0.9', changefreq: 'daily' },
    { url: '/cv.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/market-reports.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/social-optimizer-index.html', priority: '0.9', changefreq: 'weekly' },
    { url: '/library.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/innovations.html', priority: '0.8', changefreq: 'monthly' },
    { url: '/tools.html', priority: '0.7', changefreq: 'monthly' }
];

// Add all blog posts
const summary = JSON.parse(fs.readFileSync('BLOG_POSTS_CREATED.json', 'utf-8'));
for (let i = 1; i <= summary.totalPosts; i++) {
    pages.push({
        url: `/blog-post-${i}.html`,
        priority: '0.7',
        changefreq: 'monthly'
    });
}

// Generate XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${baseURL}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
});

xml += '</urlset>';

fs.writeFileSync('sitemap.xml', xml);

console.log(`✅ Generated sitemap.xml with ${pages.length} URLs`);
console.log(`   • Main pages: 9`);
console.log(`   • Blog posts: ${summary.totalPosts}`);
