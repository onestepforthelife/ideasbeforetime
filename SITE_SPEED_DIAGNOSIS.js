/**
 * SITE SPEED DIAGNOSTIC TOOL
 * Created: December 7, 2025
 * Purpose: Identify performance bottlenecks causing slow site speed
 * 
 * Run: node SITE_SPEED_DIAGNOSIS.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 SITE SPEED DIAGNOSTIC TOOL');
console.log('=' .repeat(60));

const results = {
    timestamp: new Date().toISOString(),
    criticalIssues: [],
    highIssues: [],
    mediumIssues: [],
    lowIssues: [],
    recommendations: [],
    metrics: {}
};

// 1. CHECK FILE SIZES
console.log('\n📦 Checking File Sizes...');
const fileSizeIssues = [];
const largeFiles = [];

function checkFileSize(filePath, maxSize, category) {
    try {
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        
        if (stats.size > maxSize) {
            const issue = {
                file: filePath,
                size: stats.size > 1024 * 1024 ? `${sizeMB} MB` : `${sizeKB} KB`,
                maxAllowed: `${(maxSize / 1024).toFixed(0)} KB`,
                category: category
            };
            
            if (stats.size > maxSize * 2) {
                results.criticalIssues.push(`${filePath}: ${issue.size} (CRITICAL - 2x limit)`);
            } else {
                results.highIssues.push(`${filePath}: ${issue.size} (exceeds ${issue.maxAllowed})`);
            }
            
            largeFiles.push(issue);
            return false;
        }
        return true;
    } catch (err) {
        return true; // File doesn't exist, skip
    }
}

// Check HTML files (should be < 500KB)
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    checkFileSize(file, 500 * 1024, 'HTML');
});

// Check CSS files (should be < 100KB)
const cssFiles = fs.readdirSync('.').filter(f => f.endsWith('.css'));
cssFiles.forEach(file => {
    checkFileSize(file, 100 * 1024, 'CSS');
});

// Check JS files (should be < 200KB)
const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js') && !f.includes('node_modules'));
jsFiles.forEach(file => {
    checkFileSize(file, 200 * 1024, 'JavaScript');
});

// Check images (should be < 500KB)
if (fs.existsSync('images')) {
    const imageFiles = fs.readdirSync('images');
    imageFiles.forEach(file => {
        checkFileSize(path.join('images', file), 500 * 1024, 'Image');
    });
}

results.metrics.largeFilesCount = largeFiles.length;
console.log(`   Found ${largeFiles.length} files exceeding size limits`);

// 2. CHECK INLINE STYLES
console.log('\n🎨 Checking Inline Styles...');
let inlineStyleCount = 0;
let totalInlineStyleSize = 0;

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const styleMatches = content.match(/<style[^>]*>[\s\S]*?<\/style>/gi);
        
        if (styleMatches) {
            styleMatches.forEach(style => {
                inlineStyleCount++;
                totalInlineStyleSize += style.length;
            });
            
            if (styleMatches.length > 2) {
                results.mediumIssues.push(`${file}: ${styleMatches.length} inline <style> blocks (${(totalInlineStyleSize / 1024).toFixed(1)} KB)`);
            }
        }
    } catch (err) {
        // Skip
    }
});

results.metrics.inlineStyleBlocks = inlineStyleCount;
results.metrics.inlineStyleSizeKB = (totalInlineStyleSize / 1024).toFixed(2);
console.log(`   Found ${inlineStyleCount} inline style blocks (${results.metrics.inlineStyleSizeKB} KB total)`);

if (totalInlineStyleSize > 50 * 1024) {
    results.highIssues.push(`Total inline styles: ${results.metrics.inlineStyleSizeKB} KB (should be < 50 KB)`);
    results.recommendations.push('Extract inline styles to external CSS files');
}

// 3. CHECK SCRIPT LOADING
console.log('\n📜 Checking Script Loading...');
let blockingScripts = 0;
let deferredScripts = 0;
let asyncScripts = 0;

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const scriptMatches = content.match(/<script[^>]*>/gi);
        
        if (scriptMatches) {
            scriptMatches.forEach(script => {
                if (script.includes('defer')) {
                    deferredScripts++;
                } else if (script.includes('async')) {
                    asyncScripts++;
                } else if (!script.includes('type="application/ld+json"')) {
                    blockingScripts++;
                }
            });
        }
    } catch (err) {
        // Skip
    }
});

results.metrics.blockingScripts = blockingScripts;
results.metrics.deferredScripts = deferredScripts;
results.metrics.asyncScripts = asyncScripts;

console.log(`   Blocking scripts: ${blockingScripts}`);
console.log(`   Deferred scripts: ${deferredScripts}`);
console.log(`   Async scripts: ${asyncScripts}`);

if (blockingScripts > 5) {
    results.highIssues.push(`${blockingScripts} blocking scripts (should be < 5)`);
    results.recommendations.push('Add defer or async attributes to non-critical scripts');
}

// 4. CHECK EXTERNAL RESOURCES
console.log('\n🌐 Checking External Resources...');
let externalResourceCount = 0;
const externalDomains = new Set();

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check external scripts
        const externalScripts = content.match(/src="https?:\/\/[^"]+"/gi);
        if (externalScripts) {
            externalScripts.forEach(src => {
                const domain = src.match(/https?:\/\/([^/"]+)/);
                if (domain) externalDomains.add(domain[1]);
                externalResourceCount++;
            });
        }
        
        // Check external stylesheets
        const externalStyles = content.match(/href="https?:\/\/[^"]+\.css"/gi);
        if (externalStyles) {
            externalStyles.forEach(href => {
                const domain = href.match(/https?:\/\/([^/"]+)/);
                if (domain) externalDomains.add(domain[1]);
                externalResourceCount++;
            });
        }
    } catch (err) {
        // Skip
    }
});

results.metrics.externalResources = externalResourceCount;
results.metrics.externalDomains = externalDomains.size;

console.log(`   External resources: ${externalResourceCount}`);
console.log(`   External domains: ${externalDomains.size}`);
console.log(`   Domains: ${Array.from(externalDomains).join(', ')}`);

if (externalDomains.size > 5) {
    results.mediumIssues.push(`${externalDomains.size} external domains (increases DNS lookups)`);
    results.recommendations.push('Add preconnect hints for external domains');
}

// 5. CHECK BLOG.HTML SPECIFICALLY (100 posts!)
console.log('\n📝 Checking blog.html (100 posts)...');
if (fs.existsSync('blog.html')) {
    const blogContent = fs.readFileSync('blog.html', 'utf8');
    const blogSize = (blogContent.length / 1024).toFixed(2);
    
    // Count blog cards
    const blogCards = (blogContent.match(/class="blog-card"/g) || []).length;
    
    results.metrics.blogSizeKB = blogSize;
    results.metrics.blogPostsRendered = blogCards;
    
    console.log(`   Blog size: ${blogSize} KB`);
    console.log(`   Blog posts rendered: ${blogCards}`);
    
    if (blogSize > 300) {
        results.criticalIssues.push(`blog.html is ${blogSize} KB (CRITICAL - should be < 300 KB)`);
        results.recommendations.push('URGENT: Implement pagination for blog posts (show 10-20 per page)');
        results.recommendations.push('URGENT: Lazy load blog post images');
        results.recommendations.push('URGENT: Use virtual scrolling or infinite scroll');
    }
    
    if (blogCards > 20) {
        results.highIssues.push(`Rendering ${blogCards} blog posts at once (should be < 20)`);
        results.recommendations.push('Implement pagination: Show 10-20 posts per page');
    }
}

// 6. CHECK COMMON SCRIPTS LOADED ON EVERY PAGE
console.log('\n🔄 Checking Common Scripts...');
const commonScripts = [
    'common-navigation.js',
    'common-footer.js',
    'universal-analytics.js',
    'error-tracker.js',
    'goda-chat-widget.js'
];

let totalCommonScriptSize = 0;
commonScripts.forEach(script => {
    try {
        const stats = fs.statSync(script);
        const sizeKB = (stats.size / 1024).toFixed(2);
        totalCommonScriptSize += stats.size;
        console.log(`   ${script}: ${sizeKB} KB`);
        
        if (stats.size > 50 * 1024) {
            results.mediumIssues.push(`${script}: ${sizeKB} KB (should be < 50 KB)`);
        }
    } catch (err) {
        console.log(`   ${script}: NOT FOUND`);
    }
});

results.metrics.commonScriptsSizeKB = (totalCommonScriptSize / 1024).toFixed(2);
console.log(`   Total common scripts: ${results.metrics.commonScriptsSizeKB} KB`);

if (totalCommonScriptSize > 100 * 1024) {
    results.highIssues.push(`Common scripts total ${results.metrics.commonScriptsSizeKB} KB (should be < 100 KB)`);
    results.recommendations.push('Minify and combine common scripts');
}

// 7. CHECK FOR OPTIMIZATION OPPORTUNITIES
console.log('\n⚡ Checking Optimization Opportunities...');

// Check for minification
let unminifiedFiles = 0;
[...cssFiles, ...jsFiles].forEach(file => {
    if (!file.includes('.min.') && !file.includes('node_modules')) {
        unminifiedFiles++;
    }
});

if (unminifiedFiles > 0) {
    results.mediumIssues.push(`${unminifiedFiles} unminified CSS/JS files`);
    results.recommendations.push('Minify CSS and JavaScript files');
}

// Check for resource hints
let hasPreconnect = false;
let hasPreload = false;

htmlFiles.slice(0, 5).forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('rel="preconnect"')) hasPreconnect = true;
        if (content.includes('rel="preload"')) hasPreload = true;
    } catch (err) {
        // Skip
    }
});

if (!hasPreconnect) {
    results.mediumIssues.push('Missing preconnect hints for external domains');
    results.recommendations.push('Add <link rel="preconnect"> for Google Fonts, Analytics, etc.');
}

if (!hasPreload) {
    results.lowIssues.push('Missing preload hints for critical resources');
    results.recommendations.push('Add <link rel="preload"> for critical CSS/fonts');
}

// 8. GENERATE REPORT
console.log('\n' + '='.repeat(60));
console.log('📊 DIAGNOSTIC SUMMARY');
console.log('='.repeat(60));

console.log(`\n🚨 CRITICAL ISSUES (${results.criticalIssues.length}):`);
if (results.criticalIssues.length === 0) {
    console.log('   ✅ None');
} else {
    results.criticalIssues.forEach(issue => console.log(`   ❌ ${issue}`));
}

console.log(`\n⚠️  HIGH PRIORITY ISSUES (${results.highIssues.length}):`);
if (results.highIssues.length === 0) {
    console.log('   ✅ None');
} else {
    results.highIssues.forEach(issue => console.log(`   ⚠️  ${issue}`));
}

console.log(`\n📋 MEDIUM PRIORITY ISSUES (${results.mediumIssues.length}):`);
if (results.mediumIssues.length === 0) {
    console.log('   ✅ None');
} else {
    results.mediumIssues.forEach(issue => console.log(`   📋 ${issue}`));
}

console.log(`\n💡 RECOMMENDATIONS (${results.recommendations.length}):`);
results.recommendations.forEach((rec, i) => console.log(`   ${i + 1}. ${rec}`));

console.log('\n📈 KEY METRICS:');
console.log(`   Blog size: ${results.metrics.blogSizeKB} KB`);
console.log(`   Blog posts rendered: ${results.metrics.blogPostsRendered}`);
console.log(`   Common scripts size: ${results.metrics.commonScriptsSizeKB} KB`);
console.log(`   Inline styles: ${results.metrics.inlineStyleSizeKB} KB`);
console.log(`   Blocking scripts: ${results.metrics.blockingScripts}`);
console.log(`   External domains: ${results.metrics.externalDomains}`);
console.log(`   Large files: ${results.metrics.largeFilesCount}`);

// Calculate priority score
const priorityScore = 
    results.criticalIssues.length * 10 +
    results.highIssues.length * 5 +
    results.mediumIssues.length * 2 +
    results.lowIssues.length * 1;

console.log(`\n🎯 PRIORITY SCORE: ${priorityScore}`);
console.log(`   0-10: Good`);
console.log(`   11-30: Needs attention`);
console.log(`   31-50: Significant issues`);
console.log(`   51+: CRITICAL - immediate action required`);

// Save detailed report
const reportPath = 'SITE_SPEED_DIAGNOSTIC_REPORT.json';
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
console.log(`\n💾 Detailed report saved: ${reportPath}`);

console.log('\n' + '='.repeat(60));
console.log('✅ DIAGNOSTIC COMPLETE');
console.log('='.repeat(60));

// Exit with code based on severity
if (results.criticalIssues.length > 0) {
    process.exit(1); // Critical issues found
} else if (results.highIssues.length > 5) {
    process.exit(1); // Too many high priority issues
} else {
    process.exit(0); // Acceptable
}
