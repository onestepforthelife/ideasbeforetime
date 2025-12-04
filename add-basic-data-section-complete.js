// Add basic individual data section at top + fix all remaining Annika data

const fs = require('fs');

console.log('🔧 Adding basic data section + fixing all Annika data...\n');

// Read the file
let content = fs.readFileSync('family-prediction-report.html', 'utf8');

// 1. Fix the typo in container div
content = content.replace('</nav>v class="container"', '</nav><div class="container">');

// 2. Create the basic data section
const basicDataSection = `
<!-- BASIC INDIVIDUAL DATA -->
<div class="section" id="basicdata" style="margin-bottom: 40px;">
  <h2>👥 Family Members - Basic Information</h2>
  <p style="margin-bottom: 20px; padding: 15px; background: #f0f9ff; border-left: 5px solid #3b82f6; border-radius: 8px;">
    <strong>📋 Quick Reference:</strong> Essential details for all family members including birth years, current ages, and key astrological data.
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 30px 0;">
    
    <!-- Renu Sharma -->
    <div style="background: linear-gradient(135deg, #ff6384 0%, #ff8fab 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 8px 25px rgba(255, 99, 132, 0.3);">
      <h3 style="margin: 0 0 15px 0; font-size: 22px;">👩 Renu Sharma</h3>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
          <div><strong>Born:</strong> 1982</div>
          <div><strong>Age 2025:</strong> 43</div>
          <div><strong>Moon Sign:</strong> Cancer</div>
          <div><strong>Ascendant:</strong> Virgo</div>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
        <div style="font-size: 14px; line-height: 1.6;">
          <div><strong>Current Dasha:</strong> Venus (2023-2043)</div>
          <div><strong>Sade Sati:</strong> Not Active (Next: 2032-2039)</div>
          <div><strong>Career:</strong> Teacher, Online Education</div>
          <div><strong>Peak Years:</strong> 2030-2045</div>
        </div>
      </div>
    </div>
    
    <!-- Amit Vashisht -->
    <div style="background: linear-gradient(135deg, #36a2eb 0%, #5bb5f0 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 8px 25px rgba(54, 162, 235, 0.3);">
      <h3 style="margin: 0 0 15px 0; font-size: 22px;">👨 Amit Vashisht</h3>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
          <div><strong>Born:</strong> 1980</div>
          <div><strong>Age 2025:</strong> 45</div>
          <div><strong>Moon Sign:</strong> Scorpio</div>
          <div><strong>Ascendant:</strong> Capricorn</div>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
        <div style="font-size: 14px; line-height: 1.6;">
          <div><strong>Current Dasha:</strong> Rahu (2021-2039)</div>
          <div><strong>Sade Sati:</strong> Phase 2 Peak (2023-2028)</div>
          <div><strong>Career:</strong> Leadership, Innovation</div>
          <div><strong>Peak Years:</strong> 2029-2035</div>
        </div>
      </div>
    </div>
    
    <!-- Annika Vashisht -->
    <div style="background: linear-gradient(135deg, #4bc0c0 0%, #6dd5d5 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 8px 25px rgba(75, 192, 192, 0.3);">
      <h3 style="margin: 0 0 15px 0; font-size: 22px;">👧 Annika Vashisht</h3>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
          <div><strong>Born:</strong> 2015</div>
          <div><strong>Age 2025:</strong> 10</div>
          <div><strong>Moon Sign:</strong> Gemini</div>
          <div><strong>Ascendant:</strong> Leo</div>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
        <div style="font-size: 14px; line-height: 1.6;">
          <div><strong>Current Dasha:</strong> Moon (2020-2030)</div>
          <div><strong>Next Dasha:</strong> Mars (2030-2047)</div>
          <div><strong>Education:</strong> 5th Grade (2025)</div>
          <div><strong>College:</strong> 2033 (Age 18)</div>
        </div>
      </div>
    </div>
    
    <!-- Avni Vashisht -->
    <div style="background: linear-gradient(135deg, #ffcd56 0%, #ffd97d 100%); color: white; padding: 25px; border-radius: 15px; box-shadow: 0 8px 25px rgba(255, 205, 86, 0.3);">
      <h3 style="margin: 0 0 15px 0; font-size: 22px;">👧 Avni Vashisht</h3>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
          <div><strong>Born:</strong> 2012</div>
          <div><strong>Age 2025:</strong> 13</div>
          <div><strong>Moon Sign:</strong> Pisces</div>
          <div><strong>Ascendant:</strong> Libra</div>
        </div>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">
        <div style="font-size: 14px; line-height: 1.6;">
          <div><strong>Current Dasha:</strong> Moon (2022-2032)</div>
          <div><strong>Next Dasha:</strong> Mars (2032-2049)</div>
          <div><strong>Education:</strong> 8th Grade (2025)</div>
          <div><strong>College:</strong> 2030 (Age 18)</div>
        </div>
      </div>
    </div>
    
  </div>
  
  <!-- Quick Comparison Table -->
  <div style="margin-top: 30px;">
    <h3 style="color: #264a96; margin-bottom: 15px;">📊 Quick Comparison</h3>
    <div style="overflow-x: auto;">
      <table style="font-size: 14px;">
        <tr>
          <th>Member</th>
          <th>Birth Year</th>
          <th>Age 2025</th>
          <th>Current Dasha</th>
          <th>Peak Period</th>
          <th>Key Focus</th>
        </tr>
        <tr>
          <td><strong>Renu</strong></td>
          <td>1982</td>
          <td>43</td>
          <td>Venus (2023-2043)</td>
          <td>2030-2045</td>
          <td>Teaching, Creativity</td>
        </tr>
        <tr>
          <td><strong>Amit</strong></td>
          <td>1980</td>
          <td>45</td>
          <td>Rahu (2021-2039)</td>
          <td>2029-2035</td>
          <td>Leadership, Innovation</td>
        </tr>
        <tr>
          <td><strong>Annika</strong></td>
          <td>2015</td>
          <td>10</td>
          <td>Moon (2020-2030)</td>
          <td>2035-2047</td>
          <td>Education, Science</td>
        </tr>
        <tr>
          <td><strong>Avni</strong></td>
          <td>2012</td>
          <td>13</td>
          <td>Moon (2022-2032)</td>
          <td>2035-2049</td>
          <td>Creativity, Arts</td>
        </tr>
      </table>
    </div>
  </div>
  
</div>
`;

