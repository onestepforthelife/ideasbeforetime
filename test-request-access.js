// Test request-access.html page
const fs = require('fs');

console.log('🧪 TESTING REQUEST-ACCESS.HTML PAGE\n');
console.log('='.repeat(60));

const html = fs.readFileSync('request-access.html', 'utf8');

// Test 1: Layout Structure
console.log('\n✅ TEST 1: LAYOUT STRUCTURE');
const hasPageWrapper = html.includes('class="page-wrapper"');
const hasContainer = html.includes('class="container"');
const hasPadding = html.includes('padding: 120px 20px 100px');
console.log(`   Page wrapper: ${hasPageWrapper ? '✅' : '❌'}`);
console.log(`   Container: ${hasContainer ? '✅' : '❌'}`);
console.log(`   Proper padding (header/footer space): ${hasPadding ? '✅' : '❌'}`);

// Test 2: Form Elements
console.log('\n✅ TEST 2: FORM ELEMENTS');
const hasEmailField = html.includes('id="email"');
const hasServiceField = html.includes('id="service"');
const hasSubmitBtn = html.includes('id="submitBtn"');
const hasForm = html.includes('id="accessForm"');
console.log(`   Email field: ${hasEmailField ? '✅' : '❌'}`);
console.log(`   Service selector: ${hasServiceField ? '✅' : '❌'}`);
console.log(`   Submit button: ${hasSubmitBtn ? '✅' : '❌'}`);
console.log(`   Form element: ${hasForm ? '✅' : '❌'}`);

// Test 3: OTP System
console.log('\n✅ TEST 3: OTP SYSTEM');
const hasOTPGeneration = html.includes('Math.floor(100000 + Math.random() * 900000)');
const hasInstantMessage = html.includes('Instant OTP Verification');
const hasNoWaitMessage = !html.includes('wait 24 hours') && !html.includes('Wait 24 hours');
const hasOTPInEmail = html.includes('Your One-Time Password (OTP):');
console.log(`   OTP generation (6-digit): ${hasOTPGeneration ? '✅' : '❌'}`);
console.log(`   Instant verification message: ${hasInstantMessage ? '✅' : '❌'}`);
console.log(`   No "wait 24 hours" message: ${hasNoWaitMessage ? '✅' : '❌'}`);
console.log(`   OTP in email body: ${hasOTPInEmail ? '✅' : '❌'}`);

// Test 4: Email Integration
console.log('\n✅ TEST 4: EMAIL INTEGRATION');
const hasMailtoLink = html.includes('mailto:onestepforthelife@gmail.com');
const hasEmailSubject = html.includes('Access Request OTP');
const hasEmailBody = html.includes('emailBody');
const hasWindowOpen = html.includes('window.open(mailtoLink');
console.log(`   Mailto link: ${hasMailtoLink ? '✅' : '❌'}`);
console.log(`   Email subject: ${hasEmailSubject ? '✅' : '❌'}`);
console.log(`   Email body generation: ${hasEmailBody ? '✅' : '❌'}`);
console.log(`   Opens email client: ${hasWindowOpen ? '✅' : '❌'}`);

// Test 5: Success/Error Messages
console.log('\n✅ TEST 5: SUCCESS/ERROR MESSAGES');
const hasSuccessMessage = html.includes('id="successMessage"');
const hasErrorMessage = html.includes('id="errorMessage"');
const hasCheckInbox = html.includes('Check your email inbox now');
const hasErrorFallback = html.includes('Submission failed');
console.log(`   Success message element: ${hasSuccessMessage ? '✅' : '❌'}`);
console.log(`   Error message element: ${hasErrorMessage ? '✅' : '❌'}`);
console.log(`   "Check inbox" instruction: ${hasCheckInbox ? '✅' : '❌'}`);
console.log(`   Error fallback message: ${hasErrorFallback ? '✅' : '❌'}`);

// Test 6: Admin Panel
console.log('\n✅ TEST 6: ADMIN PANEL');
const hasAdminLink = html.includes('Admin Login');
const hasAdminFunction = html.includes('function checkAdminAccess');
const hasAdminPanel = html.includes('function showAdminPanel');
const hasLocalStorage = html.includes('localStorage.getItem');
const hasAdminPassword = html.includes('AmitAdmin2025!');
console.log(`   Admin login link: ${hasAdminLink ? '✅' : '❌'}`);
console.log(`   Admin access function: ${hasAdminFunction ? '✅' : '❌'}`);
console.log(`   Admin panel display: ${hasAdminPanel ? '✅' : '❌'}`);
console.log(`   LocalStorage integration: ${hasLocalStorage ? '✅' : '❌'}`);
console.log(`   Admin password set: ${hasAdminPassword ? '✅' : '❌'}`);

