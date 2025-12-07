// CONTENT CONSISTENCY TEST - Level 1 Critical Tests
// Run: node test-content-consistency.js

const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║     CONTENT CONSISTENCY TEST - LEVEL 1 CRITICAL            ║');
console.log('║     Business Cannot Fail - Testing What Matters            ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log(`📊 Testing ${files.length} HTML files\n`);

const results = {
    pricing: { pass: [], fail: [], details: [] },
    refundPolicy: { pass: [], fail: [], details: [] },
    contactEmail: { pass: [], fail: [], details: [] },
    brokenLinks: { pass: [], fail: [], details: [] },
    missingImages: { pass: [], fail: [], details: [] },
    titleTags: { pass: [], fail: [] },
    viewport: { pass: [], fail: [] }
};

// SPO files that must have correct pricing
const spoFiles = [
    'social-optimizer-index.html',
    'social-optimizer-app.html',
    'social-optimizer-dashboard.html',
    'social-optimizer-admin.html',
    'social-optimizer-success.html',
    'social-optimizer-quickstart.html'
];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // TEST 1: Pricing Consistency (SPO files only)
    if (spoFiles.includes(file)) {
        const has21 = content.includes('₹21') || content.includes('Rs. 21') || content.includes('Rs 21');
        const hasWrongPrice = content.includes('₹99') || content.includes('₹299') || content.includes('₹999');
        
        if (has21 && !hasWrongPrice) {
            results.pricing.pass.push(file);
        } else {
            results.pricing.fail.push(file);
            if (!has21) results.pricing.details.push(`${file}: Missing ₹21`);
            if (hasWrongPrice) results.pricing.details.push(`${file}: Has wrong price (₹99/₹299/₹999)`);
        }
    }
    
    // TEST 2: Refund Policy (SPO files only)
    if (spoFiles.includes(file)) {
        const hasNoRefunds = content.includes('NO REFUNDS') || content.includes('no refunds') || content.includes('refunds are not applicable');
        const hasWrongRefund = content.includes('24 hours refund') || content.includes('7 days refund') || content.includes('money-back guarantee');
        
        if (hasNoRefunds || !hasWrongRefund) {
            results.refundPolicy.pass.push(file);
        } else {
            results.refundPolicy.fail.push(file);
            if (hasWrongRefund) results.refundPolicy.details.push(`${file}: Has wrong refund policy`);
        }
    }
    
    // TEST 3: Contact Email Consistency
    const hasCorrectEmail = content.includes('onestepforthelife@gmail.com');
    const hasWrongEmail = content.includes('@example.com') || content.includes('@test.com');
    
    if (hasCorrectEmail || !hasWrongEmail) {
        results.contactEmail.pass.push(file);
    } else if (hasWrongEmail) {
        results.contactEmail.fail.push(file);
        results.contactEmail.details.push(`${file}: Has wrong email`);
    }
    
    // TEST 4: Broken Internal Links
    const linkMatches = content.match(/href=["']([^"']+)["']/g) || [];
    linkMatches.forEach(match => {
        const href = match.match(/href=["']([^"']+)["']/)[1];
        // Check internal HTML links
        if (href.endsWith('.html') && !href.startsWith('http')) {
            const targetFile = href.split('/').pop();
            if (!fs.existsSync(targetFile)) {
                results.brokenLinks.fail.push(file);
                results.brokenLinks.details.push(`${file}: Broken link to ${href}`);
            }
        }
    });
    
    // TEST 5: Missing Images
    const imgMatches = content.match(/src=["']([^"']+\.(jpg|jpeg|png|gif|svg))["']/gi) || [];
    imgMatches.forEach(match => {
        const src = match.match(/src=["']([^"']+)["']/i)[1];
        // Check local images only
        if (!src.startsWith('http') && !src.startsWith('data:')) {
            if (!fs.existsSync(src)) {
                results.missingImages.fail.push(file);
                results.missingImages.details.push(`${file}: Missing image ${src}`);
            }
        }
    });
    
    // TEST 6: Title Tags
    if (content.includes('<title>') && content.includes('</title>')) {
        results.titleTags.pass.push(file);
    } else {
        results.titleTags.fail.push(file);
    }
    
    // TEST 7: Viewport Meta Tag
    if (content.includes('viewport')) {
        results.viewport.pass.push(file);
    } else {
        results.viewport.fail.push(file);
    }
});

