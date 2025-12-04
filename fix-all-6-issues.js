const fs = require('fs');

console.log('🔧 FIXING ALL 6 ISSUES\n');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('test-'));
let fixed = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Fix 1: Remove purple colors
    if (content.match(/#667eea|#764ba2|#8b5cf6/gi)) {
        content = content.replace(/#667eea/gi, '#2563eb');
        content = content.replace(/#764ba2/gi, '#1e40af');
        content = content.replace(/#8b5cf6/gi, '#3b82f6');
        changed = true;
        console.log(`✅ ${file}: Removed purple`);
    }

    // Fix 2: Add navigation if missing
    if (!content.includes('common-navigation.js') && content.includes('<body')) {
        content = content.replace('</body>', '<script src="common-navigation.js"></script>\n</body>');
        changed = true;
        console.log(`✅ ${file}: Added navigation`);
    }

    // Fix 3: Add footer if missing
    if (!content.includes('common-footer.js') && content.includes('<body')) {
        content = content.replace('</body>', '<script src="common-footer.js"></script>\n</body>');
        changed = true;
        console.log(`✅ ${file}: Added footer`);
    }

    // Fix 4: Fix width to 1400px
    if (content.includes('max-width') && !content.includes('1400px')) {
        content = content.replace(/max-width:\s*\d+px/g, 'max-width: 1400px');
        changed = true;
        console.log(`✅ ${file}: Fixed width to 1400px`);
    }

    // Fix 5: Fix email
    const wrongEmails = content.match(/[\w.-]+@[\w.-]+\.\w+/g);
    if (wrongEmails && !content.includes('onestepforthelife@gmail.com')) {
        wrongEmails.forEach(email => {
            if (email !== 'onestepforthelife@gmail.com') {
                content = content.replace(new RegExp(email, 'g'), 'onestepforthelife@gmail.com');
                changed = true;
            }
        });
        console.log(`✅ ${file}: Fixed email`);
    }

    // Fix 6: Add analytics if missing
    if (!content.includes('universal-analytics.js') && content.includes('<head')) {
        content = content.replace('</head>', '<script src="universal-analytics.js"></script>\n</head>');
        changed = true;
        console.log(`✅ ${file}: Added analytics`);
    }

    if (changed) {
        fs.writeFileSync(file, content);
        fixed++;
    }
});

console.log(`\n✅ Fixed ${fixed} files`);
