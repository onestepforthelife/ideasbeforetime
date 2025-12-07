#!/usr/bin/env node

/**
 * CHECK _REDIRECTS FILE
 * Created: December 7, 2025
 * Purpose: Catch 308 redirect issues before they happen
 */

const fs = require('fs');

console.log('🔍 CHECKING _REDIRECTS FILE\n');
console.log('='.repeat(60));

const issues = [];

// Check if _redirects file exists
if (!fs.existsSync('_redirects')) {
    console.log('⚠️  No _redirects file found');
    console.log('   This is OK if you want default Cloudflare behavior\n');
    process.exit(0);
}

// Read _redirects file
const content = fs.readFileSync('_redirects', 'utf8');
console.log('✅ _redirects file found\n');

// Check for problematic patterns
const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));

console.log('📋 REDIRECT RULES FOUND:\n');
lines.forEach((line, i) => {
    console.log(`${i + 1}. ${line}`);
});

console.log('\n' + '='.repeat(60));
console.log('🔍 ANALYZING RULES\n');

// Check for catch-all that might cause issues
const catchAll = lines.find(l => l.includes('/*') || l.includes('/:splat'));
if (catchAll) {
    console.log('⚠️  Found catch-all rule:');
    console.log(`   ${catchAll}`);
    console.log('   This might override specific rules\n');
}

// Check for .html redirects
const htmlRedirects = lines.filter(l => l.includes('.html'));
if (htmlRedirects.length === 0) {
    issues.push({
        severity: 'HIGH',
        issue: 'No explicit .html file rules found',
        impact: 'Cloudflare may redirect .html to extensionless URLs',
        fix: 'Add explicit rules for .html files with status 200'
    });
    console.log('❌ HIGH: No explicit .html file rules');
    console.log('   Impact: Cloudflare may redirect .html to extensionless URLs');
    console.log('   Fix: Add rules like: /blog.html /blog.html 200\n');
} else {
    console.log('✅ Found .html file rules:');
    htmlRedirects.forEach(r => console.log(`   ${r}`));
    console.log();
}

// Check for 308 redirects
const redirect308 = lines.filter(l => l.includes('308'));
if (redirect308.length > 0) {
    issues.push({
        severity: 'CRITICAL',
        issue: '308 Permanent Redirect rules found',
        impact: 'These cause the exact problem we had today',
        fix: 'Change 308 to 200 (rewrite) or 301/302 (redirect)'
    });
    console.log('❌ CRITICAL: 308 Permanent Redirect rules found:');
    redirect308.forEach(r => console.log(`   ${r}`));
    console.log('   Impact: These cause permanent redirect issues');
    console.log('   Fix: Change 308 to 200 (rewrite) or 301/302\n');
}

// Check for status 200 (rewrites)
const rewrites = lines.filter(l => l.includes(' 200'));
if (rewrites.length > 0) {
    console.log('✅ Found rewrite rules (status 200):');
    rewrites.forEach(r => console.log(`   ${r}`));
    console.log('   These serve files without redirecting (good!)\n');
}

// Summary
console.log('='.repeat(60));
console.log('📊 SUMMARY\n');

if (issues.length === 0) {
    console.log('✅ No critical issues found in _redirects file');
    console.log('✅ File looks good!\n');
    process.exit(0);
} else {
    console.log(`❌ Found ${issues.length} issue(s):\n`);
    issues.forEach((issue, i) => {
        console.log(`${i + 1}. [${issue.severity}] ${issue.issue}`);
        console.log(`   Impact: ${issue.impact}`);
        console.log(`   Fix: ${issue.fix}\n`);
    });
    process.exit(1);
}
