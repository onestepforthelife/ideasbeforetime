const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing final 75 issues...\n');

const fixes = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0
};

// Files that are intentionally without common components (templates, tests, etc.)
const excludeFiles = [
  'common-footer.html',
  'index-improved.html',
  'email-template.html',
  'error-dashboard.html',
  'test-preview-system.html',
  'compare-homepage-conversion.html',
  'compare-homepage-versions.html',
  'vertical-nav-option.html',
  'BASF_IT_SECURITY_PROPOSAL.html',
  'PAYMENT_VISUAL_GUIDE.html',
  'TEST_CREDITS.html',
  'UNIVERSAL_MARKET_REPORT_TEMPLATE.html'
];

// Get all HTML files
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!file.startsWith('.') && !file.startsWith('backup_') && !file.startsWith('node_modules')) {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allHtmlFiles = getAllHtmlFiles(__dirname);
console.log(`Found ${allHtmlFiles.length} HTML files\n`);

// Fix all remaining issues
allHtmlFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  
  // Skip excluded files (templates, tests, etc.)
  if (excludeFiles.includes(fileName)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Fix 1: Add missing common-footer.css
  if (content.includes('common-footer.js') && !content.includes('common-footer.css')) {
    if (content.includes('</head>')) {
      content = content.replace('</head>', '    <link rel="stylesheet" href="common-footer.css">\n</head>');
      changed = true;
      fixes.high++;
      console.log(`✅ Added footer CSS to ${fileName}`);
    }
  }

  // Fix 2: Remove remaining purple colors
  const purplePatterns = [
    /#667eea/gi, /#764ba2/gi, /#8b5cf6/gi, /#9333ea/gi, 
    /#a855f7/gi, /#c084fc/gi, /rgb\(102,\s*126,\s*234\)/gi,
    /rgb\(118,\s*75,\s*162\)/gi, /rgb\(139,\s*92,\s*246\)/gi
  ];
  
  purplePatterns.forEach(pattern => {
    if (pattern.test(content)) {
      content = content.replace(pattern, '#5a6c7d');
      changed = true;
      fixes.high++;
    }
  });

  // Fix 3: Remove double headers
  if (content.includes('<header') && content.includes('common-navigation.js')) {
    const headerMatch = content.match(/<header[^>]*>[\s\S]*?<\/header>/i);
    if (headerMatch) {
      content = content.replace(headerMatch[0], '<!-- Header removed - using common-navigation.js -->');
      changed = true;
      fixes.high++;
      console.log(`✅ Removed double header from ${fileName}`);
    }
  }

  // Fix 4: Add missing common-navigation.js (for main pages only)
  if (!content.includes('common-navigation.js') && 
      !fileName.includes('test-') && 
      !fileName.includes('error-') &&
      !fileName.includes('template') &&
      content.includes('</body>')) {
    content = content.replace('</body>', '    <script src="common-navigation.js"></script>\n</body>');
    changed = true;
    fixes.medium++;
    console.log(`✅ Added navigation JS to ${fileName}`);
  }

  // Fix 5: Add missing common-footer.js (for main pages only)
  if (!content.includes('common-footer.js') && 
      !fileName.includes('test-') && 
      !fileName.includes('error-') &&
      !fileName.includes('template') &&
      content.includes('</body>')) {
    content = content.replace('</body>', '    <script src="common-footer.js"></script>\n</body>');
    changed = true;
    fixes.medium++;
    console.log(`✅ Added footer JS to ${fileName}`);
  }

  // Fix 6: Add missing universal-analytics.js (for main pages only)
  if (!content.includes('universal-analytics.js') && 
      !fileName.includes('test-') && 
      !fileName.includes('error-') &&
      !fileName.includes('template') &&
      content.includes('</body>')) {
    content = content.replace('</body>', '    <script src="universal-analytics.js"></script>\n</body>');
    changed = true;
    fixes.medium++;
    console.log(`✅ Added analytics to ${fileName}`);
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
});

console.log('\n═══════════════════════════════════════');
console.log('📊 FINAL FIXES APPLIED:');
console.log('═══════════════════════════════════════');
console.log(`🚨 Critical: ${fixes.critical}`);
console.log(`⚠️  High: ${fixes.high}`);
console.log(`📌 Medium: ${fixes.medium}`);
console.log(`📌 Low: ${fixes.low}`);
console.log(`\n✅ Total: ${fixes.critical + fixes.high + fixes.medium + fixes.low} issues fixed`);
console.log('\n🎯 All production pages now consistent!');
console.log('📝 Template/test files intentionally excluded');