// 3. Insert after the button container
const insertPoint = content.indexOf('</div><!-- OVERVIEW STATS -->');
if (insertPoint !== -1) {
  content = content.slice(0, insertPoint) + '</div>' + basicDataSection + '<!-- OVERVIEW STATS -->' + content.slice(insertPoint + 29);
  console.log('✅ Basic data section inserted after buttons\n');
} else {
  console.log('⚠️ Could not find insertion point\n');
}

// 4. Fix Annika's age in individual section stat card
content = content.replace(
  /<div class="stat-card" style="background: linear-gradient\(135deg, #4bc0c0 0%, #6dd5d5 100%\);">.*?<h3>Current Age<\/h3><div class="stat-value">15<\/div><div class="stat-label">Born: 2015<\/div>/s,
  '<div class="stat-card" style="background: linear-gradient(135deg, #4bc0c0 0%, #6dd5d5 100%);"><h3>Current Age</h3><div class="stat-value">10</div><div class="stat-label">Born: 2015</div>'
);

// 5. Fix education timeline in detailed section
content = content.replace(/2025<\/td><td>10th grade/g, '2025</td><td>5th grade');
content = content.replace(/2026<\/td><td>11th grade/g, '2026</td><td>6th grade');
content = content.replace(/2027<\/td><td>12th grade/g, '2027</td><td>7th grade');
content = content.replace(/2028<\/td><td>College 1st year/g, '2028</td><td>8th grade');
content = content.replace(/2029<\/td><td>College 2nd year/g, '2029</td><td>9th grade');
content = content.replace(/2030<\/td><td>College 3rd year/g, '2030</td><td>10th grade');
content = content.replace(/2031-2034<\/td><td>Graduation\/Masters/g, '2031-2034</td><td>11th-College 2nd year');
content = content.replace(/2035<\/td><td>Career established/g, '2035</td><td>College 3rd year');

// Write the updated content
fs.writeFileSync('family-prediction-report.html', content);

console.log('✅ ✅ ✅ COMPLETE! ✅ ✅ ✅');
console.log('  - Basic data section added at top');
console.log('  - Container div typo fixed');
console.log('  - All Annika data updated to 2015/age 10');
console.log('  - Education timeline corrected');
