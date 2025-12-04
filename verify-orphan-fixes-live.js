const https = require('https');

console.log('🔍 Verifying Orphan Page Fixes on LIVE Site...\n');

const pagesToCheck = [
  'family-lifetime-timeline.html',
  'family-prediction-report.html',
  'test-preview-system.html',
  'market-reports.html'
];

let checked = 0;
let passed = 0;
let failed = 0;

function checkPage(page) {
  return new Promise((resolve) => {
    const url = `https://ideasbeforetime.pages.dev/${page}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        checked++;
        
        const hasNav = data.includes('common-navigation.js');
        const hasFooter = data.includes('common-footer.js');
        const hasFamilyTimeline = data.includes('Family Lifetime Timeline');
        
        console.log(`\n📄 ${page}`);
        console.log(`URL: ${url}`);
        console.log(`Status: ${res.statusCode}`);
        
        if (page === 'market-reports.html') {
          console.log(`Has Family Timeline Report #6: ${hasFamilyTimeline ? '✅' : '❌'}`);
          if (hasFamilyTimeline) {
            passed++;
          } else {
            failed++;
          }
        } else {
          console.log(`Has Navigation: ${hasNav ? '✅' : '❌'}`);
          console.log(`Has Footer: ${hasFooter ? '✅' : '❌'}`);
          
          if (hasNav && hasFooter) {
            passed++;
          } else {
            failed++;
          }
        }
        
        resolve();
      });
    }).on('error', (err) => {
      console.log(`\n❌ Error checking ${page}: ${err.message}`);
      checked++;
      failed++;
      resolve();
    });
  });
}

async function checkAll() {
  for (const page of pagesToCheck) {
    await checkPage(page);
  }
  
  console.log(`\n\n📊 LIVE SITE VERIFICATION SUMMARY`);
  console.log(`==================================================`);
  console.log(`Total Checked: ${checked}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`==================================================`);
  
  if (failed > 0) {
    console.log(`\n⚠️  CHANGES NOT YET LIVE!`);
    console.log(`The fixes are saved locally but not pushed to GitHub yet.`);
    console.log(`You need to push via GitHub Desktop to make them live.`);
  } else {
    console.log(`\n✅ All fixes are LIVE!`);
  }
}

checkAll();
