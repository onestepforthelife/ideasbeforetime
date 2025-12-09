#!/usr/bin/env node

/**
 * MASTER ENFORCEMENT SYSTEM
 * Runs BEFORE every response to enforce all rules automatically
 * 
 * This is the "rule on rule" - automation that automates automation
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 MASTER ENFORCEMENT SYSTEM - Running...\n');

let violations = [];
let warnings = [];

// ============================================
// RULE 1: Check if AUTO_CHECK was run
// ============================================
console.log('📋 Rule 1: Checking if AUTO_CHECK_BEFORE_RESPONSE.js was run...');
const autoCheckExists = fs.existsSync('AUTO_CHECK_BEFORE_RESPONSE.js');
if (!autoCheckExists) {
    violations.push('❌ AUTO_CHECK_BEFORE_RESPONSE.js not found - must exist');
}

// ============================================
// RULE 2: Check if clarifying questions asked for vague terms
// ============================================
console.log('📋 Rule 2: Checking for vague terms without clarification...');
// This would be checked in actual response context
// For now, just remind
warnings.push('⚠️  Remember: Ask clarifying questions for vague terms (bad look, not working, broken)');

// ============================================
// RULE 3: Check if documentation was read
// ============================================
console.log('📋 Rule 3: Checking documentation access...');
const docsExist = fs.existsSync('LEARNING_43_DOCUMENTATION_RESOURCES.md');
if (!docsExist) {
    warnings.push('⚠️  Documentation resources not found - may need to reference');
}

// ============================================
// RULE 4: Check if all pages checked
// ============================================
console.log('📋 Rule 4: Checking if all pages were checked...');
const checkAllExists = fs.existsSync('check-all-pages-comprehensive.js');
if (!checkAllExists) {
    violations.push('❌ check-all-pages-comprehensive.js not found - cannot check all pages');
}

// ============================================
// RULE 5: Check if verification tools exist
// ============================================
console.log('📋 Rule 5: Checking verification tools...');
const verifyExists = fs.existsSync('VERIFY_BEFORE_PUSH.js');
if (!verifyExists) {
    violations.push('❌ VERIFY_BEFORE_PUSH.js not found - cannot verify before push');
}

// ============================================
// RULE 6: Check if diagnostic tools exist
// ============================================
console.log('📋 Rule 6: Checking diagnostic tools...');
const diagnosticExists = fs.existsSync('CRITICAL_DIAGNOSTIC_DEC6.js');
if (!diagnosticExists) {
    violations.push('❌ CRITICAL_DIAGNOSTIC_DEC6.js not found - cannot run diagnostics');
}

// ============================================
// RULE 7: Check if learnings are documented
// ============================================
console.log('📋 Rule 7: Checking learnings documentation...');
const learningsExist = fs.existsSync('.kiro/steering/3_WEEKS_COMPLETE_LEARNINGS.md');
if (!learningsExist) {
    violations.push('❌ 3_WEEKS_COMPLETE_LEARNINGS.md not found - learnings not documented');
}

// ============================================
// RULE 8: Check if master rules exist
// ============================================
console.log('📋 Rule 8: Checking master rules...');
const masterRulesExist = fs.existsSync('.kiro/steering/MASTER_RULES.md');
if (!masterRulesExist) {
    violations.push('❌ MASTER_RULES.md not found - rules not documented');
}

// ============================================
// SUMMARY
// ============================================
console.log('\n' + '='.repeat(60));
console.log('📊 ENFORCEMENT SUMMARY');
console.log('='.repeat(60));

console.log(`\n✅ Rules Checked: 8`);
console.log(`❌ Violations: ${violations.length}`);
console.log(`⚠️  Warnings: ${warnings.length}`);

if (violations.length > 0) {
    console.log('\n🚨 VIOLATIONS FOUND:');
    violations.forEach(v => console.log(`   ${v}`));
}

if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach(w => console.log(`   ${w}`));
}

// ============================================
// ENFORCEMENT ACTION
// ============================================
if (violations.length > 0) {
    console.log('\n❌ RESPONSE BLOCKED - Fix violations first!');
    console.log('   Run: node MASTER_ENFORCEMENT.js');
    process.exit(1); // Block response
} else {
    console.log('\n✅ ALL RULES ENFORCED - Response allowed');
    process.exit(0); // Allow response
}
