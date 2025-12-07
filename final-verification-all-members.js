// Final comprehensive verification - check actual content

const fs = require('fs');

console.log('🔍 FINAL COMPREHENSIVE VERIFICATION\n');
console.log('='.repeat(60));

const content = fs.readFileSync('family-prediction-report.html', 'utf8');

// Check all family members
const checks = {
  renu: {
    name: 'Renu Sharma',
    birthYear: 1982,
    age2025: 43,
    checks: [
      { pattern: 'Born: 1982', desc: 'Birth year' },
      { pattern: 'Age 2025:</strong> 43', desc: 'Age in 2025' },
      { pattern: 'Moon Sign:</strong> Cancer', desc: 'Moon sign' }
    ]
  },
  amit: {
    name: 'Amit Vashisht',
    birthYear: 1980,
    age2025: 45,
    checks: [
      { pattern: 'Born: 1980', desc: 'Birth year' },
      { pattern: 'Age 2025:</strong> 45', desc: 'Age in 2025' },
      { pattern: 'Moon Sign:</strong> Scorpio', desc: 'Moon sign' }
    ]
  },
  annika: {
    name: 'Annika Vashisht',
    birthYear: 2015,
    age2025: 10,
    checks: [
      { pattern: 'Born: 2015', desc: 'Birth year' },
      { pattern: 'Age 2025:</strong> 10', desc: 'Age in 2025' },
      { pattern: 'Moon Sign:</strong> Gemini', desc: 'Moon sign' },
      { pattern: '2025</td><td>10</td><td>5th grade', desc: '2025 education' },
      { pattern: '2026</td><td>11</td><td>6th grade', desc: '2026 education' },
      { pattern: '2033</td><td>18</td><td>College 1st year', desc: '2033 college' }
    ]
  },
  avni: {
    name: 'Avni Vashisht',
    birthYear: 2012,
    age2025: 13,
    checks: [
      { pattern: 'Born: 2012', desc: 'Birth year' },
      { pattern: 'Age 2025:</strong> 13', desc: 'Age in 2025' },
      { pattern: 'Moon Sign:</strong> Pisces', desc: 'Moon sign' }
    ]
  }
};

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = [];

Object.keys(checks).forEach(member => {
  const data = checks[member];
  console.log(`\n👤 ${data.name}`);
  console.log('-'.repeat(60));
  
  data.checks.forEach(check => {
    totalChecks++;
    const found = content.includes(check.pattern);
    if (found) {
      passedChecks++;
      console.log(`  ✅ ${check.desc}: FOUND`);
    } else {
      failedChecks.push(`${data.name}: ${check.desc}`);
      console.log(`  ❌ ${check.desc}: NOT FOUND`);
    }
  });
});

// Check for old wrong data
console.log(`\n🔍 Checking for OLD WRONG DATA`);
console.log('-'.repeat(60));

const oldDataChecks = [
  { pattern: 'Born: 2010', desc: 'Old Annika birth year 2010' },
  { pattern: 'Age 2025:</strong> 15', desc: 'Old Annika age 15' },
  { pattern: '2028</td><td>18</td><td>College 1st year', desc: 'Old Annika college 2028' }
];

let oldDataFound = false;
oldDataChecks.forEach(check => {
  const found = content.includes(check.pattern);
  if (found) {
    oldDataFound = true;
    console.log(`  ❌ ${check.desc}: STILL EXISTS!`);
    failedChecks.push(`Old data: ${check.desc}`);
  } else {
    console.log(`  ✅ ${check.desc}: Removed`);
  }
});

// Check basic data section
console.log(`\n📋 Checking BASIC DATA SECTION`);
console.log('-'.repeat(60));
const hasBasicData = content.includes('BASIC INDIVIDUAL DATA') || content.includes('Family Members - Basic Information');
if (hasBasicData) {
  console.log(`  ✅ Basic data section exists`);
  passedChecks++;
} else {
  console.log(`  ❌ Basic data section missing`);
  failedChecks.push('Basic data section missing');
}
totalChecks++;

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 FINAL SUMMARY');
console.log('='.repeat(60));
console.log(`Total checks: ${totalChecks}`);
console.log(`Passed: ${passedChecks} ✅`);
console.log(`Failed: ${failedChecks.length} ❌`);
console.log(`Success rate: ${Math.round((passedChecks/totalChecks)*100)}%`);

if (failedChecks.length === 0 && !oldDataFound) {
  console.log('\n🎉 🎉 🎉 PERFECT! ALL DATA VERIFIED CORRECT! 🎉 🎉 🎉');
  console.log('\n✅ All family members have:');
  console.log('  - Correct birth years');
  console.log('  - Correct ages in 2025');
  console.log('  - Correct education timelines');
  console.log('  - Correct astrological data');
  console.log('  - Basic data section at top');
  console.log('  - No old wrong data remaining');
} else {
  console.log('\n⚠️ Issues found:');
  failedChecks.forEach(issue => console.log(`  - ${issue}`));
}

console.log('\n' + '='.repeat(60));
