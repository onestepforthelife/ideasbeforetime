const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFYING PAST CORRECTIONS\n');

const checks = {
    passed: [],
    failed: []
};

// Check 1: Headers left-aligned (not center)
console.log('[1/10] Checking header alignment...');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let headerIssues = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('text-align: center') && content.includes('<header')) {
        headerIssues++;
    }
});
if (headerIssues === 0) {
    checks.passed.push('✅ Headers left-aligned');
} else {
    checks.failed.push(`❌ ${headerIssues} files have centered headers`);
}

// Check 2: No purple colors (#667eea, #764ba2, #8b5cf6)
console.log('[2/10] Checking for purple colors...');
let purpleCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.match(/#667eea|#764ba2|#8b5cf6/gi)) {
        purpleCount++;
    }
});
if (purpleCount === 0) {
    checks.passed.push('✅ No purple colors');
} else {
    checks.failed.push(`❌ ${purpleCount} files still have purple`);
}

// Check 3: Common navigation present
console.log('[3/10] Checking navigation consistency...');
let missingNav = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('common-navigation.js') && !file.includes('test-')) {
        missingNav++;
    }
});
if (missingNav === 0) {
    checks.passed.push('✅ All pages have navigation');
} else {
    checks.failed.push(`❌ ${missingNav} pages missing navigation`);
}

// Check 4: Common footer present
console.log('[4/10] Checking footer consistency...');
let missingFooter = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('common-footer.js') && !file.includes('test-')) {
        missingFooter++;
    }
});
if (missingFooter === 0) {
    checks.passed.push('✅ All pages have footer');
} else {
    checks.failed.push(`❌ ${missingFooter} pages missing footer`);
}

// Check 5: Width consistency (1400px)
console.log('[5/10] Checking width consistency...');
let wrongWidth = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('max-width') && !content.includes('1400px') && !file.includes('test-')) {
        wrongWidth++;
    }
});
if (wrongWidth === 0) {
    checks.passed.push('✅ Width consistent (1400px)');
} else {
    checks.failed.push(`❌ ${wrongWidth} pages have wrong width`);
}

// Check 6: No double headers
console.log('[6/10] Checking for double headers...');
let doubleHeaders = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const headerCount = (content.match(/<header/g) || []).length;
    if (headerCount > 1) {
        doubleHeaders++;
    }
});
if (doubleHeaders === 0) {
    checks.passed.push('✅ No double headers');
} else {
    checks.failed.push(`❌ ${doubleHeaders} pages have double headers`);
}

// Check 7: Email consistency
console.log('[7/10] Checking email consistency...');
let wrongEmail = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('@') && !content.includes('onestepforthelife@gmail.com') && !file.includes('test-')) {
        wrongEmail++;
    }
});
if (wrongEmail === 0) {
    checks.passed.push('✅ Email consistent');
} else {
    checks.failed.push(`❌ ${wrongEmail} pages have wrong email`);
}

// Check 8: Analytics present
console.log('[8/10] Checking analytics...');
let missingAnalytics = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('universal-analytics.js') && !file.includes('test-')) {
        missingAnalytics++;
    }
});
if (missingAnalytics === 0) {
    checks.passed.push('✅ All pages have analytics');
} else {
    checks.failed.push(`❌ ${missingAnalytics} pages missing analytics`);
}

// Check 9: CV has 2-column layout
console.log('[9/10] Checking CV layout...');
if (fs.existsSync('cv.html')) {
    const cvContent = fs.readFileSync('cv.html', 'utf8');
    if (cvContent.includes('column-count: 2')) {
        checks.passed.push('✅ CV has 2-column layout');
    } else {
        checks.failed.push('❌ CV missing 2-column layout');
    }
}

// Check 10: Reports have blur system
console.log('[10/10] Checking report blur system...');
const reports = ['Paper_Pulp_Specialty_Chemicals_Report.html', 'Poloxamer_Market_Report.html'];
let missingBlur = 0;
reports.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (!content.includes('blur') && !content.includes('preview')) {
            missingBlur++;
        }
    }
});
if (missingBlur === 0) {
    checks.passed.push('✅ Reports have blur system');
} else {
    checks.failed.push(`❌ ${missingBlur} reports missing blur`);
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('VERIFICATION SUMMARY');
console.log('='.repeat(50));
console.log(`\n✅ PASSED: ${checks.passed.length}/10`);
checks.passed.forEach(p => console.log('  ' + p));

if (checks.failed.length > 0) {
    console.log(`\n❌ FAILED: ${checks.failed.length}/10`);
    checks.failed.forEach(f => console.log('  ' + f));
}

console.log('\n' + '='.repeat(50));
console.log(`Score: ${Math.round((checks.passed.length / 10) * 100)}%`);
console.log('='.repeat(50));
