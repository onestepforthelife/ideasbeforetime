// Fix the last 13 orphaned pages
const fs = require('fs');

const remainingPages = [
    'admin-control-panel.html',
    'BASF_IT_SECURITY_PROPOSAL.html',
    'cv-preview.html',
    'error-dashboard.html',
    'JOB_OUTREACH_AUTOMATION_TOOL.html',
    'JOB_POWER_FEATURES.html',
    'JOB_TRACKER_DAILY.html',
    'KIRO_AWS_REPORT_CLEAN.html',
    'KIRO_IMPROVEMENT_REPORT_FOR_AWS.html',
    'PAYMENT_VISUAL_GUIDE.html',
    'test-preview-system.html',
    'TEST_CREDITS.html',
    'vertical-nav-option.html'
];

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

let added = 0;
remainingPages.forEach(page => {
    if (!sitemap.includes(page)) {
        const entry = `    <url>
        <loc>https://ideasbeforetime.pages.dev/${page}</loc>
        <lastmod>2025-12-05</lastmod>
        <priority>0.5</priority>
    </url>\n`;
        
        sitemap = sitemap.replace('</urlset>', entry + '</urlset>');
        console.log(`✅ Added ${page}`);
        added++;
    }
});

fs.writeFileSync('sitemap.xml', sitemap);

console.log(`\n✅ Added ${added} pages to sitemap`);
console.log('✅ ALL ORPHANED PAGES FIXED');
