#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 UPDATING SITEMAP.XML...\n');

let content = fs.readFileSync('sitemap.xml', 'utf8');

// Update domain
content = content.replace(/ideasbeforetime\.pages\.dev/g, 'onestepforthelife.com');

// Remove .html extensions from URLs
content = content.replace(/\.html<\/loc>/g, '</loc>');

// Update lastmod to today
const today = new Date().toISOString().split('T')[0];
content = content.replace(/<lastmod>2025-12-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

fs.writeFileSync('sitemap.xml', content, 'utf8');

console.log('✅ Updated sitemap.xml:');
console.log('   - Domain: onestepforthelife.com');
console.log('   - All URLs now extensionless');
console.log(`   - Last modified: ${today}`);
console.log('\n✅ SITEMAP READY - Push to GitHub!');
