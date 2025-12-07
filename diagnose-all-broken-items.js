#!/usr/bin/env node

/**
 * DAY 1: COMPREHENSIVE DIAGNOSIS
 * Check what's actually broken before fixing anything
 */

const fs = require('fs');

console.log('🔍 DAY 1: COMPREHENSIVE DIAGNOSIS\n');
console.log('Checking what\'s actually broken...\n');
console.log('='.repeat(70) + '\n');

const issues = {
    critical: [],
    high: [],
    medium: [],
    working: []
};

// 1. CHECK SPO TOOL
console.log('1️⃣  SPO TOOL (social-optimizer-app.html)');
console.log('-'.repeat(70));

if (fs.existsSync('social-optimizer-app.html')) {
    const spo = fs.readFileSync('social-optimizer-app.html', 'utf8');
    
    console.log('✅ File exists');
    
    // Check for form
    const hasForm = spo.includes('<form') || spo.includes('id="profileForm"');
    console.log(hasForm ? '✅ Has form element' : '❌ No form element');
    
    // Check for navigation/next button
    const hasNextButton = spo.includes('type="submit"') || spo.includes('Next') || spo.includes('Generate');
    console.log(hasNextButton ? '✅ Has submit/next button' : '❌ No submit button');
    
    // Check for JavaScript
    const hasJS = spo.includes('<script') || spo.includes('.js"');
    console.log(hasJS ? '✅ Has JavaScript' : '❌ No JavaScript');
    
    // Check for AI integration
    const hasAI = spo.includes('gemini') || spo.includes('openai') || spo.includes('api');
    console.log(hasAI ? '✅ Has AI integration' : '⚠️  No AI integration found');
    
    // Check for navigation to results page
    const hasNavigation = spo.includes('window.location') || spo.includes('href=') || spo.includes('action=');
    console.log(hasNavigation ? '✅ Has navigation logic' : '❌ No navigation logic');
    
    if (!hasForm || !hasNextButton || !hasNavigation) {
        issues.critical.push({
            item: 'SPO Tool',
            problem: 'Missing critical elements',
            details: [
                !hasForm ? 'No form element' : null,
                !hasNextButton ? 'No submit button' : null,
                !hasNavigation ? 'No navigation logic' : null
            ].filter(Boolean)
        });
    } else if (!hasAI) {
        issues.high.push({
            item: 'SPO Tool',
            problem: 'No AI integration',
            details: ['May be using templates instead of real AI']
        });
    } else {
        issues.working.push('SPO Tool structure looks complete');
    }
} else {
    console.log('❌ FILE NOT FOUND');
    issues.critical.push({
        item: 'SPO Tool',
        problem: 'File does not exist',
        details: ['social-optimizer-app.html missing']
    });
}

// 2. CHECK GODA CHATBOT
console.log('\n2️⃣  GODA CHATBOT (goda-chatbot.js)');
console.log('-'.repeat(70));

if (fs.existsSync('goda-chatbot.js')) {
    const goda = fs.readFileSync('goda-chatbot.js', 'utf8');
    
    console.log('✅ File exists');
    
    // Check for basic structure
    const hasInit = goda.includes('function') || goda.includes('const') || goda.includes('class');
    console.log(hasInit ? '✅ Has code structure' : '❌ Empty or invalid');
    
    // Check for UI elements
    const hasUI = goda.includes('createElement') || goda.includes('innerHTML') || goda.includes('button');
    console.log(hasUI ? '✅ Has UI creation' : '❌ No UI creation');
    
    // Check for API calls
    const hasAPI = goda.includes('fetch') || goda.includes('XMLHttpRequest') || goda.includes('api');
    console.log(hasAPI ? '✅ Has API calls' : '❌ No API calls');
    
    // Check for event listeners
    const hasEvents = goda.includes('addEventListener') || goda.includes('onclick');
    console.log(hasEvents ? '✅ Has event listeners' : '❌ No event listeners');
    
    if (!hasInit || !hasUI || !hasEvents) {
        issues.critical.push({
            item: 'GODA Chatbot',
            problem: 'Missing critical functionality',
            details: [
                !hasInit ? 'No code structure' : null,
                !hasUI ? 'No UI creation' : null,
                !hasEvents ? 'No event listeners' : null
            ].filter(Boolean)
        });
    } else if (!hasAPI) {
        issues.high.push({
            item: 'GODA Chatbot',
            problem: 'No API integration',
            details: ['Cannot communicate with backend']
        });
    } else {
        issues.working.push('GODA Chatbot structure looks complete');
    }
} else {
    console.log('❌ FILE NOT FOUND');
    issues.critical.push({
        item: 'GODA Chatbot',
        problem: 'File does not exist',
        details: ['goda-chatbot.js missing']
    });
}

