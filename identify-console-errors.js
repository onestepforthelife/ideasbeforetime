const fs = require('fs');
const path = require('path');

console.log('🔍 IDENTIFYING CONSOLE ERRORS - December 7, 2025\n');

// Common console error patterns
const errorPatterns = [
    { pattern: /console\.(log|error|warn|debug|info)\(/g, type: 'Console statements' },
    { pattern: /\.addEventListener\([^)]*\)/g, type: 'Event listeners (check for missing elements)' },
    { pattern: /document\.getElementById\(['"]([^'"]+)['"]\)/g, type: 'getElementById (element might not exist)' },
    { pattern: /document\.querySelector\(['"]([^'"]+)['"]\)/g, type: 'querySelector (element might not exist)' },
    { pattern: /fetch\(['"]([^'"]+)['"]\)/g, type: 'Fetch calls (check for CORS/404)' },
    { pattern: /src=['"]([^'"]+\.js)['"]/g, type: 'JavaScript file references' },
    { pattern: /href=['"]([^'"]+\.css)['"]/g, type: 'CSS file references' },
    { pattern: /new\s+(\w+)\(/g, type: 'Constructor calls (check if defined)' },
    { pattern: /window\.(\w+)/g, type: 'Window object access' },
    { pattern: /localStorage\./g, type: 'LocalStorage access' },
    { pattern: /sessionStorage\./g, type: 'SessionStorage access' }
];

const issues = [];
let filesChecked = 0;

// Check HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('1️⃣ Checking HTML files for potential console errors...\n');

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        filesChecked++;
        
        // Check for missing script files
        const scriptMatches = content.match(/<script[^>]+src=['"]([^'"]+)['"]/g);
        if (scriptMatches) {
            scriptMatches.forEach(match => {
                const src = match.match(/src=['"]([^'"]+)['"]/)[1];
                if (!src.startsWith('http') && !src.startsWith('//')) {
                    const scriptPath = path.join('.', src);
                    if (!fs.existsSync(scriptPath)) {
                        issues.push({
                            file,
                            type: 'Missing JavaScript file',
                            detail: `Script not found: ${src}`,
                            severity: 'HIGH'
                        });
                    }
                }
            });
        }
        
        // Check for missing CSS files
        const cssMatches = content.match(/<link[^>]+href=['"]([^'"]+\.css)['"]/g);
        if (cssMatches) {
            cssMatches.forEach(match => {
                const href = match.match(/href=['"]([^'"]+)['"]/)[1];
                if (!href.startsWith('http') && !href.startsWith('//')) {
                    const cssPath = path.join('.', href);
                    if (!fs.existsSync(cssPath)) {
                        issues.push({
                            file,
                            type: 'Missing CSS file',
                            detail: `CSS not found: ${href}`,
                            severity: 'MEDIUM'
                        });
                    }
                }
            });
        }
        
        // Check for inline console statements
        const consoleMatches = content.match(/console\.(log|error|warn|debug|info)\(/g);
        if (consoleMatches && consoleMatches.length > 0) {
            issues.push({
                file,
                type: 'Console statements',
                detail: `${consoleMatches.length} console.* calls found`,
                severity: 'LOW'
            });
        }
        
    } catch (err) {
        // Skip files that can't be read
    }
});

console.log('2️⃣ Checking JavaScript files...\n');

// Check JS files
const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js') && !f.includes('node_modules'));

jsFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        filesChecked++;
        
        // Check for console statements
        const consoleMatches = content.match(/console\.(log|error|warn|debug|info)\(/g);
        if (consoleMatches && consoleMatches.length > 0) {
            issues.push({
                file,
                type: 'Console statements in JS',
                detail: `${consoleMatches.length} console.* calls`,
                severity: 'LOW'
            });
        }
        
        // Check for undefined variables (common error source)
        const strictMode = content.includes("'use strict'") || content.includes('"use strict"');
        if (!strictMode) {
            issues.push({
                file,
                type: 'No strict mode',
                detail: 'Missing "use strict" - can cause silent errors',
                severity: 'LOW'
            });
        }
        
    } catch (err) {
        // Skip
    }
});

console.log('📊 RESULTS:\n');
console.log(`Files checked: ${filesChecked}`);
console.log(`Issues found: ${issues.length}\n`);

// Group by severity
const high = issues.filter(i => i.severity === 'HIGH');
const medium = issues.filter(i => i.severity === 'MEDIUM');
const low = issues.filter(i => i.severity === 'LOW');

if (high.length > 0) {
    console.log('🚨 HIGH SEVERITY (Likely causing console errors):');
    high.forEach(issue => {
        console.log(`   - ${issue.file}: ${issue.detail}`);
    });
    console.log('');
}

if (medium.length > 0) {
    console.log('⚠️  MEDIUM SEVERITY (May cause console errors):');
    medium.forEach(issue => {
        console.log(`   - ${issue.file}: ${issue.detail}`);
    });
    console.log('');
}

if (low.length > 0) {
    console.log('💡 LOW SEVERITY (Console noise, not errors):');
    console.log(`   - ${low.length} files with console.* statements`);
    console.log('   - These create console output but not errors');
    console.log('');
}

// Save detailed report
const report = {
    timestamp: new Date().toISOString(),
    filesChecked,
    totalIssues: issues.length,
    high: high.length,
    medium: medium.length,
    low: low.length,
    issues
};

fs.writeFileSync('CONSOLE_ERRORS_REPORT_DEC7.json', JSON.stringify(report, null, 2));

console.log('✅ Detailed report saved to CONSOLE_ERRORS_REPORT_DEC7.json\n');

// Create fix script if needed
if (high.length > 0 || medium.length > 0) {
    console.log('🔧 Creating fix script...\n');
    
    let fixScript = `const fs = require('fs');\n\n`;
    fixScript += `console.log('🔧 FIXING CONSOLE ERRORS - December 7, 2025\\n');\n\n`;
    fixScript += `let fixed = 0;\n\n`;
    
    // Fix missing files by commenting out references
    [...high, ...medium].forEach(issue => {
        if (issue.type === 'Missing JavaScript file' || issue.type === 'Missing CSS file') {
            const src = issue.detail.split(': ')[1];
            fixScript += `// Fix: ${issue.file} - ${issue.detail}\n`;
            fixScript += `try {\n`;
            fixScript += `    let content = fs.readFileSync('${issue.file}', 'utf8');\n`;
            fixScript += `    content = content.replace(/${src.replace(/\./g, '\\.')}/g, '<!-- REMOVED: ${src} -->');\n`;
            fixScript += `    fs.writeFileSync('${issue.file}', content);\n`;
            fixScript += `    console.log('✅ Fixed: ${issue.file}');\n`;
            fixScript += `    fixed++;\n`;
            fixScript += `} catch (err) { console.log('❌ Error fixing ${issue.file}'); }\n\n`;
        }
    });
    
    fixScript += `console.log('\\n📊 SUMMARY:');\n`;
    fixScript += `console.log(\`✅ Fixed \${fixed} issues\`);\n`;
    
    fs.writeFileSync('FIX_CONSOLE_ERRORS_DEC7.js', fixScript);
    console.log('✅ Fix script created: FIX_CONSOLE_ERRORS_DEC7.js');
    console.log('   Run: node FIX_CONSOLE_ERRORS_DEC7.js\n');
}

console.log('🎯 NEXT STEPS:');
console.log('1. Review CONSOLE_ERRORS_REPORT_DEC7.json');
console.log('2. Run fix script if created');
console.log('3. Re-run Playwright tests');
console.log('4. Push to GitHub\n');
