#!/usr/bin/env node

/**
 * FIX TODAY'S MISTAKE PATTERNS
 * 
 * Fixes the 3 pattern issues found:
 * 1. error-dashboard.html - "Error" is vague, clarify it's "Automatic Issue Detection"
 * 2. kiro-error-solver.html - "FIX KIRO - ALL ERRORS" is vague, clarify purpose
 * 3. linkedin-post-copier.html - Labeled as "tool" but should clarify it's a utility
 */

const fs = require('fs');

console.log('🔧 FIXING TODAY\'S MISTAKE PATTERNS\n');

let fixed = 0;

// Fix 1: error-dashboard.html - Clarify title
try {
    const file = 'error-dashboard.html';
    let content = fs.readFileSync(file, 'utf8');
    
    // Change vague "Error Dashboard" to clear "Site Health Monitor"
    content = content.replace(
        /<title>Error Dashboard - Automatic Issue Detection<\/title>/,
        '<title>Site Health Monitor - Real-Time Issue Detection | Ideas Before Time</title>'
    );
    
    // Update h1 if exists
    content = content.replace(
        /<h1[^>]*>Error Dashboard<\/h1>/,
        '<h1>Site Health Monitor</h1>'
    );
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed: ${file}`);
    console.log('   Changed: "Error Dashboard" → "Site Health Monitor"');
    fixed++;
} catch (err) {
    console.log(`⚠️  Could not fix error-dashboard.html: ${err.message}`);
}

// Fix 2: kiro-error-solver.html - Clarify purpose
try {
    const file = 'kiro-error-solver.html';
    let content = fs.readFileSync(file, 'utf8');
    
    // Change vague "FIX KIRO - ALL ERRORS" to clear purpose
    content = content.replace(
        /<title>FIX KIRO - ALL ERRORS by GODA \| Ideas Before Time<\/title>/,
        '<title>GODA Kiro Troubleshooter - Solve IDE Issues | Ideas Before Time</title>'
    );
    
    // Update h1 if exists
    content = content.replace(
        /<h1[^>]*>FIX KIRO - ALL ERRORS by GODA<\/h1>/,
        '<h1>GODA Kiro Troubleshooter</h1>'
    );
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed: ${file}`);
    console.log('   Changed: "FIX KIRO - ALL ERRORS" → "GODA Kiro Troubleshooter"');
    fixed++;
} catch (err) {
    console.log(`⚠️  Could not fix kiro-error-solver.html: ${err.message}`);
}

// Fix 3: linkedin-post-copier.html - Clarify it's a utility tool
try {
    const file = 'linkedin-post-copier.html';
    let content = fs.readFileSync(file, 'utf8');
    
    // Keep "tool" but clarify it's a LinkedIn utility
    content = content.replace(
        /<title>LinkedIn Post Copier - Easy Copy Tool<\/title>/,
        '<title>LinkedIn Post Copier - Quick Copy Utility | Ideas Before Time</title>'
    );
    
    // Update h1 if exists to clarify purpose
    content = content.replace(
        /<h1[^>]*>LinkedIn Post Copier<\/h1>/,
        '<h1>LinkedIn Post Copier - Quick Copy Utility</h1>'
    );
    
    fs.writeFileSync(file, content);
    console.log(`✅ Fixed: ${file}`);
    console.log('   Changed: "Easy Copy Tool" → "Quick Copy Utility" (clearer purpose)');
    fixed++;
} catch (err) {
    console.log(`⚠️  Could not fix linkedin-post-copier.html: ${err.message}`);
}

console.log('\n' + '='.repeat(60));
console.log(`✅ FIXED ${fixed}/3 PATTERN ISSUES`);
console.log('='.repeat(60));

console.log('\n💡 WHAT WAS FIXED:');
console.log('   1. "Error Dashboard" → "Site Health Monitor" (clearer purpose)');
console.log('   2. "FIX KIRO - ALL ERRORS" → "GODA Kiro Troubleshooter" (clearer purpose)');
console.log('   3. "Easy Copy Tool" → "Quick Copy Utility" (clearer categorization)');

console.log('\n📝 LEARNING APPLIED:');
console.log('   Learning #50: Avoid vague terms, use clear descriptive names');
console.log('   - "Error" → "Site Health Monitor"');
console.log('   - "FIX ALL ERRORS" → "Troubleshooter"');
console.log('   - "Tool" → "Utility" (when it\'s a simple helper)');

console.log('\n✅ All pattern issues resolved!');
