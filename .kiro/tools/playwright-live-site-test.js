// Playwright Live Site Testing
// Tests actual user flows on live site automatically

const { chromium } = require('playwright');

const SITE_URL = 'https://onestepforthelife.com';

async function testLiveSite() {
  console.log('🎭 Starting Playwright Live Site Test...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  try {
    // Test 1: Homepage loads
    console.log('Test 1: Homepage loads...');
    await page.goto(SITE_URL, { waitUntil: 'networkidle' });
    const title = await page.title();
    if (title) {
      results.passed.push('✅ Homepage loads');
    } else {
      results.failed.push('❌ Homepage title missing');
    }

    // Test 2: Navigation exists
    console.log('Test 2: Navigation exists...');
    const nav = await page.locator('nav').count();
    if (nav > 0) {
      results.passed.push('✅ Navigation present');
    } else {
      results.failed.push('❌ Navigation missing');
    }

    // Test 3: SPO form validation
    console.log('Test 3: SPO form validation...');
    await page.goto(`${SITE_URL}/social-optimizer-app.html`);
    const platformSelect = await page.locator('#platform').count();
    const bioTextarea = await page.locator('#currentBio').count();
    if (platformSelect > 0 && bioTextarea > 0) {
      results.passed.push('✅ SPO form exists');
    } else {
      results.failed.push('❌ SPO form missing');
    }

    // Test 4: Job Search accessible
    console.log('Test 4: Job Search accessible...');
    await page.goto(`${SITE_URL}/jobs.html`);
    const jobSearch = await page.locator('input[type="search"], input[type="text"]').count();
    if (jobSearch > 0) {
      results.passed.push('✅ Job Search exists');
    } else {
      results.failed.push('❌ Job Search missing');
    }

    // Test 5: Blog posts load
    console.log('Test 5: Blog posts load...');
    await page.goto(`${SITE_URL}/blog.html`);
    const blogPosts = await page.locator('.blog-card').count();
    if (blogPosts > 0) {
      results.passed.push(`✅ Blog has ${blogPosts} posts`);
    } else {
      results.failed.push('❌ Blog posts missing');
    }

    // Test 7: No console errors
    console.log('Test 7: Console errors check...');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    await page.goto(SITE_URL);
    await page.waitForTimeout(2000);
    if (consoleErrors.length === 0) {
      results.passed.push('✅ No console errors');
    } else {
      results.failed.push(`❌ ${consoleErrors.length} console errors`);
    }

    // Test 8: Mobile responsive
    console.log('Test 8: Mobile responsive...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SITE_URL);
    const mobileNav = await page.locator('nav').isVisible();
    if (mobileNav) {
      results.passed.push('✅ Mobile responsive');
    } else {
      results.warnings.push('⚠️  Mobile navigation unclear');
    }

  } catch (error) {
    results.failed.push(`❌ Test error: ${error.message}`);
  } finally {
    await browser.close();
  }

  // Report
  console.log('\n📊 TEST RESULTS:\n');
  console.log(`✅ Passed: ${results.passed.length}`);
  results.passed.forEach(r => console.log(`   ${r}`));
  
  console.log(`\n⚠️  Warnings: ${results.warnings.length}`);
  results.warnings.forEach(r => console.log(`   ${r}`));
  
  console.log(`\n❌ Failed: ${results.failed.length}`);
  results.failed.forEach(r => console.log(`   ${r}`));

  // Exit code
  const exitCode = results.failed.length > 0 ? 1 : 0;
  console.log(`\n${exitCode === 0 ? '✅ ALL TESTS PASSED' : '❌ TESTS FAILED'}`);
  process.exit(exitCode);
}

testLiveSite();
