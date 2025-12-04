const fs = require('fs');
const path = require('path');

console.log('🔍 COMPREHENSIVE LINK & CONTENT CHECKER');
console.log('========================================\n');

// Get all HTML files
const files = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.includes('backup'));

console.log(`📊 Found ${files.length} HTML files to check\n`);

// Store all links found
const linkMap = {}; // page -> [links it contains]
const backlinks = {}; // page -> [pages that link to it]
const pageContent = {}; // page -> content summary

// Check each file
files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Extract links
    const linkRegex = /href=["']([^"']+)["']/g;
    const links = [];
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
        const link = match[1];
        // Only track internal HTML links
        if (link.endsWith('.html') || link === '/' || link.startsWith('#')) {
            links.push(link);
        }
    }
    
    linkMap[file] = [...new Set(links)]; // Remove duplicates
    
    // Track backlinks
    links.forEach(link => {
        const targetFile = link === '/' ? 'index.html' : link.replace('#', '');
        if (targetFile.endsWith('.html')) {
            if (!backlinks[targetFile]) {
                backlinks[targetFile] = [];
            }
            backlinks[targetFile].push(file);
        }
    });
    
    // Extract content summary
    const titleMatch = content.match(/<title>([^<]+)<\/title>/);
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/);
    
    pageContent[file] = {
        title: titleMatch ? titleMatch[1] : 'NO TITLE',
        h1: h1Match ? h1Match[1] : 'NO H1',
        hasNav: content.includes('common-navigation.js'),
        hasFooter: content.includes('common-footer.js'),
        hasAstronomy: content.includes('astronomy.html') || content.includes('🔭 Astronomy'),
        size: content.length
    };
});

console.log('📋 PART 1: CONTENT SUMMARY');
console.log('==========================\n');

// Show content of key pages
const keyPages = ['index.html', 'astronomy.html', 'blog.html', 'about.html', 'ro-water-purifier-guide.html'];

keyPages.forEach(page => {
    if (pageContent[page]) {
        const info = pageContent[page];
        console.log(`📄 ${page}`);
        console.log(`   Title: ${info.title}`);
        console.log(`   H1: ${info.h1}`);
        console.log(`   Navigation: ${info.hasNav ? '✅' : '❌'}`);
        console.log(`   Footer: ${info.hasFooter ? '✅' : '❌'}`);
        console.log(`   Astronomy Link: ${info.hasAstronomy ? '✅' : '❌'}`);
        console.log(`   Size: ${Math.round(info.size / 1024)}KB`);
        console.log(`   Links Out: ${linkMap[page].length}`);
        console.log(`   Links In: ${backlinks[page] ? backlinks[page].length : 0}`);
        console.log('');
    }
});

console.log('\n📋 PART 2: LINK ANALYSIS');
console.log('=========================\n');

// Check for orphaned pages (no incoming links)
console.log('🔍 ORPHANED PAGES (no incoming links):');
const orphaned = files.filter(f => !backlinks[f] || backlinks[f].length === 0);
if (orphaned.length > 0) {
    orphaned.forEach(page => {
        console.log(`   ❌ ${page} - NO pages link to this`);
    });
} else {
    console.log('   ✅ No orphaned pages found!');
}

console.log('\n🔍 BROKEN LINKS (links to non-existent pages):');
let brokenCount = 0;
Object.keys(linkMap).forEach(page => {
    linkMap[page].forEach(link => {
        const targetFile = link === '/' ? 'index.html' : link.replace('#', '');
        if (targetFile.endsWith('.html') && !files.includes(targetFile) && !link.startsWith('#')) {
            console.log(`   ❌ ${page} -> ${link} (FILE NOT FOUND)`);
            brokenCount++;
        }
    });
});
if (brokenCount === 0) {
    console.log('   ✅ No broken links found!');
}

console.log('\n📋 PART 3: SPECIFIC PAGE ANALYSIS');
console.log('==================================\n');

// Astronomy page - what links to it?
console.log('🔭 ASTRONOMY.HTML:');
console.log('   Links TO astronomy.html:');
if (backlinks['astronomy.html']) {
    backlinks['astronomy.html'].forEach(page => {
        console.log(`      ← ${page}`);
    });
} else {
    console.log('      ❌ NO pages link to astronomy.html!');
}

console.log('\n   Links FROM astronomy.html:');
if (linkMap['astronomy.html']) {
    linkMap['astronomy.html'].forEach(link => {
        console.log(`      → ${link}`);
    });
}

// Homepage - what does it link to?
console.log('\n🏠 INDEX.HTML (Homepage):');
console.log('   Links FROM homepage:');
if (linkMap['index.html']) {
    linkMap['index.html'].forEach(link => {
        console.log(`      → ${link}`);
    });
}

// Blog posts - check if they link back to blog.html
console.log('\n📝 BLOG POSTS:');
const blogPosts = files.filter(f => f.startsWith('blog-post-'));
const blogPostsLinkingToBlog = blogPosts.filter(f => 
    linkMap[f] && linkMap[f].includes('blog.html')
);
console.log(`   Total blog posts: ${blogPosts.length}`);
console.log(`   Link back to blog.html: ${blogPostsLinkingToBlog.length}`);
console.log(`   Missing backlink: ${blogPosts.length - blogPostsLinkingToBlog.length}`);

console.log('\n📋 PART 4: NAVIGATION CONSISTENCY');
console.log('==================================\n');

// Check which pages have astronomy in navigation
const pagesWithAstronomy = files.filter(f => pageContent[f].hasAstronomy);
const pagesWithoutAstronomy = files.filter(f => !pageContent[f].hasAstronomy);

console.log(`✅ Pages WITH astronomy link: ${pagesWithAstronomy.length}/${files.length}`);
console.log(`❌ Pages WITHOUT astronomy link: ${pagesWithoutAstronomy.length}/${files.length}`);

if (pagesWithoutAstronomy.length > 0 && pagesWithoutAstronomy.length <= 20) {
    console.log('\n   Pages missing astronomy link:');
    pagesWithoutAstronomy.forEach(page => {
        console.log(`      ❌ ${page}`);
    });
}

console.log('\n📋 PART 5: SUMMARY');
console.log('==================\n');

console.log(`Total HTML files: ${files.length}`);
console.log(`Orphaned pages: ${orphaned.length}`);
console.log(`Broken links: ${brokenCount}`);
console.log(`Pages with navigation: ${files.filter(f => pageContent[f].hasNav).length}`);
console.log(`Pages with footer: ${files.filter(f => pageContent[f].hasFooter).length}`);
console.log(`Pages with astronomy link: ${pagesWithAstronomy.length}`);

console.log('\n✅ CHECK COMPLETE!');