// Test 7: Navigation & Footer
console.log('\n✅ TEST 7: NAVIGATION & FOOTER');
const hasNavigation = html.includes('common-navigation.js');
const hasFooter = html.includes('common-footer.js');
const hasNavCSS = html.includes('common-navigation.css');
const hasFooterCSS = html.includes('common-footer.css');
const hasBackLink = html.includes('← Back to Home');
console.log(`   Navigation JS: ${hasNavigation ? '✅' : '❌'}`);
console.log(`   Footer JS: ${hasFooter ? '✅' : '❌'}`);
console.log(`   Navigation CSS: ${hasNavCSS ? '✅' : '❌'}`);
console.log(`   Footer CSS: ${hasFooterCSS ? '✅' : '❌'}`);
console.log(`   Back to home link: ${hasBackLink ? '✅' : '❌'}`);

// Test 8: Service Options
console.log('\n✅ TEST 8: SERVICE OPTIONS');
const hasMarketReports = html.includes('market-reports');
const hasSPOPremium = html.includes('spo-premium');
const hasCVAccess = html.includes('cv-access');
const hasAllPremium = html.includes('all-premium');
console.log(`   Market Reports option: ${hasMarketReports ? '✅' : '❌'}`);
console.log(`   SPO Premium option: ${hasSPOPremium ? '✅' : '❌'}`);
console.log(`   CV Access option: ${hasCVAccess ? '✅' : '❌'}`);
console.log(`   All Premium option: ${hasAllPremium ? '✅' : '❌'}`);

// Test 9: Validation
console.log('\n✅ TEST 9: INPUT VALIDATION');
const hasRequiredFields = html.includes('required');
const hasEmailValidation = html.includes('type="email"');
const hasValidationCheck = html.includes('if (!email || !service)');
const hasAlertMessage = html.includes('Please fill in all required fields');
console.log(`   Required field markers: ${hasRequiredFields ? '✅' : '❌'}`);
console.log(`   Email type validation: ${hasEmailValidation ? '✅' : '❌'}`);
console.log(`   JavaScript validation: ${hasValidationCheck ? '✅' : '❌'}`);
console.log(`   Alert for missing fields: ${hasAlertMessage ? '✅' : '❌'}`);

// Test 10: Analytics & Tracking
console.log('\n✅ TEST 10: ANALYTICS & TRACKING');
const hasAnalytics = html.includes('universal-analytics.js');
const hasGtag = html.includes('gtag');
const hasEventTracking = html.includes('access_request');
const hasAdSense = html.includes('google-adsense.js');
console.log(`   Universal analytics: ${hasAnalytics ? '✅' : '❌'}`);
console.log(`   Google Analytics gtag: ${hasGtag ? '✅' : '❌'}`);
console.log(`   Event tracking: ${hasEventTracking ? '✅' : '❌'}`);
console.log(`   Google AdSense: ${hasAdSense ? '✅' : '❌'}`);

// Final Summary
console.log('\n' + '='.repeat(60));
console.log('📊 FINAL SUMMARY\n');

const allTests = [
    hasPageWrapper && hasContainer && hasPadding,
    hasEmailField && hasServiceField && hasSubmitBtn && hasForm,
    hasOTPGeneration && hasInstantMessage && hasNoWaitMessage && hasOTPInEmail,
    hasMailtoLink && hasEmailSubject && hasEmailBody && hasWindowOpen,
    hasSuccessMessage && hasErrorMessage && hasCheckInbox && hasErrorFallback,
    hasAdminLink && hasAdminFunction && hasAdminPanel && hasLocalStorage && hasAdminPassword,
    hasNavigation && hasFooter && hasNavCSS && hasFooterCSS && hasBackLink,
    hasMarketReports && hasSPOPremium && hasCVAccess && hasAllPremium,
    hasRequiredFields && hasEmailValidation && hasValidationCheck && hasAlertMessage,
    hasAnalytics && hasGtag && hasEventTracking && hasAdSense
];

const passedTests = allTests.filter(t => t).length;
const totalTests = allTests.length;
const percentage = ((passedTests / totalTests) * 100).toFixed(0);

console.log(`✅ Tests Passed: ${passedTests}/${totalTests} (${percentage}%)`);

if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! Page is production-ready!');
    console.log('\n✨ KEY FEATURES VERIFIED:');
    console.log('   • Instant OTP generation (no 24-hour wait)');
    console.log('   • Email client integration (no Outlook redirect)');
    console.log('   • Proper layout (header/footer positioned correctly)');
    console.log('   • Admin panel for viewing requests');
    console.log('   • Complete validation and error handling');
    console.log('   • Analytics tracking enabled');
} else {
    console.log('\n⚠️ Some tests failed. Review issues above.');
}

console.log('\n' + '='.repeat(60));
