#!/usr/bin/env node
/**
 * PRE-COMMIT CHECK - Blocks bad changes before they reach GitHub
 * Run this BEFORE every commit to catch mistakes locally
 */

const fs = require('fs');
const path = require('path');

let errors = 0;
let warnings = 0;

console.log('🔍 PRE-COMMIT CHECK - Scanning for issues...\n');

// Check 1: Old domain links
console.log('1️⃣  Checking for old domain links...');
const htmlFiles = getAllHtmlFiles('.');
let oldDomainCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('ideasbeforetime.pages.dev')) {
        console.log(`   ❌ ${file} - Contains old domain`);
        oldDomainCount++;
        errors++;
    }
});
if (oldDomainCount === 0) {
    console.log('   ✅ No old domain links found\n');
} else {
    console.log(`   ❌ Found ${oldDomainCount} files with old domain\n`);
}

// Check 2: Header alignment
console.log('2️⃣  Checking header alignment...');
let centerHeaderCount = 0;
htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.match(/header[^}]*text-align:\s*center/i)) {
        console.log(`   ❌ ${file} - Header centered`);
        centerHeaderCount++;
        errors++;
    }
});
if (centerHeaderCount === 0) {
    console.log('   ✅ All headers left-aligned\n');
} else {
    console.log(`   ❌ Found ${centerHeaderCount} files with centered headers\n`);
}

// Check 3: Missing navigation/footer
console.log('3️⃣  Checking for missing navigation/footer...');
let missingNavCount = 0;
htmlFiles.forEach(file => {
    // Skip test files and templates
    if (file.includes('test-') || file.includes('template') || file.includes('email-template')) {
        return;
    }
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('common-navigation.js')) {
        console.log(`   ⚠️  ${file} - Missing navigation`);
        missingNavCount++;
        warnings++;
    }
    if (!content.includes('common-footer.js')) {
        console.log(`   ⚠️  ${file} - Missing footer`);
        missingNavCount++;
        warnings++;
    }
});
if (missingNavCount === 0) {
    console.log('   ✅ All pages have navigation/footer\n');
} else {
    console.log(`   ⚠️  Found ${missingNavCount} missing elements\n`);
}

// Check 4: File size check (prevent large files)
console.log('4️⃣  Checking file sizes...');
let largeFiles = 0;
const allFiles = getAllFiles('.');
allFiles.forEach(file => {
    const stats = fs.statSync(file);
    const sizeMB = stats.size / (1024 * 1024);
    if (sizeMB > 20) {
        console.log(`   ❌ ${file} - ${sizeMB.toFixed(2)}MB (max 20MB)`);
        largeFiles++;
        errors++;
    }
});
if (largeFiles === 0) {
    console.log('   ✅ All files under 20MB\n');
} else {
    console.log(`   ❌ Found ${largeFiles} files over 20MB\n`);
}

// Check 5: _redirects file validation
console.log('5️⃣  Checking _redirects file...');
if (fs.existsSync('_redirects')) {
    const redirects = fs.readFileSync('_redirects', 'utf8');
    if (redirects.includes('/:path*')) {
        console.log('   ❌ _redirects contains problematic /:path* pattern');
        errors++;
    } else {
        console.log('   ✅ _redirects file looks good\n');
    }
} else {
    console.log('   ⚠️  _redirects file not found\n');
    warnings++;
}

// Summary
console.log('═══════════════════════════════════════════════════════════');
console.log(`📊 SUMMARY: ${errors} errors, ${warnings} warnings`);
console.log('═══════════════════════════════════════════════════════════\n');

if (errors > 0) {
    console.log('❌ COMMIT BLOCKED - Fix errors before committing!');
    console.log('\nTo fix automatically, run:');
    console.log('  node fix-old-domain-links.js');
    console.log('  node fix-header-alignment.js\n');
    process.exit(1);
} else if (warnings > 0) {
    console.log('⚠️  WARNINGS FOUND - Review before committing');
    console.log('Continue? (These are non-critical)\n');
    process.exit(0);
} else {
    console.log('✅ ALL CHECKS PASSED - Safe to commit!\n');
    process.exit(0);
}

// Helper functions
function getAllHtmlFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && !file.startsWith('backup_') && file !== 'node_modules' && file !== '_archive') {
            results = results.concat(getAllHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    
    return results;
}

function getAllFiles(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== '_archive') {
            results = results.concat(getAllFiles(filePath));
        } else if (stat.isFile()) {
            results.push(filePath);
        }
    });
    
    return results;
}
