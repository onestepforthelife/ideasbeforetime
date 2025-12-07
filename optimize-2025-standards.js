#!/usr/bin/env node

/**
 * OPTIMIZE SITE WITH 2025 STANDARDS
 * Based on latest Cloudflare and web.dev documentation
 * December 6, 2025
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 OPTIMIZING WITH 2025 STANDARDS...\n');

// Track changes
const changes = {
    coreWebVitals: [],
    modernImages: [],
    security: [],
    accessibility: [],
    performance: []
};

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.includes('backup'));

console.log(`📊 Found ${htmlFiles.length} HTML files to optimize\n`);

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    const originalContent = content;

    // ============================================
    // 1. CORE WEB VITALS - INP OPTIMIZATION (2025)
    // ============================================
    
    // Add fetchpriority for hero images (improves LCP)
    if (content.includes('<img') && !content.includes('fetchpriority')) {
        // Find first image (likely hero)
        const firstImgMatch = content.match(/<img[^>]*>/);
        if (firstImgMatch) {
            const firstImg = firstImgMatch[0];
            if (!firstImg.includes('fetchpriority')) {
                const newImg = firstImg.replace('<img', '<img fetchpriority="high"');
                content = content.replace(firstImg, newImg);
                changes.coreWebVitals.push(`${file}: Added fetchpriority="high" to hero image`);
                modified = true;
            }
        }
    }

    // Add decoding="async" for better INP
    if (content.includes('<img') && !content.includes('decoding=')) {
        content = content.replace(/<img(?![^>]*decoding=)/g, '<img decoding="async"');
        changes.performance.push(`${file}: Added decoding="async" to images`);
        modified = true;
    }

    // ============================================
    // 2. MODERN IMAGE FORMATS (2025)
    // ============================================
    
    // Add picture element with AVIF/WebP fallbacks for key images
    const imgRegex = /<img([^>]*src=["']([^"']+\.(?:jpg|jpeg|png))["'][^>]*)>/gi;
    let match;
    let pictureAdded = false;
    
    while ((match = imgRegex.exec(originalContent)) !== null) {
        const fullImg = match[0];
        const imgSrc = match[2];
        
        // Only convert first 3 images (hero + key content)
        if (!pictureAdded && !fullImg.includes('logo') && !fullImg.includes('icon')) {
            const imgAttrs = match[1];
            const baseName = imgSrc.replace(/\.(jpg|jpeg|png)$/i, '');
            
            const pictureElement = `<picture>
    <source srcset="${baseName}.avif" type="image/avif">
    <source srcset="${baseName}.webp" type="image/webp">
    <img${imgAttrs}>
</picture>`;
            
            content = content.replace(fullImg, pictureElement);
            changes.modernImages.push(`${file}: Added AVIF/WebP support for ${imgSrc}`);
            modified = true;
            pictureAdded = true;
            break; // Only first image for now
        }
    }

    // ============================================
    // 3. SECURITY HEADERS (2025 STANDARDS)
    // ============================================
    
    // Add Permissions-Policy (replaces Feature-Policy)
    if (!content.includes('Permissions-Policy')) {
        const headCloseTag = content.indexOf('</head>');
        if (headCloseTag > -1) {
            const permissionsPolicy = `    <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()">\n`;
            content = content.slice(0, headCloseTag) + permissionsPolicy + content.slice(headCloseTag);
            changes.security.push(`${file}: Added Permissions-Policy header`);
            modified = true;
        }
    }

    // Add Cross-Origin-Embedder-Policy
    if (!content.includes('Cross-Origin-Embedder-Policy')) {
        const headCloseTag = content.indexOf('</head>');
        if (headCloseTag > -1) {
            const coepPolicy = `    <meta http-equiv="Cross-Origin-Embedder-Policy" content="require-corp">\n`;
            content = content.slice(0, headCloseTag) + coepPolicy + content.slice(headCloseTag);
            changes.security.push(`${file}: Added COEP header`);
            modified = true;
        }
    }

    // ============================================
    // 4. ACCESSIBILITY (WCAG 2.1 AA - 2025)
    // ============================================
    
    // Add lang attribute if missing
    if (!content.includes('<html lang=')) {
        content = content.replace('<html>', '<html lang="en">');
        content = content.replace('<html ', '<html lang="en" ');
        changes.accessibility.push(`${file}: Added lang="en" attribute`);
        modified = true;
    }

    // Add aria-label to external links
    const externalLinkRegex = /<a([^>]*href=["']https?:\/\/(?!onestepforthelife\.com)[^"']+["'][^>]*)>/gi;
    if (externalLinkRegex.test(content) && !content.includes('aria-label')) {
        content = content.replace(
            externalLinkRegex,
            '<a$1 aria-label="External link (opens in new tab)">'
        );
        changes.accessibility.push(`${file}: Added aria-labels to external links`);
        modified = true;
    }

    // ============================================
    // 5. PERFORMANCE - RESOURCE HINTS (2025)
    // ============================================
    
    // Add preconnect for critical third-party domains
    if (!content.includes('preconnect')) {
        const headCloseTag = content.indexOf('</head>');
        if (headCloseTag > -1) {
            const preconnects = `    <!-- Preconnect to critical domains -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
`;
            content = content.slice(0, headCloseTag) + preconnects + content.slice(headCloseTag);
            changes.performance.push(`${file}: Added preconnect hints`);
            modified = true;
        }
    }

    // Add modulepreload for critical JS
    if (content.includes('<script') && !content.includes('modulepreload')) {
        const headCloseTag = content.indexOf('</head>');
        if (headCloseTag > -1 && content.includes('common-navigation.js')) {
            const modulePreload = `    <link rel="modulepreload" href="common-navigation.js">\n`;
            content = content.slice(0, headCloseTag) + modulePreload + content.slice(headCloseTag);
            changes.performance.push(`${file}: Added modulepreload for critical JS`);
            modified = true;
        }
    }

    // ============================================
    // 6. SEO - STRUCTURED DATA (2025)
    // ============================================
    
    // Add Organization schema if not present
    if (!content.includes('"@type": "Organization"') && file === 'index.html') {
        const headCloseTag = content.indexOf('</head>');
        if (headCloseTag > -1) {
            const orgSchema = `    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ideas Before Time",
        "url": "https://onestepforthelife.com",
        "logo": "https://onestepforthelife.com/images/logo.png",
        "description": "Chemical industry insights, market reports, and professional tools",
        "sameAs": [
            "https://www.linkedin.com/in/amitkumaragrawal"
        ]
    }
    </script>
`;
            content = content.slice(0, headCloseTag) + orgSchema + content.slice(headCloseTag);
            changes.performance.push(`${file}: Added Organization schema`);
            modified = true;
        }
    }

    // Save if modified
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

// ============================================
// 7. UPDATE _HEADERS FILE (2025 STANDARDS)
// ============================================

console.log('\n📝 Updating _headers file with 2025 security standards...\n');

const headersContent = `# Security Headers (2025 Standards)
/*
  # Permissions Policy (replaces Feature-Policy)
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()
  
  # Cross-Origin Policies
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  
  # Content Security Policy (Strict)
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com
  
  # HSTS (2 years)
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  
  # XSS Protection
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  
  # Referrer Policy
  Referrer-Policy: strict-origin-when-cross-origin
  
  # Cache Control
  Cache-Control: public, max-age=3600, must-revalidate

# Static Assets - Long Cache
/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

# HTML - Short Cache
/*.html
  Cache-Control: public, max-age=3600, must-revalidate
`;

fs.writeFileSync('_headers', headersContent, 'utf8');
changes.security.push('Updated _headers with 2025 security standards');

// ============================================
// GENERATE REPORT
// ============================================

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('✅ OPTIMIZATION COMPLETE - 2025 STANDARDS APPLIED');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('📊 SUMMARY:\n');

console.log(`🎯 Core Web Vitals (INP/LCP/CLS): ${changes.coreWebVitals.length} improvements`);
if (changes.coreWebVitals.length > 0) {
    changes.coreWebVitals.slice(0, 3).forEach(c => console.log(`   - ${c}`));
    if (changes.coreWebVitals.length > 3) {
        console.log(`   ... and ${changes.coreWebVitals.length - 3} more`);
    }
}

console.log(`\n🖼️  Modern Image Formats (AVIF/WebP): ${changes.modernImages.length} implementations`);
if (changes.modernImages.length > 0) {
    changes.modernImages.slice(0, 3).forEach(c => console.log(`   - ${c}`));
}

console.log(`\n🔒 Security (2025 Standards): ${changes.security.length} enhancements`);
if (changes.security.length > 0) {
    changes.security.slice(0, 5).forEach(c => console.log(`   - ${c}`));
}

console.log(`\n♿ Accessibility (WCAG 2.1 AA): ${changes.accessibility.length} improvements`);
if (changes.accessibility.length > 0) {
    changes.accessibility.slice(0, 3).forEach(c => console.log(`   - ${c}`));
}

console.log(`\n⚡ Performance: ${changes.performance.length} optimizations`);
if (changes.performance.length > 0) {
    changes.performance.slice(0, 5).forEach(c => console.log(`   - ${c}`));
}

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    standards: '2025 Cloudflare + web.dev',
    filesProcessed: htmlFiles.length,
    changes: changes,
    summary: {
        coreWebVitals: changes.coreWebVitals.length,
        modernImages: changes.modernImages.length,
        security: changes.security.length,
        accessibility: changes.accessibility.length,
        performance: changes.performance.length,
        total: Object.values(changes).reduce((sum, arr) => sum + arr.length, 0)
    }
};

fs.writeFileSync('OPTIMIZATION_2025_REPORT.json', JSON.stringify(report, null, 2));

console.log('\n═══════════════════════════════════════════════════════════════');
console.log(`✅ Total Improvements: ${report.summary.total}`);
console.log('📄 Detailed report: OPTIMIZATION_2025_REPORT.json');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log('🎯 NEXT STEPS:\n');
console.log('1. Test site on live URL');
console.log('2. Check Core Web Vitals: https://pagespeed.web.dev/');
console.log('3. Verify security headers: https://securityheaders.com/');
console.log('4. Push to GitHub when ready');
console.log('\n✅ Site now optimized with 2025 standards!\n');