// 3. CHECK PAGES THAT INCLUDE GODA
console.log('\n3️⃣  PAGES WITH GODA CHATBOT');
console.log('-'.repeat(70));

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let pagesWithGoda = 0;
let pagesMissingGoda = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('goda-chatbot.js')) {
        pagesWithGoda++;
    } else if (!file.includes('test-') && !file.includes('email-template')) {
        pagesMissingGoda.push(file);
    }
});

console.log(`✅ ${pagesWithGoda} pages include GODA`);
console.log(`⚠️  ${pagesMissingGoda.length} pages missing GODA`);

if (pagesMissingGoda.length > 0 && pagesMissingGoda.length < 10) {
    console.log('Missing from:', pagesMissingGoda.slice(0, 5).join(', '));
}

// 4. CHECK NAVIGATION CONSISTENCY
console.log('\n4️⃣  NAVIGATION CONSISTENCY');
console.log('-'.repeat(70));

let pagesWithNav = 0;
let pagesMissingNav = [];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const hasNav = content.includes('common-navigation.js') || content.includes('<nav');
    
    if (hasNav) {
        pagesWithNav++;
    } else if (!file.includes('test-') && !file.includes('email-template')) {
        pagesMissingNav.push(file);
    }
});

console.log(`✅ ${pagesWithNav} pages have navigation`);
console.log(`❌ ${pagesMissingNav.length} pages missing navigation`);

if (pagesMissingNav.length > 0) {
    console.log('Missing from:', pagesMissingNav.slice(0, 10).join(', '));
    issues.high.push({
        item: 'Navigation',
        problem: `${pagesMissingNav.length} pages missing navigation`,
        details: pagesMissingNav.slice(0, 5)
    });
}

// 5. CHECK COMMON FILES
console.log('\n5️⃣  COMMON FILES');
console.log('-'.repeat(70));

const commonFiles = [
    'common-navigation.js',
    'common-footer.js',
    'common-footer.css',
    'common-styles.css',
    'universal-analytics.js'
];

commonFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(exists ? `✅ ${file}` : `❌ ${file} MISSING`);
    
    if (!exists) {
        issues.critical.push({
            item: 'Common Files',
            problem: `${file} missing`,
            details: ['Required by multiple pages']
        });
    }
});

// SUMMARY
console.log('\n' + '='.repeat(70));
console.log('📊 DIAGNOSIS SUMMARY');
console.log('='.repeat(70));

console.log('\n🚨 CRITICAL ISSUES (Must fix first):');
if (issues.critical.length === 0) {
    console.log('   ✅ None found!');
} else {
    issues.critical.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.item}: ${issue.problem}`);
        issue.details.forEach(d => console.log(`   - ${d}`));
    });
}

console.log('\n⚠️  HIGH PRIORITY ISSUES:');
if (issues.high.length === 0) {
    console.log('   ✅ None found!');
} else {
    issues.high.forEach((issue, i) => {
        console.log(`\n${i + 1}. ${issue.item}: ${issue.problem}`);
        issue.details.forEach(d => console.log(`   - ${d}`));
    });
}

console.log('\n✅ WORKING:');
if (issues.working.length === 0) {
    console.log('   ⚠️  Nothing confirmed working yet');
} else {
    issues.working.forEach((item, i) => {
        console.log(`${i + 1}. ${item}`);
    });
}

// NEXT STEPS
console.log('\n' + '='.repeat(70));
console.log('🎯 NEXT STEPS');
console.log('='.repeat(70));

if (issues.critical.length > 0) {
    console.log('\n1. Fix critical issues first (in order):');
    issues.critical.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue.item}`);
    });
}

if (issues.high.length > 0) {
    console.log('\n2. Then fix high priority issues:');
    issues.high.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue.item}`);
    });
}

console.log('\n3. Test on live site after each fix');
console.log('4. Show proof before claiming "done"');

// SAVE REPORT
const report = {
    date: new Date().toISOString(),
    critical: issues.critical,
    high: issues.high,
    medium: issues.medium,
    working: issues.working,
    totalIssues: issues.critical.length + issues.high.length + issues.medium.length
};

fs.writeFileSync('DAY1_DIAGNOSIS_REPORT.json', JSON.stringify(report, null, 2));

console.log('\n📄 Report saved: DAY1_DIAGNOSIS_REPORT.json');
console.log('\n⏳ Waiting for your confirmation before fixing anything...\n');
