// Update all 6 GODA files with payment button check (Learning #56)
const fs = require('fs');

console.log('🔄 Updating all 6 GODA files with payment button check...\n');

// 1. Custom Test - Already updated manually
console.log('✅ 1/6: GODA-Best-Testing-Protocol-Custom.js - Already updated');

// 2. Universal Test
console.log('📝 2/6: Updating GODA-Worlds-Best-Testing-Protocol.js...');
const universal = fs.readFileSync('GODA-Worlds-Best-Testing-Protocol.js', 'utf8');
if (!universal.includes('Payment button')) {
    const updatedUniversal = universal.replace(
        /\/\/ Check pricing[\s\S]*?console\.log\(`   \$\{spo\.includes\('₹21'\)/,
        `// Check pricing
    if (!spo.includes('₹21') && !spo.includes('Rs. 21')) {
        ISSUES.high.push('SPO pricing not found');
    }
    
    // Check payment button (Learning #56)
    const hasPayButton = spo.includes('Pay Now') || spo.includes('razorpay');
    if (!hasPayButton) {
        ISSUES.critical.push('SPO: Payment button MISSING!');
    }
    
    console.log(\`   \${spo.includes('₹21')`
    );
    fs.writeFileSync('GODA-Worlds-Best-Testing-Protocol.js', updatedUniversal);
    console.log('   ✅ Added payment button check');
} else {
    console.log('   ✅ Already has payment button check');
}

// 3. Auto-Repair System
console.log('📝 3/6: Updating GODA-Auto-Repair-System.js...');
const autoRepair = fs.readFileSync('GODA-Auto-Repair-System.js', 'utf8');
if (!autoRepair.includes('Payment button')) {
    // Add to fixes array
    const updatedRepair = autoRepair.replace(
        /const fixes = \[/,
        `const fixes = [
    {
        name: 'Payment Button Missing',
        check: () => {
            const spo = fs.existsSync('social-optimizer-app.html') ? fs.readFileSync('social-optimizer-app.html', 'utf8') : '';
            const astro = fs.existsSync('astronomy.html') ? fs.readFileSync('astronomy.html', 'utf8') : '';
            return !spo.includes('Pay Now') || !astro.includes('Pay Now');
        },
        fix: () => {
            console.log('   ⚠️  Payment buttons missing - run add-payment-buttons-spo-astronomy.js');
            return false; // Cannot auto-fix, needs manual script
        },
        severity: 'critical'
    },`
    );
    fs.writeFileSync('GODA-Auto-Repair-System.js', updatedRepair);
    console.log('   ✅ Added payment button check to auto-repair');
} else {
    console.log('   ✅ Already has payment button check');
}

// 4. Custom Flowchart
console.log('📝 4/6: Updating GODA-Best-Testing-Flowchart-Custom.md...');
const customFlow = fs.readFileSync('GODA-Best-Testing-Flowchart-Custom.md', 'utf8');
if (!customFlow.includes('Payment button')) {
    const updatedCustomFlow = customFlow.replace(
        /### Phase 6: SPO Tool[\s\S]*?### Phase 7/,
        `### Phase 6: SPO Tool
- File exists: social-optimizer-app.html
- Pricing displayed: ₹21
- **Payment button exists: "Pay Now" or Razorpay** ← NEW (Learning #56)
- **Razorpay integration: rzp_live_ key** ← NEW
- NO REFUNDS policy stated
- Form exists for user input
- **Astronomy payment button** ← NEW

### Phase 7`
    );
    fs.writeFileSync('GODA-Best-Testing-Flowchart-Custom.md', updatedCustomFlow);
    console.log('   ✅ Added payment button to flowchart');
} else {
    console.log('   ✅ Already has payment button in flowchart');
}

// 5. Universal Flowchart
console.log('📝 5/6: Updating GODA-Worlds-Best-Testing-Flowchart.md...');
const universalFlow = fs.readFileSync('GODA-Worlds-Best-Testing-Flowchart.md', 'utf8');
if (!universalFlow.includes('Payment button')) {
    const updatedUniversalFlow = universalFlow.replace(
        /## Manual Testing Checklist/,
        `## Payment Integration Check (Learning #56)
**CRITICAL - Must verify payment buttons exist:**
- SPO tool has "Pay Now ₹21" button
- Astronomy tool has "Pay Now ₹21" button
- Razorpay integration configured
- Payment verification before tool use

## Manual Testing Checklist`
    );
    fs.writeFileSync('GODA-Worlds-Best-Testing-Flowchart.md', updatedUniversalFlow);
    console.log('   ✅ Added payment section to universal flowchart');
} else {
    console.log('   ✅ Already has payment section');
}

// 6. Auto-Repair Log
console.log('📝 6/6: Updating GODA-AUTO-REPAIR-LOG.txt...');
const log = fs.readFileSync('GODA-AUTO-REPAIR-LOG.txt', 'utf8');
const newEntry = `
[${new Date().toISOString()}] Learning #56: Payment Button Check Added
- Added to Custom Test: Check SPO + Astronomy payment buttons
- Added to Universal Test: Payment button verification
- Added to Auto-Repair: Detect missing payment buttons
- Added to Flowcharts: Document payment requirements
- CRITICAL: Tests now catch missing payment buttons before deployment
`;
fs.appendFileSync('GODA-AUTO-REPAIR-LOG.txt', newEntry);
console.log('   ✅ Logged update to repair log');

console.log('\n✅ ALL 6 GODA FILES UPDATED!');
console.log('\n📊 Summary:');
console.log('   1. Custom Test: Payment button check added');
console.log('   2. Universal Test: Payment button check added');
console.log('   3. Auto-Repair: Payment button detection added');
console.log('   4. Custom Flowchart: Payment requirements documented');
console.log('   5. Universal Flowchart: Payment section added');
console.log('   6. Repair Log: Update logged');
console.log('\n🎯 Now run: node GODA-Best-Testing-Protocol-Custom.js');
