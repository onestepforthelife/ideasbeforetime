const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Navigation and Footer - December 5, 2025\n');

// Fix 1: Add Blog to navigation
console.log('📋 Fix 1: Adding Blog to header navigation...');

const navFile = 'common-navigation.js';
let navContent = fs.readFileSync(navFile, 'utf8');

// Check if Blog already exists
if (navContent.includes('href="blog.html"')) {
    console.log('✅ Blog already in navigation');
} else {
    // Add Blog link before "About Creator"
    navContent = navContent.replace(
        /<a href="library\.html">Innovation Library<\/a>/,
        `<a href="library.html">Innovation Library</a>
        <a href="blog.html">Blog</a>`
    );
    
    fs.writeFileSync(navFile, navContent);
    console.log('✅ Added Blog to navigation');
}

// Fix 2: Add legal links to footer
console.log('\n📋 Fix 2: Adding legal links to footer...');

const footerFile = 'common-footer.js';
let footerContent = fs.readFileSync(footerFile, 'utf8');

// Check if legal links already exist
if (footerContent.includes('privacy-policy.html')) {
    console.log('✅ Legal links already in footer');
} else {
    // Add legal links before copyright
    footerContent = footerContent.replace(
        /<p>&copy; 2025 Ideas Before Time\. All rights reserved\.<\/p>/,
        `<div class="footer-links">
            <a href="about.html">About</a> | 
            <a href="blog.html">Blog</a> | 
            <a href="privacy-policy.html">Privacy Policy</a> | 
            <a href="refund-policy.html">Refund Policy</a> | 
            <a href="terms-and-disclaimer.html">Terms & Disclaimer</a>
        </div>
        <p>&copy; 2025 Ideas Before Time. All rights reserved.</p>`
    );
    
    fs.writeFileSync(footerFile, footerContent);
    console.log('✅ Added legal links to footer');
}

// Fix 3: Add CSS for footer links
console.log('\n📋 Fix 3: Adding footer links CSS...');

const footerCSSFile = 'common-footer.css';
let footerCSS = fs.readFileSync(footerCSSFile, 'utf8');

if (!footerCSS.includes('.footer-links')) {
    footerCSS += `

/* Footer Links */
.footer-links {
    margin-bottom: 15px;
    font-size: 14px;
}

.footer-links a {
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: white;
    text-decoration: underline;
}
`;
    
    fs.writeFileSync(footerCSSFile, footerCSS);
    console.log('✅ Added footer links CSS');
} else {
    console.log('✅ Footer links CSS already exists');
}

console.log('\n═══════════════════════════════════════════════════════════');
console.log('✅ ALL FIXES COMPLETE!');
console.log('═══════════════════════════════════════════════════════════');
console.log('\n📋 What was fixed:');
console.log('1. ✅ Added "Blog" to header navigation');
console.log('2. ✅ Added legal links to footer');
console.log('3. ✅ Added CSS styling for footer links');
console.log('\n🚀 Next: Push to GitHub and deploy');
console.log('═══════════════════════════════════════════════════════════\n');
