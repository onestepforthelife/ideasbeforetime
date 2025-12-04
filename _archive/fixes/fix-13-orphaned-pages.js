// Fix 13 Orphaned Pages - December 5, 2025

const fs = require('fs');

const orphanedPages = [
    // Priority 1: Main pages
    'index.html',
    'about.html',
    'blog.html',
    'cv.html',
    'innovations.html',
    
    // Priority 2: Secondary pages
    'acrylic.html',
    'access.html',
    'disclaimer.html',
    'email.html',
    'email-sender-web.html',
    
    // Priority 3: Test/Admin pages
    'admin-control-panel.html',
    'error-dashboard.html',
    'test-preview-system.html'
];

console.log('🔧 Fixing 13 Orphaned Pages...\n');

let fixed = 0;
let skipped = 0;
let errors = 0;

orphanedPages.forEach((file, index) => {
    try {
        if (!fs.existsSync(file)) {
            console.log(`⚠️  ${index + 1}. ${file} - NOT FOUND`);
            skipped++;
            return;
        }
        
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if already has navigation
        if (content.includes('common-navigation.js')) {
            console.log(`✅ ${index + 1}. ${file} - Already has navigation`);
            skipped++;
            return;
        }
        
        // Add navigation and footer before </body>
        const navFooter = `
    <script src="common-navigation.js"></script>
    <script src="common-footer.js"></script>
</body>`;
        
        content = content.replace('</body>', navFooter);
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${index + 1}. ${file} - FIXED`);
        fixed++;
        
    } catch (error) {
        console.log(`❌ ${index + 1}. ${file} - ERROR: ${error.message}`);
        errors++;
    }
});

console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY');
console.log('='.repeat(50));
console.log(`Total files: ${orphanedPages.length}`);
console.log(`Fixed: ${fixed}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors}`);
console.log('='.repeat(50));

if (fixed > 0) {
    console.log(`\n🎉 Successfully fixed ${fixed} orphaned pages!`);
    console.log('\n📋 Next steps:');
    console.log('1. Test pages in browser');
    console.log('2. Verify navigation appears');
    console.log('3. Push to GitHub');
} else {
    console.log('\n⚠️  No pages were fixed.');
}
