#!/usr/bin/env node

/**
 * PERFORMANCE OPTIMIZATION SCRIPT
 * Created: December 6, 2025
 * Based on: web.dev Performance + Core Web Vitals documentation
 * Purpose: Apply Phase 1 quick wins to improve site performance
 */

const fs = require('fs');
const path = require('path');

console.log('⚡ PERFORMANCE OPTIMIZATION SCRIPT');
console.log('==================================\n');

// Configuration
const HTML_FILES = [
    'index.html',
    'about.html',
    'blog.html',
    'market-reports.html',
    'social-optimizer-index.html',
    'cv.html',
    'jobs.html',
    'admin-control-panel.html'
];

const EXTERNAL_DOMAINS = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'www.googletagmanager.com',
    'cdnjs.cloudflare.com'
];

let totalChanges = 0;

// Phase 1: Add Resource Hints
function addResourceHints(htmlContent, filename) {
    console.log(`\n📋 Processing: ${filename}`);
    let changes = 0;
    
    // Check if resource hints already exist
    if (htmlContent.includes('rel="preconnect"')) {
        console.log('  ✓ Resource hints already present');
        return { content: htmlContent, changes: 0 };
    }
    
    // Build resource hints
    const resourceHints = `
    <!-- Resource Hints for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://www.googletagmanager.com">
    
    <!-- Preload Critical Resources -->
    <link rel="preload" href="/common-styles.css" as="style">
    <link rel="preload" href="/common-navigation.js" as="script">
`;
    
    // Insert after <head> tag
    if (htmlContent.includes('<head>')) {
        htmlContent = htmlContent.replace('<head>', '<head>' + resourceHints);
        changes++;
        console.log('  ✅ Added resource hints');
    }
    
    return { content: htmlContent, changes };
}

// Phase 2: Optimize Font Loading
function optimizeFonts(htmlContent, filename) {
    let changes = 0;
    
    // Add font-display: swap to Google Fonts
    if (htmlContent.includes('fonts.googleapis.com')) {
        // Check if display=swap already present
        if (!htmlContent.includes('display=swap')) {
            htmlContent = htmlContent.replace(
                /fonts\.googleapis\.com\/css2\?family=([^"']+)/g,
                'fonts.googleapis.com/css2?family=$1&display=swap'
            );
            changes++;
            console.log('  ✅ Added font-display: swap');
        }
    }
    
    return { content: htmlContent, changes };
}

// Phase 3: Defer Non-Critical JavaScript
function deferJavaScript(htmlContent, filename) {
    let changes = 0;
    
    // Scripts to defer (non-critical)
    const deferScripts = [
        'universal-analytics.js',
        'error-tracker.js',
        'cookie-consent.js'
    ];
    
    deferScripts.forEach(script => {
        if (htmlContent.includes(script) && !htmlContent.includes(`defer src="${script}"`)) {
            htmlContent = htmlContent.replace(
                new RegExp(`<script src="${script}"></script>`, 'g'),
                `<script defer src="${script}"></script>`
            );
            changes++;
            console.log(`  ✅ Deferred ${script}`);
        }
    });
    
    return { content: htmlContent, changes };
}

// Phase 4: Add Lazy Loading to Images
function addLazyLoading(htmlContent, filename) {
    let changes = 0;
    
    // Find all <img> tags without loading="lazy"
    const imgRegex = /<img([^>]*?)(?<!loading=["']lazy["'])>/gi;
    const matches = htmlContent.match(imgRegex);
    
    if (matches) {
        matches.forEach(match => {
            // Skip if already has loading attribute
            if (!match.includes('loading=')) {
                const newImg = match.replace('<img', '<img loading="lazy"');
                htmlContent = htmlContent.replace(match, newImg);
                changes++;
            }
        });
        
        if (changes > 0) {
            console.log(`  ✅ Added lazy loading to ${changes} images`);
        }
    }
    
    return { content: htmlContent, changes };
}

// Phase 5: Async Third-Party Scripts
function asyncThirdParty(htmlContent, filename) {
    let changes = 0;
    
    // Google Analytics should be async
    if (htmlContent.includes('googletagmanager.com') && !htmlContent.includes('async src="https://www.googletagmanager.com')) {
        htmlContent = htmlContent.replace(
            /<script src="https:\/\/www\.googletagmanager\.com/g,
            '<script async src="https://www.googletagmanager.com'
        );
        changes++;
        console.log('  ✅ Made Google Analytics async');
    }
    
    return { content: htmlContent, changes };
}

// Main optimization function
function optimizeFile(filename) {
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`  ⚠️  File not found: ${filename}`);
        return;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    let fileChanges = 0;
    
    // Apply all optimizations
    let result;
    
    result = addResourceHints(content, filename);
    content = result.content;
    fileChanges += result.changes;
    
    result = optimizeFonts(content, filename);
    content = result.content;
    fileChanges += result.changes;
    
    result = deferJavaScript(content, filename);
    content = result.content;
    fileChanges += result.changes;
    
    result = addLazyLoading(content, filename);
    content = result.content;
    fileChanges += result.changes;
    
    result = asyncThirdParty(content, filename);
    content = result.content;
    fileChanges += result.changes;
    
    // Write back if changes made
    if (fileChanges > 0) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`  📝 Saved ${fileChanges} optimizations`);
        totalChanges += fileChanges;
    } else {
        console.log('  ✓ No changes needed');
    }
}

// Run optimization
console.log('🚀 Starting Phase 1 Performance Optimizations\n');
console.log('Optimizations to apply:');
console.log('  1. Resource hints (preconnect, preload)');
console.log('  2. Font optimization (font-display: swap)');
console.log('  3. Defer non-critical JavaScript');
console.log('  4. Lazy loading for images');
console.log('  5. Async third-party scripts\n');

HTML_FILES.forEach(optimizeFile);

console.log('\n==================================');
console.log(`✅ OPTIMIZATION COMPLETE`);
console.log(`Total changes: ${totalChanges}`);
console.log('\n📊 NEXT STEPS:');
console.log('1. Test site locally');
console.log('2. Run PageSpeed Insights');
console.log('3. Verify Core Web Vitals improved');
console.log('4. Push to production');
console.log('\n⚡ Expected improvements:');
console.log('  - LCP: -0.5 to -1.0 seconds');
console.log('  - INP: -50 to -100ms');
console.log('  - CLS: -0.05 to -0.1');
console.log('==================================\n');
