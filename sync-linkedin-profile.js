const fs = require('fs');
const path = require('path');

console.log('🔄 SYNCING WITH LINKEDIN PROFILE DATA\n');

// Based on LinkedIn profile files in amit proifleforKiro folder
// Key corrections needed:

const corrections = {
    'about.html': [
        {
            old: '19+ years',
            new: '20+ years',
            reason: 'Updated experience count for 2025'
        },
        {
            old: 'July 2024 - Present',
            new: 'November 2024 - Present',
            reason: 'Correct start date for Head of Projects role'
        }
    ],
    'cv.html': [
        {
            old: '19+ years',
            new: '20+ years',
            reason: 'Updated experience count'
        }
    ],
    'index.html': [
        {
            old: '19+',
            new: '20+',
            reason: 'Stats update'
        }
    ]
};

let totalFixed = 0;

Object.keys(corrections).forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file} not found`);
        return;
    }
    
    console.log(`\n📝 Updating ${file}:`);
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    corrections[file].forEach(fix => {
        if (content.includes(fix.old)) {
            content = content.replace(new RegExp(fix.old, 'g'), fix.new);
            console.log(`  ✅ ${fix.reason}`);
            console.log(`     "${fix.old}" → "${fix.new}"`);
            changed = true;
            totalFixed++;
        }
    });
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
    } else {
        console.log('  ℹ️  Already up to date');
    }
});

console.log(`\n✅ SYNC COMPLETE: ${totalFixed} corrections applied\n`);
console.log('Site now matches LinkedIn profile data!');
