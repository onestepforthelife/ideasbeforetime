// TEST SPO COMPLETE USER FLOW
// Tests EVERY step from start to finish

const fs = require('fs');

console.log('🧪 TESTING SPO COMPLETE USER FLOW\n');
console.log('Testing: https://ideasbeforetime.pages.dev/social-optimizer-app.html\n');

const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
};

function test(name, condition, details = '') {
    const result = {
        name,
        passed: condition,
        details
    };
    
    if (condition) {
        console.log(`✅ ${name}`);
        results.passed++;
    } else {
        console.log(`❌ ${name}`);
        if (details) console.log(`   ${details}`);
        results.failed++;
    }
    
    results.tests.push(result);
}

function warning(name, details) {
    console.log(`⚠️  ${name}`);
    if (details) console.log(`   ${details}`);
    results.warnings++;
}

// Read the SPO file
const spoFile = 'social-optimizer-app.html';
let content = '';

try {
    content = fs.readFileSync(spoFile, 'utf8');
} catch (err) {
    console.log(`❌ Cannot read ${spoFile}`);
    process.exit(1);
}

console.log('═══════════════════════════════════════════════════════════\n');
console.log('📋 PAGE 1: PROFILE INPUT\n');

// Test 1: Form exists
test(
    'Profile input form exists',
    content.includes('id="profileForm"') || content.includes('class="profile-form"'),
    'Form should have proper ID or class'
);

// Test 2: Required fields
const requiredFields = ['name', 'headline', 'about', 'experience', 'skills'];
requiredFields.forEach(field => {
    test(
        `Field "${field}" exists`,
        content.includes(`name="${field}"`) || content.includes(`id="${field}"`),
        `Input field for ${field} should exist`
    );
});

// Test 3: Next button
test(
    'Next button exists on page 1',
    content.includes('Next') && (content.includes('onclick') || content.includes('type="submit"')),
    'Should have clickable Next button'
);

