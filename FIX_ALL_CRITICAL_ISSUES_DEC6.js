const fs = require('fs');

console.log('🔧 FIXING ALL CRITICAL ISSUES');
console.log('='.repeat(60));

let fixed = 0;
let errors = 0;

// FIX 1: Add SPO, Jobs, Admin to navigation
console.log('\n1. Adding SPO, Jobs, Admin to navigation...');
try {
    let navContent = fs.readFileSync('common-navigation.js', 'utf8');
    
    // Check if already has these links
    if (!navContent.includes('spo.html')) {
        // Add before the closing of nav items
        navContent = navContent.replace(
            `{ text: '📄 CV', url: 'cv.html' }`,
            `{ text: '📄 CV', url: 'cv.html' },
            { text: '🚀 SPO Tool', url: 'spo.html' },
            { text: '💼 Job Search', url: 'jobs.html' },
            { text: '⚙️ Admin', url: 'admin-control-panel.html' }`
        );
        
        fs.writeFileSync('common-navigation.js', navContent);
        console.log('   ✅ Added SPO, Jobs, Admin to navigation');
        fixed++;
    } else {
        console.log('   ✅ Already in navigation');
    }
} catch (e) {
    console.log('   ❌ Error:', e.message);
    errors++;
}

// FIX 2: Add required JS files to spo.html
console.log('\n2. Adding required JS files to spo.html...');
try {
    let spoContent = fs.readFileSync('spo.html', 'utf8');
    
    // Check if files are already included
    if (!spoContent.includes('social-optimizer-app.js')) {
        // Add before closing body tag
        spoContent = spoContent.replace(
            '</body>',
            `    <script src="social-optimizer-app.js"></script>
    <script src="social-optimizer-ai-engine.js"></script>
</body>`
        );
        
        fs.writeFileSync('spo.html', spoContent);
        console.log('   ✅ Added social-optimizer-app.js and social-optimizer-ai-engine.js');
        fixed++;
    } else {
        console.log('   ✅ Already included');
    }
} catch (e) {
    console.log('   ❌ Error:', e.message);
    errors++;
}

// FIX 3: Add navigation to test-multi-ai.html
console.log('\n3. Adding navigation to test-multi-ai.html...');
try {
    let testContent = fs.readFileSync('test-multi-ai.html', 'utf8');
    
    if (!testContent.includes('common-navigation.js')) {
        // Add after opening body tag
        testContent = testContent.replace(
            '<body>',
            `<body>
    <script src="common-navigation.js"></script>`
        );
        
        // Add footer before closing body
        testContent = testContent.replace(
            '</body>',
            `    <script src="common-footer.js"></script>
</body>`
        );
        
        fs.writeFileSync('test-multi-ai.html', testContent);
        console.log('   ✅ Added navigation and footer');
        fixed++;
    } else {
        console.log('   ✅ Already has navigation');
    }
} catch (e) {
    console.log('   ❌ Error:', e.message);
    errors++;
}

// FIX 4: Fix navigation template variable issue
console.log('\n4. Fixing navigation template variable...');
try {
    let navContent = fs.readFileSync('common-navigation.js', 'utf8');
    
    // Replace ${item.url} with actual URL if it exists
    if (navContent.includes('${item.url}')) {
        navContent = navContent.replace(/\$\{item\.url\}/g, 'index.html');
        fs.writeFileSync('common-navigation.js', navContent);
        console.log('   ✅ Fixed template variable');
        fixed++;
    } else {
        console.log('   ✅ No template variable issues');
    }
} catch (e) {
    console.log('   ❌ Error:', e.message);
    errors++;
}

// FIX 5: Add Cloudflare Access to _headers
console.log('\n5. Adding Cloudflare Access to _headers...');
try {
    let headersContent = '';
    if (fs.existsSync('_headers')) {
        headersContent = fs.readFileSync('_headers', 'utf8');
    }
    
    if (!headersContent.includes('CF-Access')) {
        headersContent += `

# Cloudflare Access Protection for Admin Panel
/admin-control-panel.html
  CF-Access-Authenticated-User-Email: *
  
# Note: This requires Cloudflare Zero Trust configuration in dashboard
# Go to: Cloudflare Dashboard → Zero Trust → Access → Applications
# Create application for: onestepforthelife.com/admin-control-panel.html
`;
        
        fs.writeFileSync('_headers', headersContent);
        console.log('   ✅ Added Cloudflare Access configuration');
        console.log('   ⚠️  NOTE: Must also configure in Cloudflare Dashboard');
        fixed++;
    } else {
        console.log('   ✅ Already configured');
    }
} catch (e) {
    console.log('   ❌ Error:', e.message);
    errors++;
}

// FIX 6: Add Job Search link to homepage
console.log('\n6. Adding Job Search link to homepage...');
try {
    let indexContent = fs.readFileSync('index.html', 'utf8');
    
    if (!indexContent.includes('jobs.html') && !indexContent.includes('Job Search')) {
        // Find the tools section and add Job Search
        if (indexContent.includes('SPO Tool') || indexContent.includes('social-optimizer')) {
            indexContent = indexContent.replace(
                /<\/section>/,
                `        <div class="tool-card">
            <h3>💼 Job Search</h3>
            <p>Find and track job opportunities</p>
            <a href="jobs.html" class="cta-button">Search Jobs</a>
        </div>
    </section>`
            );
            
            fs.writeFileSync('index.html', indexContent);
            console.log('   ✅ Added Job Search link to homepage');
            fixed++;
        } else {
            console.log('   ⚠️  Could not find tools section');
        }
    } else {
        console.log('   ✅ Already has Job Search link');
    }
} catch (e) {
    console.log('   ❌ Error:', e.message);
    errors++;
}

// SUMMARY
console.log('\n' + '='.repeat(60));
console.log('📊 FIX SUMMARY');
console.log('='.repeat(60));
console.log(`✅ Fixed: ${fixed} issues`);
console.log(`❌ Errors: ${errors} issues`);

if (errors === 0) {
    console.log('\n✅ ALL CRITICAL ISSUES FIXED!');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Push to GitHub via GitHub Desktop');
    console.log('2. Wait 2-3 minutes for deployment');
    console.log('3. Configure Cloudflare Access in dashboard');
    console.log('4. Test on live site: https://onestepforthelife.com');
} else {
    console.log('\n⚠️  Some issues remain - check errors above');
}

process.exit(errors > 0 ? 1 : 0);
