#!/usr/bin/env node

/**
 * IDEAS BEFORE TIME - COMPREHENSIVE SITE CHECKER
 * Based on: 53 learnings (Nov 11 - Dec 8, 2025)
 * Tests: Our specific issues + Global standards
 * 
 * Usage: node ideasbeforetime-site-checker.js
 * Exit: 0 = All pass, 1 = Issues found
 */

const fs = require('fs');
const path = require('path');

// CONFIGURATION
const SITE_URL = 'https://onestepforthelife.com';
const ISSUES = {
    critical: [],
    high: [],
    medium: [],
    low: []
};

console.log('🚀 IDEAS BEFORE TIME - COMPREHENSIVE SITE CHECKER');
console.log('📅 Based on 4 weeks of learnings (Nov 11 - Dec 8, 2025)\n');

// ============================================
// PHASE 1: FILE STRUCTURE & EXISTENCE
// ============================================
console.log('📁 PHASE 1: File Structure & Existence...');

function checkFileStructure() {
    const requiredFiles = [
        // Core pages
        'index.html', 'about.html', 'blog.html', 'linkedin.html',
        
        // Tools
        'social-optimizer-app.html', 'jobs.html', 'admin-control-panel.html',
        
        // Market Reports
        'market-reports.html', 'Final_Acrylic_Market_Report.html',
        'Poloxamer_Market_Report.html', 'Paper_Pulp_Specialty_Chemicals_Report.html',
        'nickel-esg-report.html',
        
        // Guides
        'ro-guide.html', 'kiro.html',
        
        // Email & Contact
        'email-sender-web.html', 'request-access.html',
        
        // Business
        'business-insights.html', 'astronomy.html',
        
        // Common files
        'common-navigation.js', 'common-footer.js', 'common-footer.css',
        'goda-chatbot.js', 'error-tracker.js',
        
        // Config
        '_redirects', 'sitemap.xml', 'manifest.json'
    ];

    
    let missing = 0;
    requiredFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            ISSUES.high.push(`Missing required file: ${file}`);
            missing++;
        }
    });
    
    // Check blog posts (1-100)
    let missingBlogPosts = 0;
    for (let i = 1; i <= 100; i++) {
        const blogFile = `blog-post-${i}.html`;
        if (!fs.existsSync(blogFile)) {
            missingBlogPosts++;
        }
    }
    if (missingBlogPosts > 0) {
        ISSUES.high.push(`Missing ${missingBlogPosts} blog posts (should be 100 total)`);
    }
    
    console.log(`   ✅ Core files: ${requiredFiles.length - missing}/${requiredFiles.length}`);
    console.log(`   ✅ Blog posts: ${100 - missingBlogPosts}/100`);
}

checkFileStructure();

// ============================================
// PHASE 2: PURPLE COLOR CHECK (Learning #15, #17)
// ============================================
console.log('\n🎨 PHASE 2: Purple Color Check (53 Learnings)...');

function checkPurpleColors() {
    const purpleColors = ['#8b5cf6', '#667eea', '#764ba2', 'rgb(139, 92, 246)'];
    const filesToCheck = fs.readdirSync('.').filter(f => 
        f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js')
    );
    
    let purpleFound = 0;
    filesToCheck.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        purpleColors.forEach(color => {
            if (content.includes(color)) {
                ISSUES.medium.push(`Purple color ${color} found in ${file}`);
                purpleFound++;
            }
        });
    });
    
    console.log(`   ${purpleFound === 0 ? '✅' : '⚠️'} Purple colors: ${purpleFound} instances found`);
}

checkPurpleColors();


// ============================================
// PHASE 3: NAVIGATION & FOOTER (Learning #1, #14)
// ============================================
console.log('\n🧭 PHASE 3: Navigation & Footer Consistency...');