// Test 4: Navigation to page 2
test(
    'Navigation logic to page 2 exists',
    content.includes('page2') || content.includes('step-2') || content.includes('showPage(2)'),
    'Should have code to navigate to page 2'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('📋 PAGE 2: CONTENT GENERATION\n');

// Test 5: Page 2 exists
test(
    'Page 2 section exists',
    content.includes('page-2') || content.includes('step2') || content.includes('content-generation'),
    'Should have page 2 HTML structure'
);

// Test 6: AI generation button
test(
    'Generate content button exists',
    content.includes('generate') && content.includes('button'),
    'Should have button to generate AI content'
);

// Test 7: Preview area
test(
    'Content preview area exists',
    content.includes('preview') || content.includes('generated-content') || content.includes('output'),
    'Should have area to show generated content'
);

// Test 8: Back button
test(
    'Back button exists',
    content.includes('Back') || content.includes('Previous'),
    'Should allow going back to page 1'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('📋 PAGE 3: PAYMENT\n');

// Test 9: Payment section
test(
    'Payment section exists',
    content.includes('payment') || content.includes('₹21') || content.includes('razorpay'),
    'Should have payment section'
);

// Test 10: Payment methods
test(
    'Razorpay integration exists',
    content.includes('razorpay') && content.includes('rzp_live'),
    'Should have Razorpay live key'
);

// Test 11: Access code option
test(
    'Access code input exists',
    content.includes('access') && content.includes('code') && content.includes('input'),
    'Should allow entering access codes'
);

// Test 12: Transaction ID verification
test(
    'Transaction ID verification exists',
    content.includes('transaction') && content.includes('verify'),
    'Should allow manual transaction verification'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('📋 PAGE 4: DOWNLOAD\n');

// Test 13: Download section
test(
    'Download section exists',
    content.includes('download') || content.includes('export'),
    'Should have download/export functionality'
);

// Test 14: Multiple formats
test(
    'Multiple download formats available',
    (content.includes('PDF') || content.includes('pdf')) && 
    (content.includes('DOCX') || content.includes('docx') || content.includes('Word')),
    'Should offer PDF and Word formats'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('🔄 DATA PERSISTENCE\n');

// Test 15: LocalStorage usage
test(
    'Data persistence with localStorage',
    content.includes('localStorage'),
    'Should save user data to prevent loss'
);

// Test 16: Session management
test(
    'Session/state management exists',
    content.includes('sessionStorage') || content.includes('state') || content.includes('data'),
    'Should manage user session'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('🔗 NAVIGATION\n');

// Test 17: Page navigation system
test(
    'Multi-page navigation system exists',
    content.includes('showPage') || content.includes('currentPage') || content.includes('step'),
    'Should have system to switch between pages'
);

// Test 18: Progress indicator
test(
    'Progress indicator exists',
    content.includes('progress') || content.includes('step 1') || content.includes('1/4'),
    'Should show user progress through steps'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('⚠️  CRITICAL CHECKS\n');

// Test 19: Form validation
test(
    'Form validation exists',
    content.includes('required') || content.includes('validate'),
    'Should validate user inputs'
);

// Test 20: Error handling
test(
    'Error handling exists',
    content.includes('error') && content.includes('catch'),
    'Should handle errors gracefully'
);

// Test 21: Loading states
test(
    'Loading indicators exist',
    content.includes('loading') || content.includes('spinner'),
    'Should show loading during AI generation'
);

// Test 22: API integration
test(
    'Gemini API integration exists',
    content.includes('gemini') || content.includes('generativelanguage'),
    'Should call Gemini API for AI generation'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('🎨 USER EXPERIENCE\n');

// Test 23: Responsive design
test(
    'Mobile responsive CSS exists',
    content.includes('@media') || content.includes('mobile'),
    'Should work on mobile devices'
);

// Test 24: Clear instructions
test(
    'User instructions exist',
    content.includes('Enter your') || content.includes('Fill in') || content.includes('instructions'),
    'Should guide users through process'
);

// Test 25: Demo/example data
test(
    'Demo button or example data exists',
    content.includes('demo') || content.includes('example') || content.includes('sample'),
    'Should offer demo to help users understand'
);

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('📊 TEST RESULTS\n');
console.log(`✅ Passed: ${results.passed}`);
console.log(`❌ Failed: ${results.failed}`);
console.log(`⚠️  Warnings: ${results.warnings}`);
console.log(`📈 Success Rate: ${Math.round((results.passed / (results.passed + results.failed)) * 100)}%\n`);

if (results.failed === 0) {
    console.log('🎉 ALL TESTS PASSED! SPO flow is complete!\n');
} else {
    console.log('⚠️  SOME TESTS FAILED - Review and fix issues\n');
    console.log('Failed tests:');
    results.tests.filter(t => !t.passed).forEach(t => {
        console.log(`  • ${t.name}`);
        if (t.details) console.log(`    ${t.details}`);
    });
}

console.log('\n═══════════════════════════════════════════════════════════\n');
console.log('🎯 MANUAL TESTING CHECKLIST\n');
console.log('After automated tests, manually verify:\n');
console.log('☐ 1. Open SPO in browser');
console.log('☐ 2. Fill profile form → Click Next');
console.log('☐ 3. Generate content → Verify AI output');
console.log('☐ 4. Go back → Verify data persists');
console.log('☐ 5. Proceed to payment → Test access code');
console.log('☐ 6. Test transaction ID verification');
console.log('☐ 7. Download content → Verify formats');
console.log('☐ 8. Test on mobile device');
console.log('☐ 9. Test with slow internet');
console.log('☐ 10. Test error scenarios\n');

console.log('═══════════════════════════════════════════════════════════\n');

// Save results
fs.writeFileSync('SPO_COMPLETE_FLOW_TEST_RESULTS.json', JSON.stringify(results, null, 2));
console.log('✅ Results saved to SPO_COMPLETE_FLOW_TEST_RESULTS.json\n');
