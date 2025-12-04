const fs = require('fs');
const path = require('path');

console.log('🔍 LIVE SITE VERIFICATION CHECKLIST');
console.log('═══════════════════════════════════════════════════════════\n');

const liveURL = 'https://onestepforthelife.com';

console.log(`📍 Live Site: ${liveURL}\n`);

// Critical pages to check
const criticalPages = [
    { name: 'Homepage', url: '/', file: 'index.html' },
    { name: 'About', url: '/about.html', file: 'about.html' },
    { name: 'Blog', url: '/blog.html', file: 'blog.html' },
    { name: 'Market Reports', url: '/market-reports.html', file: 'market-reports.html' },
    { name: 'SPO Tool', url: '/social-optimizer-index.html', file: 'social-optimizer-index.html' },
    { name: 'CV', url: '/cv.html', file: 'cv.html' },
    { name: 'Request Access', url: '/request-access.html', file: 'request-access.html' },
    { name: 'Jobs', url: '/jobs.html', file: 'jobs.html' },
    { name: 'Tools', url: '/tools.html', file: 'tools.html' },
    { name: 'Innovations', url: '/innovations.html', file: 'innovations.html' }
];

// Blog posts to check (sample)
const blogPosts = [
    { name: 'Blog Post 1', url: '/blog-post-1.html', file: 'blog-post-1.html' },
    { name: 'Blog Post 50', url: '/blog-post-50.html', file: 'blog-post-50.html' },
    { name: 'Blog Post 100', url: '/blog-post-100.html', file: 'blog-post-100.html' }
];

// Market reports to check
const reports = [
    { name: 'Acrylic Report', url: '/Final_Acrylic_Market_Report.html', file: 'Final_Acrylic_Market_Report.html' },
    { name: 'Poloxamer Report', url: '/Poloxamer_Market_Report.html', file: 'Poloxamer_Market_Report.html' },
    { name: 'Paper Pulp Report', url: '/Paper_Pulp_Specialty_Chemicals_Report.html', file: 'Paper_Pulp_Specialty_Chemicals_Report.html' }
];

// Previously orphaned pages
const orphanedPages = [
    { name: 'Email Sender', url: '/email-sender-web.html', file: 'email-sender-web.html' },
    { name: 'RO Guide', url: '/ro-guide.html', file: 'ro-guide.html' },
    { name: 'Teaching AI', url: '/teaching-ai-to-think.html', file: 'teaching-ai-to-think.html' },
    { name: 'Timeline', url: '/timeline.html', file: 'timeline.html' }
];

console.log('📋 VERIFICATION CHECKLIST:\n');

let totalChecks = 0;
let filesExist = 0;
let filesMissing = 0;

function checkFileExists(filePath) {
    try {
        return fs.existsSync(filePath);
    } catch (err) {
        return false;
    }
}

function checkSection(title, pages) {
    console.log(`\n${title}:`);
    console.log('─'.repeat(60));
    
    pages.forEach(page => {
        totalChecks++;
        const exists = checkFileExists(page.file);
        
        if (exists) {
            filesExist++;
            console.log(`✅ ${page.name.padEnd(30)} ${liveURL}${page.url}`);
        } else {
            filesMissing++;
            console.log(`❌ ${page.name.padEnd(30)} FILE MISSING: ${page.file}`);
        }
    });
}

// Check all sections
checkSection('🏠 CRITICAL PAGES', criticalPages);
checkSection('📝 BLOG POSTS (Sample)', blogPosts);
checkSection('📊 MARKET REPORTS', reports);
checkSection('🔗 PREVIOUSLY ORPHANED PAGES', orphanedPages);

// Summary
console.log('\n\n═══════════════════════════════════════════════════════════');
console.log('📊 SUMMARY:');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`Total Checks: ${totalChecks}`);
console.log(`Files Exist: ${filesExist} ✅`);
console.log(`Files Missing: ${filesMissing} ❌`);
console.log(`Success Rate: ${((filesExist/totalChecks)*100).toFixed(1)}%\n`);

// What to check manually on live site
console.log('═══════════════════════════════════════════════════════════');
console.log('🔍 MANUAL CHECKS NEEDED ON LIVE SITE:');
console.log('═══════════════════════════════════════════════════════════\n');

const manualChecks = [
    '1. NAVIGATION',
    '   ☐ Click "About" - does it load?',
    '   ☐ Click "Blog" - does it load?',
    '   ☐ Click "Market Reports" - does it load?',
    '   ☐ Navigation consistent across pages?',
    '',
    '2. BLOG FUNCTIONALITY',
    '   ☐ Blog page loads with all posts?',
    '   ☐ Category filters work?',
    '   ☐ Click a blog post - does it load?',
    '   ☐ Quick access widget showing?',
    '   ☐ Social share buttons present?',
    '',
    '3. MARKET REPORTS',
    '   ☐ Reports page lists all reports?',
    '   ☐ Click a report - does it load?',
    '   ☐ First 30% visible (no blur)?',
    '   ☐ Remaining 70% blurred?',
    '   ☐ "Request Access" button visible?',
    '   ☐ Button positioned correctly?',
    '',
    '4. SPO TOOL',
    '   ☐ SPO page loads?',
    '   ☐ "Start Optimizing" button works?',
    '   ☐ Form appears?',
    '   ☐ Can enter data?',
    '   ☐ Validation works?',
    '',
    '5. REQUEST ACCESS',
    '   ☐ Page loads?',
    '   ☐ Form visible at top?',
    '   ☐ Header at top (not centered)?',
    '   ☐ Footer at bottom (not centered)?',
    '   ☐ Can submit form?',
    '',
    '6. ORPHANED PAGES',
    '   ☐ Email sender loads?',
    '   ☐ RO guide loads?',
    '   ☐ Teaching AI loads?',
    '   ☐ Timeline loads?',
    '   ☐ All have navigation?',
    '   ☐ All have footer?',
    '',
    '7. MOBILE VIEW',
    '   ☐ Homepage responsive?',
    '   ☐ Navigation works on mobile?',
    '   ☐ Blog readable on mobile?',
    '   ☐ Forms work on mobile?',
    '',
    '8. VISUAL CONSISTENCY',
    '   ☐ Headers aligned left?',
    '   ☐ Footers centered?',
    '   ☐ Max-width 1400px consistent?',
    '   ☐ Colors consistent (no purple)?',
    '   ☐ Fonts consistent?'
];

manualChecks.forEach(check => console.log(check));

console.log('\n═══════════════════════════════════════════════════════════');
console.log('🚨 CRITICAL ISSUES TO LOOK FOR:');
console.log('═══════════════════════════════════════════════════════════\n');

const criticalIssues = [
    '❌ 404 errors (page not found)',
    '❌ Broken navigation links',
    '❌ Missing blur on reports',
    '❌ Forms not submitting',
    '❌ Missing navigation/footer',
    '❌ Misaligned headers/footers',
    '❌ JavaScript errors (check console)',
    '❌ Images not loading',
    '❌ Slow page load (>3 seconds)',
    '❌ Mobile layout broken'
];

criticalIssues.forEach(issue => console.log(issue));

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ NEXT STEPS:');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('1. Open browser: https://onestepforthelife.com');
console.log('2. Go through manual checklist above');
console.log('3. Document any issues found');
console.log('4. Fix issues immediately');
console.log('5. Re-check live site');
console.log('6. Only then claim "100% ready"\n');

console.log('═══════════════════════════════════════════════════════════');
console.log('Done! Now check the live site manually.');
console.log('═══════════════════════════════════════════════════════════\n');
