const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('COMPREHENSIVE FINAL REVIEW - All Angles Check');
console.log('='.repeat(80));
console.log();

const results = {
    blogPosts: { checked: 0, issues: [] },
    navigation: { checked: 0, issues: [] },
    crossLinking: { checked: 0, issues: [] },
    uxPrinciples: { checked: 0, issues: [] },
    consistency: { checked: 0, issues: [] },
    sitemap: { checked: 0, issues: [] }
};

// 1. CHECK ALL 100 BLOG POSTS EXIST
console.log('1. CHECKING BLOG POSTS (100 files)...');
for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    if (fs.existsSync(filename)) {
        results.blogPosts.checked++;
        
        // Check content structure
        const content = fs.readFileSync(filename, 'utf8');
        
        // Must have navigation
        if (!content.includes('common-navigation.js')) {
            results.blogPosts.issues.push(`${filename}: Missing navigation`);
        }
        
        // Must have footer
        if (!content.includes('common-footer.js')) {
            results.blogPosts.issues.push(`${filename}: Missing footer`);
        }
        
        // Must have quick access widget
        if (!content.includes('quick-access-widget')) {
            results.blogPosts.issues.push(`${filename}: Missing quick access widget`);
        }
        
        // Must have back to blog link
        if (!content.includes('← Back to Blog') && !content.includes('Back to Blog')) {
            results.blogPosts.issues.push(`${filename}: Missing back to blog link`);
        }
        
        // Must have category
        if (!content.includes('Category:')) {
            results.blogPosts.issues.push(`${filename}: Missing category`);
        }
        
    } else {
        results.blogPosts.issues.push(`${filename}: FILE MISSING`);
    }
}

// 2. CHECK BLOG.HTML ORGANIZATION
console.log('2. CHECKING BLOG.HTML ORGANIZATION...');
if (fs.existsSync('blog.html')) {
    const blogContent = fs.readFileSync('blog.html', 'utf8');
    results.navigation.checked++;
    
    // Check for category sections
    const categories = [
        'Leadership & Management',
        'Technology & Innovation',
        'Industry Insights',
        'Career Development',
        'Business Strategy'
    ];
    
    categories.forEach(cat => {
        if (!blogContent.includes(cat)) {
            results.navigation.issues.push(`blog.html: Missing category "${cat}"`);
        }
    });
    
    // Check for quick access widget
    if (!blogContent.includes('quick-access-widget')) {
        results.navigation.issues.push('blog.html: Missing quick access widget');
    }
    
    // Check for navigation
    if (!blogContent.includes('common-navigation.js')) {
        results.navigation.issues.push('blog.html: Missing navigation');
    }
}

// 3. CHECK CROSS-LINKING ON KEY PAGES
console.log('3. CHECKING CROSS-LINKING...');
const keyPages = [
    'index.html',
    'about.html',
    'blog.html',
    'market-reports.html',
    'cv.html',
    'tools.html',
    'innovations.html'
];

keyPages.forEach(page => {
    if (fs.existsSync(page)) {
        const content = fs.readFileSync(page, 'utf8');
        results.crossLinking.checked++;
        
        // Must have quick access widget
        if (!content.includes('quick-access-widget')) {
            results.crossLinking.issues.push(`${page}: Missing quick access widget`);
        }
        
        // Must have navigation
        if (!content.includes('common-navigation.js')) {
            results.crossLinking.issues.push(`${page}: Missing navigation`);
        }
        
        // Must have footer
        if (!content.includes('common-footer.js')) {
            results.crossLinking.issues.push(`${page}: Missing footer`);
        }
    }
});

// 4. CHECK UX PRINCIPLES APPLIED
console.log('4. CHECKING UX PRINCIPLES...');
const uxPages = ['index.html', 'market-reports.html', 'blog.html'];

uxPages.forEach(page => {
    if (fs.existsSync(page)) {
        const content = fs.readFileSync(page, 'utf8');
        results.uxPrinciples.checked++;
        
        // Check if primary CTA is early in content (within first 2000 chars after body)
        const bodyIndex = content.indexOf('<body');
        const first2000 = content.substring(bodyIndex, bodyIndex + 2000);
        
        if (page === 'market-reports.html') {
            if (!first2000.includes('Request Access') && !first2000.includes('request-access')) {
                results.uxPrinciples.issues.push(`${page}: Primary CTA not above fold`);
            }
        }
        
        if (page === 'blog.html') {
            if (!first2000.includes('category-filter') && !first2000.includes('Category')) {
                results.uxPrinciples.issues.push(`${page}: Category filters not above fold`);
            }
        }
    }
});

