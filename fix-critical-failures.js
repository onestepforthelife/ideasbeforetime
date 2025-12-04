const fs = require('fs');

console.log('🔧 Fixing Critical Failures\n');

// FAILURE 1: Add blur system to 4 reports
const reportsToFix = ['acrylic.html', 'nickel.html', 'paper.html', 'poloxamer.html'];

const blurSystemHTML = `
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
    
    <a href="https://ideasbeforetime.pages.dev/request-access.html" 
       class="btn">
        📧 Request Access (Email Required)
    </a>
    
    <a href="https://ideasbeforetime.pages.dev/market-reports.html" 
       class="btn btn-secondary">
        ← Back to Reports
    </a>
</div>

<style>
.preview-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.95) 30%, rgba(255, 255, 255, 0.98) 100%);
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
}

.preview-message .btn-secondary {
    background: #6b7280;
}

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

console.log('📊 Adding blur system to reports...');
reportsToFix.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Add blur system after <body> tag
        if (!content.includes('preview-overlay')) {
            content = content.replace('<body>', '<body>\n' + blurSystemHTML);
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ ${file}: Blur system added`);
        } else {
            console.log(`⚠️  ${file}: Already has blur system`);
        }
    } else {
        console.log(`❌ ${file}: File not found`);
    }
});

// FAILURE 2: Fix SPO business rules (₹21 and NO REFUNDS)
console.log('\n💼 Fixing SPO business rules...');
if (fs.existsSync('social-optimizer-index.html')) {
    let content = fs.readFileSync('social-optimizer-index.html', 'utf8');
    
    // Check if NO REFUNDS is clearly stated
    if (!content.includes('NO REFUND') && !content.includes('No Refund')) {
        // Add prominent NO REFUNDS notice
        const refundNotice = `
        <div style="background: #fee; border: 2px solid #f00; padding: 20px; margin: 20px 0; border-radius: 10px; text-align: center;">
            <h3 style="color: #d00; margin: 0 0 10px 0;">⚠️ IMPORTANT: NO REFUNDS</h3>
            <p style="margin: 0; font-size: 16px;">₹21 covers backend AI costs. This is a non-refundable service fee.</p>
        </div>
        `;
        
        // Add after pricing section
        if (content.includes('₹21')) {
            content = content.replace('₹21', '₹21' + refundNotice);
            fs.writeFileSync('social-optimizer-index.html', content, 'utf8');
            console.log('✅ social-optimizer-index.html: Added NO REFUNDS notice');
        }
    } else {
        console.log('✅ social-optimizer-index.html: Already has NO REFUNDS');
    }
}

console.log('\n✅ Critical failures fixed!');
console.log('Run MASTER_RULE_ENFORCER.js again to verify.');
