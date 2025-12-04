const fs = require('fs');

console.log('🔧 Fixing 3 Orphaned Pages...\n');

const fixes = [
  {
    file: 'family-lifetime-timeline.html',
    needsNav: true,
    needsFooter: true
  },
  {
    file: 'family-prediction-report.html',
    needsNav: false,
    needsFooter: true
  },
  {
    file: 'test-preview-system.html',
    needsNav: true,
    needsFooter: true
  }
];

let fixed = 0;

fixes.forEach(fix => {
  try {
    let content = fs.readFileSync(fix.file, 'utf8');
    let modified = false;

    // Add navigation if needed
    if (fix.needsNav && !content.includes('common-navigation.js')) {
      // Add before </body>
      content = content.replace('</body>', `    <script src="common-navigation.js"></script>
</body>`);
      modified = true;
      console.log(`✅ Added navigation to ${fix.file}`);
    }

    // Add footer if needed
    if (fix.needsFooter && !content.includes('common-footer.js')) {
      // Add before </body> (after navigation if present)
      content = content.replace('</body>', `    <script src="common-footer.js"></script>
</body>`);
      modified = true;
      console.log(`✅ Added footer to ${fix.file}`);
    }

    if (modified) {
      fs.writeFileSync(fix.file, content, 'utf8');
      fixed++;
    } else {
      console.log(`⏭️  ${fix.file} already has required components`);
    }

  } catch (error) {
    console.log(`❌ Error fixing ${fix.file}: ${error.message}`);
  }
});

console.log(`\n📊 SUMMARY`);
console.log(`==================================================`);
console.log(`Fixed: ${fixed}/3 pages`);
console.log(`==================================================`);
console.log(`\n✅ All orphaned pages fixed!`);
