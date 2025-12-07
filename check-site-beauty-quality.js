/**
 * COMPREHENSIVE SITE BEAUTY & QUALITY CHECKER
 * Checks: Colors, Headers, Links, Formatting, Consistency
 * Run: node check-site-beauty-quality.js
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 COMPREHENSIVE SITE BEAUTY & QUALITY CHECKER\n');
console.log('Checking: Colors, Headers, Links, Formatting, Consistency\n');
console.log('='.repeat(70) + '\n');

// Get all HTML files
function getAllHtmlFiles(dir = '.') {
    let results = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            if (!file.startsWith('.') && !file.startsWith('node_modules') && !file.startsWith('backup')) {
                results = results.concat(getAllHtmlFiles(filePath));
            }
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    }
    
    return results;
}

const htmlFiles = getAllHtmlFiles();
console.log(`📁 Found ${htmlFiles.length} HTML files\n`);

// Results storage
const results = {
    colors: new Set(),
    fonts: new Set(),
    headerIssues: [],
    linkIssues: [],
    formatIssues: [],
    consistencyIssues: [],
    missingElements: []
};

// Check each file
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    
    // 1. CHECK COLORS
    // Hex colors
    const hexColors = content.match(/#[0-9A-Fa-f]{3,6}/g) || [];
    hexColors.forEach(color => results.colors.add(color.toLowerCase()));
    
    // RGB colors
    const rgbColors = content.match(/rgb\([^)]+\)/g) || [];
    rgbColors.forEach(color => results.colors.add(color));
    
    // 2. CHECK FONTS
    const fontMatches = content.match(/font-family:\s*[^;]+/gi) || [];
    fontMatches.forEach(font => {
        const fontName = font.replace(/font-family:\s*/i, '').trim();
        results.fonts.add(fontName);
    });
    
    // 3. CHECK HEADER ALIGNMENT
    const headerStyles = content.match(/<header[^>]*style="[^"]*"/gi) || [];
    headerStyles.forEach(style => {
        if (style.includes('text-align') && !style.includes('text-align: left') && !style.includes('text-align:left')) {
            results.headerIssues.push({
                file: file,
                issue: 'Header not left-aligned',
                found: style.substring(0, 100)
            });
        }
    });
    
    // Check for centered headers in CSS
    if (content.includes('header') && content.includes('text-align: center')) {
        results.headerIssues.push({
            file: file,
            issue: 'Header has center alignment in CSS',
            found: 'text-align: center found in header styles'
        });
    }
    
    // 4. CHECK LINKS
    const links = content.match(/href="[^"]+"/g) || [];
    links.forEach(link => {
        const url = link.match(/href="([^"]+)"/)[1];
        
        // Check for broken internal links
        if (url.startsWith('/') || (!url.startsWith('http') && !url.startsWith('#') && !url.startsWith('mailto'))) {
            const linkedFile = url.replace(/^\//, '');
            if (linkedFile && !linkedFile.includes('?') && !linkedFile.includes('#')) {
                if (!fs.existsSync(linkedFile)) {
                    results.linkIssues.push({
                        file: file,
                        issue: 'Broken internal link',
                        link: url
                    });
                }
            }
        }
        
        // Check for old domain
        if (url.includes('ideasbeforetime.pages.dev')) {
            results.linkIssues.push({
                file: file,
                issue: 'Old domain in link',
                link: url
            });
        }
    });
    
    // 5. CHECK FORMATTING
    // Check for inline styles (should use CSS classes)
    const inlineStyles = content.match(/style="[^"]{100,}"/g) || [];
    if (inlineStyles.length > 5) {
        results.formatIssues.push({
            file: file,
            issue: `Too many inline styles (${inlineStyles.length})`,
            suggestion: 'Move to CSS classes'
        });
    }
    
    // Check for missing meta viewport
    if (!content.includes('viewport')) {
        results.formatIssues.push({
            file: file,
            issue: 'Missing viewport meta tag',
            suggestion: 'Add: <meta name="viewport" content="width=device-width, initial-scale=1.0">'
        });
    }
    
    // 6. CHECK CONSISTENCY
    // Check for common navigation
    const hasCommonNav = content.includes('common-navigation.js');
    const hasCommonFooter = content.includes('common-footer.js');
    
    if (!hasCommonNav && !file.includes('test-') && !file.includes('preview')) {
        results.missingElements.push({
            file: file,
            missing: 'common-navigation.js'
        });
    }
    
    if (!hasCommonFooter && !file.includes('test-') && !file.includes('preview')) {
        results.missingElements.push({
            file: file,
            missing: 'common-footer.js'
        });
    }
    
    // Check for analytics
    if (!content.includes('universal-analytics.js') && !file.includes('test-')) {
        results.missingElements.push({
            file: file,
            missing: 'universal-analytics.js'
        });
    }
});

