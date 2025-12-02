const fs = require('fs');

console.log('╔══════════════════════════════════════════════════════════════╗');
console.log('║     TESTING FOR COMMON MISTAKES I MIGHT BE MISSING         ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

const htmlFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html') && !f.startsWith('common-'));

let totalIssues = 0;

// MISTAKE 1: Broken links to non-existent files
console.log('🔗 CHECKING FOR BROKEN LINKS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const brokenLinks = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find all href links to .html files
    const linkMatches = content.match(/href=["']([^"']+\.html)["']/g);
    if (linkMatches) {
        linkMatches.forEach(match => {
            const link = match.match(/href=["']([^"']+)["']/)[1];
            // Skip external links and anchors
            if (!link.startsWith('http') && !link.startsWith('#')) {
                // Check if file exists (handle relative paths)
                if (!fs.existsSync(link)) {
                    brokenLinks.push({ file, link });
                    totalIssues++;
                }
            }
        });
    }
});

if (brokenLinks.length > 0) {
    console.log('❌ FOUND BROKEN LINKS:');
    brokenLinks.forEach(item => {
        console.log(`   ${item.file} → links to → ${item.link} (DOESN'T EXIST)`);
    });
} else {
    console.log('✅ No broken internal links found');
}

// MISTAKE 2: Inconsistent pricing
console.log('\n\n💰 CHECKING PRICING CONSISTENCY:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const spoFiles = htmlFiles.filter(f => f.includes('social-optimizer') || f.includes('profile-optimizer'));
const pricingIssues = [];

spoFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for wrong prices
    if (content.includes('₹99') || content.includes('₹999') || content.includes('₹49')) {
        pricingIssues.push({ file, issue: 'Wrong price found (should be ₹21)' });
        totalIssues++;
    }
    
    // Check if ₹21 is present
    if (!content.includes('₹21')) {
        pricingIssues.push({ file, issue: 'Missing ₹21 price' });
        totalIssues++;
    }
});

if (pricingIssues.length > 0) {
    console.log('❌ PRICING ISSUES:');
    pricingIssues.forEach(item => {
        console.log(`   ${item.file}: ${item.issue}`);
    });
} else {
    console.log('✅ All SPO pages have correct ₹21 pricing');
}

// MISTAKE 3: Refund policy inconsistency
console.log('\n\n🔄 CHECKING REFUND POLICY:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const refundIssues = [];
spoFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for wrong refund promises
    if (content.match(/24\s*hour.*refund/i) || 
        content.match(/7\s*day.*refund/i) ||
        content.match(/money.*back.*guarantee/i)) {
        refundIssues.push({ file, issue: 'Has refund promise (should be NO REFUNDS)' });
        totalIssues++;
    }
});

if (refundIssues.length > 0) {
    console.log('❌ REFUND POLICY ISSUES:');
    refundIssues.forEach(item => {
        console.log(`   ${item.file}: ${item.issue}`);
    });
} else {
    console.log('✅ No incorrect refund promises found');
}

// MISTAKE 4: Missing contact email
console.log('\n\n📧 CHECKING CONTACT EMAIL:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const emailIssues = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check if file has footer but missing email
    if (content.includes('common-footer.js') && !content.includes('onestepforthelife@gmail.com')) {
        // Footer should have email, but check if it's in the footer component
        // This is okay if email is in common-footer.js
    }
    
    // Check for wrong emails
    if (content.match(/[a-z0-9._%+-]+@gmail\.com/gi)) {
        const emails = content.match(/[a-z0-9._%+-]+@gmail\.com/gi);
        emails.forEach(email => {
            if (email !== 'onestepforthelife@gmail.com') {
                emailIssues.push({ file, email });
                totalIssues++;
            }
        });
    }
});

if (emailIssues.length > 0) {
    console.log('❌ WRONG EMAIL ADDRESSES:');
    emailIssues.forEach(item => {
        console.log(`   ${item.file}: ${item.email} (should be onestepforthelife@gmail.com)`);
    });
} else {
    console.log('✅ No incorrect email addresses found');
}

