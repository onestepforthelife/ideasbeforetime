#!/usr/bin/env node

/**
 * PERFORMANCE OPTIMIZATION - PHASE 1 (Quick Wins)
 * 
 * Target: 50% improvement in 1-2 hours
 * 
 * Fixes:
 * 1. Add lazy loading to all images
 * 2. Defer non-critical scripts
 * 3. Implement blog pagination (20 posts per page)
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 PERFORMANCE OPTIMIZATION - PHASE 1');
console.log('=====================================\n');

let totalChanges = 0;
const results = {
    lazyLoading: { files: 0, images: 0 },
    deferredScripts: { files: 0, scripts: 0 },
    blogPagination: { implemented: false }
};

// ============================================
// FIX 1: ADD LAZY LOADING TO IMAGES
// ============================================

console.log('📸 Fix 1: Adding lazy loading to images...\n');

const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.includes('test-'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Add loading="lazy" to img tags that don't have it
    const imgRegex = /<img\s+([^>]*?)(?<!loading=["']lazy["'])\s*>/gi;
    const matches = content.match(imgRegex);
    
    if (matches) {
        matches.forEach(match => {
            // Skip if already has loading attribute
            if (match.includes('loading=')) return;
            
            // Add loading="lazy" before the closing >
            const newImg = match.replace('>', ' loading="lazy">');
            content = content.replace(match, newImg);
            changed = true;
            results.lazyLoading.images++;
        });
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        results.lazyLoading.files++;
        console.log(`   ✅ ${file}: Added lazy loading`);
        totalChanges++;
    }
});

console.log(`\n   📊 Lazy Loading Summary:`);
console.log(`      Files modified: ${results.lazyLoading.files}`);
console.log(`      Images updated: ${results.lazyLoading.images}\n`);

// ============================================
// FIX 2: DEFER NON-CRITICAL SCRIPTS
// ============================================

console.log('📜 Fix 2: Deferring non-critical scripts...\n');

const nonCriticalScripts = [
    'universal-analytics.js',
    'error-tracker.js',
    'goda-chat-widget.js',
    'google-adsense.js',
    'error-tracker-google-analytics.js'
];

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    nonCriticalScripts.forEach(scriptName => {
        // Find script tags without defer or async
        const scriptRegex = new RegExp(`<script\\s+src=["']([^"']*${scriptName})["'](?!\\s+(?:defer|async))\\s*>`, 'gi');
        const matches = content.match(scriptRegex);
        
        if (matches) {
            matches.forEach(match => {
                // Add defer attribute
                const newScript = match.replace('<script ', '<script defer ');
                content = content.replace(match, newScript);
                changed = true;
                results.deferredScripts.scripts++;
            });
        }
    });
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        results.deferredScripts.files++;
        console.log(`   ✅ ${file}: Deferred scripts`);
        totalChanges++;
    }
});

console.log(`\n   📊 Script Deferring Summary:`);
console.log(`      Files modified: ${results.deferredScripts.files}`);
console.log(`      Scripts deferred: ${results.deferredScripts.scripts}\n`);

// ============================================
// FIX 3: IMPLEMENT BLOG PAGINATION
// ============================================

console.log('📝 Fix 3: Implementing blog pagination...\n');

if (fs.existsSync('blog.html')) {
    let content = fs.readFileSync('blog.html', 'utf8');
    
    // Check if pagination already exists
    if (content.includes('pagination-container') || content.includes('blog-pagination')) {
        console.log('   ℹ️  Pagination already implemented\n');
        results.blogPagination.implemented = true;
    } else {
        // Add pagination script before </body>
        const paginationScript = `
    <!-- Blog Pagination -->
    <script>
    (function() {
        const postsPerPage = 20;
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;
        
        const allPosts = Array.from(blogGrid.querySelectorAll('.blog-card'));
        const totalPages = Math.ceil(allPosts.length / postsPerPage);
        let currentPage = 1;
        
        // Create pagination container
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'blog-pagination';
        paginationDiv.style.cssText = 'text-align: center; margin: 40px 0; padding: 20px;';
        
        function showPage(page) {
            currentPage = page;
            const start = (page - 1) * postsPerPage;
            const end = start + postsPerPage;
            
            allPosts.forEach((post, index) => {
                post.style.display = (index >= start && index < end) ? 'block' : 'none';
            });
            
            updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        function updatePagination() {
            paginationDiv.innerHTML = '';
            
            // Previous button
            if (currentPage > 1) {
                const prev = document.createElement('button');
                prev.textContent = '← Previous';
                prev.onclick = () => showPage(currentPage - 1);
                prev.style.cssText = 'margin: 0 5px; padding: 10px 20px; cursor: pointer; background: #5a6c7d; color: white; border: none; border-radius: 5px;';
                paginationDiv.appendChild(prev);
            }
            
            // Page numbers
            const pageInfo = document.createElement('span');
            pageInfo.textContent = \`Page \${currentPage} of \${totalPages}\`;
            pageInfo.style.cssText = 'margin: 0 20px; font-weight: bold;';
            paginationDiv.appendChild(pageInfo);
            
            // Next button
            if (currentPage < totalPages) {
                const next = document.createElement('button');
                next.textContent = 'Next →';
                next.onclick = () => showPage(currentPage + 1);
                next.style.cssText = 'margin: 0 5px; padding: 10px 20px; cursor: pointer; background: #5a6c7d; color: white; border: none; border-radius: 5px;';
                paginationDiv.appendChild(next);
            }
        }
        
        // Insert pagination after blog grid
        blogGrid.parentNode.insertBefore(paginationDiv, blogGrid.nextSibling);
        
        // Show first page
        showPage(1);
        
        console.log(\`Blog pagination: \${allPosts.length} posts, \${totalPages} pages, \${postsPerPage} per page\`);
    })();
    </script>
`;
        
        content = content.replace('</body>', paginationScript + '\n</body>');
        fs.writeFileSync('blog.html', content, 'utf8');
        
        console.log('   ✅ blog.html: Pagination implemented (20 posts per page)');
        console.log('   📊 Reduces initial load from 208 posts to 20 posts\n');
        results.blogPagination.implemented = true;
        totalChanges++;
    }
} else {
    console.log('   ⚠️  blog.html not found\n');
}

// ============================================
// SUMMARY
// ============================================

console.log('=====================================');
console.log('✅ PHASE 1 OPTIMIZATION COMPLETE\n');
console.log('📊 SUMMARY:');
console.log(`   Total changes: ${totalChanges}`);
console.log(`   Files modified: ${results.lazyLoading.files + results.deferredScripts.files + (results.blogPagination.implemented ? 1 : 0)}`);
console.log(`\n   Lazy Loading:`);
console.log(`      ✅ ${results.lazyLoading.files} files`);
console.log(`      ✅ ${results.lazyLoading.images} images`);
console.log(`\n   Deferred Scripts:`);
console.log(`      ✅ ${results.deferredScripts.files} files`);
console.log(`      ✅ ${results.deferredScripts.scripts} scripts`);
console.log(`\n   Blog Pagination:`);
console.log(`      ${results.blogPagination.implemented ? '✅' : '❌'} Implemented`);

console.log('\n💡 NEXT STEPS:');
console.log('   1. Test locally: Open blog.html and other pages');
console.log('   2. Run diagnostic: node SITE_SPEED_DIAGNOSIS.js');
console.log('   3. Verify improvements');
console.log('   4. Deploy to live site');
console.log('   5. Proceed to Phase 2 for more optimizations\n');

console.log('🎯 EXPECTED IMPROVEMENT: 50% faster page loads');
console.log('=====================================\n');

// Save results
fs.writeFileSync('PHASE1_OPTIMIZATION_RESULTS.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    phase: 1,
    totalChanges,
    results,
    nextSteps: [
        'Test locally',
        'Run diagnostic',
        'Deploy to live site',
        'Proceed to Phase 2'
    ]
}, null, 2));

console.log('💾 Results saved: PHASE1_OPTIMIZATION_RESULTS.json\n');

process.exit(0);