function checkNavigationFooter() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    let missingNav = 0, missingFooter = 0, missingFooterCSS = 0;
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        if (!content.includes('common-navigation.js')) {
            ISSUES.high.push(`Missing navigation in ${file}`);
            missingNav++;
        }
        
        if (!content.includes('common-footer.js')) {
            ISSUES.high.push(`Missing footer JS in ${file}`);
            missingFooter++;
        }
        
        if (!content.includes('common-footer.css')) {
            ISSUES.medium.push(`Missing footer CSS in ${file} (Learning #25)`);
            missingFooterCSS++;
        }
    });
    
    console.log(`   ${missingNav === 0 ? '✅' : '❌'} Navigation: ${htmlFiles.length - missingNav}/${htmlFiles.length} pages`);
    console.log(`   ${missingFooter === 0 ? '✅' : '❌'} Footer JS: ${htmlFiles.length - missingFooter}/${htmlFiles.length} pages`);
    console.log(`   ${missingFooterCSS === 0 ? '✅' : '⚠️'} Footer CSS: ${htmlFiles.length - missingFooterCSS}/${htmlFiles.length} pages`);
}

checkNavigationFooter();

// ============================================
// PHASE 4: TYPOGRAPHY & ALIGNMENT (Learning #23)
// ============================================
console.log('\n📝 PHASE 4: Typography & Alignment Standards...');

function checkTypographyAlignment() {
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    let leftAligned = 0, smallFonts = 0;
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for left alignment (should be center)
        if (content.includes('text-align: left') || content.includes('text-align:left')) {
            ISSUES.medium.push(`Left alignment found in ${file} (should be center)`);
            leftAligned++;
        }
        
        // Check for small fonts (<14px)
        const fontSizeMatches = content.match(/font-size:\s*(\d+)px/g);
        if (fontSizeMatches) {
            fontSizeMatches.forEach(match => {
                const size = parseInt(match.match(/\d+/)[0]);
                if (size < 14) {
                    ISSUES.low.push(`Small font (${size}px) in ${file} (min 14px recommended)`);
                    smallFonts++;
                }
            });
        }
    });
    
    console.log(`   ${leftAligned === 0 ? '✅' : '⚠️'} Alignment: ${leftAligned} left-aligned elements`);
    console.log(`   ${smallFonts === 0 ? '✅' : '⚠️'} Font sizes: ${smallFonts} small fonts (<14px)`);
}

checkTypographyAlignment();


// ============================================
// PHASE 5: CLOUDFLARE DEPLOYMENT (Learning #38, #39, #47)
// ============================================
console.log('\n☁️ PHASE 5: Cloudflare Deployment Checks...');

function checkCloudflareDeployment() {
    // Check file sizes (<25MB limit)
    const allFiles = fs.readdirSync('.', { recursive: true });
    let oversizedFiles = 0;
    
    allFiles.forEach(file => {
        try {
            const stats = fs.statSync(file);
            if (stats.isFile() && stats.size > 25 * 1024 * 1024) {
                ISSUES.critical.push(`File too large: ${file} (${(stats.size / 1024 / 1024).toFixed(2)}MB > 25MB limit)`);
                oversizedFiles++;
            }
        } catch (e) {}
    });
    
    // Check _redirects syntax
    if (fs.existsSync('_redirects')) {
        const redirects = fs.readFileSync('_redirects', 'utf8');
        if (redirects.includes('200') && !redirects.includes('# 200')) {
            ISSUES.critical.push('_redirects contains 200 status (not a redirect!) - Learning #47');
        }
        if (redirects.includes('/*.html')) {
            ISSUES.high.push('_redirects contains wrong syntax (/*.html) - Learning #47');
        }
    }
    
    console.log(`   ${oversizedFiles === 0 ? '✅' : '❌'} File sizes: ${oversizedFiles} files >25MB`);
    console.log(`   ✅ _redirects syntax checked`);
}

checkCloudflareDeployment();

// ============================================
// PHASE 6: SPO TOOL (Learning #21, #22)
// ============================================
console.log('\n💰 PHASE 6: SPO Tool (₹21 Payment)...');

function checkSPOTool() {
    if (!fs.existsSync('social-optimizer-app.html')) {
        ISSUES.critical.push('SPO tool missing: social-optimizer-app.html');
        return;
    }
    
    const spo = fs.readFileSync('social-optimizer-app.html', 'utf8');
    
    // Check pricing
    if (!spo.includes('₹21') && !spo.includes('Rs. 21') && !spo.includes('21')) {
        ISSUES.high.push('SPO pricing (₹21) not found');
    }
    
    // Check NO REFUNDS policy
    if (!spo.includes('NO REFUND') && !spo.includes('no refund')) {
        ISSUES.medium.push('SPO NO REFUNDS policy not clearly stated (Learning #3)');
    }
    
    // Check form exists
    if (!spo.includes('<form') && !spo.includes('input')) {
        ISSUES.critical.push('SPO form not found - users cannot enter data (Learning #21)');
    }
    
    console.log(`   ✅ SPO tool file exists`);
    console.log(`   ${spo.includes('₹21') ? '✅' : '⚠️'} Pricing (₹21) displayed`);
    console.log(`   ${spo.includes('NO REFUND') ? '✅' : '⚠️'} NO REFUNDS policy stated`);
}

