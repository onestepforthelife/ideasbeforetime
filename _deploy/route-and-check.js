#!/usr/bin/env node

/**
 * ROUTE AND CHECK - Complete Workflow
 * Created: December 7, 2025
 * Purpose: Route thought → Check if blocked → Run all checks
 */

const path = require('path');
const ThoughtRouter = require(path.join(__dirname, 'THOUGHT_ROUTER_SYSTEM.js'));
const { execSync } = require('child_process');
const fs = require('fs');

// Get thought from command line
const thought = process.argv[2] || "Responding to user query";

console.log('='.repeat(60));
console.log('🧠 ROUTE AND CHECK - Complete Workflow');
console.log('='.repeat(60));
console.log();

// Step 1: Initialize router
const router = new ThoughtRouter();

// Step 2: Load knowledge
console.log('📚 Loading knowledge base...\n');
const knowledge = router.loadKnowledge();

// Step 3: Create backup
router.createBackup('before_check', { 
    thought,
    timestamp: new Date().toISOString()
});

// Step 4: Route the thought
console.log('='.repeat(60));
console.log(`💭 Routing thought: "${thought}"`);
console.log('='.repeat(60));
console.log();

const result = router.routeThought(thought);

// Step 5: Handle result
if (result.blocked) {
    console.log('='.repeat(60));
    console.log('❌ THOUGHT BLOCKED!');
    console.log('='.repeat(60));
    console.log();
    console.log('You MUST do this first:\n');
    
    if (result.reason.mustCheck) {
        console.log('📋 Required Checks:');
        result.reason.mustCheck.forEach((check, i) => {
            console.log(`   ${i + 1}. ${check}`);
        });
        console.log();
    }
    
    if (result.reason.tools) {
        console.log('🔧 Required Tools:');
        result.reason.tools.forEach((tool, i) => {
            console.log(`   ${i + 1}. ${tool}`);
        });
        console.log();
    }
    
    if (result.reason.claims) {
        console.log('📊 Unproven Claims:');
        result.reason.claims.forEach((claim, i) => {
            console.log(`   ${i + 1}. "${claim.claim}"`);
            console.log(`      Needs: ${claim.proof}`);
        });
        console.log();
    }
    
    console.log('='.repeat(60));
    console.log('⚠️  DO NOT RESPOND until you complete these checks!');
    console.log('='.repeat(60));
    console.log();
    
    // Save blocked thought for review
    const blockedLog = {
        timestamp: new Date().toISOString(),
        thought,
        reason: result.reason,
        status: 'BLOCKED'
    };
    
    fs.appendFileSync('thought-blocks.log', JSON.stringify(blockedLog, null, 2) + '\n');
    
    process.exit(1);
}

// Step 6: Thought approved, show suggestions
console.log('='.repeat(60));
console.log('✅ THOUGHT APPROVED!');
console.log('='.repeat(60));
console.log();

if (result.suggestions && result.suggestions.length > 0) {
    console.log('💡 Suggestions to consider:');
    result.suggestions.forEach((suggestion, i) => {
        console.log(`   ${i + 1}. ${suggestion}`);
    });
    console.log();
}

// Step 7: Ask if user wants to run full checks
console.log('='.repeat(60));
console.log('🔍 Ready to run comprehensive checks?');
console.log('='.repeat(60));
console.log();
console.log('This will run:');
console.log('   1. Configuration checks');
console.log('   2. Redirects validation');
console.log('   3. Critical diagnostic');
console.log('   4. Live site check');
console.log('   5. Proactive checker');
console.log('   6. Quality check');
console.log('   7. Pre-push verification');
console.log();
console.log('Estimated time: 2-3 minutes');
console.log();

// For now, just report success
console.log('='.repeat(60));
console.log('✅ THOUGHT ROUTING COMPLETE');
console.log('='.repeat(60));
console.log();
console.log('Next steps:');
console.log('   1. Run: .\\MANDATORY_PRE_RESPONSE_CHECK.bat');
console.log('   2. Review all check results');
console.log('   3. Fix any issues found');
console.log('   4. Then respond with confidence');
console.log();

// Generate final report
router.generateReport();

process.exit(0);
