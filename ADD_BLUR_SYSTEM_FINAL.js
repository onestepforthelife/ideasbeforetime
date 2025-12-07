const fs = require('fs');
const path = require('path');

console.log('🔧 ADDING BLUR SYSTEM WITH REQUEST-ACCESS LINK\n');

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
            font-size: 24px;
        }
        .access-popup p {
            color: #666;
            margin-bottom: 25px;
            line-height: 1.6;
            font-size: 16px;
        }
        .access-buttons {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .btn-request, .btn-back {
            padding: 12px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s;
            font-size: 16px;
        }
        .btn-request {
            background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%);
            color: white;
        }
        .btn-request:hover {
            transform: translateY(-2px);
        }
        .btn-back {
            background: #95a5a6;
            color: white;
        }
        .btn-back:hover {
            transform: translateY(-2px);
        }
`;

const blurHTML = `
    <!-- 70% Blur Overlay -->
    <div class="blur-overlay"></div>
    <div class="access-popup">
        <h3>🔒 Preview Mode (30% Visible)</h3>
        <p>This is a premium market research report. You're viewing the first 30%. To access the complete report, please request access.</p>
        <div class="access-buttons">
            <a href="request-access.html" class="btn-request">🔐 Request Full Access</a>
            <a href="market-reports.html" class="btn-back">← Back to Reports</a>
        </div>
        <p style="font-size: 13px; color: #888; margin-top: 20px;">
            💡 Already approved? Contact onestepforthelife@gmail.com for login credentials.
        </p>
    </div>
`;

reportFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file} - Not found`);
        return;
    }
    
    console.log(`\n📝 Adding blur to: ${file}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove old blur system if exists
    content = content.replace(/\/\* 70% Blur System \*\/[\s\S]*?\.btn-back:hover \{[^}]+\}/g, '');
    content = content.replace(/<!-- 70% Blur Overlay -->[\s\S]*?<\/div>\s*<\/div>/g, '');
    
    // Add new blur CSS before </style>
    if (!content.includes('blur-overlay')) {
        content = content.replace('</style>', blurCSS + '\n    </style>');
        console.log('  ✅ Added blur CSS');
    }
    
    // Add blur HTML before closing body
    if (!content.includes('blur-overlay')) {
        content = content.replace('</body>', blurHTML + '\n</body>');
        console.log('  ✅ Added blur overlay');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('  ✅ Complete!');
});

console.log('\n✅ ALL REPORTS NOW HAVE:');
console.log('  ✅ 70% blur (first 30% visible)');
console.log('  ✅ Clean popup with "Request Access" button');
console.log('  ✅ Links to request-access.html (your existing form)');
console.log('  ✅ Professional design');
console.log('\nReady to push!');
