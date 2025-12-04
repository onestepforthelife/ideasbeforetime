const fs = require('fs');
const path = require('path');

console.log('🔍 COMPLETE SYSTEMATIC SITE CHECK');
console.log('=' .repeat(60));

const issues = {
    critical: [],
    high: [],
    medium: [],
    low: []
};

// Get all HTML files
const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.includes('backup'));

console.log(`\n📊 Found ${htmlFiles.length} HTML files to check\n`);

// CHECK 1: Page content vs navigation links
console.log('CHECK 1: Page Content vs Navigation Links');
console.log('-'.repeat(60));

const navFile = 'common-navigation.js';
if (fs.existsSync(navFile)) {
    const navContent = fs.readFileSync(navFile, 'utf8');
    
    // Extract all href links from navigation
    const hrefMatches = navContent.match(/href="([^"]+)"/g) || [];
    const navLinks = hrefMatches.map(m => m.match(/href="([^"]+)"/)[1]);
    
    console.log(`✅ Navigation has ${navLinks.length} links`);
    
    // Check if each nav link has a corresponding file
    navLinks.forEach(link => {
        if (link.startsWith('http') || link.startsWith('#')) return;
        
        const fileName = link.replace('./', '');
        if (!fs.existsSync(fileName)) {
            issues.critical.push(`Navigation link "${link}" points to non-existent file`);
            console.log(`❌ CRITICAL: ${link} → File not found`);
        } else {
            console.log(`✅ ${link} → File exists`);
        }
    });
    
    // Check if all major pages are in navigation
    const majorPages = ['index.html', 'blog.html', 'about.html', 'cv.html', 
                       'spo.html', 'jobs.html', 'admin-control-panel.html',
                       'market-reports.html', 'innovations.html', 'astronomy.html'];
    
    majorPages.forEach(page => {
        const inNav = navLinks.some(link => link.includes(page));
        if (!inNav) {
            issues.high.push(`Major page "${page}" not in navigation`);
            console.log(`⚠️  HIGH: ${page} not in navigation`);
        }
    });
}

// CHECK 2: All links in each page
console.log('\n\nCHECK 2: All Links in Each Page');
console.log('-'.repeat(60));

htmlFiles.slice(0, 10).forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const links = content.match(/href="([^"]+)"/g) || [];
    
    console.log(`\n📄 ${file}: ${links.length} links`);
    
    links.slice(0, 5).forEach(link => {
        const href = link.match(/href="([^"]+)"/)[1];
        if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
            console.log(`  ✅ External/anchor: ${href}`);
        } else {
            const targetFile = href.replace('./', '');
            if (fs.existsSync(targetFile)) {
                console.log(`  ✅ ${href} → exists`);
            } else {
                issues.high.push(`${file}: Link "${href}" broken`);
                console.log(`  ❌ ${href} → NOT FOUND`);
            }
        }
    });
});

// CHECK 3: All pages going to some link (reverse check)
console.log('\n\nCHECK 3: Orphaned Pages (Not Linked From Anywhere)');
console.log('-'.repeat(60));

const allLinksInSite = new Set();
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const links = content.match(/href="([^"]+)"/g) || [];
    links.forEach(link => {
        const href = link.match(/href="([^"]+)"/)[1];
        if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
            allLinksInSite.add(href.replace('./', ''));
        }
    });
});

const orphanedPages = [];
htmlFiles.forEach(file => {
    if (!allLinksInSite.has(file) && file !== 'index.html') {
        orphanedPages.push(file);
    }
});

if (orphanedPages.length > 0) {
    console.log(`⚠️  Found ${orphanedPages.length} orphaned pages:`);
    orphanedPages.slice(0, 10).forEach(page => {
        console.log(`  - ${page}`);
        issues.medium.push(`Orphaned page: ${page}`);
    });
} else {
    console.log('✅ No orphaned pages found');
}

// CHECK 4: Header & Footer linkage
console.log('\n\nCHECK 4: Header & Footer Linkage');
console.log('-'.repeat(60));

let pagesWithNav = 0;
let pagesWithFooter = 0;
const missingNav = [];
const missingFooter = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('common-navigation.js')) {
        pagesWithNav++;
    } else {
        missingNav.push(file);
    }
    
    if (content.includes('common-footer.js')) {
        pagesWithFooter++;
    } else {
        missingFooter.push(file);
    }
});

console.log(`✅ ${pagesWithNav}/${htmlFiles.length} pages have navigation`);
console.log(`✅ ${pagesWithFooter}/${htmlFiles.length} pages have footer`);

if (missingNav.length > 0) {
    console.log(`\n⚠️  Pages without navigation (${missingNav.length}):`);
    missingNav.slice(0, 5).forEach(p => console.log(`  - ${p}`));
    missingNav.forEach(p => issues.high.push(`${p}: Missing navigation`));
}

if (missingFooter.length > 0) {
    console.log(`\n⚠️  Pages without footer (${missingFooter.length}):`);
    missingFooter.slice(0, 5).forEach(p => console.log(`  - ${p}`));
    missingFooter.forEach(p => issues.medium.push(`${p}: Missing footer`));
}

// CHECK 5: Critical tools functionality
console.log('\n\nCHECK 5: Critical Tools - File vs Server Issue');
console.log('-'.repeat(60));

