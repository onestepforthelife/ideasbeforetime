const fs = require('fs');
const path = require('path');

console.log('🔍 PROACTIVE FINAL CHECK - Finding Issues Before Amit Does');
console.log('═══════════════════════════════════════════════════════════════\n');

const issues = [];
let checksPerformed = 0;

// Check 1: Find any remaining orphaned pages
console.log('CHECK 1: Orphaned Pages (pages without navigation/footer)');
console.log('─────────────────────────────────────────────────────────────');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const orphanedPages = [];

htmlFiles.forEach(file => {
    checksPerformed++;
    const content = fs.readFileSync(file, 'utf8');
    
    const hasNavigation = content.includes('common-navigation.js') || 
                         content.includes('<nav') ||
                         content.includes('navigation');
    const hasFooter = content.includes('common-footer.js') || 
                     content.includes('<footer');
    
    if (!hasNavigation || !hasFooter) {
        orphanedPages.push({
            file,
            missingNav: !hasNavigation,
            missingFooter: !hasFooter
        });
    }
});

if (orphanedPages.length > 0) {
    console.log(`❌ Found ${orphanedPages.length} orphaned pages:`);
    orphanedPages.forEach(p => {
        console.log(`   - ${p.file}`);
        if (p.missingNav) console.log(`     Missing: Navigation`);
        if (p.missingFooter) console.log(`     Missing: Footer`);
    });
    issues.push({
        type: 'Orphaned Pages',
        count: orphanedPages.length,
        files: orphanedPages
    });
} else {
    console.log('✅ No orphaned pages found\n');
}

// Check 2: Pages missing quick access widget
console.log('\nCHECK 2: Quick Access Widget');
console.log('─────────────────────────────────────────────────────────────');

const majorPages = [
    'index.html', 'about.html', 'blog.html', 'market-reports.html',
    'jobs.html', 'tools.html', 'innovations.html', 'cv.html'
];

const missingWidget = [];

majorPages.forEach(file => {
    checksPerformed++;
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (!content.includes('quick-access-widget') && 
            !content.includes('Quick Access')) {
            missingWidget.push(file);
        }
    }
});

if (missingWidget.length > 0) {
    console.log(`❌ ${missingWidget.length} pages missing quick access widget:`);
    missingWidget.forEach(f => console.log(`   - ${f}`));
    issues.push({
        type: 'Missing Widget',
        count: missingWidget.length,
        files: missingWidget
    });
} else {
    console.log('✅ All major pages have quick access widget\n');
}

// Check 3: Reports missing blur system
console.log('\nCHECK 3: Report Blur System');
console.log('─────────────────────────────────────────────────────────────');

const reportFiles = htmlFiles.filter(f => 
    f.includes('Report') || 
    f.includes('report') ||
    f.includes('Market') ||
    f.includes('Analysis')
);

const missingBlur = [];

reportFiles.forEach(file => {
    checksPerformed++;
    const content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('blurred-content') && 
        !content.includes('blur-overlay') &&
        !content.includes('preview-section')) {
        missingBlur.push(file);
    }
});

if (missingBlur.length > 0) {
    console.log(`❌ ${missingBlur.length} reports missing blur system:`);
    missingBlur.forEach(f => console.log(`   - ${f}`));
    issues.push({
        type: 'Missing Blur',
        count: missingBlur.length,
        files: missingBlur
    });
} else {
    console.log('✅ All reports have blur system\n');
}

// Check 4: Inconsistent max-width
console.log('\nCHECK 4: Max-Width Consistency (should be 1400px)');
console.log('─────────────────────────────────────────────────────────────');

const inconsistentWidth = [];

htmlFiles.slice(0, 20).forEach(file => {
    checksPerformed++;
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for different max-widths
    if (content.includes('max-width: 900px') || 
        content.includes('max-width: 1200px') ||
        content.includes('max-width:900px') ||
        content.includes('max-width:1200px')) {
        inconsistentWidth.push(file);
    }
});

if (inconsistentWidth.length > 0) {
    console.log(`⚠️  ${inconsistentWidth.length} pages with inconsistent width:`);
    inconsistentWidth.forEach(f => console.log(`   - ${f}`));
    issues.push({
        type: 'Inconsistent Width',
        count: inconsistentWidth.length,
        files: inconsistentWidth
    });
} else {
    console.log('✅ Width consistent across pages\n');
}

// Check 5: Missing sitemap entries
console.log('\nCHECK 5: Sitemap Completeness');
console.log('─────────────────────────────────────────────────────────────');

checksPerformed++;
if (fs.existsSync('sitemap.xml')) {
    const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
    const missingFromSitemap = [];
    
    htmlFiles.slice(0, 30).forEach(file => {
        if (!sitemap.includes(file)) {
            missingFromSitemap.push(file);
        }
    });
    
    if (missingFromSitemap.length > 0) {
        console.log(`⚠️  ${missingFromSitemap.length} pages missing from sitemap:`);
        missingFromSitemap.slice(0, 10).forEach(f => console.log(`   - ${f}`));
        if (missingFromSitemap.length > 10) {
            console.log(`   ... and ${missingFromSitemap.length - 10} more`);
        }
        issues.push({
            type: 'Missing from Sitemap',
            count: missingFromSitemap.length,
            files: missingFromSitemap
        });
    } else {
        console.log('✅ Sitemap complete\n');
    }
} else {
    console.log('❌ sitemap.xml not found!\n');
    issues.push({
        type: 'Missing Sitemap',
        count: 1,
        files: ['sitemap.xml']
    });
}

// Summary
console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📊 PROACTIVE CHECK SUMMARY');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Total Checks Performed: ${checksPerformed}`);
console.log(`Issues Found: ${issues.length}\n`);

if (issues.length === 0) {
    console.log('✅ NO ISSUES FOUND - Site is clean!\n');
} else {
    console.log('❌ ISSUES FOUND:\n');
    issues.forEach((issue, i) => {
        console.log(`${i + 1}. ${issue.type}: ${issue.count} items`);
    });
    console.log('\n');
}

// Save results
const results = {
    timestamp: new Date().toISOString(),
    checksPerformed,
    issuesFound: issues.length,
    issues: issues,
    status: issues.length === 0 ? 'CLEAN' : 'NEEDS_FIXES'
};

fs.writeFileSync('PROACTIVE_CHECK_RESULTS.json', JSON.stringify(results, null, 2));

console.log('═══════════════════════════════════════════════════════════════');
console.log('Results saved to: PROACTIVE_CHECK_RESULTS.json');
console.log('═══════════════════════════════════════════════════════════════\n');

if (issues.length > 0) {
    console.log('🔧 NEXT: Run fix-all-proactive-issues.js to fix these issues\n');
}
