#!/usr/bin/env node

/**
 * COMPREHENSIVE SITE COMPARISON
 * Kent.co.in vs OnestepfortheLife.com
 * 
 * Analyzes design, UX, conversion elements across entire sites
 */

const fs = require('fs');

console.log('🔍 COMPREHENSIVE SITE COMPARISON\n');
console.log('Kent.co.in vs OnestepfortheLife.com\n');
console.log('='.repeat(60) + '\n');

// Get all our HTML files
const ourFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && 
                 !f.includes('email-template') && 
                 !f.includes('test-'));

console.log(`Analyzing ${ourFiles.length} pages on our site...\n`);

const analysis = {
    homepage: { file: 'index.html', gaps: [] },
    productPages: [],
    blogPages: [],
    toolPages: [],
    overallGaps: []
};

// Analyze each page type
ourFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const gaps = [];
    
    // Check for Kent's key elements
    
    // 1. Hero section analysis
    if (content.includes('hero')) {
        if (content.includes('max-width: 50%') || content.includes('max-width:50%')) {
            gaps.push('❌ Hero image too small (50% vs Kent\'s 100%)');
        }
        if (!content.includes('max-width: 100%') && content.includes('<img')) {
            gaps.push('⚠️  Hero image not full-width');
        }
    }
    
    // 2. Trust signals
    const hasTrustSignals = content.includes('10,000+') || 
                           content.includes('customers') || 
                           content.includes('certified') ||
                           content.includes('award');
    if (!hasTrustSignals && !file.includes('blog-post')) {
        gaps.push('❌ No trust signals (certifications, customer count, awards)');
    }
    
    // 3. CTA positioning
    const hasEarlyCTA = content.match(/<a[^>]*href[^>]*>.*?(Download|Buy|Get|Start|Try|Request)[^<]*<\/a>/i);
    const heroEnd = content.indexOf('</div>', content.indexOf('hero'));
    const firstCTA = content.indexOf('button', 0);
    
    if (heroEnd > 0 && firstCTA > heroEnd + 500) {
        gaps.push('❌ CTA too far below fold (Kent has CTA in hero)');
    }
    
    // 4. Product cards with hover effects
    if (content.includes('product') || content.includes('service')) {
        if (!content.includes('transition:') && !content.includes('hover')) {
            gaps.push('⚠️  No hover effects on cards (Kent has smooth transitions)');
        }
    }
    
    // 5. Comparison tables
    if (file.includes('ro') || file.includes('product')) {
        if (!content.includes('<table') && !content.includes('comparison')) {
            gaps.push('⚠️  No comparison table (Kent shows product comparisons)');
        }
    }
    
    // 6. Customer testimonials
    if (!content.includes('testimonial') && !content.includes('review') && !file.includes('blog-post')) {
        gaps.push('❌ No customer testimonials (Kent has reviews on every page)');
    }
    
    // 7. Mobile responsiveness
    if (content.includes('table') && !content.includes('overflow-x:auto')) {
        gaps.push('⚠️  Tables not mobile-responsive');
    }
    
    // 8. Professional imagery
    const imageCount = (content.match(/<img/g) || []).length;
    if (imageCount === 0 && !file.includes('blog-post')) {
        gaps.push('❌ No images (Kent uses large professional photos)');
    }
    
    // 9. Trust badges
    if (!content.includes('certified') && !content.includes('badge') && !file.includes('blog')) {
        gaps.push('⚠️  No trust badges/certifications');
    }
    
    // 10. Clear value proposition
    if (!content.includes('save') && !content.includes('benefit') && !content.includes('why') && !file.includes('blog')) {
        gaps.push('⚠️  Value proposition not clear');
    }
    
    // Categorize pages
    if (file === 'index.html') {
        analysis.homepage.gaps = gaps;
    } else if (file.includes('blog')) {
        analysis.blogPages.push({ file, gaps });
    } else if (file.includes('tool') || file.includes('spo') || file.includes('job')) {
        analysis.toolPages.push({ file, gaps });
    } else {
        analysis.productPages.push({ file, gaps });
    }
});

// Generate report
console.log('📊 ANALYSIS RESULTS\n');
console.log('='.repeat(60) + '\n');

