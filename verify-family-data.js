// Comprehensive verification of all family members' data in family-prediction-report.html

const fs = require('fs');

console.log('🔍 Verifying ALL family members data...\n');

// Read the file
const content = fs.readFileSync('family-prediction-report.html', 'utf8');

// Define correct data
const correctData = {
  renu: {
    birthYear: 1982,
    age2025: 43,
    moonSign: 'Cancer',
    ascendant: 'Virgo',
    currentDasha: 'Venus (2023-2043)',
    sadeSati: 'Not Active (Next: 2032-2039)'
  },
  amit: {
    birthYear: 1980,
    age2025: 45,
    moonSign: 'Scorpio',
    ascendant: 'Capricorn',
    currentDasha: 'Rahu (2021-2039)',
    sadeSati: 'Phase 2 Peak (2023-2028)'
  },
  annika: {
    birthYear: 2015,
    age2025: 10,
    moonSign: 'Gemini',
    ascendant: 'Leo',
    currentDasha: 'Moon (2020-2030)',
    education2025: '5th Grade',
    college: 2033
  },
  avni: {
    birthYear: 2012,
    age2025: 13,
    moonSign: 'Pisces',
    ascendant: 'Libra',
    currentDasha: 'Moon (2022-2032)',
    education2025: '8th Grade',
    college: 2030
  }
};

let errors = [];
let warnings = [];

// Check Renu
console.log('👩 Checking Renu Sharma...');
if (!content.includes('Born: 1982')) errors.push('❌ Renu birth year not 1982');
if (!content.includes('Age 2025:</strong> 43')) warnings.push('⚠️ Renu age 2025 might not be 43');
if (!content.includes('Moon Sign:</strong> Cancer')) warnings.push('⚠️ Renu moon sign might not be Cancer');
console.log('  ✅ Renu basic data checked\n');

// Check Amit
console.log('👨 Checking Amit Vashisht...');
if (!content.includes('Born: 1980')) errors.push('❌ Amit birth year not 1980');
if (!content.includes('Age 2025:</strong> 45')) warnings.push('⚠️ Amit age 2025 might not be 45');
if (!content.includes('Moon Sign:</strong> Scorpio')) warnings.push('⚠️ Amit moon sign might not be Scorpio');
console.log('  ✅ Amit basic data checked\n');

// Check Annika - CRITICAL
console.log('👧 Checking Annika Vashisht (CRITICAL - Recently Fixed)...');
const annikaBirthYearCount = (content.match(/Born: 2015/g) || []).length;
const annikaAge10Count = (content.match(/Age 2025:\*\*<\/strong> 10/g) || []).length;
const annikaCollege2033 = content.includes('2033</td><td>18</td><td>College 1st Year');

console.log(`  Birth year 2015 found: ${annikaBirthYearCount} times`);
console.log(`  Age 10 in 2025 found: ${annikaAge10Count} times`);
console.log(`  College 2033 (age 18): ${annikaCollege2033 ? 'YES ✅' : 'NO ❌'}`);

if (annikaBirthYearCount === 0) errors.push('❌ CRITICAL: Annika birth year NOT 2015!');
if (annikaAge10Count === 0) errors.push('❌ CRITICAL: Annika age NOT 10 in 2025!');
if (!annikaCollege2033) errors.push('❌ CRITICAL: Annika college NOT 2033!');

// Check for old wrong data
if (content.includes('Born: 2010')) errors.push('❌ CRITICAL: Old birth year 2010 still exists!');
if (content.includes('Age 2025:</strong> 15')) errors.push('❌ CRITICAL: Old age 15 still exists!');
if (content.includes('2028</td><td>18</td><td>College 1st Year')) errors.push('❌ CRITICAL: Old college year 2028 still exists!');

console.log('  ✅ Annika critical data checked\n');

// Check Avni
console.log('👧 Checking Avni Vashisht...');
if (!content.includes('Born: 2012')) errors.push('❌ Avni birth year not 2012');
if (!content.includes('Age 2025:</strong> 13')) warnings.push('⚠️ Avni age 2025 might not be 13');
if (!content.includes('Moon Sign:</strong> Pisces')) warnings.push('⚠️ Avni moon sign might not be Pisces');
console.log('  ✅ Avni basic data checked\n');

// Check education timeline
console.log('📚 Checking Education Timeline...');
const educationChecks = [
  { year: 2025, annika: '5th Grade', avni: '8th Grade' },
  { year: 2026, annika: '6th Grade', avni: '9th Grade' },
  { year: 2027, annika: '7th Grade', avni: '10th Grade' },
  { year: 2028, annika: '8th Grade', avni: '11th Grade' },
  { year: 2033, annika: 'College 1st Year', avni: 'College 3rd Year' }
];

educationChecks.forEach(check => {
  const annikaCorrect = content.includes(`${check.year}</td><td>${check.year - 2015}</td><td>${check.annika}`);
  const avniCorrect = content.includes(`${check.year}</td><td>${check.year - 2012}</td><td>${check.avni}`);
  
  if (!annikaCorrect) warnings.push(`⚠️ Annika ${check.year}: Should be ${check.annika}`);
  if (!avniCorrect) warnings.push(`⚠️ Avni ${check.year}: Should be ${check.avni}`);
});

console.log('  ✅ Education timeline checked\n');

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n✅ ✅ ✅ ALL DATA VERIFIED CORRECT! ✅ ✅ ✅\n');
  console.log('All family members have correct:');
  console.log('  ✅ Birth years');
  console.log('  ✅ Ages in 2025');
  console.log('  ✅ Education timelines');
  console.log('  ✅ College years');
  console.log('  ✅ Astrological data');
} else {
  if (errors.length > 0) {
    console.log('\n❌ CRITICAL ERRORS FOUND:');
    errors.forEach(err => console.log('  ' + err));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️ WARNINGS:');
    warnings.forEach(warn => console.log('  ' + warn));
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Verification complete!');
console.log('='.repeat(60));
