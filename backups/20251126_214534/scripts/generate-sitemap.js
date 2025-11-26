/**
 * Sitemap Generator for Ideas Before Time
 * Reads innovations.json and generates sitemap.xml automatically
 */

const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'https://ideas-before-time.pages.dev';
const INNOVATIONS_FILE = path.join(__dirname, '../innovations.json');
const SITEMAP_FILE = path.join(__dirname, '../sitemap.xml');

// Static pages with their priorities
const STATIC_PAGES = [
    { url: '/', priority: 1.0, changefreq: 'monthly' },
    { url: '/library.html', priority: 0.9, changefreq: 'weekly' },
    { url: '/about.html', priority: 0.9, changefreq: 'monthly' },
    { url: '/timeline.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/cv-preview.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/business-insights.html', priority: 0.85, changefreq: 'weekly' },
    { url: '/teaching-ai-to-think.html', priority: 0.9, changefreq: 'weekly' },
    { url: '/specialty-chemicals-index.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/specialty-chemicals-qa.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/specialty-chemicals-value-chain.html', priority: 0.8, changefreq: 'monthly' }
];

/**
 * Read and parse innovations.json
 */
function readInnovations() {
    try {
        const data = fs.readFileSync(INNOVATIONS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading innovations.json:', error.message);
        process.exit(1);
    }
}

/**
 * Generate sitemap XML content
 */
function generateSitemap(innovations) {
    const today = new Date().toISOString().split('T')[0];
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    xml += '  <!-- Main Pages -->\n';
    STATIC_PAGES.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += '  </url>\n';
    });
    
    // Add innovation pages
    xml += '  \n  <!-- Innovation Pages -->\n';
    innovations.innovations
        .filter(innovation => innovation.status === 'published')
        .forEach(innovation => {
            xml += '  <url>\n';
            xml += `    <loc>${BASE_URL}/${innovation.id}.html</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <priority>0.7</priority>\n`;
            xml += `    <changefreq>yearly</changefreq>\n`;
            xml += '  </url>\n';
        });
    
    xml += '</urlset>\n';
    
    return xml;
}

/**
 * Write sitemap to file
 */
function writeSitemap(xml) {
    try {
        fs.writeFileSync(SITEMAP_FILE, xml, 'utf8');
        console.log('✓ Sitemap generated successfully');
        console.log(`  Location: ${SITEMAP_FILE}`);
    } catch (error) {
        console.error('Error writing sitemap:', error.message);
        process.exit(1);
    }
}

/**
 * Main execution
 */
function main() {
    console.log('Generating sitemap...');
    
    const innovations = readInnovations();
    console.log(`  Found ${innovations.innovations.length} innovations`);
    
    const xml = generateSitemap(innovations);
    console.log(`  Generated ${xml.split('<url>').length - 1} URLs`);
    
    writeSitemap(xml);
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateSitemap, readInnovations };