// DISPLAY RESULTS
console.log('📊 RESULTS:\n');

// 1. COLORS
console.log('🎨 COLORS USED (' + results.colors.size + ' unique):');
console.log('-'.repeat(70));
const colorArray = Array.from(results.colors).sort();
colorArray.forEach(color => {
    console.log(`   ${color}`);
});
console.log();

// 2. FONTS
console.log('🔤 FONTS USED (' + results.fonts.size + ' unique):');
console.log('-'.repeat(70));
Array.from(results.fonts).forEach(font => {
    console.log(`   ${font}`);
});
console.log();

// 3. HEADER ISSUES
if (results.headerIssues.length > 0) {
    console.log('⚠️  HEADER ALIGNMENT ISSUES (' + results.headerIssues.length + '):');
    console.log('-'.repeat(70));
    results.headerIssues.forEach(issue => {
        console.log(`   ❌ ${issue.file}`);
        console.log(`      Issue: ${issue.issue}`);
        console.log(`      Found: ${issue.found}`);
        console.log();
    });
} else {
    console.log('✅ HEADER ALIGNMENT: All headers properly aligned\n');
}

// 4. LINK ISSUES
if (results.linkIssues.length > 0) {
    console.log('⚠️  LINK ISSUES (' + results.linkIssues.length + '):');
    console.log('-'.repeat(70));
    results.linkIssues.forEach(issue => {
        console.log(`   ❌ ${issue.file}`);
        console.log(`      Issue: ${issue.issue}`);
        console.log(`      Link: ${issue.link}`);
        console.log();
    });
} else {
    console.log('✅ LINKS: All links valid\n');
}

// 5. FORMAT ISSUES
if (results.formatIssues.length > 0) {
    console.log('⚠️  FORMATTING ISSUES (' + results.formatIssues.length + '):');
    console.log('-'.repeat(70));
    results.formatIssues.forEach(issue => {
        console.log(`   ❌ ${issue.file}`);
        console.log(`      Issue: ${issue.issue}`);
        console.log(`      Suggestion: ${issue.suggestion}`);
        console.log();
    });
} else {
    console.log('✅ FORMATTING: All pages properly formatted\n');
}

// 6. MISSING ELEMENTS
if (results.missingElements.length > 0) {
    console.log('⚠️  MISSING ELEMENTS (' + results.missingElements.length + '):');
    console.log('-'.repeat(70));
    const grouped = {};
    results.missingElements.forEach(item => {
        if (!grouped[item.missing]) grouped[item.missing] = [];
        grouped[item.missing].push(item.file);
    });
    
    Object.keys(grouped).forEach(element => {
        console.log(`   Missing: ${element}`);
        console.log(`   Files (${grouped[element].length}):`);
        grouped[element].forEach(file => {
            console.log(`      - ${file}`);
        });
        console.log();
    });
} else {
    console.log('✅ CONSISTENCY: All pages have required elements\n');
}

// SUMMARY
console.log('='.repeat(70));
console.log('📈 SUMMARY:\n');
console.log(`   Total files checked: ${htmlFiles.length}`);
console.log(`   Unique colors: ${results.colors.size}`);
console.log(`   Unique fonts: ${results.fonts.size}`);
console.log(`   Header issues: ${results.headerIssues.length}`);
console.log(`   Link issues: ${results.linkIssues.length}`);
console.log(`   Format issues: ${results.formatIssues.length}`);
console.log(`   Missing elements: ${results.missingElements.length}`);
console.log();

const totalIssues = results.headerIssues.length + results.linkIssues.length + 
                    results.formatIssues.length + results.missingElements.length;

if (totalIssues === 0) {
    console.log('🎉 PERFECT! No issues found. Site quality is excellent!\n');
} else {
    console.log(`⚠️  Found ${totalIssues} issues that need attention.\n`);
}

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    filesChecked: htmlFiles.length,
    colors: Array.from(results.colors),
    fonts: Array.from(results.fonts),
    headerIssues: results.headerIssues,
    linkIssues: results.linkIssues,
    formatIssues: results.formatIssues,
    missingElements: results.missingElements,
    totalIssues: totalIssues
};

fs.writeFileSync('SITE_BEAUTY_QUALITY_REPORT.json', JSON.stringify(report, null, 2));
console.log('📄 Detailed report saved to: SITE_BEAUTY_QUALITY_REPORT.json\n');
