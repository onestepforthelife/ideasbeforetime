const fs = require('fs');
const path = require('path');

console.log('🔧 FIXING ALL MARKET REPORT ISSUES...\n');

const fixes = {
    fixed: 0,
    errors: []
};

// Files to fix
const filesToFix = [
    'Poloxamer_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'nickel-esg-report.html'
];

filesToFix.forEach(file => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`⏭️  Skipping ${file} (not found)`);
            return;
        }

        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        // FIX 1: Remove password protection
        if (content.includes('passwordOverlay') || content.includes('password-overlay')) {
            console.log(`🔓 Removing password protection from ${file}`);
            
            // Remove password overlay div
            content = content.replace(/<div[^>]*id=["']password[Oo]verlay["'][^>]*>[\s\S]*?<\/div>\s*<\/div>/g, '');
            
            // Remove password script
            content = content.replace(/<script>[\s\S]*?password[\s\S]*?<\/script>/gi, '');
            
            // Remove display:none from main content
            content = content.replace(/style=["'][^"']*display:\s*none[^"']*["']/gi, '');
            
            changed = true;
        }

        // FIX 2: Replace custom header with common-navigation.js
        if (content.includes('<header class="site-header">') && !content.includes('common-navigation.js')) {
            console.log(`🔄 Replacing custom header with common-navigation in ${file}`);
            
            // Remove custom header
            content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/g, '');
            
            // Add common-navigation script if not present
            if (!content.includes('common-navigation.js')) {
                content = content.replace('</body>', '    <script src="common-navigation.js"></script>\n</body>');
            }
            
            changed = true;
        }

        // FIX 3: Replace inline footer with common-footer.js
        if (content.includes('<footer') && content.includes('Report prepared by')) {
            console.log(`🔄 Replacing inline footer with common-footer in ${file}`);
            
            // Remove inline footer
            content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/g, '');
            
            // Add common-footer script if not present
            if (!content.includes('common-footer.js')) {
                content = content.replace('</body>', '    <script src="common-footer.js"></script>\n</body>');
            }
            
            changed = true;
        }

        // FIX 4: Fix navigation links
        const linkFixes = {
            'href="library.html"': 'href="index.html"',
            'href="innovations/': 'href="innovations/',  // Already correct
            'Back to Innovation Library': 'Back to Home',
            'Back to Library': 'Back to Home'
        };

        Object.entries(linkFixes).forEach(([oldLink, newLink]) => {
            if (content.includes(oldLink) && oldLink !== newLink) {
                console.log(`🔗 Fixing link: ${oldLink} → ${newLink} in ${file}`);
                content = content.replace(new RegExp(oldLink, 'g'), newLink);
                changed = true;
            }
        });

        // FIX 5: Remove excessive white space at bottom
        content = content.replace(/(<\/body>\s*<\/html>)\s+$/g, '$1\n');

        // FIX 6: Ensure common files are loaded
        const requiredScripts = [
            'common-navigation.js',
            'common-footer.js',
            'universal-analytics.js'
        ];

        requiredScripts.forEach(script => {
            if (!content.includes(script)) {
                console.log(`➕ Adding ${script} to ${file}`);
                content = content.replace('</body>', `    <script src="${script}"></script>\n</body>`);
                changed = true;
            }
        });

        // FIX 7: Ensure common CSS files
        const requiredCSS = [
            'common-watermark.css',
            'common-footer.css'
        ];

        requiredCSS.forEach(css => {
            if (!content.includes(css)) {
                console.log(`➕ Adding ${css} to ${file}`);
                content = content.replace('</head>', `    <link rel="stylesheet" href="${css}">\n</head>`);
                changed = true;
            }
        });

        if (changed) {
            fs.writeFileSync(file, content, 'utf8');
            fixes.fixed++;
            console.log(`✅ Fixed ${file}\n`);
        } else {
            console.log(`✓ ${file} already correct\n`);
        }

    } catch (error) {
        fixes.errors.push({ file, error: error.message });
        console.log(`❌ Error fixing ${file}: ${error.message}\n`);
    }
});

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Files fixed: ${fixes.fixed}`);
console.log(`❌ Errors: ${fixes.errors.length}`);

if (fixes.errors.length > 0) {
    console.log('\nErrors:');
    fixes.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
}

console.log('\n✅ ALL MARKET REPORTS FIXED!');
console.log('\nFixes applied:');
console.log('  1. ✅ Removed password protection');
console.log('  2. ✅ Added common-navigation.js');
console.log('  3. ✅ Added common-footer.js');
console.log('  4. ✅ Fixed navigation links (library.html → index.html)');
console.log('  5. ✅ Removed white space at bottom');
console.log('  6. ✅ Added all required scripts');
console.log('  7. ✅ Added all required CSS files');
