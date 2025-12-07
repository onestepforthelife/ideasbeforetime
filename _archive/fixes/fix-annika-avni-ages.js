// Fix Annika and Avni birth years and ALL related data
const fs = require('fs');

console.log('🔧 FIXING ANNIKA & AVNI BIRTH YEARS AND ALL AGES\n');

// CORRECT DATA
const correctData = {
  annika: {
    birthYear: 2015,
    age2025: 10,
    education: {
      2025: { age: 10, grade: '5th Grade' },
      2026: { age: 11, grade: '6th Grade' },
      2027: { age: 12, grade: '7th Grade' },
      2028: { age: 13, grade: '8th Grade' },
      2029: { age: 14, grade: '9th Grade' },
      2030: { age: 15, grade: '10th Grade (Board)' },
      2031: { age: 16, grade: '11th Grade' },
      2032: { age: 17, grade: '12th Grade (Board)' },
      2033: { age: 18, grade: 'College 1st Year' },
      2034: { age: 19, grade: 'College 2nd Year' },
      2035: { age: 20, grade: 'College 3rd Year' },
      2036: { age: 21, grade: 'College 4th Year' },
      2037: { age: 22, grade: 'Job/Masters' }
    },
    collegeStart: 2033,
    jobStart: 2037
  },
  avni: {
    birthYear: 2017,
    age2025: 8,
    education: {
      2025: { age: 8, grade: '3rd Grade' },
      2026: { age: 9, grade: '4th Grade' },
      2027: { age: 10, grade: '5th Grade' },
      2028: { age: 11, grade: '6th Grade' },
      2029: { age: 12, grade: '7th Grade' },
      2030: { age: 13, grade: '8th Grade' },
      2031: { age: 14, grade: '9th Grade' },
      2032: { age: 15, grade: '10th Grade (Board)' },
      2033: { age: 16, grade: '11th Grade' },
      2034: { age: 17, grade: '12th Grade (Board)' },
      2035: { age: 18, grade: 'College 1st Year' },
      2036: { age: 19, grade: 'College 2nd Year' },
      2037: { age: 20, grade: 'College 3rd Year' },
      2038: { age: 21, grade: 'College 4th Year' },
      2039: { age: 22, grade: 'Job/Masters' }
    },
    collegeStart: 2035,
    jobStart: 2039
  }
};

console.log('📊 CORRECT DATA:\n');
console.log(`Annika: Born ${correctData.annika.birthYear}, Age ${correctData.annika.age2025} in 2025`);
console.log(`  • College starts: ${correctData.annika.collegeStart} (age 18)`);
console.log(`  • Job starts: ${correctData.annika.jobStart} (age 22)`);
console.log();
console.log(`Avni: Born ${correctData.avni.birthYear}, Age ${correctData.avni.age2025} in 2025`);
console.log(`  • College starts: ${correctData.avni.collegeStart} (age 18)`);
console.log(`  • Job starts: ${correctData.avni.jobStart} (age 22)`);

console.log('\n🔄 UPDATED DISTANCE TIMELINE:\n');
console.log('2025-2032: All family together (kids in school)');
console.log('2033: First separation - Annika goes to college (age 18)');
console.log('2035: Both kids away - Avni goes to college (age 18)');
console.log('2037-2040: Maximum separation - Both kids working/studying');

console.log('\n✅ This script identified the corrections needed.');
console.log('Now creating comprehensive fix for both HTML files...\n');
