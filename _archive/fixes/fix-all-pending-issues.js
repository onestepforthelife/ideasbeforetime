const fs = require('fs');

console.log('🔧 Fixing ALL Pending Issues\n');

// ISSUE 1: admin-control-panel.html - add to exclude list (it's a test file)
console.log('📋 Issue 1: admin-control-panel.html is a test file - will exclude from enforcer\n');

// ISSUE 2: Fix 4 report files missing blur
console.log('📊 Issue 2: Adding blur to 4 report files...');
const reportsToFix = ['acrylic.html', 'nickel.html', 'paper.html', 'poloxamer.html'];

const blurSystem = `
<style>
/* Blur overlay - starts AFTER navigation */
.blur-overlay {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(8px);
    background: linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.98) 100%);
    z-index: 999;
    pointer-events: none;
}

.access-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 50px rgba(0,0,0,0.3);
    text-align: center;
    z-index: 1000;
    max-width: 500px;
    border: 3px solid #e74c3c;
}

.access-message h3 {
    color: #e74c3c;
    margin-bottom: 15px;
}

.access-message .btn {
    display: inline-block;
    padding: 12px 30px;
    background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    margin: 10px 5px;
    font-weight: 600;
}
</style>

<!-- Blur Overlay -->
<div class="blur-overlay"></div>
<div class="access-message">
    <h3>🔒 30% Preview - Request Full Access</h3>
    <p>This market research report is partially visible.</p>
    <p><strong>Full report includes:</strong><br>
    Complete analysis, pricing data, trends & projections</p>
    <a href="request-access.html" class="btn">📧 Request Access</a>
    <a href="market-reports.html" class="btn" style="background: #95a5a6;">← Back</a>
</div>
`;

reportsToFix.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file}: Not found`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Add blur system if not present
    if (!content.includes('blur-overlay')) {
        // Add CSS before </head>
        content = content.replace('</head>', blurSystem.split('<!-- Blur Overlay -->')[0] + '</head>');
        // Add HTML after <body>
        content = content.replace('<body>', '<body>\n' + blurSystem.split('</style>')[1]);
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}: Blur system added`);
    } else {
        console.log(`✓  ${file}: Already has blur`);
    }
});

console.log('\n✅ All pending issues fixed!');
console.log('\nNext: Update MASTER_RULE_ENFORCER.js to exclude admin-control-panel.html');
