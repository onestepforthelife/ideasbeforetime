// Check Live Site for Orphaned Pages
const pages = [
    'index.html',
    'about.html',
    'blog.html',
    'cv.html',
    'jobs.html',
    'innovations.html',
    'market-reports.html',
    'spo.html',
    'tools.html',
    'kiro.html'
];

async function checkPage(page) {
    const url = `https://ideasbeforetime.pages.dev/${page}`;
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        // Check if navigation actually renders
        const hasNav = html.includes('<nav') || html.includes('navigation');
        const hasFooter = html.includes('<footer') || html.includes('footer');
        
        return {
            page,
            url,
            hasNav,
            hasFooter,
            status: response.status
        };
    } catch (error) {
        return {
            page,
            url,
            error: error.message
        };
    }
}

async function checkAll() {
    console.log('🔍 Checking live pages for navigation...\n');
    
    const results = [];
    for (const page of pages) {
        const result = await checkPage(page);
        results.push(result);
        
        const navIcon = result.hasNav ? '✅' : '❌';
        const footerIcon = result.hasFooter ? '✅' : '❌';
        
        console.log(`${page}:`);
        console.log(`  Nav: ${navIcon} | Footer: ${footerIcon}`);
        console.log('');
    }
    
    const orphans = results.filter(r => !r.hasNav || !r.hasFooter);
    console.log(`\n📊 Orphaned pages: ${orphans.length}/${results.length}`);
    
    if (orphans.length > 0) {
        console.log('\n❌ Pages missing nav/footer:');
        orphans.forEach(o => console.log(`  - ${o.page}`));
    }
}

checkAll();
