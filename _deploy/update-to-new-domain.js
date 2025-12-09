// Update all references from old domain to new domain
// Old: ideasbeforetime.pages.dev
// New: onestepforthelife.com

const fs = require('fs');
const path = require('path');

const OLD_DOMAIN = 'ideasbeforetime.pages.dev';
const NEW_DOMAIN = 'onestepforthelife.com';

// Files to update
const filesToUpdate = [
    // Test/check scripts
    'check-live-site-comprehensive.js',
    'check-blog-posts-live.js',
    'check-blog-visibility-live.js',
    'check-live-blog-status.js',
    'check-live-deployment.js',
    'check-live-site-now.js',
    'verify-live-deployment-dec5.js',
    'verify-orphan-fixes-live.js',
    'monitor-live-site.js',
    
    // Documentation files
    'DEPLOY_NOW_INSTRUCTIONS_DEC5.txt',
    'DEPLOYMENT_WAITING_DEC5.txt',
    'DEPLOYMENT_STATUS_DEC5_NIGHT.txt',
    'LIVE_SITE_TESTING_GUIDE.txt',
    'README.md',
    'AMIT_READ_THIS_FIRST.txt',
    
    // All other .txt files with old domain
    'ACTUAL_TRUTH_DEC5.txt',
    'BLOG_VISIBILITY_SOLUTION_DEC5.txt',
    'CRITICAL_DEPLOYMENT_ISSUE_DEC5.txt',
    'FINAL_STATUS_DEC5_EVENING.txt',
    'PUSH_THIS_NOW_DEC5.txt',
    'VERIFY_DEPLOYMENT_NOW.txt',
];

let updatedCount = 0;
let errorCount = 0;

console.log('🔄 Updating domain references...\n');
console.log(`Old: ${OLD_DOMAIN}`);
console.log(`New: ${NEW_DOMAIN}\n`);

filesToUpdate.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⏭️  Skip: ${file} (not found)`);
        return;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Replace all occurrences
        content = content.replace(new RegExp(OLD_DOMAIN, 'g'), NEW_DOMAIN);
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${file}`);
            updatedCount++;
        } else {
            console.log(`⏭️  Skip: ${file} (no changes needed)`);
        }
    } catch (error) {
        console.log(`❌ Error: ${file} - ${error.message}`);
        errorCount++;
    }
});

console.log('\n📊 Summary:');
console.log(`✅ Updated: ${updatedCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`\n✅ Domain update complete!`);
console.log(`\nNew domain: https://${NEW_DOMAIN}/`);
