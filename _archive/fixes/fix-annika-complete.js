// COMPREHENSIVE FIX: Change ALL instances of Annika's data from 2010 to 2015

const fs = require('fs');

console.log('🔧 COMPREHENSIVE FIX: Updating ALL Annika data...\n');

// Read the file
let content = fs.readFileSync('family-prediction-report.html', 'utf8');

// Count before
const before2010 = (content.match(/Born: 2010/g) || []).length;
const before15 = (content.match(/Age 2025:<\/strong> 15/g) || []).length;

console.log(`📊 BEFORE:`);
console.log(`  - "Born: 2010" found: ${before2010} times`);
console.log(`  - "Age 2025: 15" found: ${before15} times\n`);

// 1. Fix birth year in stat cards
content = content.replace(/Born: 2010/g, 'Born: 2015');

// 2. Fix current age in stat cards
content = content.replace(/<div class="stat-value">15<\/div><div class="stat-label">Born: 2015/g, 
  '<div class="stat-value">10</div><div class="stat-label">Born: 2015');

// 3. Fix education timeline - shift all by 5 years
const educationFixes = [
  { from: '2025</td><td>15</td><td>10th Grade', to: '2025</td><td>10</td><td>5th Grade' },
  { from: '2026</td><td>16</td><td>11th Grade', to: '2026</td><td>11</td><td>6th Grade' },
  { from: '2027</td><td>17</td><td>12th Grade', to: '2027</td><td>12</td><td>7th Grade' },
  { from: '2028</td><td>18</td><td>College 1st Year', to: '2028</td><td>13</td><td>8th Grade' },
  { from: '2029</td><td>19</td><td>College 2nd Year', to: '2029</td><td>14</td><td>9th Grade' },
  { from: '2030</td><td>20</td><td>College 3rd Year', to: '2030</td><td>15</td><td>10th Grade' },
  { from: '2031</td><td>21</td><td>Graduation/Masters', to: '2031</td><td>16</td><td>11th Grade' },
  { from: '2032</td><td>22</td><td>Career launch', to: '2032</td><td>17</td><td>12th Grade' },
  { from: '2033</td><td>23</td><td>Professional', to: '2033</td><td>18</td><td>College 1st Year' },
  { from: '2034</td><td>24</td><td>Career', to: '2034</td><td>19</td><td>College 2nd Year' },
  { from: '2035</td><td>25</td><td>Career established', to: '2035</td><td>20</td><td>College 3rd Year' }
];

educationFixes.forEach(fix => {
  content = content.replace(new RegExp(fix.from.replace(/[()]/g, '\\$&'), 'g'), fix.to);
});

// 4. Fix in detailed analysis section
content = content.replace(/2025<\/td><td>15<\/td><td>10th grade/g, '2025</td><td>10</td><td>5th grade');
content = content.replace(/2026<\/td><td>16<\/td><td>11th grade/g, '2026</td><td>11</td><td>6th grade');
content = content.replace(/2027<\/td><td>17<\/td><td>12th grade/g, '2027</td><td>12</td><td>7th grade');
content = content.replace(/2028<\/td><td>18<\/td><td>College 1st year/g, '2028</td><td>13</td><td>8th grade');
content = content.replace(/2029<\/td><td>19<\/td><td>College 2nd year/g, '2029</td><td>14</td><td>9th grade');
content = content.replace(/2030<\/td><td>20<\/td><td>College 3rd year/g, '2030</td><td>15</td><td>10th grade');
content = content.replace(/2031-2034<\/td><td>21-24<\/td><td>Graduation\/Masters/g, '2031-2034</td><td>16-19</td><td>11th-College 2nd year');

// 5. Fix location predictions
content = content.replace(/2025-2027 \(Age 15-17\):/g, '2025-2027 (Age 10-12):');
content = content.replace(/2028-2031 \(Age 18-21\):/g, '2028-2031 (Age 13-16):');
content = content.replace(/2032-2035 \(Age 22-25\):/g, '2032-2035 (Age 17-20):');
content = content.replace(/2036-2040 \(Age 26-30\):/g, '2036-2040 (Age 21-25):');
content = content.replace(/2041-2045 \(Age 31-35\):/g, '2041-2045 (Age 26-30):');

// 6. Fix birthYear in JavaScript
content = content.replace(/birthYear: 2010/g, 'birthYear: 2015');

// Write the updated content
fs.writeFileSync('family-prediction-report.html', content);

// Count after
const after2010 = (content.match(/Born: 2010/g) || []).length;
const after2015 = (content.match(/Born: 2015/g) || []).length;
const after10 = (content.match(/Age 2025:<\/strong> 10/g) || []).length;

console.log(`📊 AFTER:`);
console.log(`  - "Born: 2010" remaining: ${after2010} times ✅`);
console.log(`  - "Born: 2015" now: ${after2015} times ✅`);
console.log(`  - "Age 2025: 10" now: ${after10} times ✅\n`);

if (after2010 === 0 && after2015 > 0) {
  console.log('✅ ✅ ✅ SUCCESS! All Annika data updated to 2015! ✅ ✅ ✅');
} else {
  console.log('⚠️ WARNING: Some old data may still exist. Manual check needed.');
}
