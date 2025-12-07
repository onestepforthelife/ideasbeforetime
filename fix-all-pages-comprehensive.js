#!/usr/bin/env node

/**
 * FIX ALL PAGES COMPREHENSIVELY
 * Fix all common issues across all HTML files
 */

const fs = require('fs');

console.log('🔧 FIXING ALL PAGES COMPREHENSIVELY\n');

const report = JSON.parse(fs.readFileSync('ALL_PAGES_CHECK_REPORT.json', 'utf8'));

let fixed = 0;
const skipFiles = ['email-template.html']; // Skip email templates

// Fix wrong background colors
console.log('1️⃣ Fixing background colors...');
report.issues.wrongBackground.forEach(file => {
    if (skipFiles.includes(file)) return;
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix gray-blue to bright blue
        content = content.replace(
            /background:linear-gradient\(135deg,#5a6c7d 0%,#8b9aa7 100%\)/g,
            'background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%)'
        );
        
        fs.writeFileSync(file, content, 'utf8');
        fixed++;
        console.log(`   ✅ ${file}`);
    } catch (error) {
        console.error(`   ❌ ${file}: ${error.message}`);
    }
});

// Fix poor contrast colors
console.log('\n2️⃣ Fixing poor contrast colors...');
let contrastFixed = 0;
report.issues.poorContrast.forEach(file => {
    if (skipFiles.includes(file)) return;
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;
        
        // Replace gray colors with bright blue
        if (content.includes('#5a6c7d')) {
            content = content.replace(/#5a6c7d/g, '#2563eb');
            modified = true;
        }
        if (content.includes('#8b9aa7')) {
            content = content.replace(/#8b9aa7/g, '#1e40af');
            modified = true;
        }
        
        if (modified) {
            fs.writeFileSync(file, content, 'utf8');
            contrastFixed++;
        }
    } catch (error) {
        console.error(`   ❌ ${file}: ${error.message}`);
    }
});
console.log(`   ✅ Fixed ${contrastFixed} files`);

// Add Quick Access Widget to missing pages
console.log('\n3️⃣ Adding Quick Access Widget...');
const quickAccessWidget = `
<!-- Quick Access Widget -->
<div class="quick-access-widget" id="quickAccessWidget">
    <button class="quick-access-btn" onclick="toggleQuickAccess()">
        <span class="icon">⚡</span>
    </button>
    <div class="quick-access-menu" id="quickAccessMenu">
        <a href="index.html">🏠 Home</a>
        <a href="about.html">👤 About</a>
        <a href="blog.html">📝 Blog</a>
        <a href="market-reports.html">📊 Reports</a>
        <a href="cv.html">📄 CV</a>
        <a href="tools.html">🛠️ Tools</a>
        <a href="innovations.html">💡 Innovations</a>
    </div>
</div>

<style>.quick-access-widget{position:fixed;bottom:20px;right:20px;z-index:1000;}.quick-access-btn{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#2563eb 0%,#1e40af 100%);border:none;color:white;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.2);transition:transform 0.3s ease;}.quick-access-btn:hover{transform:scale(1.1);}.quick-access-menu{display:none;position:absolute;bottom:70px;right:0;background:white;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.15);padding:12px;min-width:200px;}.quick-access-menu.active{display:block;animation:slideUp 0.3s ease;}@keyframes slideUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}.quick-access-menu a{display:block;padding:12px 16px;color:#2c3e50;text-decoration:none;border-radius:8px;transition:background 0.2s ease;font-size:14px;}.quick-access-menu a:hover{background:#f8f9fa;}@media (max-width:768px){.quick-access-widget{bottom:15px;right:15px;}.quick-access-btn{width:50px;height:50px;font-size:20px;}}</style>

<script>
function toggleQuickAccess() {
    const menu = document.getElementById('quickAccessMenu');
    menu.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const widget = document.getElementById('quickAccessWidget');
    const menu = document.getElementById('quickAccessMenu');
    if (widget && !widget.contains(event.target)) {
        menu.classList.remove('active');
    }
});
</script>`;

let widgetAdded = 0;
report.issues.missingQuickAccess.forEach(file => {
    if (skipFiles.includes(file)) return;
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add before </body>
        if (!content.includes('quick-access-widget')) {
            content = content.replace('</body>', quickAccessWidget + '\n</body>');
            fs.writeFileSync(file, content, 'utf8');
            widgetAdded++;
            console.log(`   ✅ ${file}`);
        }
    } catch (error) {
        console.error(`   ❌ ${file}: ${error.message}`);
    }
});
console.log(`   ✅ Added to ${widgetAdded} files`);

// Add GODA Chatbot
console.log('\n4️⃣ Adding GODA Chatbot...');
let godaAdded = 0;
report.issues.missingGoda.forEach(file => {
    if (skipFiles.includes(file)) return;
    
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add before </body>
        if (!content.includes('goda-chatbot.js')) {
            content = content.replace('</body>', '<script src="goda-chatbot.js"></script>\n</body>');
            fs.writeFileSync(file, content, 'utf8');
            godaAdded++;
            console.log(`   ✅ ${file}`);
        }
    } catch (error) {
        console.error(`   ❌ ${file}: ${error.message}`);
    }
});
console.log(`   ✅ Added to ${godaAdded} files`);

console.log('\n' + '='.repeat(60));
console.log(`✅ COMPREHENSIVE FIX COMPLETE`);
console.log(`   Background colors: ${fixed} files`);
console.log(`   Contrast colors: ${contrastFixed} files`);
console.log(`   Quick Access: ${widgetAdded} files`);
console.log(`   GODA Chatbot: ${godaAdded} files`);
console.log(`\n💡 Run check again to verify: node check-all-pages-comprehensive.js`);
