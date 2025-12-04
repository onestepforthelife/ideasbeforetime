const fs = require('fs');
const path = require('path');

// Short URL mappings (except cv.html and kiro-training-guide.html)
const shortLinks = {
    // Main pages
    'spo.html': 'social-optimizer-index.html',
    'tools.html': 'social-optimizer-index.html',
    'reports.html': 'market-reports.html',
    'library.html': 'library.html',
    'about.html': 'about.html',
    'blog.html': 'blog.html',
    
    // Specific reports
    'acrylic.html': 'Final_Acrylic_Market_Report.html',
    'paper.html': 'Paper_Pulp_Specialty_Chemicals_Report.html',
    'nickel.html': 'nickel-esg-report.html',
    'poloxamer.html': 'Poloxamer_Market_Report.html',
    'specialty.html': 'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    
    // Tools
    'linkedin.html': 'linkedin-portfolio-index.html',
    'jobs.html': 'job-dashboard.html',
    'email.html': 'email-sender-web.html',
    
    // Other
    'access.html': 'request-access.html',
    'innovations.html': 'innovations/index.html'
};

const template = (shortName, targetFile) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=https://ideasbeforetime.pages.dev/${targetFile}">
    <link rel="canonical" href="https://ideasbeforetime.pages.dev/${targetFile}">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .redirect-message {
            padding: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        .spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="redirect-message">
        <h2>Redirecting...</h2>
        <div class="spinner"></div>
    </div>
    <script>
        window.location.href = 'https://ideasbeforetime.pages.dev/${targetFile}';
    </script>
</body>
</html>`;

let created = 0;
let skipped = 0;

console.log('\n🔗 CREATING SHORT REDIRECT LINKS\n');
console.log('='.repeat(60));

Object.entries(shortLinks).forEach(([shortName, targetFile]) => {
    const filePath = path.join(__dirname, shortName);
    
    // Skip if already exists
    if (fs.existsSync(filePath)) {
        console.log(`⚪ ${shortName} → ${targetFile} (already exists)`);
        skipped++;
        return;
    }
    
    const content = template(shortName, targetFile);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${shortName} → ${targetFile}`);
    created++;
});

console.log('='.repeat(60));
console.log(`\n✅ Created: ${created} new short links`);
console.log(`⚪ Skipped: ${skipped} existing links`);
console.log(`📊 Total: ${Object.keys(shortLinks).length} short links\n`);

console.log('🌐 SHORT URLS AVAILABLE:\n');
Object.entries(shortLinks).forEach(([shortName, targetFile]) => {
    console.log(`   ideasbeforetime.pages.dev/${shortName}`);
});

console.log('\n✅ EXCLUDED (keep long URLs):');
console.log('   cv.html (professional CV)');
console.log('   kiro-training-guide.html (already has kiro.html)');
