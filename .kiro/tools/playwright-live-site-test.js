// Playwright - Test actual user flows on live site
const { chromium } = require('@playwright/test');

async function testLiveSite() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: [],
    passed: 0,
    failed: 0
  };

  // Test 1: Homepage loads
  try {
    await page.goto('https://onestepforthelife.com', { timeout: 10000 });
    await page.waitForSelector('nav', { timeout: 5000 });
    results.tests.push({ name: 'Homepage loads', status: 'PASS' });
    results.passed++;
  } catch (e) {
    results.tests.push({ name: 'Homepage loads', status: 'FAIL', error: e.message });
    results.failed++;
  }

  // Test 2: SPO tool accessible
  try {
    await page.goto('https://onestepforthelife.com/spo.html', { timeout: 10000 });
    await page.waitForSelector('form', { timeout: 5000 });
    results.tests.push({ name: 'SPO tool accessible', status: 'PASS' });
    results.passed++;
  } catch (e) {
    results.tests.push({ name: 'SPO tool accessible', status: 'FAIL', error: e.message });
    results.failed++;
  }

  // Test 3: SPO form submission
  try {
    await page.goto('https://onestepforthelife.com/social-optimizer-app.html', { timeout: 10000 });
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="headline"]', 'Test Headline');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.preview', { timeout: 5000 });
    results.tests.push({ name: 'SPO form submits', status: 'PASS' });
    results.passed++;
  } catch (e) {
    results.tests.push({ name: 'SPO form submits', status: 'FAIL', error: e.message });
    results.failed++;
  }

  // Test 4: Job Search accessible
  try {
    await page.goto('https://onestepforthelife.com/jobs.html', { timeout: 10000 });
    await page.waitForSelector('form', { timeout: 5000 });
    results.tests.push({ name: 'Job Search accessible', status: 'PASS' });
    results.passed++;
  } catch (e) {
    results.tests.push({ name: 'Job Search accessible', status: 'FAIL', error: e.message });
    results.failed++;
  }

  // Test 5: Navigation links work
  try {
    await page.goto('https://onestepforthelife.com', { timeout: 10000 });
    await page.click('a[href="about.html"]');
    await page.waitForSelector('h1', { timeout: 5000 });
    results.tests.push({ name: 'Navigation links work', status: 'PASS' });
    results.passed++;
  } catch (e) {
    results.tests.push({ name: 'Navigation links work', status: 'FAIL', error: e.message });
    results.failed++;
  }

  await browser.close();

  // Output results
  console.log('\n=== LIVE SITE TEST RESULTS ===');
  console.log(`Passed: ${results.passed}/${results.tests.length}`);
  console.log(`Failed: ${results.failed}/${results.tests.length}`);
  console.log('\nDetails:');
  results.tests.forEach(test => {
    const icon = test.status === 'PASS' ? '✓' : '✗';
    console.log(`${icon} ${test.name}: ${test.status}`);
    if (test.error) console.log(`  Error: ${test.error}`);
  });

  // Exit with error code if any tests failed
  process.exit(results.failed > 0 ? 1 : 0);
}

testLiveSite().catch(console.error);
