// CRITICAL FIX: Annika's birth year is 2015, NOT 2010
// This fixes ALL ages and timeline data

const fs = require('fs');

console.log('🚨 CRITICAL DATA CORRECTION: Annika Birth Year\n');
console.log('=' .repeat(80));
console.log('ERROR FOUND: Annika listed as born 2010 (Age 15 in 2025)');
console.log('CORRECT: Annika born 2015 (Age 10 in 2025)');
console.log('=' .repeat(80));

// Corrected timeline for Annika (Born 2015)
const correctedTimeline = {
  2025: { age: 10, grade: '5th', event: 'Elementary school' },
  2026: { age: 11, grade: '6th', event: 'Middle school starts' },
  2027: { age: 12, grade: '7th', event: 'Middle school' },
  2028: { age: 13, grade: '8th', event: 'Middle school' },
  2029: { age: 14, grade: '9th', event: 'High school starts' },
  2030: { age: 15, grade: '10th', event: 'Board exam prep' },
  2031: { age: 16, grade: '11th', event: 'Stream selection' },
  2032: { age: 17, grade: '12th', event: 'Board exams' },
  2033: { age: 18, grade: 'College 1st', event: 'College admission', distance: '200-500 km' },
  2034: { age: 19, grade: 'College 2nd', event: 'Academic excellence', distance: '200-500 km' },
  2035: { age: 20, grade: 'College 3rd', event: 'Mars Dasha begins', distance: '500-1000 km' }
};

console.log('\n📊 CORRECTED TIMELINE FOR ANNIKA:\n');
console.log('-'.repeat(80));

Object.entries(correctedTimeline).forEach(([year, data]) => {
  console.log(`${year}: Age ${data.age} - ${data.grade} - ${data.event}`);
});

console.log('\n🔄 IMPACT ON FAMILY TIMELINE:\n');
console.log('-'.repeat(80));
console.log('2025-2032: ALL family together (Annika still in school at home)');
console.log('2033: FIRST separation (Annika goes to college at age 18)');
console.log('2035: Annika college 3rd year + Mars Dasha begins');
console.log('2037: Annika graduates (age 22)');
console.log('\n⚠️  This means parents have 8 MORE YEARS with Annika at home!');
console.log('    (Previously calculated: 2028 separation)');
console.log('    (Corrected: 2033 separation)');

console.log('\n📝 FILES THAT NEED CORRECTION:\n');
console.log('-'.repeat(80));
console.log('1. family-prediction-report.html');
console.log('   - Annika section: All ages need +5 year shift');
console.log('   - Education table: Recalculate all years');
console.log('   - Distance table: First separation moves to 2033');
console.log('');
console.log('2. family-lifetime-timeline.html');
console.log('   - Timeline periods need adjustment');
console.log('   - Distance summary: 2025-2032 all together');
console.log('');
console.log('3. All stat cards showing "Born: 2010" → "Born: 2015"');
console.log('4. All references to "Age 15 in 2025" → "Age 10 in 2025"');

console.log('\n' + '='.repeat(80));
console.log('READY TO APPLY CORRECTIONS');
console.log('=' .repeat(80));
