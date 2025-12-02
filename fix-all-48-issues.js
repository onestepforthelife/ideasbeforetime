const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║     AUTOMATED FIX - ALL REMAINING ISSUES                    ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

// Files that need navigation, footer, analytics, watermark
const filesToFix = [
    'job-credits-ui.html',
    'job-credits.html',
    'JOB_TRACKER_TOOL.html',
    'learning-with-kiro.html',
    'Specialty_Chemicals_Market_Report_Merged.html'
];

// Files that need analytics only
const needAnalytics = [
    'common-footer.html',
    'ghar-ghar-complete.html',
    'ghar-ghar-game-enhanced.html'
];

// Files that need watermark only
const needWatermark = [
    'common-footer.html',
    'ghar-ghar-game-enhanced.html'
];

let fixedCount = 0;

// Fix broken links in about.html and library.html
console.log('🔗 Fixing broken innovation links...');
const aboutFile = 'about.html';
if (fs.existsSync(aboutFile)) {
    let content = fs.readFileSync(aboutFile, 'utf8');
    // Fix double "innovations/" in paths
    content = content.replace(/innovations\/innovations\//g, 'innovations/');
    fs.writeFileSync(aboutFile, content, 'utf8');
    console.log('   ✅ Fixed about.html');
    fixedCount++;
}

const libraryFile = 'library.html';
if (fs.existsSync(libraryFile)) {
    let content = fs.readFileSync(libraryFile, 'utf8');
    content = content.replace(/innovations\/innovations\//g, 'innovations/');
    fs.writeFileSync(libraryFile, content, 'utf8');
    console.log('   ✅ Fixed library.html');
    fixedCount++;
}

// Fix files needing full components
console.log('\n🧭 Adding navigation, footer, analytics, watermark...');
filesToFix.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`   ⚠️  ${file} not found`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Add navigation if missing
    if (!content.includes('common-navigation.js')) {
        const navScript = '<script src="common-navigation.js"></script>';
        if (content.includes('</body>')) {
            content = content.replace('</body>', `    ${navScript}\n</body>`);
            modified = true;
        }
    }
    
    // Add footer if missing
    if (!content.includes('common-footer.js')) {
        const footerScript = '<script src="common-footer.js"></script>';
        if (content.includes('</body>')) {
            content = content.replace('</body>', `    ${footerScript}\n</body>`);
            modified = true;
        }
    }
    
    // Add analytics if missing
    if (!content.includes('universal-analytics.js')) {
        const analyticsScript = '<script src="universal-analytics.js"></script>';
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${analyticsScript}\n</head>`);
            modified = true;
        }
    }
    
    // Add watermark if missing
    if (!content.includes('common-watermark.css')) {
        const watermarkLink = '<link rel="stylesheet" href="common-watermark.css">';
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${watermarkLink}\n</head>`);
            modified = true;
        }
    }
    
    // Add title if missing
    if (!content.includes('<title>')) {
        const titleTag = '<title>Ideas Before Time - Innovation & Insights</title>';
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${titleTag}\n</head>`);
            modified = true;
        }
    }
    
    // Add viewport if missing
    if (!content.includes('viewport')) {
        const viewportTag = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${viewportTag}\n</head>`);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`   ✅ Fixed ${file}`);
        fixedCount++;
    }
});

// Fix files needing analytics only
console.log('\n📊 Adding analytics to remaining files...');
needAnalytics.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('universal-analytics.js')) {
        const analyticsScript = '<script src="universal-analytics.js"></script>';
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${analyticsScript}\n</head>`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ Fixed ${file}`);
            fixedCount++;
        }
    }
});

// Fix files needing watermark only
console.log('\n💧 Adding watermark to remaining files...');
needWatermark.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('common-watermark.css')) {
        const watermarkLink = '<link rel="stylesheet" href="common-watermark.css">';
        if (content.includes('</head>')) {
            content = content.replace('</head>', `    ${watermarkLink}\n</head>`);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ Fixed ${file}`);
            fixedCount++;
        }
    }
});

// Fix social-optimizer-index.html unclosed div
console.log('\n🔧 Fixing HTML structure issues...');
const spoIndexFile = 'social-optimizer-index.html';
if (fs.existsSync(spoIndexFile)) {
    let content = fs.readFileSync(spoIndexFile, 'utf8');
    // Count divs
    const openDivs = (content.match(/<div/g) || []).length;
    const closeDivs = (content.match(/<\/div>/g) || []).length;
    
    if (openDivs > closeDivs) {
        // Add missing closing div before </body>
        content = content.replace('</body>', '</div>\n</body>');
        fs.writeFileSync(spoIndexFile, content, 'utf8');
        console.log(`   ✅ Fixed ${spoIndexFile} (added missing </div>)`);
        fixedCount++;
    }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n✅ FIXED ${fixedCount} FILES!\n`);
console.log('Run tests again to verify:');
console.log('  node test-site-consistency.js');
console.log('  node test-content-consistency.js');
console.log('  node test-industry-standards.js\n');
