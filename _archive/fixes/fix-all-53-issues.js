const fs = require('fs');

const filesToFix = [
    'access.html', 'acrylic.html', 'email.html', 'ghar-ghar-complete.html',
    'innovations.html', 'jobs.html', 'kiro.html', 'linkedin.html',
    'nickel.html', 'paper.html', 'poloxamer.html', 'reports.html',
    'specialty.html', 'spo.html', 'tools.html'
];

let fixed = 0;

filesToFix.forEach(file => {
    if (!fs.existsSync(file)) return;
    
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    // Add navigation if missing
    if (!content.includes('common-navigation.js')) {
        content = content.replace('</head>', '    <script src="common-navigation.js"></script>\n</head>');
        changed = true;
    }
    
    // Add footer if missing
    if (!content.includes('common-footer.js')) {
        content = content.replace('</body>', '    <script src="common-footer.js"></script>\n</body>');
        changed = true;
    }
    
    // Remove purple colors
    content = content.replace(/#667eea/gi, '#2563eb');
    content = content.replace(/#764ba2/gi, '#1e40af');
    content = content.replace(/purple/gi, 'blue');
    
    if (changed || content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content);
        fixed++;
        console.log(`✅ Fixed: ${file}`);
    }
});

console.log(`\n🎯 Fixed ${fixed}/${filesToFix.length} files`);