checkSPOTool();


// ============================================
// PHASE 7: GODA CHATBOT
// ============================================
console.log('\n🤖 PHASE 7: GODA Chatbot Integration...');

function checkGODAChatbot() {
    if (!fs.existsSync('goda-chatbot.js')) {
        ISSUES.high.push('GODA chatbot missing: goda-chatbot.js');
        return;
    }
    
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    let missingGODA = 0;
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        if (!content.includes('goda-chatbot.js')) {
            missingGODA++;
        }
    });
    
    console.log(`   ✅ GODA chatbot file exists`);
    console.log(`   ${missingGODA === 0 ? '✅' : '⚠️'} GODA on pages: ${htmlFiles.length - missingGODA}/${htmlFiles.length}`);
}

checkGODAChatbot();

// ============================================
// PHASE 8: MARKET REPORTS (30% Preview + Blur)
// ============================================
console.log('\n📊 PHASE 8: Market Reports (30% Preview System)...');

function checkMarketReports() {
    const reports = [
        'Final_Acrylic_Market_Report.html',
        'Poloxamer_Market_Report.html',
        'Paper_Pulp_Specialty_Chemicals_Report.html',
        'nickel-esg-report.html'
    ];
    
    let missingReports = 0, missingBlur = 0, missingRequestAccess = 0;
    
    reports.forEach(report => {
        if (!fs.existsSync(report)) {
            ISSUES.high.push(`Market report missing: ${report}`);
            missingReports++;
            return;
        }
        
        const content = fs.readFileSync(report, 'utf8');
        
        // Check blur system
        if (!content.includes('blur') && !content.includes('blurred')) {
            ISSUES.medium.push(`${report}: Missing blur system (30% preview)`);
            missingBlur++;
        }
        
        // Check request access button
        if (!content.includes('Request') && !content.includes('request')) {
            ISSUES.medium.push(`${report}: Missing "Request Access" button`);
            missingRequestAccess++;
        }
    });
    
    console.log(`   ${missingReports === 0 ? '✅' : '❌'} Reports exist: ${reports.length - missingReports}/${reports.length}`);
    console.log(`   ${missingBlur === 0 ? '✅' : '⚠️'} Blur system: ${reports.length - missingBlur}/${reports.length}`);
    console.log(`   ${missingRequestAccess === 0 ? '✅' : '⚠️'} Request access: ${reports.length - missingRequestAccess}/${reports.length}`);
}

checkMarketReports();


// ============================================
// PHASE 9: BLOG SYSTEM (100 Posts)
// ============================================
console.log('\n📝 PHASE 9: Blog System (100 Posts)...');

function checkBlogSystem() {
    // Check blog.html
    if (!fs.existsSync('blog.html')) {
        ISSUES.critical.push('Blog index missing: blog.html');
        return;
    }
    
    const blog = fs.readFileSync('blog.html', 'utf8');
    
    // Check category filters
    if (!blog.includes('category') && !blog.includes('filter')) {
        ISSUES.medium.push('Blog category filters not found');
    }
    
    // Check quick access widget
    let postsWithWidget = 0;
    for (let i = 1; i <= 100; i++) {
        const postFile = `blog-post-${i}.html`;
        if (fs.existsSync(postFile)) {
            const content = fs.readFileSync(postFile, 'utf8');
            if (content.includes('quick-access') || content.includes('Quick Access')) {
                postsWithWidget++;
            }
        }
    }
    
    console.log(`   ✅ Blog index exists`);
    console.log(`   ${postsWithWidget > 90 ? '✅' : '⚠️'} Quick access widget: ${postsWithWidget}/100 posts`);
}

checkBlogSystem();

