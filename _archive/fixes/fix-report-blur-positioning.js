const fs = require('fs');

console.log('🔧 Fixing Report Blur Positioning\n');
console.log('Goal: Navigation at top, blur overlay on content below\n');

const reportFiles = [
    'nickel-esg-report.html',
    'acrylic.html', 
    'nickel.html',
    'paper.html',
    'poloxamer.html',
    'Poloxamer_Market_Report.html',
    'Paper_Pulp_Specialty_Chemicals_Report.html',
    'Final_Acrylic_Market_Report.html',
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html'
];

const correctBlurCSS = `
<style>
/* Blur overlay - starts AFTER navigation */
.blur-overlay {
    position: fixed;
    top: 80px; /* Below navigation */
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(8px);
    background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 30%,
        rgba(255, 255, 255, 0.95) 50%,
        rgba(255, 255, 255, 0.98) 100%
    );
    z-index: 999;
    pointer-events: none;
}

/* Access message - positioned in content area */
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
`;

const correctBlurHTML = `
<!-- Blur Overlay (below navigation) -->
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

reportFiles.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`⚠️  ${file}: Not found, skipping`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    // Remove old preview-overlay and preview-message styles and HTML
    if (content.includes('preview-overlay') || content.includes('preview-message')) {
        // Remove old style block
        content = content.replace(/<style>[\s\S]*?\.preview-overlay[\s\S]*?<\/style>/g, '');
        content = content.replace(/<style>[\s\S]*?30% PREVIEW SYSTEM[\s\S]*?<\/style>/g, '');
        
        // Remove old HTML
        content = content.replace(/<!-- 30% PREVIEW OVERLAY -->[\s\S]*?<div class="preview-message">[\s\S]*?<\/div>/g, '');
        content = content.replace(/<div class="preview-overlay"><\/div>/g, '');
        
        // Remove body::after blur
        content = content.replace(/body::after\s*{[\s\S]*?}/g, '');
        
        modified = true;
    }
    
    // Add correct blur system before </head>
    if (!content.includes('blur-overlay')) {
        content = content.replace('</head>', correctBlurCSS + '\n</head>');
        modified = true;
    }
    
    // Add correct blur HTML after <body>
    if (!content.includes('access-message')) {
        content = content.replace('<body>', '<body>\n' + correctBlurHTML);
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✅ ${file}: Fixed blur positioning`);
    } else {
        console.log(`✓  ${file}: Already correct`);
    }
});

console.log('\n✅ All reports fixed!');
console.log('Navigation at top, blur overlay on content below.');
