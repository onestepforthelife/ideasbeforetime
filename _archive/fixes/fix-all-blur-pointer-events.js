const fs = require('fs');

console.log('🔧 Fixing Blur Pointer-Events Issues Across All Pages...\n');

// Files that have blur overlays with interactive elements
const filesToFix = [
    'cv-preview.html',
    'research-preview.html',
    'social-optimizer-app.html'
];

let fixCount = 0;
let alreadyFixed = 0;

filesToFix.forEach(file => {
    console.log(`\n📄 Checking ${file}...`);
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Fix 1: Add pointer-events: auto to blur-overlay
        if (content.includes('.blur-overlay {') && !content.includes('.blur-overlay {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 50%);\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            flex-direction: column;\n            padding: 40px;\n            text-align: center;\n            pointer-events: auto;')) {
            
            // Check if already has pointer-events: auto
            const blurOverlayRegex = /\.blur-overlay\s*{[^}]*}/g;
            const match = content.match(blurOverlayRegex);
            
            if (match && !match[0].includes('pointer-events: auto')) {
                content = content.replace(
                    /\.blur-overlay\s*{/,
                    '.blur-overlay {\n            pointer-events: auto; /* Allow clicks on overlay */'
                );
                modified = true;
                console.log('   ✅ Added pointer-events: auto to .blur-overlay');
            } else if (match && match[0].includes('pointer-events: auto')) {
                console.log('   ✓ .blur-overlay already has pointer-events: auto');
                alreadyFixed++;
            }
        }
        
        // Fix 2: Add pointer-events: auto to unlock-box
        if (content.includes('.unlock-box {') && !content.includes('pointer-events: auto')) {
            const unlockBoxRegex = /\.unlock-box\s*{[^}]*}/g;
            const match = content.match(unlockBoxRegex);
            
            if (match && !match[0].includes('pointer-events: auto')) {
                content = content.replace(
                    /\.unlock-box\s*{/,
                    '.unlock-box {\n            pointer-events: auto; /* Allow clicks on buttons */'
                );
                modified = true;
                console.log('   ✅ Added pointer-events: auto to .unlock-box');
            } else if (match && match[0].includes('pointer-events: auto')) {
                console.log('   ✓ .unlock-box already has pointer-events: auto');
                alreadyFixed++;
            }
        }
        
        // Fix 3: Add pointer-events: auto to access-cta (for reports)
        if (content.includes('.access-cta {') && !content.includes('pointer-events: auto')) {
            const accessCtaRegex = /\.access-cta\s*{[^}]*}/g;
            const match = content.match(accessCtaRegex);
            
            if (match && !match[0].includes('pointer-events: auto')) {
                content = content.replace(
                    /\.access-cta\s*{/,
                    '.access-cta {\n            pointer-events: auto; /* Allow clicks on CTA */'
                );
                modified = true;
                console.log('   ✅ Added pointer-events: auto to .access-cta');
            }
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            fixCount++;
            console.log(`   💾 Saved ${file}`);
        } else {
            console.log('   ⚠️ No changes needed or already fixed');
        }
        
    } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
    }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed ${fixCount} files`);
console.log(`✓ ${alreadyFixed} files already had correct pointer-events`);
console.log('='.repeat(60));

if (fixCount > 0) {
    console.log('\n🎉 All blur overlay issues fixed!');
    console.log('   • Buttons are now clickable');
    console.log('   • User can interact with unlock sections');
    console.log('   • CTAs work properly');
} else {
    console.log('\n✓ All files already have correct pointer-events settings');
}

console.log('\n📋 Files checked:');
filesToFix.forEach(file => console.log(`   • ${file}`));
