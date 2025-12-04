// Remove All Admin Password Protection
// Keep ONLY Cloudflare Access
// December 5, 2025

const fs = require('fs');

console.log('🔒 REMOVING ALL ADMIN PASSWORD PROTECTION...\n');

const fixes = [];

// 1. Remove password from index.html
console.log('1️⃣ Fixing index.html...');
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/\/\/ Admin password\s*const ADMIN_PASSWORD = '[^']*';\s*/g, '// Cloudflare Access handles authentication\n');
indexHtml = indexHtml.replace(/\/\/ Admin login[\s\S]*?alert\('Incorrect password'\);[\s\S]*?\}/g, '// Cloudflare Access only - no password needed');
fs.writeFileSync('index.html', indexHtml);
fixes.push('✅ index.html - Removed admin password');

// 2. Remove password from job-tools.html
console.log('2️⃣ Fixing job-tools.html...');
let jobTools = fs.readFileSync('job-tools.html', 'utf8');
jobTools = jobTools.replace(/\/\/ Password protection[\s\S]*?\}\)\(\);/g, '// Cloudflare Access handles authentication');
fs.writeFileSync('job-tools.html', jobTools);
fixes.push('✅ job-tools.html - Removed password protection');

// 3. Remove password from research-preview.html
console.log('3️⃣ Fixing research-preview.html...');
let researchPreview = fs.readFileSync('research-preview.html', 'utf8');
researchPreview = researchPreview.replace(/<button onclick="enterPassword\(\)">🔑 Enter Password<\/button>/g, '');
researchPreview = researchPreview.replace(/<button class="unlock-btn secondary" onclick="enterPassword\(\)">🔑 I Have Password<\/button>/g, '');
researchPreview = researchPreview.replace(/function enterPassword\(\) \{[\s\S]*?\}/g, '// Password removed - use Cloudflare Access');
researchPreview = researchPreview.replace(/Password-protected content \|/g, 'Protected by Cloudflare Access |');
fs.writeFileSync('research-preview.html', researchPreview);
fixes.push('✅ research-preview.html - Removed password buttons & function');

console.log('\n═══════════════════════════════════════');
console.log('✅ ALL PASSWORD PROTECTION REMOVED');
console.log('═══════════════════════════════════════\n');

fixes.forEach(fix => console.log(fix));

console.log('\n📋 WHAT WAS REMOVED:');
console.log('❌ Admin password in index.html');
console.log('❌ Job tools password protection');
console.log('❌ Research preview password buttons');
console.log('❌ All password prompt functions');

console.log('\n✅ WHAT REMAINS:');
console.log('✅ Cloudflare Access (email-based authentication)');
console.log('✅ Approved emails list in index.html');
console.log('✅ Request access forms');

console.log('\n🔒 SECURITY:');
console.log('All pages now rely ONLY on Cloudflare Access');
console.log('No bypassable JavaScript passwords');
console.log('Server-side authentication only');

console.log('\n🚀 NEXT STEP:');
console.log('Push to GitHub → Cloudflare Pages will deploy');
console.log('Your approved email will work immediately!');
