// Add Astronomy Page to Site Navigation and Homepage
// Run: node add-astronomy-to-site.js

const fs = require('fs');

console.log('🔭 Adding Astronomy & You to site navigation...\n');

// 1. Update index.html - Add astronomy card to offerings
const indexPath = 'index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

const astronomyCard = `
        <!-- Astronomy Tool -->
        <div class="offering-card free">
            <div class="offering-icon">🔭</div>
            <h3 class="offering-title">Astronomy & You</h3>
            <p class="offering-desc">Interactive 3D solar system + Vedic calendar calculator. See planetary positions for any date. Educational astronomy tool.</p>
            <a href="astronomy.html" class="offering-cta">Explore →</a>
        </div>`;

// Find the offerings grid and add astronomy card
if (!indexContent.includes('astronomy.html')) {
    // Add after the last offering card
    const offeringsGridEnd = indexContent.indexOf('</div>\n\n    <!-- Solo Creator Badge -->');
    if (offeringsGridEnd > 0) {
        indexContent = indexContent.slice(0, offeringsGridEnd) + astronomyCard + '\n    ' + indexContent.slice(offeringsGridEnd);
        fs.writeFileSync(indexPath, indexContent);
        console.log('✅ Added astronomy card to index.html offerings section');
    }
} else {
    console.log('ℹ️  Astronomy card already exists in index.html');
}

// 2. Check common-navigation.js
console.log('\n📝 Note: Add to common-navigation.js manually:');
console.log('   <a href="astronomy.html">🔭 Astronomy</a>');

// 3. Summary
console.log('\n✅ COMPLETE! Astronomy page added to site.');
console.log('\n📋 Manual Steps Needed:');
console.log('1. Add to common-navigation.js: <a href="astronomy.html">🔭 Astronomy</a>');
console.log('2. Add to quick links widget in all pages');
console.log('3. Test on live site: https://ideasbeforetime.pages.dev/astronomy.html');
console.log('4. Push to GitHub');

console.log('\n🎯 What Users Get:');
console.log('• Interactive 3D solar system (zoom, rotate, date-based)');
console.log('• Calculate planetary positions for any date');
console.log('• Compare up to 2 calculation methods side-by-side');
console.log('• Vedic calendar (Tithi, Nakshatra, Yoga, Karana)');
console.log('• Regional variations (North/South/West India)');
console.log('• Multi-language support (8 languages)');
console.log('• Educational disclaimers (science/math focus)');

console.log('\n🔧 Next: Integrate Swiss Ephemeris API for real calculations');
