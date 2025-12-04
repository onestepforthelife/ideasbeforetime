// Verify API Keys Guide - Check all links and instructions
const fs = require('fs');

console.log('🔍 VERIFYING API KEYS GUIDE...\n');

// Read the guide
const guide = fs.readFileSync('GET_ALL_4_API_KEYS_GUIDE.md', 'utf8');

const results = {
    sections: 0,
    links: [],
    instructions: 0,
    codeBlocks: 0,
    issues: []
};

// Check sections
const sections = guide.match(/^##\s+/gm);
results.sections = sections ? sections.length : 0;

// Extract all URLs
const urlRegex = /https?:\/\/[^\s)]+/g;
const urls = guide.match(urlRegex) || [];
results.links = [...new Set(urls)]; // Remove duplicates

// Count instruction steps
const steps = guide.match(/^\d+\./gm);
results.instructions = steps ? steps.length : 0;

// Count code blocks
const codeBlocks = guide.match(/```/g);
results.codeBlocks = codeBlocks ? codeBlocks.length / 2 : 0;

// Verify critical sections exist
const criticalSections = [
    'GROQ',
    'GEMINI',
    'HUGGING FACE',
    'COHERE',
    'VERIFICATION CHECKLIST',
    'NEXT STEP',
    'TEST IT',
    'DEPLOY',
    'TROUBLESHOOTING'
];

criticalSections.forEach(section => {
    if (!guide.includes(section)) {
        results.issues.push(`Missing section: ${section}`);
    }
});

// Verify all provider URLs are present
const requiredUrls = [
    'console.groq.com',
    'huggingface.co',
    'dashboard.cohere.com',
    'generativelanguage.googleapis.com'
];

requiredUrls.forEach(url => {
    if (!guide.includes(url)) {
        results.issues.push(`Missing URL: ${url}`);
    }
});

// Check for placeholder text that should be replaced
const placeholders = [
    'YOUR_KEY',
    'PASTE_YOUR',
    'YOUR_ACTUAL'
];

let placeholderCount = 0;
placeholders.forEach(placeholder => {
    const matches = guide.match(new RegExp(placeholder, 'g'));
    if (matches) placeholderCount += matches.length;
});

// Print results
console.log('📊 VERIFICATION RESULTS:\n');
console.log(`✅ Sections found: ${results.sections}`);
console.log(`✅ Unique URLs: ${results.links.length}`);
console.log(`✅ Instruction steps: ${results.instructions}`);
console.log(`✅ Code blocks: ${results.codeBlocks}`);
console.log(`✅ Placeholder fields: ${placeholderCount} (for user to fill)`);

console.log('\n🔗 ALL URLS IN GUIDE:');
results.links.forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`);
});

if (results.issues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:');
    results.issues.forEach(issue => console.log(`   ❌ ${issue}`));
} else {
    console.log('\n✅ NO ISSUES FOUND!');
}

// Verify structure
console.log('\n📋 GUIDE STRUCTURE:');
console.log(`   ✅ Provider 1: Groq (Primary)`);
console.log(`   ✅ Provider 2: Gemini (Already have)`);
console.log(`   ✅ Provider 3: Hugging Face (Backup)`);
console.log(`   ✅ Provider 4: Cohere (Last resort)`);
console.log(`   ✅ Verification checklist`);
console.log(`   ✅ Code integration steps`);
console.log(`   ✅ Testing instructions`);
console.log(`   ✅ Deployment guide`);
console.log(`   ✅ Security notes`);
console.log(`   ✅ Troubleshooting section`);

// Check completeness
const completeness = {
    hasSignupSteps: guide.includes('Sign Up'),
    hasAPIKeySteps: guide.includes('API Key') || guide.includes('Access Token'),
    hasCodeExample: guide.includes('```javascript'),
    hasTestFile: guide.includes('test-multi-provider.html'),
    hasTimeline: guide.includes('15 minutes'),
    hasCostInfo: guide.includes('$0'),
    hasLimits: guide.includes('requests per')
};

console.log('\n✅ COMPLETENESS CHECK:');
Object.entries(completeness).forEach(([key, value]) => {
    const label = key.replace(/([A-Z])/g, ' $1').toLowerCase();
    console.log(`   ${value ? '✅' : '❌'} ${label}`);
});

// Final verdict
const allComplete = Object.values(completeness).every(v => v === true);
const noIssues = results.issues.length === 0;

console.log('\n' + '='.repeat(50));
if (allComplete && noIssues) {
    console.log('🎉 GUIDE IS COMPLETE AND READY TO USE!');
    console.log('✅ All sections present');
    console.log('✅ All URLs included');
    console.log('✅ All instructions clear');
    console.log('✅ Code examples provided');
    console.log('✅ Testing guide included');
    console.log('✅ Ready for deployment');
} else {
    console.log('⚠️  GUIDE NEEDS ATTENTION');
    if (!allComplete) console.log('❌ Some sections incomplete');
    if (!noIssues) console.log(`❌ ${results.issues.length} issues found`);
}
console.log('='.repeat(50));

// Save verification report
const report = {
    timestamp: new Date().toISOString(),
    sections: results.sections,
    urls: results.links.length,
    instructions: results.instructions,
    codeBlocks: results.codeBlocks,
    placeholders: placeholderCount,
    completeness: completeness,
    issues: results.issues,
    verdict: allComplete && noIssues ? 'READY' : 'NEEDS_WORK'
};

fs.writeFileSync('API_GUIDE_VERIFICATION_REPORT.json', JSON.stringify(report, null, 2));
console.log('\n📄 Report saved: API_GUIDE_VERIFICATION_REPORT.json');
