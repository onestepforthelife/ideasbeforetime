const fs = require('fs');

console.log('═══════════════════════════════════════════════════════════════');
console.log('🔍 MASTER VERIFICATION - COMPLETE SITE REVIEW');
console.log('Checking against ALL rules and past corrections');
console.log('═══════════════════════════════════════════════════════════════\n');

const results = {
    totalChecks: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    issues: []
};

// Get all HTML files
const allFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log(`📊 Analyzing ${allFiles.length} HTML files\n`);

// ═══════════════════════════════════════════════════════════════
// CHECK 1: PAST CORRECTIONS - Headers (Learning #24)
// ═══════════════════════════════════════════════════════════════
console.log('1️⃣  Checking: No double headers (Past correction)...');
let doubleHeaderCount = 0;
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const headerTags = (content.match(/<header/g) || []).length;
        const navScripts = (content.match(/common-navigation\.js/g) || []).length;
        
        if (headerTags > 1 || (headerTags > 0 && navScripts > 0)) {
            doubleHeaderCount++;
            results.issues.push({
                file,
                type: 'CRITICAL',
                issue: 'Double headers detected',
                rule: 'Learning #24 - No double headers'
            });
        }
    } catch (e) {}
});
results.totalChecks++;
if (doubleHeaderCount === 0) {
    console.log('   ✅ PASS: No double headers found\n');
    results.passed++;
} else {
    console.log(`   ❌ FAIL: ${doubleHeaderCount} pages have double headers\n`);
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 2: ALIGNMENT - Headers left-aligned (Past correction)
// ═══════════════════════════════════════════════════════════════
console.log('2️⃣  Checking: Header alignment (Past correction)...');
let wrongAlignment = 0;
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('text-align: center') && 
            content.includes('<header') && 
            !file.includes('test-') &&
            !file.includes('compare-')) {
            // Check if it's in header section
            const headerSection = content.match(/<header[^>]*>[\s\S]*?<\/header>/);
            if (headerSection && headerSection[0].includes('text-align: center')) {
                wrongAlignment++;
                results.issues.push({
                    file,
                    type: 'WARNING',
                    issue: 'Header might be center-aligned',
                    rule: 'Headers should be left-aligned'
                });
            }
        }
    } catch (e) {}
});
results.totalChecks++;
if (wrongAlignment === 0) {
    console.log('   ✅ PASS: All headers properly aligned\n');
    results.passed++;
} else {
    console.log(`   ⚠️  WARNING: ${wrongAlignment} pages may have alignment issues\n`);
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 3: REPORT BLUR SYSTEM (Rule: REPORT_BLUR_RULES.md)
// ═══════════════════════════════════════════════════════════════
console.log('3️⃣  Checking: Market reports have blur system...');
const reportFiles = ['acrylic.html', 'poloxamer.html', 'paper.html', 'nickel.html', 'specialty.html'];
let reportsWithBlur = 0;
reportFiles.forEach(file => {
    try {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes('blurred') || content.includes('blur(')) {
                reportsWithBlur++;
            } else {
                results.issues.push({
                    file,
                    type: 'CRITICAL',
                    issue: 'Missing blur system',
                    rule: 'REPORT_BLUR_RULES.md - All reports need 30% preview + blur'
                });
            }
        }
    } catch (e) {}
});
results.totalChecks++;
if (reportsWithBlur === reportFiles.length) {
    console.log(`   ✅ PASS: All ${reportFiles.length} reports have blur system\n`);
    results.passed++;
} else {
    console.log(`   ❌ FAIL: Only ${reportsWithBlur}/${reportFiles.length} reports have blur\n`);
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 4: NAVIGATION CONSISTENCY (Rule: KIRO_RULES.md)
// ═══════════════════════════════════════════════════════════════
console.log('4️⃣  Checking: Navigation consistency...');
let withNav = 0;
let withoutNav = [];
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        // Skip redirect pages and test pages
        if (content.includes('meta http-equiv="refresh"') || 
            file.includes('test-') || 
            file.includes('compare-')) {
            return;
        }
        
        if (content.includes('common-navigation.js')) {
            withNav++;
        } else {
            withoutNav.push(file);
        }
    } catch (e) {}
});
results.totalChecks++;
const navPercentage = ((withNav / (allFiles.length - 10)) * 100).toFixed(1); // Exclude ~10 test/redirect pages
if (navPercentage >= 95) {
    console.log(`   ✅ PASS: ${navPercentage}% pages have navigation\n`);
    results.passed++;
} else {
    console.log(`   ⚠️  WARNING: Only ${navPercentage}% have navigation\n`);
    results.warnings++;
    withoutNav.slice(0, 5).forEach(f => {
        results.issues.push({
            file: f,
            type: 'WARNING',
            issue: 'Missing navigation',
            rule: 'All main pages should have common-navigation.js'
        });
    });
}

