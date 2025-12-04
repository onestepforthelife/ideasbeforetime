// FIX ALL ORPHANED PAGES - Add to sitemap automatically
const fs = require('fs');

// Pages that should be in sitemap (ALL public pages)
const publicPages = [
    // RO pages
    'ro-guide.html',
    'ro-service-checklist.html', 
    'ro-water-purifier-guide.html',
    'ro.html',
    // Job tools
    'jobs.html',
    'job-tools.html',
    'job-dashboard.html',
    'job-credits-ui.html',
    // LinkedIn tools
    'linkedin.html',
    'linkedin-auto-scroller.html',
    'linkedin-complete-book.html',
    'linkedin-network-map.html',
    'linkedin-post-copier.html',
    'linkedin-skills-dashboard.html',
    // Kiro
    'kiro.html',
    'kiro-training-guide.html',
    // SPO tool
    'spo.html',
    'social-optimizer-admin.html',
    'social-optimizer-app.html',
    'social-optimizer-dashboard.html',
    'social-optimizer-quickstart.html',
    'social-optimizer-success.html',
    // Market reports
    'specialty.html',
    'nickel.html',
    'paper.html',
    'poloxamer.html',
    'acrylic.html',
    'nickel-esg-report.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Final_Acrylic_Market_Report.html',
    // Other tools
    'teaching-ai-to-think.html',
    'timeline.html',
    'tools.html',
    'profile-optimizer.html',
    'request-access.html',
    'research-preview.html',
    // Business
    'business-insights.html',
    'business-news.html',
    'innovations.html',
    // Policies
    'privacy-policy.html',
    'refund-policy.html',
    'terms-and-disclaimer.html',
    'disclaimer.html',
    // Other
    'ghar-ghar-complete.html',
    'email.html'
];

// Read current sitemap
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

// Add missing pages
let added = 0;
publicPages.forEach(page => {
    if (!sitemap.includes(page)) {
        const entry = `    <url>
        <loc>https://ideasbeforetime.pages.dev/${page}</loc>
        <lastmod>2025-12-04</lastmod>
        <priority>0.8</priority>
    </url>\n`;
        
        // Insert before closing </urlset>
        sitemap = sitemap.replace('</urlset>', entry + '</urlset>');
        console.log(`✅ Added ${page}`);
        added++;
    }
});

// Write updated sitemap
fs.writeFileSync('sitemap.xml', sitemap);

console.log(`\n✅ Added ${added} pages to sitemap`);
console.log('✅ Sitemap updated');
