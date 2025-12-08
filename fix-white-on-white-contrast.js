const fs = require('fs');

console.log('🔧 FIXING: White text on white backgrounds\n');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let fixed = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Fix 1: background: white; color: white; → background: gradient; color: white;
    const pattern1 = /background:\s*white;\s*color:\s*white;/gi;
    if (pattern1.test(content)) {
        content = content.replace(pattern1, 'background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%); color: white;');
        modified = true;
    }
    
    // Fix 2: color: white; background: white; → color: white; background: gradient;
    const pattern2 = /color:\s*white;\s*background:\s*white;/gi;
    if (pattern2.test(content)) {
        content = content.replace(pattern2, 'color: white; background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);');
        modified = true;
    }
    
    // Fix 3: .hero{background: white;color:white; → .hero{background: gradient;color:white;
    const pattern3 = /\.hero\s*{[^}]*background:\s*white;[^}]*color:\s*white;/gi;
    if (pattern3.test(content)) {
        content = content.replace(/\.hero\s*{([^}]*)background:\s*white;([^}]*)color:\s*white;/gi, 
            '.hero{$1background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);$2color:white;');
        modified = true;
    }
    
    // Fix 4: .stat-card{background: white;color:white; → .stat-card{background: gradient;color:white;
    const pattern4 = /\.stat-card\s*{[^}]*background:\s*white;[^}]*color:\s*white;/gi;
    if (pattern4.test(content)) {
        content = content.replace(/\.stat-card\s*{([^}]*)background:\s*white;([^}]*)color:\s*white;/gi,
            '.stat-card{$1background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);$2color:white;');
        modified = true;
    }
    
    // Fix 5: .back-btn{...background: white;color:white → .back-btn{...background: gradient;color:white
    const pattern5 = /\.back-btn\s*{[^}]*background:\s*white;[^}]*color:\s*white/gi;
    if (pattern5.test(content)) {
        content = content.replace(/\.back-btn\s*{([^}]*)background:\s*white;([^}]*)color:\s*white/gi,
            '.back-btn{$1background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);$2color:white');
        modified = true;
    }
    
    // Fix 6: .quick-access-btn{...background: white;...color:white;
    const pattern6 = /\.quick-access-btn\s*{[^}]*background:\s*white;[^}]*color:\s*white;/gi;
    if (pattern6.test(content)) {
        content = content.replace(/\.quick-access-btn\s*{([^}]*)background:\s*white;([^}]*)color:\s*white;/gi,
            '.quick-access-btn{$1background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);$2color:white;');
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content);
        fixed++;
        console.log(`✅ Fixed: ${file}`);
    }
});

console.log(`\n📊 SUMMARY: Fixed ${fixed} files`);
process.exit(0);
