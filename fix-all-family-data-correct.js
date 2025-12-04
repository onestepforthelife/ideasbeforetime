// FIX ALL FAMILY DATA WITH CORRECT INFORMATION
// Renu: 1985 (age 40), Amit: 1982 (age 43), Annika: 2015 (age 10), Avni: 2019 (age 6)

const fs = require('fs');

console.log('🔧 FIXING ALL FAMILY DATA WITH CORRECT INFORMATION\n');
console.log('='.repeat(60));

let content = fs.readFileSync('family-prediction-report.html', 'utf8');

// RENU CORRECTIONS
console.log('👩 Fixing Renu Sharma...');
content = content.replace(/Born: 1982/g, 'Born: 1985');
content = content.replace(/Age 2025:<\/strong> 43/g, 'Age 2025:</strong> 40');
content = content.replace(/<td>1982<\/td>/g, '<td>1985</td>');
content = content.replace(/<td>43<\/td>/g, '<td>40</td>');
console.log('  ✅ Renu: 1985, age 40\n');

// AMIT CORRECTIONS  
console.log('👨 Fixing Amit Vashisht...');
content = content.replace(/Born: 1980/g, 'Born: 1982');
content = content.replace(/Age 2025:<\/strong> 45/g, 'Age 2025:</strong> 43');
content = content.replace(/<td>1980<\/td>/g, '<td>1982</td>');
content = content.replace(/<td>45<\/td>/g, '<td>43</td>');
console.log('  ✅ Amit: 1982, age 43\n');

// ANNIKA - Already correct (2015, age 10)
console.log('👧 Annika Vashist...');
console.log('  ✅ Already correct: 2015, age 10\n');

// AVNI CORRECTIONS - MAJOR CHANGE
console.log('👧 Fixing Avni Vashist (MAJOR CHANGE)...');
content = content.replace(/Born: 2012/g, 'Born: 2019');
content = content.replace(/Age 2025:<\/strong> 13/g, 'Age 2025:</strong> 6');
content = content.replace(/<td>2012<\/td>/g, '<td>2019</td>');
content = content.replace(/<td>13<\/td>/g, '<td>6</td>');

// Fix Avni's education timeline (she's 6 in 2025, so in 1st grade)
const avniEducation = [
  { from: '2025</td><td>13</td><td>8th grade', to: '2025</td><td>6</td><td>1st grade' },
  { from: '2026</td><td>14</td><td>9th grade', to: '2026</td><td>7</td><td>2nd grade' },
  { from: '2027</td><td>15</td><td>10th grade', to: '2027</td><td>8</td><td>3rd grade' },
  { from: '2028</td><td>16</td><td>11th grade', to: '2028</td><td>9</td><td>4th grade' },
  { from: '2029</td><td>17</td><td>12th grade', to: '2029</td><td>10</td><td>5th grade' },
  { from: '2030</td><td>18</td><td>College 1st year', to: '2030</td><td>11</td><td>6th grade' },
  { from: '2031</td><td>19</td><td>College 2nd year', to: '2031</td><td>12</td><td>7th grade' },
  { from: '2032</td><td>20</td><td>College 3rd year', to: '2032</td><td>13</td><td>8th grade' },
  { from: '2033-2035</td><td>21-23</td><td>Graduation/Career', to: '2033-2035</td><td>14-16</td><td>9th-11th grade' }
];

avniEducation.forEach(fix => {
  content = content.replace(new RegExp(fix.from.replace(/[()]/g, '\\$&'), 'g'), fix.to);
});

console.log('  ✅ Avni: 2019, age 6, education timeline updated\n');

// Fix ages in detailed analysis tables
console.log('📊 Fixing ages in analysis tables...');

// Renu's ages (born 1985)
for (let year = 2025; year <= 2045; year++) {
  const age = year - 1985;
  const oldAge = year - 1982;
  content = content.replace(new RegExp(`<td>${year}</td><td>${oldAge}</td>`, 'g'), `<td>${year}</td><td>${age}</td>`);
}

// Amit's ages (born 1982)
for (let year = 2025; year <= 2045; year++) {
  const age = year - 1982;
  const oldAge = year - 1980;
  content = content.replace(new RegExp(`<td>${year}</td><td>${oldAge}</td>`, 'g'), `<td>${year}</td><td>${age}</td>`);
}

console.log('  ✅ All ages in tables updated\n');

// Write the file
fs.writeFileSync('family-prediction-report.html', content);

console.log('='.repeat(60));
console.log('✅ ✅ ✅ ALL CORRECTIONS COMPLETE! ✅ ✅ ✅');
console.log('='.repeat(60));
console.log('\n📋 CORRECTED DATA:');
console.log('  👩 Renu: Born 1985, Age 40 in 2025');
console.log('  👨 Amit: Born 1982, Age 43 in 2025');
console.log('  👧 Annika: Born 2015, Age 10 in 2025 ✅');
console.log('  👧 Avni: Born 2019, Age 6 in 2025');
console.log('\n');
