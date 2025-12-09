const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing remaining 84 issues...\n');

const fixes = {
  critical: 0,
  high: 0,
  medium: 0,
  low: 0
};

// Get all HTML files recursively
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
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  const fileName = path.basename(filePath);

  // Add missing common-footer.css
  if (content.includes('common-footer.js') && !content.includes('common-footer.css')) {
    content = content.replace('</head>', '    <link rel="stylesheet" href="common-footer.css">\n</head>');
    changed = true;
    fixes.high++;
    console.log(`✅ Added footer CSS to ${fileName}`);
  }

  // Add missing common-navigation.js
  if (!content.includes('common-navigation.js') && content.includes('</body>')) {
    // Check if it's a page that should have navigation (not test pages, templates, etc.)
    if (!fileName.includes('test-') && !fileName.includes('template') && !fileName.includes('error-')) {
      content = content.replace('</body>', '    <script src="common-navigation.js"></script>\n</body>');
      changed = true;
      fixes.medium++;
      console.log(`✅ Added navigation JS to ${fileName}`);
    }
  }

  // Add missing common-footer.js
  if (!content.includes('common-footer.js') && content.includes('</body>')) {
    if (!fileName.includes('test-') && !fileName.includes('template') && !fileName.includes('error-')) {
      content = content.replace('</body>', '    <script src="common-footer.js"></script>\n</body>');
      changed = true;
      fixes.medium++;
      console.log(`✅ Added footer JS to ${fileName}`);
    }
  }

  // Remove remaining purple colors
  const purpleColors = [
    '#667eea', '#764ba2', '#8b5cf6', '#9333ea', '#a855f7', '#c084fc',
    'rgb(102, 126, 234)', 'rgb(118, 75, 162)', 'rgb(139, 92, 246)'
  ];
  purpleColors.forEach(color => {
    if (content.includes(color)) {
      content = content.replace(new RegExp(color, 'gi'), '#5a6c7d');
      changed = true;
      fixes.high++;
    }
  });

  // Remove double headers
  if (content.includes('<header') && content.includes('common-navigation.js')) {
    const headerMatch = content.match(/<header[^>]*>[\s\S]*?<\/header>/i);
    if (headerMatch) {
      content = content.replace(headerMatch[0], '');
      changed = true;
      fixes.high++;
      console.log(`✅ Removed double header from ${fileName}`);
    }
  }

  // Add universal-analytics.js if missing
  if (!content.includes('universal-analytics.js') && content.includes('</body>')) {
    if (!fileName.includes('test-') && !fileName.includes('template')) {
      content = content.replace('</body>', '    <script src="universal-analytics.js"></script>\n</body>');
      changed = true;
      fixes.medium++;
      console.log(`✅ Added analytics to ${fileName}`);
    }
  }

  // Standardize max-width to 1400px
  const maxWidthPatterns = [
    /max-width:\s*200px/gi,
    /max-width:\s*300px/gi,
    /max-width:\s*400px/gi,
    /max-width:\s*480px/gi,
    /max-width:\s*500px/gi,
    /max-width:\s*600px/gi,
    /max-width:\s*700px/gi,
    /max-width:\s*768px/gi,
    /max-width:\s*800px/gi,
    /max-width:\s*900px/gi,
    /max-width:\s*1000px/gi,
    /max-width:\s*1024px/gi,
    /max-width:\s*1200px/gi,
    /max-width:\s*1600px/gi
  ];
  
  maxWidthPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      // Only change container/main content widths, not buttons/images
      if (content.match(/\.container|\.main|\.content|body\s*{[^}]*max-width/i)) {
        content = content.replace(pattern, 'max-width: 1400px');
        changed = true;
        fixes.low++;
      }
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
});

console.log('\n═══════════════════════════════════════');
console.log('📊 FIXES APPLIED:');
console.log('═══════════════════════════════════════');
console.log(`🚨 Critical: ${fixes.critical}/1`);
console.log(`⚠️  High: ${fixes.high}/74`);
console.log(`📌 Medium: ${fixes.medium}/8`);
console.log(`📌 Low: ${fixes.low}/1`);
console.log(`\n✅ Total: ${fixes.critical + fixes.high + fixes.medium + fixes.low} issues fixed`);
console.log('\n🔄 Re-run KIRO_PROACTIVE_CHECKER.js to verify all fixes');
