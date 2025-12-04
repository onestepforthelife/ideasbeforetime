const fs = require('fs');

const file = 'ghar-ghar/ghar-ghar-complete.html';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('common-navigation.js')) {
        content = content.replace('</body>', '<script src="../common-navigation.js"></script>\n</body>');
        console.log('✓ Added navigation');
    }
    
    if (!content.includes('common-footer.js')) {
        content = content.replace('</body>', '<script src="../common-footer.js"></script>\n</body>');
        console.log('✓ Added footer');
    }
    
    if (!content.includes('universal-analytics.js')) {
        content = content.replace('</body>', '<script src="../universal-analytics.js"></script>\n</body>');
        console.log('✓ Added analytics');
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('✅ Fixed ghar-ghar/ghar-ghar-complete.html');
} else {
    console.log('❌ File not found');
}
