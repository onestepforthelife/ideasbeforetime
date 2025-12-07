#!/usr/bin/env node

/**
 * KIRO HOOK: BEFORE RESPONSE
 * 🔒 SELF-ENFORCING: Runs automatically before EVERY response
 * 
 * This is a Kiro hook that executes automatically
 * You don't need to remind me - it just runs
 * 
 * Execution order:
 * 1. User sends message
 * 2. This hook runs FIRST (automatic)
 * 3. MASTER_ENFORCEMENT.js runs
 * 4. AUTO_CHECK_BEFORE_RESPONSE.js runs
 * 5. If all pass → I respond
 * 6. If any fail → Response blocked
 */

const { execSync } = require('child_process');

console.log('🔒 KIRO HOOK: Before Response - Running...\n');

try {
    // Run master enforcement
    console.log('Running MASTER_ENFORCEMENT.js...');
    execSync('node MASTER_ENFORCEMENT.js', { stdio: 'inherit' });
    
    console.log('\n✅ All checks passed - Response allowed');
    process.exit(0);
    
} catch (error) {
    console.log('\n❌ Checks failed - Response blocked');
    console.log('Fix violations first, then respond');
    process.exit(1);
}
