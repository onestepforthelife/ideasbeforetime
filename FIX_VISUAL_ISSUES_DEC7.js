/**
 * FIX VISUAL ISSUES - December 7, 2025
 * Fixes: Font visibility, footer missing, header cluttered, background colors
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let fixedCount = 0;
const issues = {
    fontContrast: [],
    missingFooter: [],
    clutterHeader: [],
    backgroundIssues: []
};

console.log('🔍 Checking visual issues...\n');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Issue 1: Fix font contrast (white text on light background)
    if (content.includes('color: white') || content.includes('color: #fff')) {
        // Check if background is light
        if (content.includes('background: linear-gradient') || 
            content.includes('background-color: #5a6c7d') ||
            content.includes('background-color: #8b9aa7')) {
            
            // Change to dark text on light background OR ensure dark background
            content = content.replace(
                /color:\s*white/g,
                'color: #2c3e50'
            );
            content = content.replace(
                /color:\s*#fff/g,
                'color: #2c3e50'
            );
            
            issues.fontContrast.push(file);
            modified = true;
        }
    }
    
    // Issue 2: Check for missing footer
    if (!content.includes('common-footer.js') && 
        !content.includes('<footer') &&
        !file.includes('test-') &&
        !file.includes('preview')) {
        
        // Add footer before </body>
        if (content.includes('</body>')) {
            content = content.replace(
                '</body>',
                '    <script src="common-footer.js"></script>\n</body>'
            );
            issues.missingFooter.push(file);
            modified = true;
        }
    }
    
    // Issue 3: Fix header clutter (reduce navigation items)
    if (content.includes('<nav') && content.includes('<a href=')) {
        // Count navigation links
        const navLinks = (content.match(/<a href="[^"]+\.html">/g) || []).length;
        if (navLinks > 10) {
            issues.clutterHeader.push(`${file} (${navLinks} links)`);
            // Note: Manual fix needed - can't auto-reduce without knowing which to keep
        }
    }
    
    // Issue 4: Fix background color contrast
    // Change light blue backgrounds to darker or white
    if (content.includes('background-color: #5a6c7d') ||
        content.includes('background-color: #8b9aa7') ||
        content.includes('background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)')) {
        
        // Ensure text is white on dark backgrounds
        content = content.replace(
            /background-color:\s*#5a6c7d/g,
            'background-color: #2c3e50'
        );
        content = content.replace(
            /background-color:\s*#8b9aa7/g,
            'background-color: #34495e'
        );
        
        // Ensure white text on gradient backgrounds
        if (content.includes('linear-gradient')) {
            content = content.replace(
                /color:\s*#2c3e50/g,
                'color: white'
            );
        }
        
        issues.backgroundIssues.push(file);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        fixedCount++;
    }
});

// Report
console.log('📊 VISUAL ISSUES REPORT:\n');
console.log(`✅ Files fixed: ${fixedCount}\n`);

if (issues.fontContrast.length > 0) {
    console.log(`🎨 Font Contrast Fixed (${issues.fontContrast.length}):`);
    issues.fontContrast.forEach(f => console.log(`   - ${f}`));
    console.log('');
}

if (issues.missingFooter.length > 0) {
    console.log(`📄 Footer Added (${issues.missingFooter.length}):`);
    issues.missingFooter.forEach(f => console.log(`   - ${f}`));
    console.log('');
}

if (issues.clutterHeader.length > 0) {
    console.log(`⚠️  Header Clutter Found (${issues.clutterHeader.length}):`);
    console.log('   Manual fix needed - too many navigation links:');
    issues.clutterHeader.forEach(f => console.log(`   - ${f}`));
    console.log('');
}

if (issues.backgroundIssues.length > 0) {
    console.log(`🎨 Background Colors Fixed (${issues.backgroundIssues.length}):`);
    issues.backgroundIssues.forEach(f => console.log(`   - ${f}`));
    console.log('');
}

// Save report
const report = {
    timestamp: new Date().toISOString(),
    filesFixed: fixedCount,
    issues: issues,
    summary: {
        fontContrast: issues.fontContrast.length,
        missingFooter: issues.missingFooter.length,
        clutterHeader: issues.clutterHeader.length,
        backgroundIssues: issues.backgroundIssues.length
    }
};

fs.writeFileSync('VISUAL_ISSUES_REPORT_DEC7.json', JSON.stringify(report, null, 2));

console.log('✅ Report saved: VISUAL_ISSUES_REPORT_DEC7.json');
console.log('\n🎯 NEXT STEPS:');
console.log('1. Review fixed files');
console.log('2. Manually reduce navigation items (header clutter)');
console.log('3. Test on live site');
console.log('4. Push changes');
