// Verify deployment on new domain: onestepforthelife.com
// Tests routing fix, navigation, privacy protection

const https = require('https');

const NEW_DOMAIN = 'onestepforthelife.com';

const tests = [
    {
        name: 'RO Page - Should show RO content (not homepage)',
        url: `https://${NEW_DOMAIN}/ro.html`,
        shouldContain: ['RO Water Purifier', 'Reverse Osmosis'],
        shouldNotContain: ['Ideas Before Time - Homepage']
    },
    {
        name: 'Blog Post 1 - Should show blog content (not homepage)',
        url: `https://${NEW_DOMAIN}/blog-post-1.html`,
        shouldContain: ['blog', 'post'],
        shouldNotContain: ['Ideas Before Time - Homepage']
    },
    {
        name: 'Astronomy Page - Should load',
        url: `https://${NEW_DOMAIN}/astronomy.html`,
        shouldContain: ['Astronomy', 'Vedic'],
        shouldNotContain: ['Ideas Before Time - Homepage']
    },
    {
        name: 'Homepage - Should have Blog link in navigation',
        url: `https://${NEW_DOMAIN}/`,
        shouldContain: ['Blog', 'navigation'],
        shouldNotContain: []
    },
    {
        name: 'Family Page - Should return 404 or homepage (protected)',
        url: `https://${NEW_DOMAIN}/family-lifetime-timeline.html`,
        shouldNotContain: ['Amit Kumar Agrawal', 'family timeline'],
        shouldContain: []
    }
];

console.log('═══════════════════════════════════════════════════════════');
console.log(`🔍 VERIFYING DEPLOYMENT ON: ${NEW_DOMAIN}`);
console.log('═══════════════════════════════════════════════════════════\n');

let passed = 0;
let failed = 0;

function testURL(test) {
    return new Promise((resolve) => {
        https.get(test.url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                let testPassed = true;
                let issues = [];
                
                // Check should contain
                for (const text of test.shouldContain) {
                    if (!data.toLowerCase().includes(text.toLowerCase())) {
                        testPassed = false;
                        issues.push(`Missing: "${text}"`);
                    }
                }
                
                // Check should NOT contain
                for (const text of test.shouldNotContain) {
                    if (data.toLowerCase().includes(text.toLowerCase())) {
                        testPassed = false;
                        issues.push(`Found (should not): "${text}"`);
                    }
                }
                
                if (testPassed) {
                    console.log(`✅ PASS: ${test.name}`);
                    console.log(`   URL: ${test.url}`);
                    console.log(`   Status: ${res.statusCode}\n`);
                    passed++;
                } else {
                    console.log(`❌ FAIL: ${test.name}`);
                    console.log(`   URL: ${test.url}`);
                    console.log(`   Status: ${res.statusCode}`);
                    console.log(`   Issues: ${issues.join(', ')}\n`);
                    failed++;
                }
                
                resolve();
            });
        }).on('error', (err) => {
            console.log(`❌ ERROR: ${test.name}`);
            console.log(`   URL: ${test.url}`);
            console.log(`   Error: ${err.message}\n`);
            failed++;
            resolve();
        });
    });
}

async function runTests() {
    for (const test of tests) {
        await testURL(test);
    }
    
    console.log('═══════════════════════════════════════════════════════════');
    console.log('📊 RESULTS:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`✅ Passed: ${passed}/${tests.length}`);
    console.log(`❌ Failed: ${failed}/${tests.length}`);
    console.log('═══════════════════════════════════════════════════════════\n');
    
    if (failed === 0) {
        console.log('🎉 ALL TESTS PASSED! Deployment successful!\n');
        console.log('✅ Routing fixed - pages show correct content');
        console.log('✅ Navigation updated - Blog link added');
        console.log('✅ Privacy protected - Family pages blocked\n');
    } else {
        console.log('⚠️  SOME TESTS FAILED - Check issues above\n');
    }
}

runTests();