console.log('🏠 HOMEPAGE (index.html)');
console.log('-'.repeat(60));
if (analysis.homepage.gaps.length === 0) {
    console.log('✅ No gaps found - matches Kent standards!');
} else {
    analysis.homepage.gaps.forEach(gap => console.log(gap));
}
console.log('');

console.log('📄 PRODUCT/SERVICE PAGES (' + analysis.productPages.length + ' pages)');
console.log('-'.repeat(60));
const productGaps = {};
analysis.productPages.forEach(page => {
    page.gaps.forEach(gap => {
        productGaps[gap] = (productGaps[gap] || 0) + 1;
    });
});
Object.entries(productGaps).sort((a, b) => b[1] - a[1]).forEach(([gap, count]) => {
    console.log(`${gap} (${count} pages)`);
});
console.log('');

console.log('🛠️  TOOL PAGES (' + analysis.toolPages.length + ' pages)');
console.log('-'.repeat(60));
const toolGaps = {};
analysis.toolPages.forEach(page => {
    page.gaps.forEach(gap => {
        toolGaps[gap] = (toolGaps[gap] || 0) + 1;
    });
});
Object.entries(toolGaps).sort((a, b) => b[1] - a[1]).forEach(([gap, count]) => {
    console.log(`${gap} (${count} pages)`);
});
console.log('');

console.log('📝 BLOG PAGES (' + analysis.blogPages.length + ' pages)');
console.log('-'.repeat(60));
console.log('Blog pages have different requirements - focusing on content quality');
console.log('');

// Overall summary
console.log('🎯 TOP 10 GAPS TO FIX SITE-WIDE');
console.log('='.repeat(60));
const allGaps = {};
[...analysis.productPages, ...analysis.toolPages].forEach(page => {
    page.gaps.forEach(gap => {
        allGaps[gap] = (allGaps[gap] || 0) + 1;
    });
});

Object.entries(allGaps)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([gap, count], index) => {
        console.log(`${index + 1}. ${gap}`);
        console.log(`   Affects: ${count} pages`);
    });

console.log('\n' + '='.repeat(60));
console.log('💡 KENT\'S KEY STRENGTHS TO ADOPT:');
console.log('='.repeat(60));
console.log('1. ✅ Large hero images (100% width, 800px+ height)');
console.log('2. ✅ Trust signals above fold (certifications, awards, customer count)');
console.log('3. ✅ Clear CTAs in hero section (no scrolling needed)');
console.log('4. ✅ Product comparison tables (helps decision-making)');
console.log('5. ✅ Customer testimonials on every page (builds trust)');
console.log('6. ✅ Professional product photography (high quality)');
console.log('7. ✅ Hover effects on cards (smooth transitions)');
console.log('8. ✅ Mobile-first responsive design (100% width on mobile)');
console.log('9. ✅ Trust badges prominently displayed');
console.log('10. ✅ Clear value propositions (save money, quality, warranty)');

console.log('\n' + '='.repeat(60));
console.log('🚀 RECOMMENDED ACTIONS:');
console.log('='.repeat(60));
console.log('1. Run: node apply-kent-style-sitewide.js (fix technical issues)');
console.log('2. Add trust signals to all main pages');
console.log('3. Move CTAs above fold on all pages');
console.log('4. Add customer testimonials to key pages');
console.log('5. Add comparison tables where relevant');
console.log('6. Improve product/service imagery');
console.log('7. Add trust badges (certifications, awards)');
console.log('8. Ensure mobile responsiveness across all pages');

// Save detailed report
const report = {
    date: new Date().toISOString(),
    totalPages: ourFiles.length,
    homepage: analysis.homepage,
    productPages: analysis.productPages.length,
    toolPages: analysis.toolPages.length,
    blogPages: analysis.blogPages.length,
    topGaps: Object.entries(allGaps).sort((a, b) => b[1] - a[1]).slice(0, 10),
    recommendations: [
        'Enlarge hero images to 100% width',
        'Add trust signals above fold',
        'Position CTAs in hero section',
        'Add customer testimonials',
        'Create comparison tables',
        'Add hover effects to cards',
        'Ensure mobile responsiveness',
        'Add trust badges'
    ]
};

fs.writeFileSync('SITE_COMPARISON_KENT_VS_OURS.json', JSON.stringify(report, null, 2));
console.log('\n📄 Detailed report saved: SITE_COMPARISON_KENT_VS_OURS.json\n');
