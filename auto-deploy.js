// AUTOMATIC CLOUDFLARE DEPLOYMENT
// Run: node auto-deploy.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 AUTOMATIC CLOUDFLARE DEPLOYMENT\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Check if wrangler is installed
try {
    execSync('wrangler --version', { stdio: 'ignore' });
    console.log('✅ Wrangler is installed\n');
} catch (e) {
    console.log('❌ Wrangler not installed');
    console.log('Installing Wrangler...\n');
    execSync('npm install -g wrangler', { stdio: 'inherit' });
    console.log('\n✅ Wrangler installed\n');
}

// Check for wrangler.toml
const wranglerConfig = `name = "ideasbeforetime"
compatibility_date = "2025-12-09"
pages_build_output_dir = "."

[env.production]
name = "ideasbeforetime"
`;

if (!fs.existsSync('wrangler.toml')) {
    console.log('📝 Creating wrangler.toml...');
    fs.writeFileSync('wrangler.toml', wranglerConfig);
    console.log('✅ wrangler.toml created\n');
}

console.log('═══════════════════════════════════════════════════════════════\n');
console.log('🔐 AUTHENTICATION REQUIRED\n');
console.log('Option 1: Use existing login');
console.log('   Run: wrangler login');
console.log('   Then run this script again\n');
console.log('Option 2: Use API Token');
console.log('   Set environment variable: CLOUDFLARE_API_TOKEN');
console.log('   Get token from: https://dash.cloudflare.com/profile/api-tokens\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Try to deploy
try {
    console.log('🚀 Deploying to Cloudflare Pages...\n');
    execSync('wrangler pages deploy . --project-name=ideasbeforetime', { 
        stdio: 'inherit',
        env: { ...process.env }
    });
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('✅ DEPLOYMENT SUCCESSFUL!\n');
    console.log('Your site is live at:');
    console.log('https://onestepforthelife.com\n');
    console.log('Testing in 30 seconds...');
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    setTimeout(() => {
        console.log('🔍 Testing live site...\n');
        try {
            execSync('node test-live-deployment-dec9.js', { stdio: 'inherit' });
        } catch (e) {
            console.log('Test script not found, please test manually');
        }
    }, 30000);
    
} catch (error) {
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('❌ DEPLOYMENT FAILED\n');
    console.log('Please authenticate first:\n');
    console.log('Method 1: Run in separate terminal:');
    console.log('   wrangler login\n');
    console.log('Method 2: Set API token:');
    console.log('   set CLOUDFLARE_API_TOKEN=your_token_here');
    console.log('   node auto-deploy.js\n');
    console.log('Get API token from:');
    console.log('https://dash.cloudflare.com/profile/api-tokens');
    console.log('═══════════════════════════════════════════════════════════════\n');
}
