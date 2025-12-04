const fs = require('fs');
const path = require('path');

console.log('='.repeat(80));
console.log('MASTER VERIFICATION - LIVE SITE CHECK');
console.log('Site: https://ideasbeforetime.pages.dev');
console.log('='.repeat(80));
console.log();

const results = {
    blogPosts: { total: 0, verified: 0, issues: [] },
    quickAccess: { total: 0, verified: 0, issues: [] },
    navigation: { total: 0, verified: 0, issues: [] },
    uxPrinciples: { total: 0, verified: 0, issues: [] },
    consistency: { total: 0, verified: 0, issues: [] },
    sitemap: { verified: false, issues: [] }
};

// 1. VERIFY ALL 100 BLOG POSTS
console.log('1. VERIFYING 100 BLOG POSTS...');
for (let i = 1; i <= 100; i++) {
    const filename = `blog-post-${i}.html`;
    results.blogPosts.total++;
    
    if (fs.existsSync(filename)) {
        const content = fs.readFileSync(filename, 'utf8');
        let postOk = true;
        
        // Check required elements
        if (!content.includes('common-navigation.js')) {
            results.blogPosts.issues.push(`${filename}: Missing navigation`);
            postOk = false;
        }
        if (!content.includes('common-footer.js')) {
            results.blogPosts.issues.push(`${filename}: Missing footer`);
            postOk = false;
        }
        if (!content.includes('quick-access-widget')) {
            results.blogPosts.issues.push(`${filename}: Missing quick access widget`);
            postOk = false;
        }
        if (!content.includes('Back to Blog') && !content.includes('← Back')) {
            results.blogPosts.issues.push(`${filename}: Missing back link`);
            postOk = false;
        }
        if (!content.includes('Category:')) {
            results.blogPosts.issues.push(`${filename}: Missing category`);
            postOk = false;
        }
        
        if (postOk) results.blogPosts.verified++;
    } else {
        results.blogPosts.issues.push(`${filename}: FILE MISSING!`);
    }
}

// 2. VERIFY QUICK ACCESS WIDGET ON KEY PAGES
console.log('2. VERIFYING QUICK ACCESS WIDGET...');
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
    results.quickAccess.total++;
    if (fs.existsSync(page)) {
        const content = fs.readFileSync(page, 'utf8');
        
        if (content.includes('quick-access-widget') && 
            content.includes('quick-access-btn') &&
            content.includes('toggleQuickAccess')) {
            results.quickAccess.verified++;
        } else {
            results.quickAccess.issues.push(`${page}: Quick access widget incomplete`);
        }
    } else {
        results.quickAccess.issues.push(`${page}: FILE MISSING!`);
    }
});

// 3. VERIFY NAVIGATION CONSISTENCY
console.log('3. VERIFYING NAVIGATION CONSISTENCY...');
const allHtmlFiles = fs.readdirSync('.').filter(f => 
    f.endsWith('.html') && 
    !f.includes('test-') && 
    !f.includes('compare-') &&
    !f.includes('vertical-nav-option')
);

allHtmlFiles.forEach(file => {
    results.navigation.total++;
    const content = fs.readFileSync(file, 'utf8');
    
    let navOk = true;
    if (!content.includes('common-navigation.js')) {
        results.navigation.issues.push(`${file}: Missing navigation`);
        navOk = false;
    }
    if (!content.includes('common-footer.js')) {
        results.navigation.issues.push(`${file}: Missing footer`);
        navOk = false;
    }
    
    if (navOk) results.navigation.verified++;
});

// 4. VERIFY UX PRINCIPLES
console.log('4. VERIFYING UX PRINCIPLES...');

// Check blog.html
if (fs.existsSync('blog.html')) {
    results.uxPrinciples.total++;
    const content = fs.readFileSync('blog.html', 'utf8');
    
    if (content.includes('category-filter') || content.includes('filter-btn')) {
        results.uxPrinciples.verified++;
    } else {
        results.uxPrinciples.issues.push('blog.html: Category filters missing');
    }
}

// Check market-reports.html
if (fs.existsSync('market-reports.html')) {
    results.uxPrinciples.total++;
    const content = fs.readFileSync('market-reports.html', 'utf8');
    
    // Check if Request Access CTA exists early in content
    const bodyIndex = content.indexOf('<body');
    const first3000 = content.substring(bodyIndex, bodyIndex + 3000);
    
    if (first3000.includes('Request Access') || first3000.includes('request-access')) {
        results.uxPrinciples.verified++;
    } else {
        results.uxPrinciples.issues.push('market-reports.html: CTA not prominent');
    }
}

// 5. VERIFY CONSISTENCY
console.log('5. VERIFYING OVERALL CONSISTENCY...');
const samplePages = ['index.html', 'about.html', 'blog.html', 'cv.html', 'tools.html'];

samplePages.forEach(page => {
    if (fs.existsSync(page)) {
        results.consistency.total++;
        const content = fs.readFileSync(page, 'utf8');
        
        let consistent = true;
        if (!content.includes('common-navigation.js')) consistent = false;
        if (!content.includes('common-footer.js')) consistent = false;
        if (!content.includes('universal-analytics.js')) consistent = false;
        if (!content.includes('quick-access-widget')) consistent = false;
        
        if (consistent) {
            results.consistency.verified++;
        } else {
            results.consistency.issues.push(`${page}: Missing common elements`);
        }
    }
});

