const fs = require('fs');
const path = require('path');

console.log('═══════════════════════════════════════════════════════════════');
console.log('🔍 COMPREHENSIVE SITE CHECK - ALL PAGES');
console.log('═══════════════════════════════════════════════════════════════\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const results = {
    total: files.length,
    withNavigation: 0,
    withFooter: 0,
    withAnalytics: 0,
    withErrorTracker: 0,
    withWatermark: 0,
    withAdSense: 0,
    withSocialShare: 0,
    withMetaTags: 0,
    withCanonical: 0,
    issues: []
};

console.log(`📊 Found ${files.length} HTML files\n`);
console.log('Checking each page for:\n');
console.log('  ✓ Navigation (common-navigation.js)');
console.log('  ✓ Footer (common-footer.js)');
console.log('  ✓ Analytics (universal-analytics.js)');
console.log('  ✓ Error Tracking (error-tracker.js)');
console.log('  ✓ Watermark (common-watermark.css)');
console.log('  ✓ Google AdSense');
console.log('  ✓ Social Share Buttons');
console.log('  ✓ Meta Tags (description, keywords)');
console.log('  ✓ Canonical URL\n');
console.log('─────────────────────────────────────────────────────────────\n');

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const fileIssues = [];
        
        // Check navigation
        if (content.includes('common-navigation.js')) {
            results.withNavigation++;
        } else {
            fileIssues.push('Missing navigation');
        }
        
        // Check footer
        if (content.includes('common-footer.js')) {
            results.withFooter++;
        } else {
            fileIssues.push('Missing footer');
        }
        
        // Check analytics
        if (content.includes('universal-analytics.js')) {
            results.withAnalytics++;
        } else {
            fileIssues.push('Missing analytics');
        }
        
        // Check error tracker
        if (content.includes('error-tracker.js')) {
            results.withErrorTracker++;
        } else {
            fileIssues.push('Missing error tracker');
        }
        
        // Check watermark
        if (content.includes('common-watermark.css')) {
            results.withWatermark++;
        } else {
            fileIssues.push('Missing watermark');
        }
        
        // Check AdSense
        if (content.includes('google-adsense.js') || content.includes('ca-pub-3181510462001437')) {
            results.withAdSense++;
        } else {
            fileIssues.push('Missing AdSense');
        }
        
        // Check social share (for blog posts)
        if (file.startsWith('blog-post-')) {
            if (content.includes('Share This Post') || content.includes('twitter.com/intent/tweet')) {
                results.withSocialShare++;
            } else {
                fileIssues.push('Missing social share buttons');
            }
        }
        
        // Check meta description
        if (content.includes('<meta name="description"')) {
            results.withMetaTags++;
        } else {
            fileIssues.push('Missing meta description');
        }
        
        // Check canonical URL
        if (content.includes('<link rel="canonical"')) {
            results.withCanonical++;
        } else {
            fileIssues.push('Missing canonical URL');
        }
        
        // Store issues
        if (fileIssues.length > 0) {
            results.issues.push({
                file: file,
                issues: fileIssues
            });
        }
        
    } catch (error) {
        console.log(`⚠️  Error reading ${file}: ${error.message}`);
    }
});

// Display results
console.log('═══════════════════════════════════════════════════════════════');
console.log('📊 RESULTS SUMMARY');
console.log('═══════════════════════════════════════════════════════════════\n');

const percentage = (count) => ((count / results.total) * 100).toFixed(1);

console.log(`Total Pages: ${results.total}\n`);

console.log('Component Coverage:');
console.log(`  Navigation:     ${results.withNavigation}/${results.total} (${percentage(results.withNavigation)}%)`);
console.log(`  Footer:         ${results.withFooter}/${results.total} (${percentage(results.withFooter)}%)`);
console.log(`  Analytics:      ${results.withAnalytics}/${results.total} (${percentage(results.withAnalytics)}%)`);
console.log(`  Error Tracker:  ${results.withErrorTracker}/${results.total} (${percentage(results.withErrorTracker)}%)`);
console.log(`  Watermark:      ${results.withWatermark}/${results.total} (${percentage(results.withWatermark)}%)`);
console.log(`  AdSense:        ${results.withAdSense}/${results.total} (${percentage(results.withAdSense)}%)`);
console.log(`  Meta Tags:      ${results.withMetaTags}/${results.total} (${percentage(results.withMetaTags)}%)`);
console.log(`  Canonical URL:  ${results.withCanonical}/${results.total} (${percentage(results.withCanonical)}%)`);

const blogPosts = files.filter(f => f.startsWith('blog-post-')).length;
if (blogPosts > 0) {
    console.log(`  Social Share:   ${results.withSocialShare}/${blogPosts} blog posts (${((results.withSocialShare / blogPosts) * 100).toFixed(1)}%)`);
}

console.log('\n');

// Display issues
if (results.issues.length > 0) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('⚠️  PAGES WITH ISSUES');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    results.issues.forEach(item => {
        console.log(`📄 ${item.file}`);
        item.issues.forEach(issue => {
            console.log(`   ❌ ${issue}`);
        });
        console.log('');
    });
} else {
    console.log('✅ ALL PAGES PERFECT! No issues found.\n');
}

// Overall score
const totalChecks = results.total * 8; // 8 checks per page (excluding social share)
const passedChecks = results.withNavigation + results.withFooter + results.withAnalytics + 
                     results.withErrorTracker + results.withWatermark + results.withAdSense + 
                     results.withMetaTags + results.withCanonical;
const overallScore = ((passedChecks / totalChecks) * 100).toFixed(1);

console.log('═══════════════════════════════════════════════════════════════');
console.log('🎯 OVERALL SITE QUALITY SCORE');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log(`  ${overallScore}% Complete\n`);

if (overallScore >= 95) {
    console.log('  🌟 EXCELLENT! Site is in great shape!');
} else if (overallScore >= 80) {
    console.log('  ✅ GOOD! Minor improvements needed.');
} else if (overallScore >= 60) {
    console.log('  ⚠️  FAIR! Several pages need attention.');
} else {
    console.log('  ❌ NEEDS WORK! Many pages missing components.');
}

console.log('\n═══════════════════════════════════════════════════════════════\n');

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    summary: {
        totalPages: results.total,
        overallScore: overallScore + '%',
        navigation: `${results.withNavigation}/${results.total}`,
        footer: `${results.withFooter}/${results.total}`,
        analytics: `${results.withAnalytics}/${results.total}`,
        errorTracker: `${results.withErrorTracker}/${results.total}`,
        watermark: `${results.withWatermark}/${results.total}`,
        adSense: `${results.withAdSense}/${results.total}`,
        metaTags: `${results.withMetaTags}/${results.total}`,
        canonicalURL: `${results.withCanonical}/${results.total}`
    },
    issues: results.issues
};

fs.writeFileSync('SITE_CHECK_REPORT.json', JSON.stringify(report, null, 2));
console.log('📄 Detailed report saved to: SITE_CHECK_REPORT.json\n');
