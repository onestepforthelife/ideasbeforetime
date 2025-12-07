#!/usr/bin/env node

/**
 * CHECK CONFIGURATION FILES
 * Created: December 7, 2025
 * Purpose: Verify all config files are correct
 */

const fs = require('fs');

console.log('🔍 CHECKING CONFIGURATION FILES\n');
console.log('='.repeat(60));

const issues = [];
const warnings = [];

// Check _redirects
console.log('\n[1/4] Checking _redirects file...');
if (fs.existsSync('_redirects')) {
    const content = fs.readFileSync('_redirects', 'utf8');
    const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    console.log(`✅ Found (${lines.length} rules)`);
    
    // Check for 308 redirects
    if (content.includes('308')) {
        issues.push('_redirects contains 308 redirects (causes issues)');
    }
} else {
    warnings.push('_redirects file not found (using Cloudflare defaults)');
    console.log('⚠️  Not found (using Cloudflare defaults)');
}

// Check _headers
console.log('\n[2/4] Checking _headers file...');
if (fs.existsSync('_headers')) {
    const content = fs.readFileSync('_headers', 'utf8');
    console.log('✅ Found');
    
    // Check for security headers
    const requiredHeaders = [
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Content-Security-Policy'
    ];
    
    requiredHeaders.forEach(header => {
        if (!content.includes(header)) {
            warnings.push(`_headers missing recommended header: ${header}`);
        }
    });
} else {
    warnings.push('_headers file not found (no custom headers)');
    console.log('⚠️  Not found (no custom headers)');
}

// Check wrangler.toml
console.log('\n[3/4] Checking wrangler.toml...');
if (fs.existsSync('wrangler.toml')) {
    console.log('✅ Found');
} else {
    console.log('ℹ️  Not found (not required for Pages)');
}

// Check functions directory
console.log('\n[4/4] Checking functions directory...');
if (fs.existsSync('functions')) {
    const files = fs.readdirSync('functions', { recursive: true });
    console.log(`✅ Found (${files.length} files)`);
} else {
    console.log('ℹ️  Not found (no serverless functions)');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY\n');

if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ All configuration files look good!\n');
    process.exit(0);
}

if (issues.length > 0) {
    console.log(`❌ CRITICAL ISSUES (${issues.length}):`);
    issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue}`);
    });
    console.log();
}

if (warnings.length > 0) {
    console.log(`⚠️  WARNINGS (${warnings.length}):`);
    warnings.forEach((warning, i) => {
        console.log(`   ${i + 1}. ${warning}`);
    });
    console.log();
}

process.exit(issues.length > 0 ? 1 : 0);
