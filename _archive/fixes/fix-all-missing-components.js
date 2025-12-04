const fs = require('fs');

console.log('🔧 FIXING ALL MISSING COMPONENTS\n');

const baseUrl = 'https://ideasbeforetime.pages.dev';
let fixed = {
    canonical: 0,
    metaTags: 0,
    watermark: 0,
    adsense: 0
};

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Skip redirect pages
        if (content.includes('meta http-equiv="refresh"')) {
            return;
        }
        
        // 1. Add canonical URL if missing
        if (!content.includes('<link rel="canonical"')) {
            const canonicalTag = `<link rel="canonical" href="${baseUrl}/${file}">`;
            content = content.replace('</head>', `    ${canonicalTag}\n</head>`);
            fixed.canonical++;
            modified = true;
        }
        
        // 2. Add meta description if missing (for main pages only, not test/temp pages)
        if (!content.includes('<meta name="description"') && 
            !file.includes('test-') && 
            !file.includes('compare-') &&
            !file.includes('vertical-nav')) {
            
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1] : 'Ideas Before Time';
            const description = `${title} - Professional insights and resources from Ideas Before Time`;
            
            const metaTag = `<meta name="description" content="${description}">`;
            content = content.replace('</head>', `    ${metaTag}\n</head>`);
            fixed.metaTags++;
            modified = true;
        }
        
        // 3. Add watermark CSS if missing (for main content pages)
        if (!content.includes('common-watermark.css') && 
            !file.includes('test-') && 
            !file.includes('compare-') &&
            !file.startsWith('blog-post-') &&
            content.includes('<body')) {
            
            const watermarkLink = `<link rel="stylesheet" href="common-watermark.css">`;
            content = content.replace('</head>', `    ${watermarkLink}\n</head>`);
            fixed.watermark++;
            modified = true;
        }
        
        // 4. Add AdSense if missing (for main content pages)
        if (!content.includes('google-adsense.js') && 
            !content.includes('ca-pub-3181510462001437') &&
            !file.includes('test-') && 
            !file.includes('compare-') &&
            !file.startsWith('blog-post-') &&
            content.includes('</head>')) {
            
            const adsenseScript = `
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181510462001437"
            crossorigin="anonymous"></script>
    <script src="google-adsense.js"></script>`;
            
            content = content.replace('</head>', `${adsenseScript}\n</head>`);
            fixed.adsense++;
            modified = true;
        }
        
        // Save if modified
        if (modified) {
            fs.writeFileSync(file, content);
            console.log(`✅ Fixed: ${file}`);
        }
        
    } catch (error) {
        console.log(`⚠️  Error processing ${file}: ${error.message}`);
    }
});

console.log('\n═══════════════════════════════════════');
console.log('✅ FIXES COMPLETE');
console.log('═══════════════════════════════════════');
console.log(`Canonical URLs added:  ${fixed.canonical}`);
console.log(`Meta descriptions added: ${fixed.metaTags}`);
console.log(`Watermarks added:      ${fixed.watermark}`);
console.log(`AdSense added:         ${fixed.adsense}`);
console.log('═══════════════════════════════════════\n');
