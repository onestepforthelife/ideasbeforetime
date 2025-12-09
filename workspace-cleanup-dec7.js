#!/usr/bin/env node

/**
 * WORKSPACE CLEANUP SCRIPT - December 7, 2025
 * Purpose: Clean and optimize Cloudfare folder
 * Removes: Status files, duplicates, old backups, redundant documentation
 * Organizes: By category for better maintainability
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 WORKSPACE CLEANUP - December 7, 2025\n');

// Categories for organization
const categories = {
  statusFiles: [],
  testScripts: [],
  fixScripts: [],
  checkScripts: [],
  verifyScripts: [],
  setupGuides: [],
  learningDocs: [],
  awsDocs: [],
  spoDocs: [],
  linkedinDocs: [],
  cloudfareDocs: [],
  duplicates: [],
  personalFiles: [],
  oldBackups: []
};

// Patterns to identify
const patterns = {
  status: /^(ALL_|SESSION_|FINAL_|COMPLETE_|READY_|PENDING_|DONE_|STATUS_|EVERYTHING_|ABSOLUTELY_)/i,
  test: /^test-/i,
  fix: /^fix-/i,
  check: /^check-/i,
  verify: /^verify-/i,
  setup: /^SETUP_|_SETUP/i,
  learning: /^LEARNING_|KIRO_/i,
  aws: /^AWS_/i,
  spo: /^SPO_/i,
  linkedin: /^LINKEDIN_/i,
  cloudflare: /^CLOUDFLARE_/i,
  personal: /^(MY_|Amit|amit-dp)/i
};

// Files to KEEP (essential working files)
const keepFiles = [
  // Core HTML pages
  'index.html', 'about.html', 'blog.html', 'cv.html', 'jobs.html',
  'market-reports.html', 'astronomy.html', 'innovations.html',
  'library.html', 'linkedin.html', 'kiro.html', 'tools.html',
  'spo.html', 'ro.html', 'nickel.html', 'paper.html', 'specialty.html',
  
  // Market reports
  'Poloxamer_Market_Report.html', 'LyondellBasell_Market_Report.html',
  'Paper_Pulp_Specialty_Chemicals_Report.html',
  'Final_Acrylic_Market_Report.html',
  
  // Common components
  'common-navigation.js', 'common-navigation.css',
  'common-footer.js', 'common-footer.css',
  'common-styles.css', 'common-watermark.css',
  'universal-analytics.js', 'error-tracker.js',
  
  // Essential scripts
  'chat-ai-widget.js', 'AI_MULTI_PROVIDER_FAILOVER.js',
  'social-optimizer-app.js', 'social-optimizer-ai-engine.js',
  
  // Configuration
  'manifest.json', 'robots.txt', 'sitemap.xml', 'sw.js',
  '_headers', '_redirects', '.gitignore',
  
  // Documentation (keep latest)
  'README.md', 'UNIVERSAL_MARKET_REPORT_TEMPLATE.md',
  'MARKET_REPORT_TEMPLATE_GUIDELINES_SHAREABLE.md',
  'BASF_VS_LYONDELLBASELL_COMPETITIVE_ANALYSIS.md',
  
  // Essential guides
  'HOW_TO_LAUNCH.txt', 'START_HERE.txt',
  'GITHUB_AUTO_PUSH_SETUP_GUIDE.txt'
];

// Analyze files
console.log('📊 Analyzing workspace...\n');

const rootFiles = fs.readdirSync('.').filter(f => {
  const stat = fs.statSync(f);
  return stat.isFile();
});

console.log(`Total files in root: ${rootFiles.length}\n`);

// Categorize files
rootFiles.forEach(file => {
  // Skip essential files
  if (keepFiles.includes(file)) return;
  
  // Categorize by pattern
  if (patterns.status.test(file)) {
    categories.statusFiles.push(file);
  } else if (patterns.test.test(file)) {
    categories.testScripts.push(file);
  } else if (patterns.fix.test(file)) {
    categories.fixScripts.push(file);
  } else if (patterns.check.test(file)) {
    categories.checkScripts.push(file);
  } else if (patterns.verify.test(file)) {
    categories.verifyScripts.push(file);
  } else if (patterns.setup.test(file)) {
    categories.setupGuides.push(file);
  } else if (patterns.learning.test(file)) {
    categories.learningDocs.push(file);
  } else if (patterns.aws.test(file)) {
    categories.awsDocs.push(file);
  } else if (patterns.spo.test(file)) {
    categories.spoDocs.push(file);
  } else if (patterns.linkedin.test(file)) {
    categories.linkedinDocs.push(file);
  } else if (patterns.cloudflare.test(file)) {
    categories.cloudfareDocs.push(file);
  } else if (patterns.personal.test(file)) {
    categories.personalFiles.push(file);
  }
});

// Report findings
console.log('📋 CLEANUP ANALYSIS:\n');
console.log(`Status Files (to archive): ${categories.statusFiles.length}`);
console.log(`Test Scripts (to archive): ${categories.testScripts.length}`);
console.log(`Fix Scripts (to archive): ${categories.fixScripts.length}`);
console.log(`Check Scripts (to archive): ${categories.checkScripts.length}`);
console.log(`Verify Scripts (to archive): ${categories.verifyScripts.length}`);
console.log(`Setup Guides (to consolidate): ${categories.setupGuides.length}`);
console.log(`Learning Docs (to organize): ${categories.learningDocs.length}`);
console.log(`AWS Docs (to organize): ${categories.awsDocs.length}`);
console.log(`SPO Docs (to organize): ${categories.spoDocs.length}`);
console.log(`LinkedIn Docs (to organize): ${categories.linkedinDocs.length}`);
console.log(`Cloudflare Docs (to organize): ${categories.cloudfareDocs.length}`);
console.log(`Personal Files (to move): ${categories.personalFiles.length}`);

// Calculate space savings
const totalToArchive = 
  categories.statusFiles.length +
  categories.testScripts.length +
  categories.fixScripts.length +
  categories.checkScripts.length +
  categories.verifyScripts.length;

console.log(`\n📦 Total files to archive: ${totalToArchive}`);
console.log(`📁 Files to keep in root: ${keepFiles.length}`);
console.log(`🎯 Cleanup efficiency: ${Math.round((totalToArchive / rootFiles.length) * 100)}%\n`);

// Folders to check
console.log('📂 FOLDERS TO REVIEW:\n');
const folders = fs.readdirSync('.').filter(f => {
  const stat = fs.statSync(f);
  return stat.isDirectory() && !f.startsWith('.');
});

const redundantFolders = [
  'Cloudfare/Cloudfare',
  'amit profile for Kiro',
  'amit proifleforKiro',
  'backup_before_cleanup_2025-12-04T04-24-21',
  'backup_before_improvements_20251202_193117'
];

folders.forEach(folder => {
  if (redundantFolders.includes(folder)) {
    console.log(`❌ REDUNDANT: ${folder}`);
  } else if (folder === '_archive') {
    console.log(`✅ KEEP: ${folder} (archive folder)`);
  } else {
    console.log(`✅ KEEP: ${folder}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('CLEANUP RECOMMENDATIONS:');
console.log('='.repeat(60) + '\n');

console.log('1. ARCHIVE OLD STATUS FILES:');
console.log(`   Move ${categories.statusFiles.length} status files to _archive/status/`);
console.log('   Examples: ALL_DONE_*, SESSION_COMPLETE_*, FINAL_STATUS_*\n');

console.log('2. ARCHIVE OLD SCRIPTS:');
console.log(`   Move ${categories.testScripts.length + categories.fixScripts.length + categories.checkScripts.length} scripts to _archive/scripts/`);
console.log('   Keep only: Latest test/check scripts in use\n');

console.log('3. CONSOLIDATE DOCUMENTATION:');
console.log('   - AWS docs → docs/aws/');
console.log('   - SPO docs → docs/spo/');
console.log('   - LinkedIn docs → docs/linkedin/');
console.log('   - Cloudflare docs → docs/cloudflare/\n');

console.log('4. REMOVE REDUNDANT FOLDERS:');
redundantFolders.forEach(f => console.log(`   - ${f}`));
console.log('');

console.log('5. MOVE PERSONAL FILES:');
console.log('   Move to personal-local-only/ folder\n');

console.log('6. ORGANIZE BY CATEGORY:');
console.log('   Root: Only essential HTML, JS, CSS, config files');
console.log('   docs/: All documentation');
console.log('   scripts/: Active utility scripts');
console.log('   _archive/: Historical files\n');

console.log('='.repeat(60));
console.log('ESTIMATED RESULTS:');
console.log('='.repeat(60) + '\n');

console.log(`Current root files: ${rootFiles.length}`);
console.log(`After cleanup: ~${keepFiles.length + 20} (essential + active scripts)`);
console.log(`Reduction: ${Math.round(((rootFiles.length - keepFiles.length - 20) / rootFiles.length) * 100)}%`);
console.log(`\nWorkspace will be: CLEAN, ORGANIZED, MAINTAINABLE ✅\n`);

// Export categories for actual cleanup
const report = {
  timestamp: new Date().toISOString(),
  analysis: {
    totalFiles: rootFiles.length,
    toArchive: totalToArchive,
    toKeep: keepFiles.length,
    efficiency: Math.round((totalToArchive / rootFiles.length) * 100)
  },
  categories,
  redundantFolders,
  recommendations: [
    'Archive status files to _archive/status/',
    'Archive old scripts to _archive/scripts/',
    'Consolidate docs to docs/ subfolder',
    'Remove redundant backup folders',
    'Move personal files to personal-local-only/',
    'Keep only essential files in root'
  ]
};

fs.writeFileSync(
  'WORKSPACE_CLEANUP_ANALYSIS_DEC7.json',
  JSON.stringify(report, null, 2)
);

console.log('📄 Analysis saved to: WORKSPACE_CLEANUP_ANALYSIS_DEC7.json\n');
console.log('✅ Analysis complete! Ready for cleanup execution.\n');