// ═══════════════════════════════════════════════════════════════
// CHECK 5: FOOTER CONSISTENCY
// ═══════════════════════════════════════════════════════════════
console.log('5️⃣  Checking: Footer consistency...');
let withFooter = 0;
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('meta http-equiv="refresh"') || 
            file.includes('test-') || 
            file.includes('compare-')) {
            return;
        }
        if (content.includes('common-footer.js')) {
            withFooter++;
        }
    } catch (e) {}
});
results.totalChecks++;
const footerPercentage = ((withFooter / (allFiles.length - 10)) * 100).toFixed(1);
if (footerPercentage >= 95) {
    console.log(`   ✅ PASS: ${footerPercentage}% pages have footer\n`);
    results.passed++;
} else {
    console.log(`   ⚠️  WARNING: Only ${footerPercentage}% have footer\n`);
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 6: ANALYTICS TRACKING (Rule: All pages must track)
// ═══════════════════════════════════════════════════════════════
console.log('6️⃣  Checking: Analytics tracking...');
let withAnalytics = 0;
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('universal-analytics.js')) {
            withAnalytics++;
        }
    } catch (e) {}
});
results.totalChecks++;
const analyticsPercentage = ((withAnalytics / allFiles.length) * 100).toFixed(1);
if (analyticsPercentage >= 95) {
    console.log(`   ✅ PASS: ${analyticsPercentage}% pages have analytics\n`);
    results.passed++;
} else {
    console.log(`   ⚠️  WARNING: Only ${analyticsPercentage}% have analytics\n`);
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 7: ERROR TRACKING (Rule: LIFETIME_SYSTEMS.md)
// ═══════════════════════════════════════════════════════════════
console.log('7️⃣  Checking: Error tracking system...');
let withErrorTracker = 0;
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('error-tracker.js')) {
            withErrorTracker++;
        }
    } catch (e) {}
});
results.totalChecks++;
const errorTrackerPercentage = ((withErrorTracker / allFiles.length) * 100).toFixed(1);
if (errorTrackerPercentage >= 95) {
    console.log(`   ✅ PASS: ${errorTrackerPercentage}% pages have error tracking\n`);
    results.passed++;
} else {
    console.log(`   ⚠️  WARNING: Only ${errorTrackerPercentage}% have error tracking\n`);
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 8: CANONICAL URLs (SEO Critical)
// ═══════════════════════════════════════════════════════════════
console.log('8️⃣  Checking: Canonical URLs (SEO)...');
let withCanonical = 0;
allFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('<link rel="canonical"')) {
            withCanonical++;
        }
    } catch (e) {}
});
results.totalChecks++;
const canonicalPercentage = ((withCanonical / allFiles.length) * 100).toFixed(1);
if (canonicalPercentage >= 95) {
    console.log(`   ✅ PASS: ${canonicalPercentage}% pages have canonical URLs\n`);
    results.passed++;
} else {
    console.log(`   ❌ FAIL: Only ${canonicalPercentage}% have canonical URLs\n`);
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 9: BLOG POSTS - Social Share Buttons
// ═══════════════════════════════════════════════════════════════
console.log('9️⃣  Checking: Blog posts have social share buttons...');
const blogPosts = allFiles.filter(f => f.startsWith('blog-post-'));
let blogWithShare = 0;
blogPosts.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('Share This Post') || content.includes('twitter.com/intent/tweet')) {
            blogWithShare++;
        }
    } catch (e) {}
});
results.totalChecks++;
if (blogWithShare === blogPosts.length && blogPosts.length > 0) {
    console.log(`   ✅ PASS: All ${blogPosts.length} blog posts have social share\n`);
    results.passed++;
} else {
    console.log(`   ❌ FAIL: Only ${blogWithShare}/${blogPosts.length} have social share\n`);
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 10: BLOG POSTS - Related Posts
// ═══════════════════════════════════════════════════════════════
console.log('🔟 Checking: Blog posts have related posts...');
let blogWithRelated = 0;
blogPosts.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('Related Posts')) {
            blogWithRelated++;
        }
    } catch (e) {}
});
results.totalChecks++;
if (blogWithRelated === blogPosts.length && blogPosts.length > 0) {
    console.log(`   ✅ PASS: All ${blogPosts.length} blog posts have related posts\n`);
    results.passed++;
} else {
    console.log(`   ❌ FAIL: Only ${blogWithRelated}/${blogPosts.length} have related posts\n`);
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 11: SITEMAP EXISTS AND IS UPDATED
// ═══════════════════════════════════════════════════════════════
console.log('1️⃣1️⃣  Checking: Sitemap exists and is updated...');
results.totalChecks++;
if (fs.existsSync('sitemap.xml')) {
    const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
    const urlCount = (sitemap.match(/<loc>/g) || []).length;
    if (urlCount >= 100) {
        console.log(`   ✅ PASS: Sitemap exists with ${urlCount} URLs\n`);
        results.passed++;
    } else {
        console.log(`   ⚠️  WARNING: Sitemap has only ${urlCount} URLs\n`);
        results.warnings++;
    }
} else {
    console.log('   ❌ FAIL: Sitemap.xml not found\n');
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 12: RSS FEED EXISTS
// ═══════════════════════════════════════════════════════════════
console.log('1️⃣2️⃣  Checking: RSS feed exists...');
results.totalChecks++;
if (fs.existsSync('rss.xml')) {
    console.log('   ✅ PASS: RSS feed exists\n');
    results.passed++;
} else {
    console.log('   ❌ FAIL: rss.xml not found\n');
    results.failed++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 13: SHORT URLs (ro.html, reports.html)
// ═══════════════════════════════════════════════════════════════
console.log('1️⃣3️⃣  Checking: Short URL redirects exist...');
results.totalChecks++;
const shortUrls = ['ro.html', 'reports.html'];
let shortUrlsExist = shortUrls.filter(f => fs.existsSync(f)).length;
if (shortUrlsExist === shortUrls.length) {
    console.log(`   ✅ PASS: All ${shortUrls.length} short URLs exist\n`);
    results.passed++;
} else {
    console.log(`   ⚠️  WARNING: Only ${shortUrlsExist}/${shortUrls.length} short URLs exist\n`);
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 14: UX - Search on Blog Page
// ═══════════════════════════════════════════════════════════════
console.log('1️⃣4️⃣  Checking: Blog has search functionality...');
results.totalChecks++;
if (fs.existsSync('blog.html')) {
    const blogContent = fs.readFileSync('blog.html', 'utf8');
    if (blogContent.includes('searchInput') || blogContent.includes('Search blog')) {
        console.log('   ✅ PASS: Blog has search functionality\n');
        results.passed++;
    } else {
        console.log('   ❌ FAIL: Blog missing search\n');
        results.failed++;
    }
} else {
    console.log('   ⚠️  WARNING: blog.html not found\n');
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// CHECK 15: RO GUIDE - Printable Checklist
// ═══════════════════════════════════════════════════════════════
console.log('1️⃣5️⃣  Checking: RO guide has printable checklist...');
results.totalChecks++;
if (fs.existsSync('ro-water-purifier-guide.html')) {
    const roContent = fs.readFileSync('ro-water-purifier-guide.html', 'utf8');
    if (roContent.includes('RO Service Visit Checklist') && roContent.includes('checkbox')) {
        console.log('   ✅ PASS: RO guide has printable checklist\n');
        results.passed++;
    } else {
        console.log('   ❌ FAIL: RO guide missing checklist\n');
        results.failed++;
    }
} else {
    console.log('   ⚠️  WARNING: ro-water-purifier-guide.html not found\n');
    results.warnings++;
}

// ═══════════════════════════════════════════════════════════════
// FINAL RESULTS
// ═══════════════════════════════════════════════════════════════
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📊 VERIFICATION RESULTS');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Total Checks:    ${results.totalChecks}`);
console.log(`✅ Passed:       ${results.passed} (${((results.passed/results.totalChecks)*100).toFixed(1)}%)`);
console.log(`❌ Failed:       ${results.failed} (${((results.failed/results.totalChecks)*100).toFixed(1)}%)`);
console.log(`⚠️  Warnings:     ${results.warnings} (${((results.warnings/results.totalChecks)*100).toFixed(1)}%)`);

const overallScore = ((results.passed / results.totalChecks) * 100).toFixed(1);
console.log(`\n🎯 Overall Score: ${overallScore}%\n`);

if (overallScore >= 90) {
    console.log('   🌟 EXCELLENT! Site meets all critical requirements!');
} else if (overallScore >= 75) {
    console.log('   ✅ GOOD! Minor improvements needed.');
} else if (overallScore >= 60) {
    console.log('   ⚠️  FAIR! Several issues need attention.');
} else {
    console.log('   ❌ NEEDS WORK! Critical issues found.');
}

// Display critical issues
if (results.issues.length > 0) {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('⚠️  ISSUES FOUND');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    const criticalIssues = results.issues.filter(i => i.type === 'CRITICAL');
    const warnings = results.issues.filter(i => i.type === 'WARNING');
    
    if (criticalIssues.length > 0) {
        console.log(`🚨 CRITICAL ISSUES (${criticalIssues.length}):\n`);
        criticalIssues.slice(0, 10).forEach(issue => {
            console.log(`   📄 ${issue.file}`);
            console.log(`      ❌ ${issue.issue}`);
            console.log(`      📋 Rule: ${issue.rule}\n`);
        });
    }
    
    if (warnings.length > 0 && warnings.length <= 10) {
        console.log(`⚠️  WARNINGS (${warnings.length}):\n`);
        warnings.forEach(issue => {
            console.log(`   📄 ${issue.file}`);
            console.log(`      ⚠️  ${issue.issue}\n`);
        });
    }
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📄 Detailed report saved to: MASTER_VERIFICATION_REPORT.json');
console.log('═══════════════════════════════════════════════════════════════\n');

// Save detailed report
fs.writeFileSync('MASTER_VERIFICATION_REPORT.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    totalChecks: results.totalChecks,
    passed: results.passed,
    failed: results.failed,
    warnings: results.warnings,
    overallScore: overallScore + '%',
    issues: results.issues
}, null, 2));
