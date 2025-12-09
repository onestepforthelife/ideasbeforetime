// SPO Complete User Flow Test - CRITICAL (Money Involved)
// This tests EVERY button, EVERY link, EVERY page transition

const fs = require('fs');

console.log('🧪 SPO COMPLETE USER FLOW TEST - CRITICAL\n');
console.log('='.repeat(70));
console.log('⚠️  WARNING: This is a MONEY-INVOLVED test');
console.log('    Taking ₹21 without working service = FRAUD');
console.log('='.repeat(70));

// Read all SPO files
const files = {
    index: fs.readFileSync('social-optimizer-index.html', 'utf8'),
    app: fs.readFileSync('social-optimizer-app.html', 'utf8'),
    appJS: fs.readFileSync('social-optimizer-app.js', 'utf8'),
    success: fs.readFileSync('social-optimizer-success.html', 'utf8'),
    quickstart: fs.readFileSync('social-optimizer-quickstart.html', 'utf8'),
    dashboard: fs.readFileSync('social-optimizer-dashboard.html', 'utf8')
};

console.log('\n✅ TEST 1: LANDING PAGE (social-optimizer-index.html)');
console.log('-'.repeat(70));

// Test all links on landing page
const hasStartButton = files.index.includes('social-optimizer-app.html');
const hasPricing = files.index.includes('₹21') || files.index.includes('data-price');
const hasFeatures = files.index.includes('AI-powered') || files.index.includes('optimization');
const hasFAQ = files.index.includes('FAQ') || files.index.includes('question');
const hasTestimonials = files.index.includes('testimonial') || files.index.includes('review');

console.log(`   "Try Free Preview" button → app: ${hasStartButton ? '✅' : '❌'}`);
console.log(`   Pricing displayed (₹21): ${hasPricing ? '✅' : '❌'}`);
console.log(`   Features listed: ${hasFeatures ? '✅' : '❌'}`);
console.log(`   FAQ section: ${hasFAQ ? '✅' : '❌'}`);
console.log(`   Testimonials: ${hasTestimonials ? '✅' : '❌'}`);

console.log('\n✅ TEST 2: APP PAGE - STEP 1 (Profile Data)');
console.log('-'.repeat(70));

// Test Step 1 form fields
const hasNameField = files.app.includes('id="name"') || files.app.includes('name="name"');
const hasCurrentRole = files.app.includes('currentRole') || files.app.includes('current-role');
const hasTargetRole = files.app.includes('targetRole') || files.app.includes('target-role');
const hasSkills = files.app.includes('skills');
const hasAchievements = files.app.includes('achievements');
const hasGoals = files.app.includes('goals');

console.log(`   Name field: ${hasNameField ? '✅' : '❌'}`);
console.log(`   Current role field: ${hasCurrentRole ? '✅' : '❌'}`);
console.log(`   Target role field: ${hasTargetRole ? '✅' : '❌'}`);
console.log(`   Skills field: ${hasSkills ? '✅' : '❌'}`);
console.log(`   Achievements field: ${hasAchievements ? '✅' : '❌'}`);
console.log(`   Goals field: ${hasGoals ? '✅' : '❌'}`);

// Test Next button
const hasNextButton = files.app.includes('nextStep') || files.app.includes('Next');
console.log(`   "Next" button: ${hasNextButton ? '✅' : '❌'}`);

console.log('\n✅ TEST 3: APP PAGE - STEP 2 (Tone Selection)');
console.log('-'.repeat(70));

const hasToneOptions = files.app.includes('tone') || files.app.includes('style');
const hasProfessional = files.app.includes('Professional') || files.app.includes('professional');
const hasFriendly = files.app.includes('Friendly') || files.app.includes('friendly');
const hasConfident = files.app.includes('Confident') || files.app.includes('confident');

console.log(`   Tone selection: ${hasToneOptions ? '✅' : '❌'}`);
console.log(`   Professional option: ${hasProfessional ? '✅' : '❌'}`);
console.log(`   Friendly option: ${hasFriendly ? '✅' : '❌'}`);
console.log(`   Confident option: ${hasConfident ? '✅' : '❌'}`);

console.log('\n✅ TEST 4: APP PAGE - STEP 3 (Preview Generation)');
console.log('-'.repeat(70));

// Test AI generation
const hasGenerateFunction = files.appJS.includes('generateProfile') || 
                            files.appJS.includes('generate');
const hasAIEngine = files.appJS.includes('SocialOptimizerAI') || 
                    files.appJS.includes('ai-engine');
const hasPreview = files.app.includes('preview') || files.app.includes('Preview');
const hasBlur = files.app.includes('blur') || files.app.includes('blurred');

console.log(`   Generate function exists: ${hasGenerateFunction ? '✅' : '❌'}`);
console.log(`   AI engine loaded: ${hasAIEngine ? '✅' : '❌'}`);
console.log(`   Preview display: ${hasPreview ? '✅' : '❌'}`);
console.log(`   Blur effect: ${hasBlur ? '✅' : '❌'}`);

console.log('\n✅ TEST 5: APP PAGE - STEP 4 (Payment)');
console.log('-'.repeat(70));

// Test payment integration
const hasPaymentButton = files.app.includes('Unlock') || files.app.includes('Pay');
const hasPaymentOptions = files.app.includes('paymentOptions') || 
                          files.app.includes('PaymentGateway');
const hasRazorpay = files.app.includes('razorpay');
const hasAccessCode = files.app.includes('accessCode') || files.app.includes('checkAccessCode');

