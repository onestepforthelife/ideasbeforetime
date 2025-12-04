// Fix 13 Orphaned Pages - December 5, 2025
const fs = require('fs');

const orphans = [
    'about.html',
    'access.html', 
    'acrylic.html',
    'admin-control-panel.html',
    'blog.html',
    'cv.html',
    'cv-preview.html',
    'disclaimer.html',
    'email.html',
    'email-sender-web.html',
    'index.html',
    'innovations.html',
    'jobs.html'
];

console.log('🔧 Fixing 13 orphaned pages...\n');

let fixed = 0;

orphans.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file} - Not found, skipping`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Add navigation if missing
    if (!content.includes('common-navigation.js')) {
        content = content.replace('</body>', '<script src="common-navigation.js"></script>\n</body>');
        modified = true;
    }
    
    // Add footer if missing
    if (!content.includes('common-footer.js')) {
        content = content.replace('</body>', '<script src="common-footer.js"></script>\n</body>');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`✅ ${file} - Fixed`);
        fixed++;
    } else {
        console.log(`✓  ${file} - Already has nav/footer`);
    }
});

console.log(`\n✅ Fixed ${fixed}/${orphans.length} pages`);
