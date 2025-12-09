const fs = require('fs');

console.log('🔧 FIXING ALL SITE ISSUES - December 7, 2025\n');

let fixed = 0;

// 1. FIX WIDTH CONSISTENCY - All pages should be 1400px
console.log('1️⃣ Fixing width consistency to 1400px...');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Replace 768px and 500px with 1400px
    if (content.includes('max-width: 768px') || content.includes('max-width: 500px')) {
        content = content.replace(/max-width:\s*768px/g, 'max-width: 1400px');
        content = content.replace(/max-width:\s*500px/g, 'max-width: 1400px');
        changed = true;
    }
    
    // Add max-width container if missing
    if (!content.includes('max-width') && content.includes('<body')) {
        content = content.replace(
            /<body([^>]*)>/,
            `<body$1>\n<style>\nbody { max-width: 1400px; margin: 0 auto; padding: 20px; }\n</style>`
        );
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        fixed++;
        console.log(`   ✅ Fixed: ${file}`);
    }
});

// 2. FIX HEADER ALIGNMENT - All should be left-aligned at top: 20px
console.log('\n2️⃣ Fixing header alignment...');

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Remove center alignment from headers
    if (content.includes('<header') && content.includes('text-align: center')) {
        content = content.replace(/text-align:\s*center/g, 'text-align: left');
        changed = true;
    }
    
    // Standardize header position to 20px
    if (content.match(/header[^}]*top:\s*(?!20px)\d+px/)) {
        content = content.replace(/(header[^}]*)top:\s*\d+px/g, '$1top: 20px');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        fixed++;
        console.log(`   ✅ Fixed: ${file}`);
    }
});

// 3. UPDATE SITEMAP TO MATCH NAVIGATION
console.log('\n3️⃣ Updating sitemap.xml...');

// Get all HTML files that should be in sitemap
const publicPages = htmlFiles.filter(f => 
    !f.startsWith('test-') && 
    !f.includes('preview') &&
    !f.includes('template') &&
    !f.includes('protected') &&
    f !== 'index.html' // Will be added as root
);

// Generate sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://onestepforthelife.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${publicPages.map(page => `  <url>
    <loc>https://onestepforthelife.com/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log('   ✅ Sitemap updated with all public pages');

// 4. SUMMARY
console.log('\n📊 SUMMARY:');
console.log(`   ✅ Fixed ${fixed} files`);
console.log(`   ✅ Standardized width to 1400px`);
console.log(`   ✅ Standardized header alignment`);
console.log(`   ✅ Updated sitemap.xml`);
console.log('\n✅ ALL ISSUES FIXED!');