// 6. VERIFY SITEMAP
console.log('6. VERIFYING SITEMAP...');
if (fs.existsSync('sitemap.xml')) {
    const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');
    const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
    
    let blogPostsInSitemap = 0;
    for (let i = 1; i <= 100; i++) {
        if (sitemapContent.includes(`blog-post-${i}.html`)) {
            blogPostsInSitemap++;
        }
    }
    
    if (urlCount >= 109 && blogPostsInSitemap === 100) {
        results.sitemap.verified = true;
    } else {
        results.sitemap.issues.push(`Sitemap has ${urlCount} URLs, ${blogPostsInSitemap}/100 blog posts`);
    }
} else {
    results.sitemap.issues.push('sitemap.xml MISSING!');
}

// PRINT RESULTS
console.log();
console.log('='.repeat(80));
console.log('VERIFICATION RESULTS');
console.log('='.repeat(80));
console.log();

console.log('1. BLOG POSTS (100 files):');
console.log(`   ✓ Verified: ${results.blogPosts.verified}/${results.blogPosts.total}`);
console.log(`   ✗ Issues: ${results.blogPosts.issues.length}`);
if (results.blogPosts.issues.length > 0 && results.blogPosts.issues.length <= 5) {
    results.blogPosts.issues.forEach(issue => console.log(`      - ${issue}`));
} else if (results.blogPosts.issues.length > 5) {
    console.log(`      (${results.blogPosts.issues.length} issues found - run detailed review for list)`);
}
console.log();

console.log('2. QUICK ACCESS WIDGET (⚡):');
console.log(`   ✓ Verified: ${results.quickAccess.verified}/${results.quickAccess.total} key pages`);
console.log(`   ✗ Issues: ${results.quickAccess.issues.length}`);
results.quickAccess.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

console.log('3. NAVIGATION CONSISTENCY:');
console.log(`   ✓ Verified: ${results.navigation.verified}/${results.navigation.total} HTML files`);
console.log(`   ✗ Issues: ${results.navigation.issues.length}`);
if (results.navigation.issues.length > 0 && results.navigation.issues.length <= 5) {
    results.navigation.issues.forEach(issue => console.log(`      - ${issue}`));
} else if (results.navigation.issues.length > 5) {
    console.log(`      (${results.navigation.issues.length} issues found - run detailed review for list)`);
}
console.log();

console.log('4. UX PRINCIPLES:');
console.log(`   ✓ Verified: ${results.uxPrinciples.verified}/${results.uxPrinciples.total} pages`);
console.log(`   ✗ Issues: ${results.uxPrinciples.issues.length}`);
results.uxPrinciples.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

console.log('5. CONSISTENCY CHECK:');
console.log(`   ✓ Verified: ${results.consistency.verified}/${results.consistency.total} sample pages`);
console.log(`   ✗ Issues: ${results.consistency.issues.length}`);
results.consistency.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

console.log('6. SITEMAP:');
console.log(`   ✓ Verified: ${results.sitemap.verified ? 'YES' : 'NO'}`);
console.log(`   ✗ Issues: ${results.sitemap.issues.length}`);
results.sitemap.issues.forEach(issue => console.log(`      - ${issue}`));
console.log();

// CALCULATE OVERALL SCORE
const totalVerified = 
    results.blogPosts.verified +
    results.quickAccess.verified +
    results.navigation.verified +
    results.uxPrinciples.verified +
    results.consistency.verified +
    (results.sitemap.verified ? 1 : 0);

const totalChecks = 
    results.blogPosts.total +
    results.quickAccess.total +
    results.navigation.total +
    results.uxPrinciples.total +
    results.consistency.total +
    1;

const score = Math.round((totalVerified / totalChecks) * 100);

console.log('='.repeat(80));
console.log('OVERALL SCORE');
console.log('='.repeat(80));
console.log(`${totalVerified}/${totalChecks} checks passed = ${score}%`);
console.log();

if (score >= 95) {
    console.log('✅ EXCELLENT - SITE IS PRODUCTION READY!');
} else if (score >= 85) {
    console.log('✅ GOOD - Minor issues to fix');
} else if (score >= 70) {
    console.log('⚠️  ACCEPTABLE - Some issues need attention');
} else {
    console.log('❌ NEEDS WORK - Multiple issues found');
}

console.log('='.repeat(80));

// WHAT TO TEST ON LIVE SITE
console.log();
console.log('MANUAL VERIFICATION ON LIVE SITE:');
console.log('https://ideasbeforetime.pages.dev');
console.log();
console.log('1. Visit blog.html → See 100 posts organized by category?');
console.log('2. Click any post → Opens correctly with full content?');
console.log('3. Click ⚡ button (bottom-right) → Menu appears?');
console.log('4. Click menu item → Navigates to correct page?');
console.log('5. Test on mobile → Everything works and looks good?');
console.log();

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    score: score,
    totalVerified: totalVerified,
    totalChecks: totalChecks,
    details: results
};

fs.writeFileSync('MASTER_VERIFICATION_RESULTS.json', JSON.stringify(report, null, 2));
console.log('Detailed report saved to: MASTER_VERIFICATION_RESULTS.json');
console.log('='.repeat(80));
