// AUTOMATED SEO & MOBILE IMPROVEMENTS
// Fixes industry standard issues found in testing
// Run: node improve-seo-mobile.js

const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║     AUTOMATED SEO & MOBILE IMPROVEMENTS                     ║');
console.log('║     Fixing Industry Standard Issues                         ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log('✅ Backup already created: backup_before_improvements_*\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && fs.statSync(f).size > 0);

let improved = 0;
const improvements = [];

// Default meta descriptions based on file name
const defaultDescriptions = {
    'index.html': 'Ideas Before Time - Access innovative solutions, market research, and professional tools. Request access to our platform.',
    'about.html': 'Learn about Amit Kumar and Ideas Before Time - 9 innovations predicted 4-15 years ahead of their time.',
    'library.html': 'Innovation Library - Explore 9 groundbreaking ideas that were ahead of their time, from Silent DJ to Dashboard Simplification.',
    'cv.html': 'Professional CV of Amit Kumar - Board-Ready Transformation Architect with 20+ years experience in chemicals, pharma, and automotive.',
    'market-reports.html': 'Access comprehensive market intelligence reports on specialty chemicals, acrylic emulsions, and nickel ESG.',
    'social-optimizer-index.html': 'Social Profile Optimizer - AI-powered tool to transform your LinkedIn, Facebook, Instagram profiles. Only ₹21.',
    'email-sender-web.html': 'Job Search Email Tool - Send professional job applications efficiently. Free tool for job seekers.',
    'job-tools.html': 'Job Search Tools - Free tools to help you find and apply for jobs more effectively.',
    'timeline.html': 'Innovation Timeline - Visual timeline of 9 innovations predicted years ahead of their time.',
    'disclaimer.html': 'Terms, Disclaimer, and Legal Information for Ideas Before Time platform.',
    'privacy-policy.html': 'Privacy Policy - How we protect your data and respect your privacy at Ideas Before Time.',
    'refund-policy.html': 'Refund Policy - Clear information about our refund and payment policies.'
};

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    const fileImprovements = [];
    
    // ═══════════════════════════════════════════════════════════════
    // FIX 1: Add/Improve Meta Description
    // ═══════════════════════════════════════════════════════════════
    const hasMetaDesc = content.match(/<meta[^>]*name=["']description["'][^>]*>/i);
    
    if (!hasMetaDesc) {
        // Add meta description
        const description = defaultDescriptions[file] || 
            `${file.replace('.html', '').replace(/-/g, ' ')} - Ideas Before Time platform`;
        
        if (content.includes('</head>')) {
            const metaTag = `    <meta name="description" content="${description}">\n`;
            content = content.replace('</head>', metaTag + '</head>');
            changed = true;
            fileImprovements.push('Added meta description');
        }
    } else {
        // Check if description is too short
        const descMatch = hasMetaDesc[0].match(/content=["'](.*?)["']/i);
        if (descMatch && descMatch[1].length < 50) {
            const description = defaultDescriptions[file] || descMatch[1];
            if (description.length >= 50) {
                content = content.replace(hasMetaDesc[0], 
                    `<meta name="description" content="${description}">`);
                changed = true;
                fileImprovements.push('Improved meta description (was too short)');
            }
        }
    }
    
    // ═══════════════════════════════════════════════════════════════
    // FIX 2: Add Responsive CSS (if missing)
    // ═══════════════════════════════════════════════════════════════
    if (!content.includes('@media') && !content.includes('responsive')) {
        // Add basic responsive CSS
        const responsiveCSS = `
    <style>
        /* Responsive Design - Mobile-Friendly */
        @media (max-width: 768px) {
            body { padding: 10px !important; }
            .container, .access-container, .reports-container, 
            .dashboard-container, .tool-container { 
                max-width: 100% !important; 
                padding: 20px !important; 
                margin: 10px !important;
            }
            h1 { font-size: 24px !important; }
            h2 { font-size: 20px !important; }
            .nav-links { flex-direction: column; }
            .grid, .package-grid, .reports-grid { 
                grid-template-columns: 1fr !important; 
            }
        }
    </style>
`;
        
        if (content.includes('</head>')) {
            content = content.replace('</head>', responsiveCSS + '</head>');
            changed = true;
            fileImprovements.push('Added responsive CSS for mobile');
        }
    }
    
    // ═══════════════════════════════════════════════════════════════
    // FIX 3: Add H1 if missing (SEO requirement)
    // ═══════════════════════════════════════════════════════════════
    if (!content.includes('<h1') && content.includes('<body>')) {
        // Try to find the first heading and make it h1
        const h2Match = content.match(/<h2[^>]*>(.*?)<\/h2>/i);
        if (h2Match) {
            content = content.replace(h2Match[0], h2Match[0].replace('h2', 'h1'));
            changed = true;
            fileImprovements.push('Added H1 heading (converted from H2)');
        }
    }
    
    // ═══════════════════════════════════════════════════════════════
    // FIX 4: Add lang attribute if missing
    // ═══════════════════════════════════════════════════════════════
    if (!content.includes('lang=') && content.includes('<html')) {
        content = content.replace(/<html([^>]*)>/i, '<html$1 lang="en">');
        changed = true;
        fileImprovements.push('Added lang="en" attribute');
    }
    
    // Save if changed
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        improved++;
        improvements.push(`${file}: ${fileImprovements.join(', ')}`);
    }
});

// Print results
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log(`✅ IMPROVED ${improved}/${files.length} FILES\n`);

if (improvements.length > 0) {
    console.log('Improvements made:');
    improvements.forEach(imp => console.log(`   ${imp}`));
    console.log('');
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✅ IMPROVEMENTS COMPLETE!\n');
console.log('Next steps:');
console.log('1. Run: node test-industry-standards.js (to verify improvements)');
console.log('2. Test site in browser');
console.log('3. If you don\'t like changes: restore from backup folder\n');
console.log('To restore backup:');
console.log('   Copy-Item backup_before_improvements_*\\*.html . -Force\n');
