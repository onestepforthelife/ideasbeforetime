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

    // Test 6: All links work (no broken links)
    console.log('Test 6: Checking all links...');
    await page.goto(SITE_URL);
    const links = await page.locator('a[href]').all();
    let brokenLinks = 0;
    for (const link of links.slice(0, 20)) { // Check first 20 links
      const href = await link.getAttribute('href');
      if (href && href.startsWith('http')) {
        try {
          const response = await page.request.get(href);
          if (response.status() >= 400) brokenLinks++;
        } catch (e) {
          brokenLinks++;
        }
      }
    }
    if (brokenLinks === 0) {
      results.passed.push('✅ All links working');
    } else {
      results.failed.push(`❌ ${brokenLinks} broken links`);
    }

    // Test 7: Console errors with details
    console.log('Test 7: Console errors check...');
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    await page.goto(SITE_URL);
    await page.waitForTimeout(3000);
    if (consoleErrors.length === 0) {
      results.passed.push('✅ No console errors');
    } else {
      results.failed.push(`❌ ${consoleErrors.length} console errors`);
      console.log('\n🔍 Console Errors Found:');
      consoleErrors.slice(0, 5).forEach((err, i) => {
        console.log(`   ${i + 1}. ${err.substring(0, 100)}...`);
      });
    }

    // Test 8: Visual consistency (alignment, spacing)
    console.log('Test 8: Visual consistency...');
    await page.goto(SITE_URL);
    const header = await page.locator('header, nav').first();
    const headerBox = await header.boundingBox();
    const body = await page.locator('body');
    const bodyStyles = await body.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        maxWidth: styles.maxWidth,
        margin: styles.margin,
        padding: styles.padding
      };
    });
    
    // Check if header is properly aligned (not centered when should be top)
    if (headerBox && headerBox.y < 100) {
      results.passed.push('✅ Header properly positioned');
    } else {
      results.warnings.push('⚠️  Header alignment issue');
    }

    // Test 9: Typography & Formatting
    console.log('Test 9: Typography check...');
    const h1 = await page.locator('h1').first();
    if (await h1.count() > 0) {
      const h1Styles = await h1.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          fontSize: styles.fontSize,
          fontWeight: styles.fontWeight,
          lineHeight: styles.lineHeight
        };
      });
      // Check if h1 is properly styled (not default browser styles)
      const fontSize = parseInt(h1Styles.fontSize);
      if (fontSize >= 24) {
        results.passed.push('✅ Typography properly styled');
      } else {
        results.warnings.push('⚠️  Typography may need improvement');
      }
    }

    // Test 10: Color consistency (no purple #667eea, #764ba2)
    console.log('Test 10: Color consistency...');
    const purpleElements = await page.evaluate(() => {
      const allElements = document.querySelectorAll('*');
      let purpleCount = 0;
      const purpleColors = ['#667eea', '#764ba2', 'rgb(102, 126, 234)', 'rgb(118, 75, 162)'];
      
      allElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const bgColor = styles.backgroundColor;
        const borderColor = styles.borderColor;
        
        if (purpleColors.some(p => color.includes(p) || bgColor.includes(p) || borderColor.includes(p))) {
          purpleCount++;
        }
      });
      return purpleCount;
    });
    
    if (purpleElements === 0) {
      results.passed.push('✅ No purple colors found');
    } else {
      results.failed.push(`❌ ${purpleElements} elements with purple colors`);
    }

    // Test 11: Mobile responsive
    console.log('Test 11: Mobile responsive...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(SITE_URL);
    const mobileNav = await page.locator('nav').isVisible();
    if (mobileNav) {
      results.passed.push('✅ Mobile responsive');
    } else {
      results.warnings.push('⚠️  Mobile navigation unclear');
    }

    // Test 12: Page load performance
    console.log('Test 12: Performance check...');
    await page.goto(SITE_URL, { waitUntil: 'load' });
    const performanceMetrics = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      return {
        loadTime: perfData.loadEventEnd - perfData.fetchStart,
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart
      };
    });
    
    if (performanceMetrics.loadTime < 3000) {
      results.passed.push(`✅ Fast load time (${Math.round(performanceMetrics.loadTime)}ms)`);
    } else {
      results.warnings.push(`⚠️  Slow load time (${Math.round(performanceMetrics.loadTime)}ms)`);
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