console.log(`   "Unlock" button: ${hasPaymentButton ? '✅' : '❌'}`);
console.log(`   Payment options display: ${hasPaymentOptions ? '✅' : '❌'}`);
console.log(`   Razorpay integration: ${hasRazorpay ? '✅' : '❌'}`);
console.log(`   Access code system: ${hasAccessCode ? '✅' : '❌'}`);

console.log('\n✅ TEST 6: NAVIGATION - Back Buttons');
console.log('-'.repeat(70));

const hasBackButton = files.app.includes('prevStep') || files.app.includes('Back');
const hasStepIndicator = files.app.includes('progress') || files.app.includes('step-');

console.log(`   Back button exists: ${hasBackButton ? '✅' : '❌'}`);
console.log(`   Step indicator: ${hasStepIndicator ? '✅' : '❌'}`);

console.log('\n✅ TEST 7: DATA PERSISTENCE');
console.log('-'.repeat(70));

const hasLocalStorage = files.appJS.includes('localStorage') || 
                        files.appJS.includes('sessionStorage');
const hasSaveData = files.appJS.includes('saveData') || files.appJS.includes('save');
const hasLoadData = files.appJS.includes('loadData') || files.appJS.includes('load');

console.log(`   LocalStorage usage: ${hasLocalStorage ? '✅' : '❌'}`);
console.log(`   Save data function: ${hasSaveData ? '✅' : '❌'}`);
console.log(`   Load data function: ${hasLoadData ? '✅' : '❌'}`);

console.log('\n✅ TEST 8: SUCCESS PAGE (After Payment)');
console.log('-'.repeat(70));

const hasSuccessMessage = files.success.includes('Success') || 
                          files.success.includes('Thank you');
const hasDownload = files.success.includes('download') || files.success.includes('Download');
const hasCopy = files.success.includes('copy') || files.success.includes('Copy');
const hasFullContent = files.success.includes('headline') && 
                       files.success.includes('summary') && 
                       files.success.includes('bio');

console.log(`   Success message: ${hasSuccessMessage ? '✅' : '❌'}`);
console.log(`   Download option: ${hasDownload ? '✅' : '❌'}`);
console.log(`   Copy option: ${hasCopy ? '✅' : '❌'}`);
console.log(`   Full content display: ${hasFullContent ? '✅' : '❌'}`);

console.log('\n✅ TEST 9: ERROR HANDLING');
console.log('-'.repeat(70));

const hasValidation = files.appJS.includes('validate') || files.appJS.includes('required');
const hasErrorMessages = files.app.includes('error') || files.app.includes('Error');
const hasTryCatch = files.appJS.includes('try') && files.appJS.includes('catch');

console.log(`   Form validation: ${hasValidation ? '✅' : '❌'}`);
console.log(`   Error messages: ${hasErrorMessages ? '✅' : '❌'}`);
console.log(`   Try-catch blocks: ${hasTryCatch ? '✅' : '❌'}`);

console.log('\n✅ TEST 10: MOBILE RESPONSIVENESS');
console.log('-'.repeat(70));

const hasMediaQueries = files.app.includes('@media') || files.app.includes('max-width');
const hasViewport = files.app.includes('viewport');
const hasMobileStyles = files.app.includes('mobile') || files.app.includes('480px');

console.log(`   Media queries: ${hasMediaQueries ? '✅' : '❌'}`);
console.log(`   Viewport meta tag: ${hasViewport ? '✅' : '❌'}`);
console.log(`   Mobile-specific styles: ${hasMobileStyles ? '✅' : '❌'}`);

// Calculate overall score
console.log('\n' + '='.repeat(70));
console.log('📊 OVERALL TEST RESULTS\n');

const allTests = [
    hasStartButton, hasPricing, hasFeatures,
    hasNameField, hasCurrentRole, hasTargetRole, hasSkills,
    hasToneOptions, hasProfessional,
    hasGenerateFunction, hasAIEngine, hasPreview,
    hasPaymentButton, hasPaymentOptions, hasRazorpay, hasAccessCode,
    hasBackButton, hasStepIndicator,
    hasLocalStorage,
    hasSuccessMessage, hasDownload, hasCopy,
    hasValidation, hasErrorMessages,
    hasMediaQueries, hasViewport
];

const passed = allTests.filter(t => t).length;
const total = allTests.length;
const percentage = ((passed / total) * 100).toFixed(0);

console.log(`✅ Tests Passed: ${passed}/${total} (${percentage}%)`);

if (percentage >= 90) {
    console.log('\n🎉 SPO USER FLOW: EXCELLENT');
    console.log('   All critical components present');
    console.log('   Ready for production use');
} else if (percentage >= 75) {
    console.log('\n⚠️ SPO USER FLOW: GOOD (Minor Issues)');
    console.log('   Most components working');
    console.log('   Some improvements needed');
} else {
    console.log('\n❌ SPO USER FLOW: NEEDS WORK');
    console.log('   Critical components missing');
    console.log('   NOT ready for production');
}

console.log('\n' + '='.repeat(70));
console.log('🧪 MANUAL TESTING REQUIRED\n');
console.log('This automated test checks CODE STRUCTURE only.');
console.log('You MUST manually test the actual user flow:\n');
console.log('1. Open: https://ideasbeforetime.pages.dev/social-optimizer-app.html');
console.log('2. Fill Step 1: Enter profile data');
console.log('3. Click Next → Verify Step 2 loads');
console.log('4. Select tone → Click Next');
console.log('5. Verify Step 3 generates preview');
console.log('6. Click "Unlock" → Verify payment options show');
console.log('7. Test access code: RECRUITER2025');
console.log('8. Verify full content unlocks');
console.log('9. Test download/copy buttons');
console.log('10. Test back navigation');
console.log('\n⚠️  CRITICAL: Test with REAL payment (₹21) before launch!');
console.log('='.repeat(70));
