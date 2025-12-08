const fs = require('fs');
const path = require('path');

console.log('🔍 CHECKING: Alignment, Color Contrast, Header Font Size\n');
console.log('='.repeat(70));

const issues = {
    alignment: [],
    contrast: [],
    headerSize: [],
    total: 0
};

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const fileName = file;
    
    // Check 1: Text alignment issues (left/center/right inconsistency)
    const alignmentPatterns = [
        /text-align:\s*left/gi,
        /text-align:\s*center/gi,
        /text-align:\s*right/gi,
        /text-align:\s*justify/gi
    ];
    
    const alignments = {
        left: (content.match(/text-align:\s*left/gi) || []).length,
        center: (content.match(/text-align:\s*center/gi) || []).length,
        right: (content.match(/text-align:\s*right/gi) || []).length,
        justify: (content.match(/text-align:\s*justify/gi) || []).length
    };
    
    // Flag if mixed alignment (more than 2 types used significantly)
    const alignTypes = Object.values(alignments).filter(v => v > 2).length;
    if (alignTypes > 2) {
        issues.alignment.push({
            file: fileName,
            issue: `Mixed alignment: L:${alignments.left} C:${alignments.center} R:${alignments.right}`,
            severity: 'medium'
        });
        issues.total++;
    }
    
    // Check 2: Color contrast issues (light text on light bg, dark on dark)
    const contrastIssues = [];
    
    // Light colors on light backgrounds
    if (content.includes('color: white') && content.includes('background: white')) {
        contrastIssues.push('White on white');
    }
    if (content.includes('color: #fff') && content.includes('background: #fff')) {
        contrastIssues.push('#fff on #fff');
    }
    
    // Check for low contrast grays
    const lightGrayText = /color:\s*#[cdef][cdef][cdef]/gi.test(content);
    const lightGrayBg = /background:\s*#[cdef][cdef][cdef]/gi.test(content);
    if (lightGrayText && lightGrayBg) {
        contrastIssues.push('Light gray text on light gray background');
    }
    
    if (contrastIssues.length > 0) {
        issues.contrast.push({
            file: fileName,
            issue: contrastIssues.join(', '),
            severity: 'high'
        });
        issues.total++;
    }
    
    // Check 3: Header font size consistency
    const h1Sizes = content.match(/h1\s*{[^}]*font-size:\s*([^;]+)/gi) || [];
    const h2Sizes = content.match(/h2\s*{[^}]*font-size:\s*([^;]+)/gi) || [];
    const h3Sizes = content.match(/h3\s*{[^}]*font-size:\s*([^;]+)/gi) || [];
    
    const headerSizes = {
        h1: h1Sizes.map(s => s.match(/font-size:\s*([^;]+)/i)?.[1]).filter(Boolean),
        h2: h2Sizes.map(s => s.match(/font-size:\s*([^;]+)/i)?.[1]).filter(Boolean),
        h3: h3Sizes.map(s => s.match(/font-size:\s*([^;]+)/i)?.[1]).filter(Boolean)
    };
    
    // Check for very small headers (< 16px or < 1em)
    const smallHeaders = [];
    headerSizes.h1.forEach(size => {
        if (size.includes('px') && parseInt(size) < 24) smallHeaders.push(`H1: ${size}`);
        if (size.includes('em') && parseFloat(size) < 1.5) smallHeaders.push(`H1: ${size}`);
    });
    headerSizes.h2.forEach(size => {
        if (size.includes('px') && parseInt(size) < 20) smallHeaders.push(`H2: ${size}`);
        if (size.includes('em') && parseFloat(size) < 1.25) smallHeaders.push(`H2: ${size}`);
    });
    
    // Check for very large headers (> 60px or > 4em)
    const largeHeaders = [];
    headerSizes.h1.forEach(size => {
        if (size.includes('px') && parseInt(size) > 60) largeHeaders.push(`H1: ${size}`);
        if (size.includes('em') && parseFloat(size) > 4) largeHeaders.push(`H1: ${size}`);
    });
    
    if (smallHeaders.length > 0 || largeHeaders.length > 0) {
        issues.headerSize.push({
            file: fileName,
            issue: [...smallHeaders, ...largeHeaders].join(', '),
            severity: smallHeaders.length > 0 ? 'medium' : 'low'
        });
        issues.total++;
    }
});

// Report results
console.log('\n📊 RESULTS:\n');

console.log('1️⃣  ALIGNMENT ISSUES:');
if (issues.alignment.length === 0) {
    console.log('   ✅ No major alignment issues found');
} else {
    issues.alignment.forEach(item => {
        console.log(`   ⚠️  ${item.file}: ${item.issue}`);
    });
}

console.log('\n2️⃣  COLOR CONTRAST ISSUES:');
if (issues.contrast.length === 0) {
    console.log('   ✅ No contrast issues found');
} else {
    issues.contrast.forEach(item => {
        console.log(`   🚨 ${item.file}: ${item.issue}`);
    });
}

console.log('\n3️⃣  HEADER SIZE ISSUES:');
if (issues.headerSize.length === 0) {
    console.log('   ✅ No header size issues found');
} else {
    issues.headerSize.forEach(item => {
        console.log(`   ⚠️  ${item.file}: ${item.issue}`);
    });
}

console.log('\n' + '='.repeat(70));
console.log(`\n📈 SUMMARY:`);
console.log(`   Total files scanned: ${files.length}`);
console.log(`   Alignment issues: ${issues.alignment.length}`);
console.log(`   Contrast issues: ${issues.contrast.length}`);
console.log(`   Header size issues: ${issues.headerSize.length}`);
console.log(`   Total issues: ${issues.total}`);

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    filesScanned: files.length,
    issues: issues,
    recommendations: []
};

if (issues.alignment.length > 0) {
    report.recommendations.push('Standardize text alignment across pages (prefer left-align for body text)');
}
if (issues.contrast.length > 0) {
    report.recommendations.push('Fix color contrast issues for WCAG AA compliance (4.5:1 ratio minimum)');
}
if (issues.headerSize.length > 0) {
    report.recommendations.push('Standardize header sizes: H1: 32-42px, H2: 24-32px, H3: 20-24px');
}

fs.writeFileSync('ALIGNMENT_CONTRAST_HEADER_REPORT.json', JSON.stringify(report, null, 2));
console.log('\n💾 Detailed report saved: ALIGNMENT_CONTRAST_HEADER_REPORT.json');

process.exit(issues.total > 0 ? 1 : 0);