const criticalTools = [
    { name: 'SPO Tool', file: 'spo.html', requiredFiles: ['social-optimizer-app.js', 'social-optimizer-ai-engine.js'] },
    { name: 'Job Search', file: 'jobs.html', requiredFiles: ['job-api-client.js'] },
    { name: 'Admin Panel', file: 'admin-control-panel.html', requiredFiles: [] }
];

criticalTools.forEach(tool => {
    console.log(`\n🔧 ${tool.name}:`);
    
    // Check if file exists
    if (!fs.existsSync(tool.file)) {
        issues.critical.push(`${tool.name}: File ${tool.file} does not exist`);
        console.log(`  ❌ CRITICAL: File ${tool.file} NOT FOUND`);
        return;
    }
    
    console.log(`  ✅ File ${tool.file} exists`);
    
    // Check file content
    const content = fs.readFileSync(tool.file, 'utf8');
    
    // Check if it's a redirect
    if (content.includes('window.location') && content.length < 500) {
        issues.critical.push(`${tool.name}: ${tool.file} is a redirect, not actual tool`);
        console.log(`  ❌ CRITICAL: File is a REDIRECT, not actual tool`);
    } else {
        console.log(`  ✅ File has actual content (${content.length} bytes)`);
    }
    
    // Check required files
    tool.requiredFiles.forEach(reqFile => {
        if (content.includes(reqFile)) {
            if (fs.existsSync(reqFile)) {
                console.log(`  ✅ Required file ${reqFile} exists and is included`);
            } else {
                issues.critical.push(`${tool.name}: Required file ${reqFile} missing`);
                console.log(`  ❌ CRITICAL: Required file ${reqFile} MISSING`);
            }
        } else {
            issues.high.push(`${tool.name}: ${reqFile} not included in HTML`);
            console.log(`  ⚠️  HIGH: ${reqFile} not included in HTML`);
        }
    });
    
    // Check navigation linkage
    const navContent = fs.readFileSync('common-navigation.js', 'utf8');
    if (navContent.includes(tool.file)) {
        console.log(`  ✅ Linked in navigation`);
    } else {
        issues.high.push(`${tool.name}: Not linked in navigation`);
        console.log(`  ⚠️  HIGH: Not linked in navigation`);
    }
});

// CHECK 6: Cloudflare Access (Server issue)
console.log('\n\nCHECK 6: Cloudflare Access Configuration');
console.log('-'.repeat(60));

if (fs.existsSync('_headers')) {
    const headers = fs.readFileSync('_headers', 'utf8');
    if (headers.includes('CF-Access')) {
        console.log('✅ _headers file has CF-Access configuration');
    } else {
        issues.high.push('Cloudflare Access not configured in _headers');
        console.log('⚠️  HIGH: Cloudflare Access not configured in _headers');
        console.log('   NOTE: This is a SERVER issue - needs Cloudflare Dashboard config');
    }
} else {
    issues.high.push('_headers file missing');
    console.log('⚠️  HIGH: _headers file missing');
}

// SUMMARY
console.log('\n\n' + '='.repeat(60));
console.log('📊 DIAGNOSTIC SUMMARY');
console.log('='.repeat(60));

console.log(`\n🚨 CRITICAL Issues: ${issues.critical.length}`);
console.log(`⚠️  HIGH Issues: ${issues.high.length}`);
console.log(`📌 MEDIUM Issues: ${issues.medium.length}`);
console.log(`ℹ️  LOW Issues: ${issues.low.length}`);

if (issues.critical.length > 0) {
    console.log('\n🚨 CRITICAL ISSUES (MUST FIX):');
    issues.critical.forEach((issue, i) => {
        console.log(`${i + 1}. ${issue}`);
    });
}

if (issues.high.length > 0) {
    console.log('\n⚠️  HIGH PRIORITY ISSUES:');
    issues.high.slice(0, 10).forEach((issue, i) => {
        console.log(`${i + 1}. ${issue}`);
    });
    if (issues.high.length > 10) {
        console.log(`   ... and ${issues.high.length - 10} more`);
    }
}

// FILE vs SERVER diagnosis
console.log('\n\n' + '='.repeat(60));
console.log('🔍 FILE vs SERVER ISSUE DIAGNOSIS');
console.log('='.repeat(60));

const fileIssues = issues.critical.length + issues.high.filter(i => !i.includes('Cloudflare')).length;
const serverIssues = issues.high.filter(i => i.includes('Cloudflare')).length;

console.log(`\n📁 FILE Issues: ${fileIssues} (can fix in code)`);
console.log(`📡 SERVER Issues: ${serverIssues} (need Cloudflare Dashboard)`);

console.log('\n💡 NEXT STEPS:');
console.log('1. Fix FILE issues first (update HTML/JS files)');
console.log('2. Push to GitHub');
console.log('3. Configure SERVER issues in Cloudflare Dashboard');
console.log('4. Test on live site: https://onestepforthelife.com');

// Save report
const report = {
    timestamp: new Date().toISOString(),
    totalFiles: htmlFiles.length,
    issues: issues,
    fileIssues: fileIssues,
    serverIssues: serverIssues
};

fs.writeFileSync('COMPLETE_DIAGNOSTIC_REPORT_DEC6.json', JSON.stringify(report, null, 2));
console.log('\n✅ Full report saved to: COMPLETE_DIAGNOSTIC_REPORT_DEC6.json');

process.exit(issues.critical.length > 0 ? 1 : 0);