// Remove duplicates from broken links and missing images
results.brokenLinks.fail = [...new Set(results.brokenLinks.fail)];
results.missingImages.fail = [...new Set(results.missingImages.fail)];

// Print Results
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('💰 PRICING CONSISTENCY (SPO Pages)');
console.log(`   ✅ Pass: ${results.pricing.pass.length}/${spoFiles.length}`);
console.log(`   ❌ Fail: ${results.pricing.fail.length}/${spoFiles.length}`);
if (results.pricing.details.length > 0) {
    console.log('   Issues:');
    results.pricing.details.forEach(d => console.log(`      ${d}`));
}
console.log('');

console.log('🔄 REFUND POLICY (SPO Pages)');
console.log(`   ✅ Pass: ${results.refundPolicy.pass.length}/${spoFiles.length}`);
console.log(`   ❌ Fail: ${results.refundPolicy.fail.length}/${spoFiles.length}`);
if (results.refundPolicy.details.length > 0) {
    console.log('   Issues:');
    results.refundPolicy.details.forEach(d => console.log(`      ${d}`));
}
console.log('');

console.log('📧 CONTACT EMAIL');
console.log(`   ✅ Pass: ${results.contactEmail.pass.length}`);
console.log(`   ❌ Fail: ${results.contactEmail.fail.length}`);
if (results.contactEmail.details.length > 0) {
    console.log('   Issues:');
    results.contactEmail.details.forEach(d => console.log(`      ${d}`));
}
console.log('');

console.log('🔗 BROKEN INTERNAL LINKS');
console.log(`   ✅ Pass: ${files.length - results.brokenLinks.fail.length}`);
console.log(`   ❌ Fail: ${results.brokenLinks.fail.length}`);
if (results.brokenLinks.details.length > 0) {
    console.log('   Issues:');
    results.brokenLinks.details.slice(0, 10).forEach(d => console.log(`      ${d}`));
    if (results.brokenLinks.details.length > 10) {
        console.log(`      ... and ${results.brokenLinks.details.length - 10} more`);
    }
}
console.log('');

console.log('🖼️  MISSING IMAGES');
console.log(`   ✅ Pass: ${files.length - results.missingImages.fail.length}`);
console.log(`   ❌ Fail: ${results.missingImages.fail.length}`);
if (results.missingImages.details.length > 0) {
    console.log('   Issues:');
    results.missingImages.details.slice(0, 10).forEach(d => console.log(`      ${d}`));
    if (results.missingImages.details.length > 10) {
        console.log(`      ... and ${results.missingImages.details.length - 10} more`);
    }
}
console.log('');

console.log('📄 TITLE TAGS');
console.log(`   ✅ Pass: ${results.titleTags.pass.length}`);
console.log(`   ❌ Fail: ${results.titleTags.fail.length}`);
if (results.titleTags.fail.length > 0) {
    console.log('   Missing from:');
    results.titleTags.fail.forEach(f => console.log(`      ${f}`));
}
console.log('');

console.log('📱 VIEWPORT META TAG');
console.log(`   ✅ Pass: ${results.viewport.pass.length}`);
console.log(`   ❌ Fail: ${results.viewport.fail.length}`);
if (results.viewport.fail.length > 0) {
    console.log('   Missing from:');
    results.viewport.fail.forEach(f => console.log(`      ${f}`));
}
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Calculate total issues
const totalIssues = results.pricing.fail.length + 
                    results.refundPolicy.fail.length + 
                    results.contactEmail.fail.length + 
                    results.brokenLinks.details.length + 
                    results.missingImages.details.length +
                    results.titleTags.fail.length +
                    results.viewport.fail.length;

if (totalIssues === 0) {
    console.log('✅ ALL CONTENT TESTS PASSED! Site is consistent.\n');
    process.exit(0);
} else {
    console.log(`❌ FOUND ${totalIssues} CONTENT ISSUES - Need to fix!\n`);
    process.exit(1);
}

