const fs = require('fs');

const filesToFix = [
  "BASF_IT_SECURITY_PROPOSAL.html",
  "JOB_TRACKER_TOOL.html",
  "PAYMENT_VISUAL_GUIDE.html",
  "Specialty_Chemicals_Market_Report_Merged.html",
  "TEST_CREDITS.html",
  "common-footer.html",
  "cv.html",
  "email-sender-web.html",
  "ghar-ghar-complete.html",
  "ghar-ghar-game-enhanced.html",
  "job-credits-ui.html",
  "job-credits.html",
  "learning-with-kiro.html",
  "linkedin-complete-book.html",
  "linkedin-portfolio-index.html",
  "request-access.html",
  "social-optimizer-success.html"
];

console.log('🔧 Applying 1400px width fix to 17 files...\n');

let fixed = 0;
let skipped = 0;

filesToFix.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if already has max-width
    if (content.includes('max-width: 1400px') || content.includes('max-width:1400px')) {
        console.log(`⏭️  SKIP: ${file} (already has 1400px)`);
        skipped++;
        return;
    }
    
    // Find the container/main/body style section and add max-width
    // Look for common patterns
    let modified = false;
    
    // Pattern 1: .container { ... }
    if (content.includes('.container {') && !content.match(/\.container\s*\{[^}]*max-width/)) {
        content = content.replace(
            /\.container\s*\{/,
            '.container {\n            max-width: 1400px;\n            margin: 0 auto;'
        );
        modified = true;
    }
    
    // Pattern 2: body { ... } without max-width
    else if (content.includes('body {') && !content.match(/body\s*\{[^}]*max-width/)) {
        content = content.replace(
            /body\s*\{/,
            'body {\n            max-width: 1400px;\n            margin: 0 auto;'
        );
        modified = true;
    }
    
    // Pattern 3: Add to <style> section if exists
    else if (content.includes('<style>')) {
        content = content.replace(
            /<style>/,
            '<style>\n        .main-container {\n            max-width: 1400px;\n            margin: 0 auto;\n            padding: 20px;\n        }'
        );
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ FIXED: ${file}`);
        fixed++;
    } else {
        console.log(`⚠️  MANUAL: ${file} (needs manual check)`);
        skipped++;
    }
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`\n✅ Fixed: ${fixed} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`\n🎯 Total processed: ${filesToFix.length} files`);
