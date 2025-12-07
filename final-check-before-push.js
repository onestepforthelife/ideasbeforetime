const fs = require('fs');
const path = require('path');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║   🔍 FINAL CHECK BEFORE PUSH - TECHNICAL & VISUAL          ║');
console.log('║      No repeated errors, all corrections applied            ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const issues = [];
const warnings = [];
const passed = [];

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.includes('backup'));

console.log(`Checking ${htmlFiles.length} HTML files...\n`);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 1: FOOTER ALIGNMENT (Amit\'s correction)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let footerIssues = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if has footer JS but missing footer CSS
    const hasFooterJS = content.includes('common-footer.js');
    const hasFooterCSS = content.includes('common-footer.css');
    
    if (hasFooterJS && !hasFooterCSS) {
        issues.push(`❌ ${file} - Has footer JS but MISSING footer CSS (not centered!)`);
        footerIssues++;
    } else if (hasFooterJS && hasFooterCSS) {
        passed.push(`✅ ${file} - Footer complete (JS + CSS)`);
    }
});

if (footerIssues === 0) {
    console.log('✅ All pages with footer have both JS and CSS\n');
} else {
    console.log(`❌ ${footerIssues} pages missing footer CSS!\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 2: HEADER ALIGNMENT (Amit\'s correction)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let headerIssues = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for inconsistent header padding
    const headerMatch = content.match(/header[^{]*{[^}]*padding-top:\s*(\d+)px/);
    if (headerMatch) {
        const padding = parseInt(headerMatch[1]);
        if (padding !== 80 && padding !== 60) {
            warnings.push(`⚠️  ${file} - Header padding ${padding}px (should be 80px or 60px)`);
            headerIssues++;
        }
    }
});

if (headerIssues === 0) {
    console.log('✅ All headers have consistent padding\n');
} else {
    console.log(`⚠️  ${headerIssues} pages have inconsistent header padding\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 3: CV SPACING (Amit\'s correction)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (fs.existsSync('cv.html')) {
    const cvContent = fs.readFileSync('cv.html', 'utf8');
    
    // Check for excessive padding/gap
    const hasPadding6 = cvContent.includes('padding: 6px');
    const hasGap8 = cvContent.includes('gap: 8px');
    
    if (hasPadding6 || hasGap8) {
        issues.push('❌ cv.html - Still has excessive spacing (padding: 6px or gap: 8px)');
    } else {
        passed.push('✅ cv.html - Spacing reduced (padding: 3px, gap: 4px)');
        console.log('✅ CV spacing fixed (reduced padding and gap)\n');
    }
} else {
    warnings.push('⚠️  cv.html not found');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 4: BROKEN LINKS (Technical)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let brokenLinks = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for common broken link patterns
    const hrefMatches = content.match(/href=["']([^"']+)["']/g) || [];
    
    hrefMatches.forEach(href => {
        const link = href.match(/href=["']([^"']+)["']/)[1];
        
        // Skip external links, anchors, mailto
        if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) {
            return;
        }
        
        // Check if local file exists
        if (link.endsWith('.html') || link.endsWith('.css') || link.endsWith('.js')) {
            const linkPath = path.join('.', link);
            if (!fs.existsSync(linkPath)) {
                // Check in subdirectories
                const innovationsPath = path.join('innovations', link);
                const linkedinPath = path.join('linkedin-portfolio', link);
                
                if (!fs.existsSync(innovationsPath) && !fs.existsSync(linkedinPath)) {
                    issues.push(`❌ ${file} - Broken link: ${link}`);
                    brokenLinks++;
                }
            }
        }
    });
});

if (brokenLinks === 0) {
    console.log('✅ No broken links found\n');
} else {
    console.log(`❌ ${brokenLinks} broken links found!\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 5: DOUBLE HEADERS (Repeated mistake)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let doubleHeaders = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for both <header> tag AND common-navigation.js
    const hasHeaderTag = content.includes('<header');
    const hasNavJS = content.includes('common-navigation.js');
    
    if (hasHeaderTag && hasNavJS) {
        issues.push(`❌ ${file} - Has BOTH <header> tag AND common-navigation.js (double header!)`);
        doubleHeaders++;
    }
});

if (doubleHeaders === 0) {
    console.log('✅ No double headers found\n');
} else {
    console.log(`❌ ${doubleHeaders} pages have double headers!\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 6: PURPLE COLOR (Repeated mistake)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let purpleFound = 0;
const purpleColors = ['#667eea', '#764ba2', '#8b5cf6', 'rgb(102, 126, 234)', 'rgb(118, 75, 162)'];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    purpleColors.forEach(color => {
        if (content.includes(color)) {
            issues.push(`❌ ${file} - Still has purple color: ${color}`);
            purpleFound++;
        }
    });
});

if (purpleFound === 0) {
    console.log('✅ No purple colors found\n');
} else {
    console.log(`❌ ${purpleFound} instances of purple color found!\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 7: REPORT BLUR (70% blur required)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const reportFiles = [
    'Final_Acrylic_Market_Report.html',
    'Poloxamer_Market_Report.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'nickel-esg-report.html'
];

let blurIssues = 0;
reportFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        if (!content.includes('blur(8px)') && !content.includes('blur(10px)')) {
            issues.push(`❌ ${file} - Missing 70% blur effect`);
            blurIssues++;
        } else {
            passed.push(`✅ ${file} - Has 70% blur`);
        }
    }
});

if (blurIssues === 0) {
    console.log('✅ All reports have 70% blur\n');
} else {
    console.log(`❌ ${blurIssues} reports missing blur!\n`);
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ CHECK 8: SERIAL NUMBERS ON REPORTS PAGE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (fs.existsSync('market-reports.html')) {
    const content = fs.readFileSync('market-reports.html', 'utf8');
    
    // Check for serial numbers (1., 2., 3., etc.)
    const hasSerialNumbers = content.includes('1. Specialty') && 
                            content.includes('2. Specialty') && 
                            content.includes('3. Paper') &&
                            content.includes('4. Acrylic') &&
                            content.includes('5. Poloxamer') &&
                            content.includes('6. Nickel');
    
    if (hasSerialNumbers) {
        passed.push('✅ market-reports.html - Has serial numbers (1-6)');
        console.log('✅ Market reports page has serial numbers (1-6)\n');
    } else {
        issues.push('❌ market-reports.html - Missing serial numbers');
    }
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 FINAL RESULTS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log(`✅ Passed checks: ${passed.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);
console.log(`❌ Issues found: ${issues.length}\n`);

if (issues.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('❌ CRITICAL ISSUES (MUST FIX BEFORE PUSH)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    issues.forEach(issue => console.log(issue));
    console.log('');
}

if (warnings.length > 0) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  WARNINGS (Should review)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    warnings.forEach(warning => console.log(warning));
    console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
if (issues.length === 0) {
    console.log('✅ ALL CHECKS PASSED - READY TO PUSH!');
} else {
    console.log('❌ FIX ISSUES BEFORE PUSHING!');
}
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Save results
const report = {
    timestamp: new Date().toISOString(),
    totalFiles: htmlFiles.length,
    passed: passed.length,
    warnings: warnings.length,
    issues: issues.length,
    readyToPush: issues.length === 0,
    details: {
        passed,
        warnings,
        issues
    }
};

fs.writeFileSync('FINAL_CHECK_RESULTS.json', JSON.stringify(report, null, 2));
console.log('Results saved to: FINAL_CHECK_RESULTS.json\n');
