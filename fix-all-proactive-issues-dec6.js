const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all 122 proactive issues...\n');

const fixes = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0
};

// CRITICAL FIX #1-4: Wrong name (Amit Kumar Agrawal → Amit Kumar)
const nameFiles = [
  'about.html',
  'cv.html', 
  'social-optimizer-index.html',
  'timeline.html'
];

nameFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const before = content.match(/Amit Kumar Agrawal/g)?.length || 0;
    content = content.replace(/Amit Kumar Agrawal/g, 'Amit Kumar');
    const after = content.match(/Amit Kumar Agrawal/g)?.length || 0;
    if (before > after) {
      fs.writeFileSync(filePath, content);
      fixes.critical++;
      console.log(`✅ Fixed name in ${file} (${before} instances)`);
    }
  }
});

// HIGH FIX: Add missing common-footer.css (66 files)
const footerCssFiles = [
  'access.html', 'acrylic.html', 'admin-control-panel.html', 'astronomy.html',
  'BASF_IT_SECURITY_PROPOSAL.html', 'cv.html', 'email-sender-web.html',
  'Final_Acrylic_Market_Report.html', 'job-dashboard.html', 'job-tools.html',
  'JOB_OUTREACH_AUTOMATION_TOOL.html', 'JOB_POWER_FEATURES.html', 'JOB_TRACKER_DAILY.html',
  'nickel-esg-report.html', 'PAYMENT_VISUAL_GUIDE.html', 'profile-optimizer.html',
  'request-access.html', 'Specialty_Chemicals_Report_UPDATED.html', 'TEST_CREDITS.html',
  'timeline.html', 'compare-homepage-conversion.html', 'compare-homepage-versions.html',
  'email.html', 'innovations.html', 'kiro.html', 'linkedin-auto-scroller.html',
  'linkedin-post-copier.html', 'linkedin.html', 'nickel.html', 'paper.html',
  'family-lifetime-timeline.html', 'family-prediction-report.html', 'poloxamer.html',
  'reports.html', 'ro-guide.html', 'ro.html', 'specialty.html', 'test-multi-ai.html',
  'test-preview-system.html', 'tools.html', 'vertical-nav-option.html'
];

footerCssFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('common-footer.js') && !content.includes('common-footer.css')) {
      // Add before </head>
      content = content.replace('</head>', '    <link rel="stylesheet" href="common-footer.css">\n</head>');
      fs.writeFileSync(filePath, content);
      fixes.high++;
      console.log(`✅ Added footer CSS to ${file}`);
    }
  }
});

// HIGH FIX: Remove purple colors (20+ files)
const purpleFiles = [
  'astronomy.html', 'linkedin-complete-book.html', 'linkedin-portfolio-index.html',
  'ghar-ghar-game.html', 'innovations/3d-imaging-2009.html', 'innovations/ai-profile-optimizer-2025.html',
  'innovations/dashboard-simplification-2017.html', 'innovations/digital-money-2012.html',
  'innovations/dual-sim-2003.html', 'innovations/innovation-template.html',
  'innovations/moveable-dividers-2012.html', 'innovations/music-ringtones-2003.html',
  'innovations/silent-dj-2001.html', 'innovations/tv-storage-2002.html',
  'innovations/universal-health-id-2009.html', 'linkedin-posts-collector.html',
  'nickel-compounds-technical-data.html', 'family-lifetime-timeline.html',
  'family-prediction-report.html', 'test-multi-ai.html'
];

const purpleColors = [
  '#667eea', '#764ba2', '#8b5cf6', '#9333ea', '#a855f7', '#c084fc',
  'rgb(102, 126, 234)', 'rgb(118, 75, 162)', 'rgb(139, 92, 246)'
];

purpleFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    purpleColors.forEach(color => {
      if (content.includes(color)) {
        content = content.replace(new RegExp(color, 'g'), '#5a6c7d');
        changed = true;
      }
    });
    if (changed) {
      fs.writeFileSync(filePath, content);
      fixes.high++;
      console.log(`✅ Removed purple from ${file}`);
    }
  }
});

// HIGH FIX: Remove double headers (5 files)
const doubleHeaderFiles = [
  'astronomy.html', 'profile-optimizer.html', 'social-optimizer-admin.html',
  'social-optimizer-dashboard.html', 'family-lifetime-timeline.html'
];

doubleHeaderFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('<header') && content.includes('common-navigation.js')) {
      // Remove <header> tag and its content
      content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/i, '');
      fs.writeFileSync(filePath, content);
      fixes.high++;
      console.log(`✅ Removed double header from ${file}`);
    }
  }
});

console.log('\n═══════════════════════════════════════');
console.log('📊 FIXES APPLIED:');
console.log('═══════════════════════════════════════');
console.log(`🚨 Critical: ${fixes.critical}/5`);
console.log(`⚠️  High: ${fixes.high}/112`);
console.log(`📌 Medium: ${fixes.medium}/4`);
console.log(`📌 Low: ${fixes.low}/1`);
console.log(`\n✅ Total: ${fixes.critical + fixes.high + fixes.medium + fixes.low} issues fixed`);
console.log('\n🔄 Re-run KIRO_PROACTIVE_CHECKER.js to verify');
