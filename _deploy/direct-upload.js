// DIRECT CLOUDFLARE UPLOAD - NO WRANGLER NEEDED
// Just need your Cloudflare API token

const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('🚀 DIRECT CLOUDFLARE UPLOAD\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Configuration - UPDATE THESE
const CONFIG = {
    accountId: 'YOUR_ACCOUNT_ID',  // Get from Cloudflare dashboard URL
    projectName: 'onestepforthelife',
    apiToken: process.env.CLOUDFLARE_API_TOKEN || 'YOUR_API_TOKEN_HERE'
};

// Files to upload
const filesToUpload = [
    'astronomy-calculator.html',
    'astronomy-api-integration.js',
    // Add more files as needed
];

console.log('📋 Configuration:');
console.log(`   Account ID: ${CONFIG.accountId}`);
console.log(`   Project: ${CONFIG.projectName}`);
console.log(`   API Token: ${CONFIG.apiToken.substring(0, 10)}...`);
console.log(`\n📦 Files to upload: ${filesToUpload.length}`);
filesToUpload.forEach(f => console.log(`   - ${f}`));
console.log('\n═══════════════════════════════════════════════════════════════\n');

// Check if config is set
if (CONFIG.accountId === 'YOUR_ACCOUNT_ID' || CONFIG.apiToken === 'YOUR_API_TOKEN_HERE') {
    console.log('❌ CONFIGURATION NEEDED\n');
    console.log('Please update the CONFIG section in this file:\n');
    console.log('1. Get your Account ID:');
    console.log('   - Go to: https://dash.cloudflare.com');
    console.log('   - Click "Workers & Pages"');
    console.log('   - Look at the URL, copy the ID after /accounts/\n');
    console.log('2. Get your API Token:');
    console.log('   - Go to: https://dash.cloudflare.com/profile/api-tokens');
    console.log('   - Click "Create Token"');
    console.log('   - Use "Edit Cloudflare Workers" template');
    console.log('   - Copy the token\n');
    console.log('3. Set the token:');
    console.log('   Option A: Edit this file and paste token in CONFIG');
    console.log('   Option B: Set environment variable:');
    console.log('      set CLOUDFLARE_API_TOKEN=your_token_here\n');
    console.log('═══════════════════════════════════════════════════════════════\n');
    process.exit(1);
}

// Create FormData-like boundary
const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

// Build multipart form data
function buildFormData(files) {
    let body = '';
    
    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  Warning: ${file} not found, skipping...`);
            return;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        body += `--${boundary}\r\n`;
        body += `Content-Disposition: form-data; name="${file}"; filename="${file}"\r\n`;
        body += `Content-Type: text/html\r\n\r\n`;
        body += content + '\r\n';
    });
    
    body += `--${boundary}--\r\n`;
    return body;
}

// Upload to Cloudflare
function uploadToCloudflare() {
    console.log('📤 Preparing upload...\n');
    
    const formData = buildFormData(filesToUpload);
    
    const options = {
        hostname: 'api.cloudflare.com',
        port: 443,
        path: `/client/v4/accounts/${CONFIG.accountId}/pages/projects/${CONFIG.projectName}/deployments`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${CONFIG.apiToken}`,
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': Buffer.byteLength(formData)
        }
    };
    
    console.log('🚀 Uploading to Cloudflare...\n');
    
    const req = https.request(options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            console.log('═══════════════════════════════════════════════════════════════\n');
            
            if (res.statusCode === 200 || res.statusCode === 201) {
                console.log('✅ UPLOAD SUCCESSFUL!\n');
                try {
                    const response = JSON.parse(data);
                    console.log('Deployment URL:', response.result?.url || 'Check dashboard');
                    console.log('\nYour site will be live at:');
                    console.log('https://onestepforthelife.com\n');
                } catch (e) {
                    console.log('Upload completed successfully!');
                }
            } else {
                console.log('❌ UPLOAD FAILED\n');
                console.log(`Status: ${res.statusCode}`);
                console.log(`Response: ${data}\n`);
            }
            
            console.log('═══════════════════════════════════════════════════════════════\n');
        });
    });
    
    req.on('error', (error) => {
        console.log('❌ ERROR:', error.message);
    });
    
    req.write(formData);
    req.end();
}

// Run upload
uploadToCloudflare();