// 5. CHECK CONSISTENCY ACROSS ALL HTML FILES
console.log('5. CHECKING CONSISTENCY...');
const allHtmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

allHtmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    results.consistency.checked++;
    
    // Check for common elements
    if (!content.includes('common-navigation.js') && !file.includes('test-') && !file.includes('compare-')) {
        results.consistency.issues.push(`${file}: Missing common-navigation.js`);
    }
    
    if (!content.includes('common-footer.js') && !file.includes('test-') && !file.includes('compare-')) {
        results.consistency.issues.push(`${file}: Missing common-footer.js`);
    }
    
    // Check for analytics
    if (!content.includes('universal-analytics.js') && !file.includes('test-') && !file.includes('compare-')) {
        results.consistency.issues.push(`${file}: Missing analytics`);
    }
});

// 6. CHECK SITEMAP
console.log('6. CHECKING SITEMAP...');
if (fs.existsSync('sitemap.xml')) {
    const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
    results.sitemap.checked++;
    
    // Count URLs in sitemap
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    console.log(`   Sitemap contains ${urlCount} URLs`);
    
    // Check if blog posts are in sitemap
    let blogPostsInSitemap = 0;
    for (let i = 1; i <= 100; i++) {
        if (sitemapContent.includes(`blog-post-${i}.html`)) {
            blogPostsInSitemap++;
        }
    }
    
    if (blogPostsInSitemap < 100) {
        results.sitemap.issues.push(`Only ${blogPostsInSitemap}/100 blog posts in sitemap`);
    }
}

// PRINT RESULTS
console.log();
console.log('='.repeat(80));
console.log('REVIEW RESULTS');
console.log('='.repeat(80));
console.log();

console.log('1. BLOG POSTS:');
console.log(`   ✓ Checked: ${results.blogPosts.checked}/100 files`);
console.log(`   ✗ Issues: ${results.blogPosts.issues.length}`);
if (results.blogPosts.issues.length > 0) {
    results.blogPosts.issues.slice(0, 10).forEach(issue => console.log(`      - ${issue}`));
    if (results.blogPosts.issues.length > 10) {
        console.log(`      ... and ${results.blogPosts.issues.length - 10} more`);
    }
}
console.log();

console.log('2. NAVIGATION:');
console.log(`   ✓ Checked: ${results.navigation.checked} files`);
console.log(`   ✗ Issues: ${results.navigation.issues.length}`);
results.navigation.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

console.log('3. CROSS-LINKING:');
console.log(`   ✓ Checked: ${results.crossLinking.checked} key pages`);
console.log(`   ✗ Issues: ${results.crossLinking.issues.length}`);
results.crossLinking.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

console.log('4. UX PRINCIPLES:');
console.log(`   ✓ Checked: ${results.uxPrinciples.checked} pages`);
console.log(`   ✗ Issues: ${results.uxPrinciples.issues.length}`);
results.uxPrinciples.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

console.log('5. CONSISTENCY:');
console.log(`   ✓ Checked: ${results.consistency.checked} HTML files`);
console.log(`   ✗ Issues: ${results.consistency.issues.length}`);
if (results.consistency.issues.length > 0) {
    results.consistency.issues.slice(0, 10).forEach(issue => console.log(`      - ${issue}`));
    if (results.consistency.issues.length > 10) {
        console.log(`      ... and ${results.consistency.issues.length - 10} more`);
    }
}
console.log();

console.log('6. SITEMAP:');
console.log(`   ✓ Checked: ${results.sitemap.checked} file`);
console.log(`   ✗ Issues: ${results.sitemap.issues.length}`);
results.sitemap.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

// SUMMARY
const totalIssues = 
    results.blogPosts.issues.length +
    results.navigation.issues.length +
    results.crossLinking.issues.length +
    results.uxPrinciples.issues.length +
    results.consistency.issues.length +
    results.sitemap.issues.length;

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Total Issues Found: ${totalIssues}`);
console.log();

if (totalIssues === 0) {
    console.log('✅ ALL CHECKS PASSED - SITE IS READY!');
} else {
    console.log('⚠️  ISSUES FOUND - NEED FIXES');
}

console.log('='.repeat(80));

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    summary: {
        totalIssues,
        blogPostsChecked: results.blogPosts.checked,
        filesChecked: results.consistency.checked
    },
    details: results
};

fs.writeFileSync('COMPREHENSIVE_REVIEW_RESULTS.json', JSON.stringify(report, null, 2));
console.log('Detailed report saved to: COMPREHENSIVE_REVIEW_RESULTS.json');
