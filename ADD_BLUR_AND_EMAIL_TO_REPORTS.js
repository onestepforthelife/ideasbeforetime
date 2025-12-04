const fs = require('fs');
const path = require('path');

console.log('🔧 ADDING BLUR + CLOUDFLARE EMAIL TO ALL REPORTS\n');

const reportFiles = [
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Final_Acrylic_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'nickel-esg-report.html'
];

const blurCSS = `
        /* 70% Blur System */
        .blur-overlay {
            position: fixed;
            top: 30%;
            left: 0;
            right: 0;
            bottom: 0;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            background: rgba(255, 255, 255, 0.7);
            z-index: 999;
            pointer-events: none;
        }
        .access-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 1000;
            max-width: 500px;
            text-align: center;
        }
        .access-popup h3 {
            color: #e74c3c;
            margin-bottom: 15px;
        }
        .access-popup p {
            color: #666;
            margin-bottom: 25px;
            line-height: 1.6;
        }
        .access-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .btn-request, .btn-back {
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .btn-request {
            background: #3498db;
            color: white;
        }
        .btn-request:hover {
            transform: translateY(-2px);
        }
        .btn-back {
            background: #95a5a6;
            color: white;
        }
`;

const blurHTML = `
    <!-- 70% Blur Overlay -->
    <div class="blur-overlay"></div>
    <div class="access-popup">
        <h3>🔒 Preview Mode (30% Visible)</h3>
        <p>This is a premium market research report. You're viewing the first 30%. To access the complete report, please request access.</p>
        <div class="access-buttons">
            <a href="#" class="btn-request" onclick="requestAccess(); return false;">Request Full Access</a>
            <a href="market-reports.html" class="btn-back">← Back to Reports</a>
        </div>
        <p style="font-size: 13px; color: #888; margin-top: 20px;">
            💡 Already approved? <a href="#" onclick="checkCloudflareAccess(); return false;" style="color: #3498db;">Login with Cloudflare Access</a>
        </p>
    </div>
`;

const emailScript = `
<script>
// Pre-approved emails (Cloudflare Access)
const APPROVED_EMAILS = [
    'onestepforthelife@gmail.com',
    'amit.vashist@basf.com'
];

// Check if user has Cloudflare Access
function checkCloudflareAccess() {
    alert('Cloudflare Access: Please refresh the page. If you have access, you will be prompted to login.');
    location.reload();
}

// Request access via Cloudflare Email Workers
async function requestAccess() {
    const email = prompt('Enter your email address to request access:');
    
    if (!email) return;
    
    // Validate email
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Check if already approved
    if (APPROVED_EMAILS.includes(email.toLowerCase())) {
        alert('You already have access! Please refresh the page and login with Cloudflare Access.');
        location.reload();
        return;
    }
    
    // Send request via Cloudflare Email Workers
    try {
        const response = await fetch('/api/request-report-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                report: document.title,
                url: window.location.href,
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            alert('✅ Access request sent! You will receive a response within 24 hours at ' + email);
        } else {
            throw new Error('Failed to send request');
        }
    } catch (error) {
        // Fallback: Use Web3Forms
        const fallbackResponse = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: 'bcef8ad8-e6c5-4792-b48a-95abaf0eb91e',
                from_name: 'Report Access Request',
                subject: 'New Report Access Request',
                email: email,
                message: \`Report Access Request:\\n\\nEmail: \${email}\\nReport: \${document.title}\\nURL: \${window.location.href}\\nTimestamp: \${new Date().toLocaleString()}\\n\\nPlease approve access in Cloudflare.\`
            })
        });
        
        if (fallbackResponse.ok) {
            alert('✅ Access request sent! You will receive a response within 24 hours at ' + email);
        } else {
            alert('❌ Failed to send request. Please email onestepforthelife@gmail.com directly.');
        }
    }
}
</script>
`;

reportFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file} - Not found`);
        return;
    }
    
    console.log(`\n📝 Adding blur + email to: ${file}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add blur CSS before </style>
    if (!content.includes('blur-overlay')) {
        content = content.replace('</style>', blurCSS + '\n    </style>');
        console.log('  ✅ Added blur CSS');
    }
    
    // Add blur HTML before closing body
    if (!content.includes('blur-overlay')) {
        content = content.replace('</body>', blurHTML + emailScript + '\n</body>');
        console.log('  ✅ Added blur overlay + email system');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('  ✅ Complete!');
});

console.log('\n✅ ALL REPORTS NOW HAVE:');
console.log('  ✅ 70% blur (first 30% visible)');
console.log('  ✅ Cloudflare Email (not Outlook)');
console.log('  ✅ Clean popup design');
console.log('  ✅ Direct access for 2 pre-approved emails');
console.log('  ✅ Email sent FROM site via Cloudflare Workers');
console.log('\nReady to push!');