// MISTAKE 5: Console.log statements left in production
console.log('\n\n🐛 CHECKING FOR DEBUG CODE:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const debugIssues = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for console.log
    const consoleMatches = content.match(/console\.log\(/g);
    if (consoleMatches && consoleMatches.length > 0) {
        debugIssues.push({ file, count: consoleMatches.length });
        totalIssues++;
    }
});

if (debugIssues.length > 0) {
    console.log('⚠️  DEBUG CODE FOUND (consider removing for production):');
    debugIssues.forEach(item => {
        console.log(`   ${item.file}: ${item.count} console.log statements`);
    });
} else {
    console.log('✅ No console.log statements found');
}

// MISTAKE 6: Missing alt text on images
console.log('\n\n🖼️  CHECKING IMAGE ALT TEXT:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const altTextIssues = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find images without alt text
    const imgMatches = content.match(/<img[^>]+>/g);
    if (imgMatches) {
        imgMatches.forEach(img => {
            if (!img.includes('alt=')) {
                altTextIssues.push({ file, img: img.substring(0, 50) + '...' });
                totalIssues++;
            }
        });
    }
});

if (altTextIssues.length > 0) {
    console.log('❌ IMAGES WITHOUT ALT TEXT (accessibility issue):');
    altTextIssues.forEach(item => {
        console.log(`   ${item.file}: ${item.img}`);
    });
} else {
    console.log('✅ All images have alt text');
}

// MISTAKE 7: Duplicate IDs
console.log('\n\n🆔 CHECKING FOR DUPLICATE IDs:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const duplicateIds = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Find all IDs
    const idMatches = content.match(/id=["']([^"']+)["']/g);
    if (idMatches) {
        const ids = idMatches.map(m => m.match(/id=["']([^"']+)["']/)[1]);
        const idCounts = {};
        ids.forEach(id => {
            idCounts[id] = (idCounts[id] || 0) + 1;
        });
        
        Object.keys(idCounts).forEach(id => {
            if (idCounts[id] > 1) {
                duplicateIds.push({ file, id, count: idCounts[id] });
                totalIssues++;
            }
        });
    }
});

if (duplicateIds.length > 0) {
    console.log('❌ DUPLICATE IDs FOUND (HTML validation error):');
    duplicateIds.forEach(item => {
        console.log(`   ${item.file}: id="${item.id}" appears ${item.count} times`);
    });
} else {
    console.log('✅ No duplicate IDs found');
}

// MISTAKE 8: Missing viewport meta tag
console.log('\n\n📱 CHECKING VIEWPORT META TAG:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

const viewportIssues = [];
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('viewport')) {
        viewportIssues.push(file);
        totalIssues++;
    }
});

if (viewportIssues.length > 0) {
    console.log('❌ MISSING VIEWPORT TAG (mobile won\'t work properly):');
    viewportIssues.forEach(file => {
        console.log(`   ${file}`);
    });
} else {
    console.log('✅ All pages have viewport meta tag');
}

// SUMMARY
console.log('\n\n╔══════════════════════════════════════════════════════════════╗');
console.log('║                    SUMMARY                                   ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log(`Total issues found: ${totalIssues}`);

if (totalIssues === 0) {
    console.log('\n✅ NO COMMON MISTAKES FOUND! Site looks good!');
} else {
    console.log('\n❌ FOUND ISSUES THAT NEED FIXING!');
    console.log('\nThese are the kinds of mistakes that:');
    console.log('- Break user experience (broken links)');
    console.log('- Confuse customers (wrong pricing)');
    console.log('- Create legal issues (wrong refund policy)');
    console.log('- Hurt SEO (missing alt text, viewport)');
    console.log('- Fail HTML validation (duplicate IDs)');
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

process.exit(totalIssues > 0 ? 1 : 0);
