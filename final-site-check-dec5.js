// Final Site Check - December 5, 2025
// Comprehensive check before final push

const fs = require('fs');
const path = require('path');

console.log('🔍 FINAL SITE CHECK - December 5, 2025\n');
console.log('=' .repeat(60));

const issues = [];
const warnings = [];
const success = [];

// Check 1: Multi-Provider AI files ready
console.log('\n📦 CHECK 1: Multi-Provider AI Files');
const aiFiles = [
    'AI_MULTI_PROVIDER_FAILOVER.js',
    'test-multi-ai.html',
    'MULTI_PROVIDER_AI_COMPLETE.txt'
];

aiFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (file === 'AI_MULTI_PROVIDER_FAILOVER.js') {
            if (content.includes('gsk_1p8qGfJWoN3kLZyX4rT9WGJyb3FYvM2aKdH5cN6pQ7sR8tU0vW')) {
                success.push(`✅ ${file} - Groq key added`);
            }
            if (content.includes('AIzaSyBi2TD5oDtTLKax9cj1ClxLtZYQRg0s9a8')) {
                success.push(`✅ ${file} - Gemini key added`);
            }
            if (content.includes('hf_EgCNxQzKpLmRsVwYtBnDfGhIjKlMnOpQrStUvWxYz')) {
                success.push(`✅ ${file} - Hugging Face key added`);
            }
            if (content.includes('2XLIvK9mNpQrStUvWxYzAbCdEfGhIjKlMn')) {
                success.push(`✅ ${file} - Cohere key added`);
            }
        } else {
            success.push(`✅ ${file} exists`);
        }
    } else {
        issues.push(`❌ ${file} missing`);
    }
});

// Check 2: RO Guide updated
console.log('\n📄 CHECK 2: RO Water Purifier Guide');
if (fs.existsSync('ro-water-purifier-guide.html')) {
    const content = fs.readFileSync('ro-water-purifier-guide.html', 'utf8');
    if (content.includes('onestepforthe-21')) {
        success.push('✅ RO guide has Amazon affiliate tag');
    } else {
        warnings.push('⚠️  RO guide missing Amazon affiliate tag');
    }
    if (content.includes('Protecting Your Health at the Final Mile')) {
        success.push('✅ RO guide has updated section title');
    }
    if (content.includes('images/RO printable checklis.png')) {
        success.push('✅ RO guide has checklist image');
    }
} else {
    issues.push('❌ ro-water-purifier-guide.html missing');
}

// Check 3: Astronomy page
console.log('\n🔭 CHECK 3: Astronomy Page');
if (fs.existsSync('astronomy.html')) {
    success.push('✅ astronomy.html exists');
} else {
    issues.push('❌ astronomy.html missing');
}

// Check 4: Blog posts
console.log('\n📝 CHECK 4: Blog Posts');
let blogCount = 0;
for (let i = 1; i <= 100; i++) {
    if (fs.existsSync(`blog-post-${i}.html`)) {
        blogCount++;
    }
}
if (blogCount === 100) {
    success.push(`✅ All 100 blog posts exist`);
} else {
    warnings.push(`⚠️  Only ${blogCount}/100 blog posts found`);
}

// Check 5: Navigation consistency
console.log('\n🧭 CHECK 5: Navigation Files');
const navFiles = ['common-navigation.js', 'common-footer.js', 'common-footer.css'];
navFiles.forEach(file => {
    if (fs.existsSync(file)) {
        success.push(`✅ ${file} exists`);
    } else {
        issues.push(`❌ ${file} missing`);
    }
});

// Check 6: Market reports
console.log('\n📊 CHECK 6: Market Reports');
const reports = [
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Final_Acrylic_Market_Report.html',
    'Poloxamer_Market_Report.html',
    'nickel-esg-report.html'
];
reports.forEach(report => {
    if (fs.existsSync(report)) {
        success.push(`✅ ${report} exists`);
    } else {
        warnings.push(`⚠️  ${report} missing`);
    }
});

// Check 7: SPO files
console.log('\n💼 CHECK 7: SPO Files');
const spoFiles = [
    'social-optimizer-app.html',
    'social-optimizer-app.js',
    'social-optimizer-ai-engine.js',
    'spo.html'
];
spoFiles.forEach(file => {
    if (fs.existsSync(file)) {
        success.push(`✅ ${file} exists`);
    } else {
        issues.push(`❌ ${file} missing`);
    }
});

// Summary
console.log('\n' + '='.repeat(60));
console.log('\n📊 SUMMARY:\n');
console.log(`✅ Success: ${success.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);
console.log(`❌ Issues: ${issues.length}`);

console.log('\n✅ SUCCESS:');
success.forEach(s => console.log(`   ${s}`));

if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log(`   ${w}`));
}

if (issues.length > 0) {
    console.log('\n❌ ISSUES:');
    issues.forEach(i => console.log(`   ${i}`));
}

console.log('\n' + '='.repeat(60));

// Final verdict
if (issues.length === 0) {
    console.log('\n🎉 READY TO PUSH VIA GITHUB DESKTOP!');
    console.log('\nFiles to push:');
    console.log('   1. AI_MULTI_PROVIDER_FAILOVER.js');
    console.log('   2. test-multi-ai.html');
    console.log('   3. MULTI_PROVIDER_AI_COMPLETE.txt');
    console.log('   4. PUSH_NOW_VIA_GITHUB_DESKTOP.txt');
    console.log('   5. EVERYTHING_PUSHED_COMPLETE_DEC5.txt');
    console.log('   6. final-site-check-dec5.js');
    console.log('\nAction: Open GitHub Desktop → Commit → Push');
} else {
    console.log('\n⚠️  FIX ISSUES BEFORE PUSHING!');
}

console.log('\n' + '='.repeat(60));
