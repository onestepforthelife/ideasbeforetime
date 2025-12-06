const fs = require('fs');
const path = require('path');

console.log('🔍 COMPREHENSIVE SITE AUDIT - December 7, 2025\n');

const issues = {
    critical: [],
    high: [],
    medium: [],
    low: []
};

// 1. CHECK ALIGNMENT & FORMATTING
console.log('1️⃣ Checking alignment and formatting...');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for left-aligned headers (should be consistent)
    if (content.includes('text-align: left') && content.includes('<header')) {
        const headerMatch = content.match(/<header[^>]*style="[^"]*text-align:\s*left/);
        if (headerMatch) {
            issues.high.push(`${file}: Header has left alignment (inconsistent)`);
        }
    }
    
    // Check for unformatted sections
    if (!content.includes('max-width') && !content.includes('container')) {
        issues.medium.push(`${file}: No max-width container (may look unformatted)`);
    }
    
    // Check for missing padding/margin
    if (!content.includes('padding') && !content.includes('margin')) {
        issues.low.push(`${file}: No padding/margin defined`);
    }
});

// 2. CHECK SITEMAP VS NAVIGATION SYNC
console.log('2️⃣ Checking sitemap vs navigation sync...');

// Read sitemap
let sitemapUrls = [];
if (fs.existsSync('sitemap.xml')) {
    const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
    const urlMatches = sitemap.matchAll(/<loc>([^<]+)<\/loc>/g);
    sitemapUrls = Array.from(urlMatches).map(m => m[1].replace('https://onestepforthelife.com/', ''));
}

// Read navigation from common-navigation.js
let navLinks = [];
if (fs.existsSync('common-navigation.js')) {
    const nav = fs.readFileSync('common-navigation.js', 'utf8');
    const linkMatches = nav.matchAll(/href="([^"]+)"/g);
    navLinks = Array.from(linkMatches).map(m => m[1]);
}

// Find mismatches
const inSitemapNotNav = sitemapUrls.filter(url => !navLinks.includes(url) && !navLinks.includes('/' + url));
const inNavNotSitemap = navLinks.filter(link => !sitemapUrls.includes(link) && !sitemapUrls.includes(link.replace('/', '')));

if (inSitemapNotNav.length > 0) {
    issues.critical.push(`Sitemap has ${inSitemapNotNav.length} pages NOT in navigation: ${inSitemapNotNav.slice(0, 5).join(', ')}`);
}

if (inNavNotSitemap.length > 0) {
    issues.high.push(`Navigation has ${inNavNotSitemap.length} links NOT in sitemap: ${inNavNotSitemap.slice(0, 5).join(', ')}`);
}

// 3. CHECK VISUAL CONSISTENCY
console.log('3️⃣ Checking visual consistency...');

const widths = new Map();
const headerPositions = new Map();

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check max-width
    const widthMatch = content.match(/max-width:\s*(\d+)px/);
    if (widthMatch) {
        const width = widthMatch[1];
        if (!widths.has(width)) widths.set(width, []);
        widths.get(width).push(file);
    }
    
    // Check header position
    const headerPosMatch = content.match(/header[^}]*top:\s*(\d+)px/);
    if (headerPosMatch) {
        const pos = headerPosMatch[1];
        if (!headerPositions.has(pos)) headerPositions.set(pos, []);
        headerPositions.get(pos).push(file);
    }
});

if (widths.size > 1) {
    issues.high.push(`Inconsistent widths found: ${Array.from(widths.keys()).join(', ')}px`);
}

if (headerPositions.size > 1) {
    issues.medium.push(`Inconsistent header positions: ${Array.from(headerPositions.keys()).join(', ')}px`);
}

// 4. GENERATE REPORT
console.log('\n📊 AUDIT RESULTS:\n');

console.log(`🚨 CRITICAL (${issues.critical.length}):`);
issues.critical.forEach(i => console.log(`   - ${i}`));

console.log(`\n⚠️  HIGH (${issues.high.length}):`);
issues.high.forEach(i => console.log(`   - ${i}`));

console.log(`\n📌 MEDIUM (${issues.medium.length}):`);
issues.medium.forEach(i => console.log(`   - ${i}`));

console.log(`\n💡 LOW (${issues.low.length}):`);
issues.low.slice(0, 10).forEach(i => console.log(`   - ${i}`));
if (issues.low.length > 10) console.log(`   ... and ${issues.low.length - 10} more`);

// Save report
const report = {
    timestamp: new Date().toISOString(),
    summary: {
        critical: issues.critical.length,
        high: issues.high.length,
        medium: issues.medium.length,
        low: issues.low.length
    },
    issues
};

fs.writeFileSync('SITE_AUDIT_REPORT_DEC7.json', JSON.stringify(report, null, 2));

console.log('\n✅ Report saved to SITE_AUDIT_REPORT_DEC7.json');

// Exit code based on issues
if (issues.critical.length > 0) process.exit(1);
if (issues.high.length > 5) process.exit(1);
process.exit(0);
