const fs = require('fs');

console.log('🔍 CHECKING: Real Typography & Alignment Issues\n');
console.log('='.repeat(70));

const issues = {
    smallText: [],
    leftAligned: [],
    total: 0
};

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check 1: Small body text (< 14px or < 0.875em)
    const bodyFontSizes = content.match(/body\s*{[^}]*font-size:\s*([^;]+)/gi) || [];
    bodyFontSizes.forEach(match => {
        const size = match.match(/font-size:\s*([^;]+)/i)?.[1];
        if (size) {
            const px = parseInt(size);
            const em = parseFloat(size);
            if ((size.includes('px') && px < 14) || (size.includes('em') && em < 0.875)) {
                issues.smallText.push({
                    file: file,
                    element: 'body',
                    size: size,
                    issue: 'Text too small (< 14px)'
                });
                issues.total++;
            }
        }
    });
    
    // Check 2: Small paragraph text
    const pFontSizes = content.match(/p\s*{[^}]*font-size:\s*([^;]+)/gi) || [];
    pFontSizes.forEach(match => {
        const size = match.match(/font-size:\s*([^;]+)/i)?.[1];
        if (size) {
            const px = parseInt(size);
            if (size.includes('px') && px < 14) {
                issues.smallText.push({
                    file: file,
                    element: 'p',
                    size: size,
                    issue: 'Paragraph text too small (< 14px)'
                });
                issues.total++;
            }
        }
    });
    
    // Check 3: Headers that should be centered but are left-aligned
    // Look for hero sections, titles, CTAs that are left-aligned
    const heroLeftAligned = /\.hero\s*{[^}]*text-align:\s*left/gi.test(content);
    if (heroLeftAligned) {
        issues.leftAligned.push({
            file: file,
            element: '.hero',
            issue: 'Hero section left-aligned (should be center)'
        });
        issues.total++;
    }
    
    // Check for h1 in hero that's left-aligned
    const h1LeftInHero = /\.hero\s+h1\s*{[^}]*text-align:\s*left/gi.test(content);
    if (h1LeftInHero) {
        issues.leftAligned.push({
            file: file,
            element: '.hero h1',
            issue: 'Main heading left-aligned (should be center)'
        });
        issues.total++;
    }
    
    // Check for header tag with left alignment
    const headerLeftAligned = /header\s*{[^}]*text-align:\s*left/gi.test(content);
    if (headerLeftAligned) {
        issues.leftAligned.push({
            file: file,
            element: 'header',
            issue: 'Header left-aligned (should be center)'
        });
        issues.total++;
    }
});

// Report
console.log('\n1️⃣  SMALL TEXT ISSUES:');
if (issues.smallText.length === 0) {
    console.log('   ✅ No small text issues found');
} else {
    const grouped = {};
    issues.smallText.forEach(item => {
        if (!grouped[item.file]) grouped[item.file] = [];
        grouped[item.file].push(`${item.element}: ${item.size}`);
    });
    Object.keys(grouped).forEach(file => {
        console.log(`   ⚠️  ${file}: ${grouped[file].join(', ')}`);
    });
}

console.log('\n2️⃣  LEFT ALIGNMENT ISSUES (Should be centered):');
if (issues.leftAligned.length === 0) {
    console.log('   ✅ No alignment issues found');
} else {
    const grouped = {};
    issues.leftAligned.forEach(item => {
        if (!grouped[item.file]) grouped[item.file] = [];
        grouped[item.file].push(item.element);
    });
    Object.keys(grouped).forEach(file => {
        console.log(`   ⚠️  ${file}: ${grouped[file].join(', ')}`);
    });
}

console.log('\n' + '='.repeat(70));
console.log(`\n📈 SUMMARY:`);
console.log(`   Files scanned: ${files.length}`);
console.log(`   Small text issues: ${issues.smallText.length}`);
console.log(`   Left alignment issues: ${issues.leftAligned.length}`);
console.log(`   Total issues: ${issues.total}`);

// Save report
fs.writeFileSync('TYPOGRAPHY_ALIGNMENT_ISSUES.json', JSON.stringify(issues, null, 2));
console.log('\n💾 Report saved: TYPOGRAPHY_ALIGNMENT_ISSUES.json');

process.exit(issues.total > 0 ? 1 : 0);
