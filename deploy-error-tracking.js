// DEPLOY ERROR TRACKING TO ALL PAGES
// Adds error-tracker.js to all HTML files

const fs = require('fs');
const path = require('path');

console.log('🚀 DEPLOYING ERROR TRACKING TO ALL PAGES\n');

const results = {
    added: [],
    alreadyHas: [],
    skipped: [],
    errors: []
};

// Get all HTML files
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log(`Found ${files.length} HTML files\n`);

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Skip if already has error tracker
        if (content.includes('error-tracker.js')) {
            results.alreadyHas.push(file);
            console.log(`⏭️  ${file} - Already has error tracking`);
            return;
        }
        
        // Skip if no closing body tag
        if (!content.includes('</body>')) {
            results.skipped.push(file);
            console.log(`⚠️  ${file} - No </body> tag found`);
            return;
        }
        
        // Add error tracker before </body>
        const errorTrackerScript = `
    <!-- Error Tracking System -->
    <script src="error-tracker.js"></script>
</body>`;
        
        content = content.replace('</body>', errorTrackerScript);
        
        // Write back
        fs.writeFileSync(file, content, 'utf8');
        results.added.push(file);
        console.log(`✅ ${file} - Error tracking added`);
        
    } catch (err) {
        results.errors.push({ file, error: err.message });
        console.log(`❌ ${file} - Error: ${err.message}`);
    }
});

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('📊 DEPLOYMENT RESULTS\n');
console.log(`✅ Added: ${results.added.length}`);
console.log(`⏭️  Already has: ${results.alreadyHas.length}`);
console.log(`⚠️  Skipped: ${results.skipped.length}`);
console.log(`❌ Errors: ${results.errors.length}\n`);

if (results.added.length > 0) {
    console.log('Files with error tracking added:');
    results.added.forEach(f => console.log(`  • ${f}`));
    console.log('');
}

if (results.alreadyHas.length > 0) {
    console.log('Files already with error tracking:');
    results.alreadyHas.forEach(f => console.log(`  • ${f}`));
    console.log('');
}

console.log('═══════════════════════════════════════════════════════════\n');
console.log('🎯 NEXT STEPS\n');
console.log('1. Test error tracking: Press Ctrl+Shift+E on any page');
console.log('2. Trigger test error: Click any button 3+ times');
console.log('3. View error dashboard: Open error-dashboard.html');
console.log('4. Push to GitHub to deploy live\n');

// Save results
fs.writeFileSync('ERROR_TRACKING_DEPLOYMENT_RESULTS.json', JSON.stringify(results, null, 2));
console.log('✅ Results saved to ERROR_TRACKING_DEPLOYMENT_RESULTS.json\n');
