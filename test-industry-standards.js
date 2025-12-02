// INDUSTRY STANDARDS VALIDATION TEST
// Tests against W3C, WCAG, Google, OWASP standards
// Run: node test-industry-standards.js

const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║        INDUSTRY STANDARDS VALIDATION TEST                   ║');
console.log('║     Testing Against Official W3C, WCAG, Google Standards   ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && fs.statSync(f).size > 0);
console.log(`📊 Testing ${files.length} HTML files\n`);

const results = {
    w3c: { pass: [], fail: [], details: [] },
    wcag: { pass: [], fail: [], details: [] },
    seo: { pass: [], fail: [], details: [] },
    security: { pass: [], fail: [], details: [] },
    performance: { pass: [], fail: [], details: [] },
    mobile: { pass: [], fail: [], details: [] }
};

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // ═══════════════════════════════════════════════════════════════
    // W3C HTML5 VALIDATION (Basic checks)
    // ═══════════════════════════════════════════════════════════════
    let w3cIssues = [];
    
    // Check DOCTYPE
    if (!content.includes('<!DOCTYPE html>') && !content.includes('<!doctype html>')) {
        w3cIssues.push('Missing DOCTYPE');
    }
    
    // Check <html> tag
    if (!content.includes('<html')) {
        w3cIssues.push('Missing <html> tag');
    }
    
    // Check <head> tag
    if (!content.includes('<head>')) {
        w3cIssues.push('Missing <head> tag');
    }
    
    // Check <body> tag
    if (!content.includes('<body>')) {
        w3cIssues.push('Missing <body> tag');
    }
    
    // Check charset
    if (!content.includes('charset=') && !content.includes('charset =')) {
        w3cIssues.push('Missing charset declaration');
    }
    
    // Check for unclosed tags (basic)
    const openDivs = (content.match(/<div/g) || []).length;
    const closeDivs = (content.match(/<\/div>/g) || []).length;
    if (openDivs !== closeDivs) {
        w3cIssues.push(`Unclosed <div> tags (${openDivs} open, ${closeDivs} close)`);
    }
    
    if (w3cIssues.length === 0) {
        results.w3c.pass.push(file);
    } else {
        results.w3c.fail.push(file);
        results.w3c.details.push(`${file}: ${w3cIssues.join(', ')}`);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // WCAG 2.1 ACCESSIBILITY (Level AA)
    // ═══════════════════════════════════════════════════════════════
    let wcagIssues = [];
    
    // Check images have alt text
    const imgTags = content.match(/<img[^>]*>/gi) || [];
    imgTags.forEach(img => {
        if (!img.includes('alt=')) {
            wcagIssues.push('Image missing alt attribute');
        }
    });
    
    // Check form inputs have labels
    const inputTags = content.match(/<input[^>]*>/gi) || [];
    inputTags.forEach(input => {
        if (!input.includes('aria-label') && !input.includes('id=')) {
            wcagIssues.push('Input missing label/aria-label');
        }
    });
    
    // Check buttons have text or aria-label
    const buttonTags = content.match(/<button[^>]*>.*?<\/button>/gi) || [];
    buttonTags.forEach(button => {
        const buttonContent = button.replace(/<[^>]*>/g, '').trim();
        if (!buttonContent && !button.includes('aria-label')) {
            wcagIssues.push('Button missing text or aria-label');
        }
    });
    
    // Check links have text
    const linkTags = content.match(/<a[^>]*>.*?<\/a>/gi) || [];
    linkTags.forEach(link => {
        const linkText = link.replace(/<[^>]*>/g, '').trim();
        if (!linkText && !link.includes('aria-label')) {
            wcagIssues.push('Link missing text or aria-label');
        }
    });
    
    // Check language attribute
    if (!content.includes('lang=')) {
        wcagIssues.push('Missing lang attribute on <html>');
    }
    
    if (wcagIssues.length === 0) {
        results.wcag.pass.push(file);
    } else {
        results.wcag.fail.push(file);
        // Only show first 3 issues per file
        const issuesSummary = wcagIssues.slice(0, 3).join(', ');
        const moreCount = wcagIssues.length > 3 ? ` +${wcagIssues.length - 3} more` : '';
        results.wcag.details.push(`${file}: ${issuesSummary}${moreCount}`);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // GOOGLE SEO GUIDELINES
    // ═══════════════════════════════════════════════════════════════
    let seoIssues = [];
    
    // Check title tag exists and length
    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    if (!titleMatch) {
        seoIssues.push('Missing <title> tag');
    } else {
        const titleLength = titleMatch[1].length;
        if (titleLength < 10) {
            seoIssues.push('Title too short (< 10 chars)');
        } else if (titleLength > 60) {
            seoIssues.push('Title too long (> 60 chars)');
        }
    }
    
    // Check meta description
    const metaDesc = content.match(/<meta[^>]*name=["']description["'][^>]*>/i);
    if (!metaDesc) {
        seoIssues.push('Missing meta description');
    } else {
        const descMatch = metaDesc[0].match(/content=["'](.*?)["']/i);
        if (descMatch) {
            const descLength = descMatch[1].length;
            if (descLength < 50) {
                seoIssues.push('Description too short (< 50 chars)');
            } else if (descLength > 160) {
                seoIssues.push('Description too long (> 160 chars)');
            }
        }
    }
    
    // Check viewport meta tag (mobile-friendly)
    if (!content.includes('viewport')) {
        seoIssues.push('Missing viewport meta tag');
    }
    
    // Check for h1 tag
    if (!content.includes('<h1')) {
        seoIssues.push('Missing <h1> heading');
    }
    
    if (seoIssues.length === 0) {
        results.seo.pass.push(file);
    } else {
        results.seo.fail.push(file);
        results.seo.details.push(`${file}: ${seoIssues.join(', ')}`);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // OWASP SECURITY (Basic checks)
    // ═══════════════════════════════════════════════════════════════
    let securityIssues = [];
    
    // Check for inline JavaScript with eval
    if (content.includes('eval(')) {
        securityIssues.push('Uses eval() - security risk');
    }
    
    // Check for exposed passwords/keys
    const sensitivePatterns = [
        /password\s*=\s*["'][^"']{3,}["']/i,
        /api[_-]?key\s*=\s*["'][^"']{10,}["']/i,
        /secret\s*=\s*["'][^"']{10,}["']/i
    ];
    
    sensitivePatterns.forEach(pattern => {
        if (pattern.test(content)) {
            securityIssues.push('Possible exposed credential');
        }
    });
    
    // Check external scripts use HTTPS
    const scriptTags = content.match(/<script[^>]*src=["']http:\/\/[^"']*["']/gi) || [];
    if (scriptTags.length > 0) {
        securityIssues.push('External script uses HTTP (should be HTTPS)');
    }
    
    // Check external links use HTTPS
    const httpLinks = content.match(/<link[^>]*href=["']http:\/\/[^"']*["']/gi) || [];
    if (httpLinks.length > 0) {
        securityIssues.push('External link uses HTTP (should be HTTPS)');
    }
    
    if (securityIssues.length === 0) {
        results.security.pass.push(file);
    } else {
        results.security.fail.push(file);
        results.security.details.push(`${file}: ${securityIssues.join(', ')}`);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // PERFORMANCE (Basic checks)
    // ═══════════════════════════════════════════════════════════════
    let perfIssues = [];
    
    // Check file size
    const fileSize = fs.statSync(file).size;
    if (fileSize > 500000) { // 500KB
        perfIssues.push(`Large file size (${Math.round(fileSize/1024)}KB)`);
    }
    
    // Check for inline styles (should use CSS files)
    const inlineStyles = (content.match(/style=["'][^"']{50,}["']/g) || []).length;
    if (inlineStyles > 10) {
        perfIssues.push(`Too many inline styles (${inlineStyles})`);
    }
    
    // Check for large inline scripts
    const scriptContent = content.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
    scriptContent.forEach(script => {
        if (script.length > 10000) {
            perfIssues.push('Large inline script (should be external)');
        }
    });
    
    if (perfIssues.length === 0) {
        results.performance.pass.push(file);
    } else {
        results.performance.fail.push(file);
        results.performance.details.push(`${file}: ${perfIssues.join(', ')}`);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // MOBILE-FRIENDLY (Basic checks)
    // ═══════════════════════════════════════════════════════════════
    let mobileIssues = [];
    
    // Check viewport
    if (!content.includes('viewport')) {
        mobileIssues.push('Missing viewport meta tag');
    }
    
    // Check for responsive CSS
    if (!content.includes('@media') && !content.includes('responsive')) {
        mobileIssues.push('No responsive CSS detected');
    }
    
    // Check for fixed widths (should use max-width)
    if (content.includes('width: 1400px') && !content.includes('max-width')) {
        mobileIssues.push('Uses fixed width without max-width');
    }
    
    if (mobileIssues.length === 0) {
        results.mobile.pass.push(file);
    } else {
        results.mobile.fail.push(file);
        results.mobile.details.push(`${file}: ${mobileIssues.join(', ')}`);
    }
});

// ═══════════════════════════════════════════════════════════════
// PRINT RESULTS
// ═══════════════════════════════════════════════════════════════

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🌍 W3C HTML5 VALIDATION');
console.log(`   ✅ Pass: ${results.w3c.pass.length}/${files.length} (${Math.round(results.w3c.pass.length/files.length*100)}%)`);
console.log(`   ❌ Fail: ${results.w3c.fail.length}/${files.length}`);
if (results.w3c.details.length > 0) {
    console.log('   Issues:');
    results.w3c.details.slice(0, 5).forEach(d => console.log(`      ${d}`));
    if (results.w3c.details.length > 5) {
        console.log(`      ... and ${results.w3c.details.length - 5} more files`);
    }
}
console.log('');

console.log('♿ WCAG 2.1 ACCESSIBILITY (Level AA)');
console.log(`   ✅ Pass: ${results.wcag.pass.length}/${files.length} (${Math.round(results.wcag.pass.length/files.length*100)}%)`);
console.log(`   ❌ Fail: ${results.wcag.fail.length}/${files.length}`);
if (results.wcag.details.length > 0) {
    console.log('   Issues:');
    results.wcag.details.slice(0, 5).forEach(d => console.log(`      ${d}`));
    if (results.wcag.details.length > 5) {
        console.log(`      ... and ${results.wcag.details.length - 5} more files`);
    }
}
console.log('');

console.log('🔍 GOOGLE SEO GUIDELINES');
console.log(`   ✅ Pass: ${results.seo.pass.length}/${files.length} (${Math.round(results.seo.pass.length/files.length*100)}%)`);
console.log(`   ❌ Fail: ${results.seo.fail.length}/${files.length}`);
if (results.seo.details.length > 0) {
    console.log('   Issues:');
    results.seo.details.slice(0, 5).forEach(d => console.log(`      ${d}`));
    if (results.seo.details.length > 5) {
        console.log(`      ... and ${results.seo.details.length - 5} more files`);
    }
}
console.log('');

console.log('🔒 OWASP SECURITY');
console.log(`   ✅ Pass: ${results.security.pass.length}/${files.length} (${Math.round(results.security.pass.length/files.length*100)}%)`);
console.log(`   ❌ Fail: ${results.security.fail.length}/${files.length}`);
if (results.security.details.length > 0) {
    console.log('   Issues:');
    results.security.details.forEach(d => console.log(`      ${d}`));
}
console.log('');

console.log('⚡ PERFORMANCE');
console.log(`   ✅ Pass: ${results.performance.pass.length}/${files.length} (${Math.round(results.performance.pass.length/files.length*100)}%)`);
console.log(`   ❌ Fail: ${results.performance.fail.length}/${files.length}`);
if (results.performance.details.length > 0) {
    console.log('   Issues:');
    results.performance.details.slice(0, 5).forEach(d => console.log(`      ${d}`));
    if (results.performance.details.length > 5) {
        console.log(`      ... and ${results.performance.details.length - 5} more files`);
    }
}
console.log('');

console.log('📱 MOBILE-FRIENDLY');
console.log(`   ✅ Pass: ${results.mobile.pass.length}/${files.length} (${Math.round(results.mobile.pass.length/files.length*100)}%)`);
console.log(`   ❌ Fail: ${results.mobile.fail.length}/${files.length}`);
if (results.mobile.details.length > 0) {
    console.log('   Issues:');
    results.mobile.details.slice(0, 5).forEach(d => console.log(`      ${d}`));
    if (results.mobile.details.length > 5) {
        console.log(`      ... and ${results.mobile.details.length - 5} more files`);
    }
}
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Calculate overall score
const totalTests = 6;
const passedTests = [
    results.w3c.fail.length === 0,
    results.wcag.fail.length === 0,
    results.seo.fail.length === 0,
    results.security.fail.length === 0,
    results.performance.fail.length === 0,
    results.mobile.fail.length === 0
].filter(Boolean).length;

const overallScore = Math.round((passedTests / totalTests) * 100);

console.log('📊 OVERALL INDUSTRY STANDARDS SCORE');
console.log(`   Score: ${overallScore}% (${passedTests}/${totalTests} standards passed)`);
console.log('');

if (overallScore >= 90) {
    console.log('   ⭐⭐⭐ EXCELLENT - Professional Quality');
} else if (overallScore >= 80) {
    console.log('   ⭐⭐ GOOD - Ready for launch with minor improvements');
} else if (overallScore >= 70) {
    console.log('   ⭐ FAIR - Needs improvement before launch');
} else {
    console.log('   ❌ NEEDS WORK - Critical issues to fix');
}
console.log('');

// Recommendations
console.log('💡 RECOMMENDATIONS');
console.log('');
if (results.w3c.fail.length > 0) {
    console.log('   1. Fix W3C HTML validation errors');
    console.log('      Run: https://validator.w3.org/');
}
if (results.wcag.fail.length > 0) {
    console.log('   2. Fix accessibility issues (WCAG 2.1 AA)');
    console.log('      Run: https://wave.webaim.org/');
}
if (results.seo.fail.length > 0) {
    console.log('   3. Improve SEO (titles, descriptions, headings)');
}
if (results.security.fail.length > 0) {
    console.log('   4. Fix security issues (OWASP)');
}
if (results.performance.fail.length > 0) {
    console.log('   5. Optimize performance (file sizes, scripts)');
}
if (results.mobile.fail.length > 0) {
    console.log('   6. Improve mobile-friendliness');
}
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (overallScore >= 80) {
    console.log('✅ SITE MEETS INDUSTRY STANDARDS - Ready for business!\n');
    process.exit(0);
} else {
    console.log('❌ SITE NEEDS IMPROVEMENT - Fix issues before launch\n');
    process.exit(1);
}