// ============================================
// PHASE 10: EMAIL SYSTEMS
// ============================================
console.log('\n📧 PHASE 10: Email Systems...');

function checkEmailSystems() {
    const emailFiles = ['email-sender-web.html', 'request-access.html'];
    let missing = 0;
    
    emailFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            ISSUES.high.push(`Email system missing: ${file}`);
            missing++;
            return;
        }
        
        const content = fs.readFileSync(file, 'utf8');
        
        // Check email validation
        if (!content.includes('@') && !content.includes('email')) {
            ISSUES.medium.push(`${file}: Email validation not found`);
        }
        
        // Check correct email
        if (!content.includes('onestepforthelife@gmail.com')) {
            ISSUES.low.push(`${file}: Contact email not configured`);
        }
    });
    
    console.log(`   ${missing === 0 ? '✅' : '❌'} Email systems: ${emailFiles.length - missing}/${emailFiles.length}`);
}

checkEmailSystems();

// ============================================
// PHASE 11: ERROR TRACKING
// ============================================
console.log('\n🐛 PHASE 11: Error Tracking System...');

function checkErrorTracking() {
    if (!fs.existsSync('error-tracker.js')) {
        ISSUES.high.push('Error tracking missing: error-tracker.js');
        return;
    }
    
    const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
    let withErrorTracking = 0;
    
    htmlFiles.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('error-tracker.js')) {
            withErrorTracking++;
        }
    });
    
    console.log(`   ✅ Error tracker exists`);
    console.log(`   ${withErrorTracking > htmlFiles.length * 0.8 ? '✅' : '⚠️'} Loaded on: ${withErrorTracking}/${htmlFiles.length} pages`);
}

checkErrorTracking();

// ============================================
// PHASE 12: ADMIN PANEL SECURITY
// ============================================
console.log('\n🔒 PHASE 12: Admin Panel Security...');

function checkAdminSecurity() {
    if (!fs.existsSync('admin-control-panel.html')) {
        ISSUES.critical.push('Admin panel missing: admin-control-panel.html');
        return;
    }
    
    const admin = fs.readFileSync('admin-control-panel.html', 'utf8');
    
    // Check for Cloudflare Access mention
    if (!admin.includes('Cloudflare') && !admin.includes('Access')) {
        ISSUES.high.push('Admin panel: Cloudflare Access not configured');
    }
    
    console.log(`   ✅ Admin panel exists`);
    console.log(`   ⚠️ Security: Verify Cloudflare Access in dashboard`);
}

checkAdminSecurity();

// ============================================
// FINAL REPORT
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 FINAL REPORT - GODA BEST TESTING PROTOCOL (CUSTOM)');
console.log('='.repeat(60));

const totalIssues = ISSUES.critical.length + ISSUES.high.length + ISSUES.medium.length + ISSUES.low.length;

console.log(`\n🚨 CRITICAL: ${ISSUES.critical.length}`);
ISSUES.critical.forEach(issue => console.log(`   ❌ ${issue}`));

console.log(`\n⚠️  HIGH: ${ISSUES.high.length}`);
ISSUES.high.forEach(issue => console.log(`   ⚠️  ${issue}`));

console.log(`\n📌 MEDIUM: ${ISSUES.medium.length}`);
ISSUES.medium.forEach(issue => console.log(`   📌 ${issue}`));

console.log(`\n💡 LOW: ${ISSUES.low.length}`);
ISSUES.low.forEach(issue => console.log(`   💡 ${issue}`));

console.log('\n' + '='.repeat(60));
console.log(`TOTAL ISSUES: ${totalIssues}`);
console.log('='.repeat(60));

if (ISSUES.critical.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND - MUST FIX BEFORE DEPLOYMENT!');
    process.exit(1);
} else if (ISSUES.high.length > 0) {
    console.log('\n⚠️  HIGH PRIORITY ISSUES - SHOULD FIX BEFORE DEPLOYMENT');
    process.exit(1);
} else if (totalIssues > 0) {
    console.log('\n✅ NO CRITICAL/HIGH ISSUES - Safe to deploy (fix medium/low when possible)');
    process.exit(0);
} else {
    console.log('\n✅ ALL CHECKS PASSED - PERFECT! 🎉');
    process.exit(0);
}
