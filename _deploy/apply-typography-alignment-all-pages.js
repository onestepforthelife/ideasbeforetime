const fs = require('fs');

console.log('📝 Applying typography and alignment standards to all pages...\n');

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

// Exclude test/template files
const excludeFiles = ['email-template.html', 'test-goda.html'];

let applied = 0;
let skipped = 0;
let errors = 0;

files.forEach(file => {
    if (excludeFiles.includes(file)) {
        console.log(`   ⏭️  ${file} - Skipped (test/template file)`);
        skipped++;
        return;
    }
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Check if already has typography-standards.css
        const hasTypography = content.includes('typography-standards.css');
        const hasAlignment = content.includes('alignment-standards.css');
        
        if (hasTypography && hasAlignment) {
            console.log(`   ✓ ${file} - Already has both CSS files`);
            return;
        }
        
        let modified = false;
        
        // Add typography-standards.css after <head> tag
        if (!hasTypography && content.includes('<head>')) {
            content = content.replace(
                /<head>/,
                '<head>\n    <link rel="stylesheet" href="typography-standards.css">'
            );
            modified = true;
        }
        
        // Add alignment-standards.css after typography-standards.css
        if (!hasAlignment && content.includes('typography-standards.css')) {
            content = content.replace(
                /<link rel="stylesheet" href="typography-standards\.css">/,
                '<link rel="stylesheet" href="typography-standards.css">\n    <link rel="stylesheet" href="alignment-standards.css">'
            );
            modified = true;
        } else if (!hasAlignment && content.includes('<head>')) {
            // If no typography CSS, add alignment after <head>
            content = content.replace(
                /<head>/,
                '<head>\n    <link rel="stylesheet" href="alignment-standards.css">'
            );
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`   ✅ ${file} - Applied typography & alignment CSS`);
            applied++;
        }
    } catch (err) {
        console.log(`   ❌ ${file} - Error: ${err.message}`);
        errors++;
    }
});

console.log(`\n✅ COMPLETE:`);
console.log(`   Applied: ${applied} files`);
console.log(`   Skipped: ${skipped} files`);
console.log(`   Errors: ${errors} files`);
console.log(`\n📊 All pages now have standard typography and alignment!`);
