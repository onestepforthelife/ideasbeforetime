// Make Long Pages Engaging - Keep Users Hooked
// Reduces image sizes, adds interactive elements, improves UX

const fs = require('fs');
const path = require('path');

// Pages that need engagement improvements
const longPages = [
    'ro-water-purifier-guide.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Final_Acrylic_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'nickel-esg-report-open.html',
    'about.html',
    'cv.html'
];

console.log('🎯 Making Pages Engaging - Keep Users Hooked!\n');

longPages.forEach(filename => {
    const filepath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filepath)) {
        console.log(`⏭️  Skipping ${filename} (not found)`);
        return;
    }
    
    let content = fs.readFileSync(filepath, 'utf8');
    let changes = [];
    
    // 1. REDUCE IMAGE SIZES TO HALF
    // Find all image width/max-width styles
    const imagePatterns = [
        { 
            old: /max-width:\s*100%/gi, 
            new: 'max-width: 50%',
            desc: 'Reduced image max-width to 50%'
        },
        { 
            old: /width:\s*100%/gi, 
            new: 'width: 50%',
            desc: 'Reduced image width to 50%'
        },
        {
            old: /<img([^>]*style="[^"]*)(width|max-width):\s*\d+%/gi,
            new: (match) => match.replace(/(\d+)%/, '50%'),
            desc: 'Reduced inline image sizes to 50%'
        }
    ];
    
    imagePatterns.forEach(pattern => {
        if (typeof pattern.new === 'function') {
            const matches = content.match(pattern.old);
            if (matches && matches.length > 0) {
                content = content.replace(pattern.old, pattern.new);
                changes.push(`✓ ${pattern.desc} (${matches.length} instances)`);
            }
        } else {
            const oldContent = content;
            content = content.replace(pattern.old, pattern.new);
            if (content !== oldContent) {
                changes.push(`✓ ${pattern.desc}`);
            }
        }
    });
    
    // 2. ADD STICKY PROGRESS BAR (shows how much user has read)
    if (!content.includes('reading-progress-bar')) {
        const progressBar = `
<!-- Reading Progress Bar -->
<div id="reading-progress-bar" style="position: fixed; top: 0; left: 0; width: 0%; height: 4px; background: linear-gradient(90deg, #4caf50 0%, #2196f3 100%); z-index: 9999; transition: width 0.3s;"></div>
<script>
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('reading-progress-bar').style.width = scrolled + '%';
});
</script>
`;
        content = content.replace('</body>', progressBar + '</body>');
        changes.push('✓ Added reading progress bar');
    }
    
    // 3. ADD "BACK TO TOP" BUTTON
    if (!content.includes('back-to-top-btn')) {
        const backToTop = `
<!-- Back to Top Button -->
<button id="back-to-top-btn" style="position: fixed; bottom: 30px; right: 30px; background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); color: white; border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: none; z-index: 9998; transition: all 0.3s;" onclick="window.scrollTo({top: 0, behavior: 'smooth'});" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">↑</button>
<script>
window.addEventListener('scroll', function() {
    const btn = document.getElementById('back-to-top-btn');
    if (window.pageYOffset > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});
</script>
`;
        content = content.replace('</body>', backToTop + '</body>');
        changes.push('✓ Added back-to-top button');
    }
    
    // 4. ADD QUICK NAVIGATION MENU (sticky sidebar)
    if (!content.includes('quick-nav-menu') && content.includes('<h2>')) {
        const quickNav = `
<!-- Quick Navigation Menu -->
<div id="quick-nav-menu" style="position: fixed; right: 20px; top: 50%; transform: translateY(-50%); background: white; padding: 15px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); max-width: 200px; z-index: 9997; display: none;">
    <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #1e88e5;">Quick Jump</h4>
    <div id="quick-nav-links" style="font-size: 12px;"></div>
</div>
<script>
// Build quick navigation from h2 headings
window.addEventListener('DOMContentLoaded', function() {
    const h2s = document.querySelectorAll('h2');
    const navLinks = document.getElementById('quick-nav-links');
    const navMenu = document.getElementById('quick-nav-menu');
    
    if (h2s.length > 3) {
        h2s.forEach((h2, index) => {
            h2.id = 'section-' + index;
            const link = document.createElement('a');
            link.href = '#section-' + index;
            link.textContent = h2.textContent.substring(0, 30) + (h2.textContent.length > 30 ? '...' : '');
            link.style.display = 'block';
            link.style.padding = '5px 0';
            link.style.color = '#1e88e5';
            link.style.textDecoration = 'none';
            link.style.borderBottom = '1px solid #eee';
            link.onclick = function(e) {
                e.preventDefault();
                h2.scrollIntoView({behavior: 'smooth'});
            };
            navLinks.appendChild(link);
        });
        
        // Show menu after scrolling
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                navMenu.style.display = 'block';
            } else {
                navMenu.style.display = 'none';
            }
        });
    }
});
</script>
`;
        content = content.replace('</body>', quickNav + '</body>');
        changes.push('✓ Added quick navigation menu');
    }
    
    // 5. ADD COLLAPSIBLE SECTIONS (for very long content)
    // Make sections after first 3 collapsible
    let sectionCount = 0;
    content = content.replace(/<div class="section">/g, (match) => {
        sectionCount++;
        if (sectionCount > 3) {
            return `<div class="section collapsible-section">
<button class="section-toggle" onclick="this.parentElement.classList.toggle('expanded')" style="background: linear-gradient(135deg, #1e88e5 0%, #1565c0 100%); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-bottom: 15px; font-size: 14px; font-weight: 600;">
    <span class="toggle-text">▼ Click to Expand</span>
</button>
<div class="section-content" style="display: none;">`;
        }
        return match;
    });
    
    if (sectionCount > 3) {
        // Close the collapsible divs
        content = content.replace(/<\/div>\s*<div class="section/g, '</div></div><div class="section');
        
        // Add CSS and JS for collapsible sections
        const collapsibleStyle = `
<style>
.collapsible-section.expanded .section-content {
    display: block !important;
}
.collapsible-section.expanded .toggle-text::before {
    content: "▲ Click to Collapse";
}
.collapsible-section .toggle-text::before {
    content: "▼ Click to Expand";
}
</style>
`;
        content = content.replace('</head>', collapsibleStyle + '</head>');
        changes.push(`✓ Made ${sectionCount - 3} sections collapsible`);
    }
    
    // 6. ADD READING TIME ESTIMATE
    if (!content.includes('reading-time-estimate')) {
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed
        
        const readingTimeDiv = `
<div id="reading-time-estimate" style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; border-left: 5px solid #ff9800;">
    <span style="font-size: 16px; color: #e65100;">📖 Reading Time: ${readingTime} minutes</span>
</div>
`;
        // Insert after hero section
        content = content.replace('</div>\n\n    <div class="content">', '</div>\n\n    <div class="content">\n' + readingTimeDiv);
        changes.push(`✓ Added reading time estimate (${readingTime} min)`);
    }
    
    // Write changes
    if (changes.length > 0) {
        fs.writeFileSync(filepath, content, 'utf8');
        console.log(`✅ ${filename}:`);
        changes.forEach(change => console.log(`   ${change}`));
        console.log('');
    } else {
        console.log(`⏭️  ${filename}: Already optimized\n`);
    }
});

console.log('🎉 Engagement improvements complete!');
console.log('\n📊 What Changed:');
console.log('   ✓ Images reduced to 50% size (faster loading, less scrolling)');
console.log('   ✓ Reading progress bar (users see how much left)');
console.log('   ✓ Back-to-top button (easy navigation)');
console.log('   ✓ Quick jump menu (skip to any section)');
console.log('   ✓ Collapsible sections (less overwhelming)');
console.log('   ✓ Reading time estimate (sets expectations)');
console.log('\n🎯 Result: Users stay engaged, explore more, don\'t get bored!');
