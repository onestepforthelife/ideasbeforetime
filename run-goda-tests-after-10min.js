#!/usr/bin/env node

/**
 * RUN GODA TESTS 1 & 2 + MECER AFTER 10 MINUTES
 * Waits for deployment to propagate, then runs comprehensive tests
 * 
 * Usage: node run-goda-tests-after-10min.js
 */

const { spawn } = require('child_process');
const fs = require('fs');

console.log('⏰ SCHEDULED TEST EXECUTION');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log('📅 Start Time:', new Date().toLocaleString());
console.log('⏳ Wait Duration: 10 minutes');
console.log('🎯 Tests to Run:');
console.log('   1. GODA Test 1: Custom Protocol (Ideas Before Time specific)');
console.log('   2. GODA Test 2: World\'s Best Protocol (Global standards)');
console.log('   3. MECER Framework Validation');
console.log('\n═══════════════════════════════════════════════════════════════\n');

// Calculate end time
const waitMs = 10 * 60 * 1000; // 10 minutes
const endTime = new Date(Date.now() + waitMs);
console.log(`⏰ Tests will start at: ${endTime.toLocaleString()}`);
console.log('\n🔄 Waiting...\n');

// Show countdown every minute
let minutesLeft = 10;
const countdownInterval = setInterval(() => {
    minutesLeft--;
    if (minutesLeft > 0) {
        console.log(`   ⏳ ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''} remaining...`);
    }
}, 60 * 1000);

// Wait 10 minutes
setTimeout(() => {
    clearInterval(countdownInterval);
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✅ 10 MINUTES ELAPSED - STARTING TESTS');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    runTests();
}, waitMs);

function runTests() {
    const results = {
        test1: null,
        test2: null,
        mecer: {
            made: false,
            everything: false,
            complete: false,
            executed: false,
            reality: false
        },
        timestamp: new Date().toISOString()
    };
    
    // Test 1: GODA Custom Protocol
    console.log('🎯 TEST 1: GODA Custom Protocol (Ideas Before Time)');
    console.log('─────────────────────────────────────────────────────────────\n');
    
    const test1 = spawn('node', ['GODA-Best-Testing-Protocol-Custom.js'], {
        cwd: __dirname,
        stdio: 'inherit'
    });
    
    test1.on('close', (code1) => {
        results.test1 = {
            exitCode: code1,
            status: code1 === 0 ? 'PASSED' : 'FAILED',
            timestamp: new Date().toISOString()
        };
        
        console.log('\n═══════════════════════════════════════════════════════════════\n');
        
        // Test 2: GODA World's Best Protocol
        console.log('🌍 TEST 2: GODA World\'s Best Protocol (Global Standards)');
        console.log('─────────────────────────────────────────────────────────────\n');
        
        const test2 = spawn('node', ['GODA-Worlds-Best-Testing-Protocol.js'], {
            cwd: __dirname,
            stdio: 'inherit'
        });
        
        test2.on('close', (code2) => {
            results.test2 = {
                exitCode: code2,
                status: code2 === 0 ? 'PASSED' : 'FAILED',
                timestamp: new Date().toISOString()
            };
            
            console.log('\n═══════════════════════════════════════════════════════════════\n');
            
            // MECER Validation
            console.log('🎯 MECER FRAMEWORK VALIDATION');
            console.log('─────────────────────────────────────────────────────────────\n');
            
            validateMECER(results);
            
            // Final Report
            generateFinalReport(results);
        });
    });
}

function validateMECER(results) {
    console.log('Checking MECER compliance...\n');
    
    // M - Made EVERYTHING
    const test1Exists = fs.existsSync('GODA-Best-Testing-Protocol-Custom.js');
    const test2Exists = fs.existsSync('GODA-Worlds-Best-Testing-Protocol.js');
    results.mecer.made = test1Exists && test2Exists;
    console.log(`${results.mecer.made ? '✅' : '❌'} M - Made EVERYTHING: ${results.mecer.made ? 'Both test files exist' : 'Missing test files'}`);
    
    // E - EVERYTHING included
    results.mecer.everything = results.test1 !== null && results.test2 !== null;
    console.log(`${results.mecer.everything ? '✅' : '❌'} E - EVERYTHING: ${results.mecer.everything ? 'Both tests executed' : 'Tests not executed'}`);
    
    // C - COMPLETE
    const allTestsRan = results.test1 && results.test2;
    results.mecer.complete = allTestsRan;
    console.log(`${results.mecer.complete ? '✅' : '❌'} C - COMPLETE: ${results.mecer.complete ? 'All tests completed' : 'Tests incomplete'}`);
    
    // E - EXECUTED
    results.mecer.executed = true; // If we're here, tests executed
    console.log(`${results.mecer.executed ? '✅' : '❌'} E - EXECUTED: Tests ran (not just planned)`);
    
    // R - REALITY
    console.log(`⚠️  R - REALITY: MUST verify on live site: https://onestepforthelife.com`);
    console.log(`    Manual checks required:`);
    console.log(`    - Payment buttons work (₹21)`);
    console.log(`    - Navigation renders correctly`);
    console.log(`    - Footer displays properly`);
    console.log(`    - AdSense ads show`);
    console.log(`    - All pages load without errors`);
    results.mecer.reality = false; // Requires manual verification
    
    console.log();
}

function generateFinalReport(results) {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📊 FINAL TEST REPORT');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    console.log('🎯 GODA TEST 1 (Custom Protocol):');
    console.log(`   Status: ${results.test1.status}`);
    console.log(`   Exit Code: ${results.test1.exitCode}`);
    console.log(`   Time: ${results.test1.timestamp}\n`);
    
    console.log('🌍 GODA TEST 2 (World\'s Best Protocol):');
    console.log(`   Status: ${results.test2.status}`);
    console.log(`   Exit Code: ${results.test2.exitCode}`);
    console.log(`   Time: ${results.test2.timestamp}\n`);
    
    console.log('🎯 MECER FRAMEWORK:');
    console.log(`   M (Made): ${results.mecer.made ? '✅' : '❌'}`);
    console.log(`   E (Everything): ${results.mecer.everything ? '✅' : '❌'}`);
    console.log(`   C (Complete): ${results.mecer.complete ? '✅' : '❌'}`);
    console.log(`   E (Executed): ${results.mecer.executed ? '✅' : '❌'}`);
    console.log(`   R (Reality): ⏳ Manual verification required\n`);
    
    // Overall status
    const allPassed = results.test1.exitCode === 0 && results.test2.exitCode === 0;
    const mecerPassed = results.mecer.made && results.mecer.everything && 
                        results.mecer.complete && results.mecer.executed;
    
    console.log('═══════════════════════════════════════════════════════════════');
    if (allPassed && mecerPassed) {
        console.log('✅ ALL TESTS PASSED');
        console.log('✅ MECER FRAMEWORK VALIDATED');
        console.log('⏳ NEXT STEP: Manual reality testing on live site');
    } else {
        console.log('❌ SOME TESTS FAILED');
        console.log('⚠️  Review test output above for details');
        console.log('⚠️  Fix issues before deployment');
    }
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    // Save report
    const reportFile = `GODA-MECER-TEST-REPORT-${Date.now()}.json`;
    fs.writeFileSync(reportFile, JSON.stringify(results, null, 2));
    console.log(`📄 Report saved: ${reportFile}\n`);
    
    // Exit with appropriate code
    process.exit(allPassed && mecerPassed ? 0 : 1);
}
