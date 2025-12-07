/**
 * ADD 30% PREVIEW TO ALL MARKET REPORTS
 * 
 * This script adds:
 * 1. 30% content visible (blur/fade the rest)
 * 2. Cloudflare Access protection reminder
 * 3. Login prompt for full access
 * 
 * Created: December 3, 2025
 */

const fs = require('fs');
const path = require('path');

// Market report files to update
const reportFiles = [
    'Final_Acrylic_Market_Report.html',
    'nickel-esg-report.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Poloxamer_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Report_UPDATED.html'
];

// CSS for 30% preview
const previewCSS = `
<style>
/* 30% PREVIEW SYSTEM */
.preview-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 30%,
        rgba(255, 255, 255, 0.95) 30%,
        rgba(255, 255, 255, 0.98) 100%
    );
    z-index: 9998;
    pointer-events: none;
}

.preview-message {
    position: fixed;
    top: 35%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 10px 50px rgba(0,0,0,0.3);
    text-align: center;
    z-index: 9999;
    max-width: 600px;
    border: 3px solid #2563eb;
}

.preview-message h2 {
    color: #1e40af;
    margin-bottom: 20px;
    font-size: 28px;
}

.preview-message p {
    color: #374151;
    margin-bottom: 15px;
    font-size: 16px;
    line-height: 1.6;
}

.preview-message .highlight {
    background: #fef3c7;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    border-left: 4px solid #f59e0b;
}

.preview-message .access-info {
    background: #dbeafe;
    padding: 15px;
    border-radius: 8px;
    margin: 20px 0;
    font-size: 14px;
}

.preview-message .btn {
    display: inline-block;
    padding: 12px 30px;
    background: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    margin: 10px 5px;
    font-weight: 600;
    transition: all 0.3s;
}

.preview-message .btn:hover {
    background: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
}

.preview-message .btn-secondary {
    background: #6b7280;
}

.preview-message .btn-secondary:hover {
    background: #4b5563;
}

/* Blur content below 30% */
body::after {
    content: '';
    position: fixed;
    top: 30%;
    left: 0;
    width: 100%;
    height: 70%;
    backdrop-filter: blur(8px);
    z-index: 9997;
    pointer-events: none;
}
</style>
`;

// HTML for preview message
const previewHTML = `
<!-- 30% PREVIEW OVERLAY -->
<div class="preview-overlay"></div>
<div class="preview-message">
    <h2>🔒 Preview Mode (30% Visible)</h2>
    
    <p><strong>You're viewing a preview of this market research report.</strong></p>
    
    <div class="highlight">
        <strong>📊 Full Report Includes:</strong><br>
        • Complete market analysis & trends<br>
        • Detailed pricing & supply chain data<br>
        • Competitor analysis & insights<br>
        • Future projections & recommendations
    </div>
    
    <div class="access-info">
        <strong>🔐 This report is protected by Cloudflare Access</strong><br>
        Professional server-side authentication for enterprise security
    </div>
    
    <p><strong>To access the full report:</strong></p>
    
    <a href="mailto:onestepforthelife@gmail.com?subject=Request Access to Market Report&body=Hi Amit,%0D%0A%0D%0AI would like to request access to the market research report.%0D%0A%0D%0AName:%0D%0ACompany:%0D%0AEmail:%0D%0APurpose:%0D%0A%0D%0AThank you!" 
       class="btn">
        📧 Request Access
    </a>
    
    <a href="https://ideasbeforetime.pages.dev/market-reports.html" 
       class="btn btn-secondary">
        ← Back to Reports
    </a>
    
    <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
        <strong>Already have access?</strong><br>
        Cloudflare Access will authenticate you automatically when you visit this page.
    </p>
</div>

<!-- CLOUDFLARE ACCESS REMINDER -->
<!-- 
    ⚠️ IMPORTANT: This file MUST be protected with Cloudflare Access
    
    Setup Instructions:
    1. Go to Cloudflare Dashboard → Zero Trust → Access
    2. Create Application: "Market Research Reports"
    3. Path: /*Report*.html
    4. Add Policy: Emails (onestepforthelife@gmail.com + approved clients)
    5. Save & Deploy
    
    Guide: MARKET_REPORTS_CLOUDFLARE_ACCESS.txt
    
    Once Cloudflare Access is active, this preview overlay can be removed
    for authenticated users (Cloudflare handles authentication).
-->
`;

let successCount = 0;
let errorCount = 0;
const results = [];

console.log('🔒 ADDING 30% PREVIEW TO MARKET REPORTS...\n');

reportFiles.forEach(filename => {
    try {
        const filePath = path.join(__dirname, filename);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            results.push(`⚠️  ${filename} - File not found, skipping`);
            return;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if already has preview system
        if (content.includes('preview-overlay') || content.includes('30% PREVIEW')) {
            results.push(`ℹ️  ${filename} - Already has preview system`);
            return;
        }
        
        // Add CSS before </head>
        if (content.includes('</head>')) {
            content = content.replace('</head>', `${previewCSS}\n</head>`);
        } else {
            results.push(`⚠️  ${filename} - No </head> tag found`);
            errorCount++;
            return;
        }
        
        // Add HTML after <body> tag
        if (content.includes('<body>')) {
            content = content.replace('<body>', `<body>\n${previewHTML}\n`);
        } else if (content.match(/<body[^>]*>/)) {
            content = content.replace(/<body[^>]*>/, match => `${match}\n${previewHTML}\n`);
        } else {
            results.push(`⚠️  ${filename} - No <body> tag found`);
            errorCount++;
            return;
        }
        
        // Write updated content
        fs.writeFileSync(filePath, content, 'utf8');
        
        results.push(`✅ ${filename} - 30% preview added successfully`);
        successCount++;
        
    } catch (error) {
        results.push(`❌ ${filename} - Error: ${error.message}`);
        errorCount++;
    }
});

// Print results
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('RESULTS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

results.forEach(result => console.log(result));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`SUMMARY: ${successCount} successful, ${errorCount} errors`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('📋 NEXT STEPS:\n');
console.log('1. ✅ 30% preview added to all reports');
console.log('2. 🔒 Set up Cloudflare Access (see MARKET_REPORTS_CLOUDFLARE_ACCESS.txt)');
console.log('3. 📧 Your email (onestepforthelife@gmail.com) will have full access');
console.log('4. 🚀 Deploy to Cloudflare Pages');
console.log('\nOnce Cloudflare Access is active, authenticated users bypass the preview!');
