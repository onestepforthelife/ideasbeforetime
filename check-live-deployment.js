// Check Live Deployment Status - December 5, 2025

const checks = [
    {
        name: 'Homepage',
        url: 'https://onestepforthelife.com/',
        expected: 'Ideas Before Time'
    },
    {
        name: 'AI Config Endpoint',
        url: 'https://onestepforthelife.com/api/ai-config',
        expected: 'AI_CONFIG'
    },
    {
        name: 'Functions Deployed',
        url: 'https://onestepforthelife.com/functions/api/ai-config.js',
        expected: 'onRequest'
    }
];

async function checkDeployment() {
    console.log('🔍 Checking Live Deployment...\n');
    
    const results = [];
    
    for (const check of checks) {
        try {
            console.log(`Checking: ${check.name}`);
            console.log(`URL: ${check.url}`);
            
            const response = await fetch(check.url);
            const status = response.status;
            const text = await response.text();
            
            const success = status === 200 && text.includes(check.expected);
            
            results.push({
                name: check.name,
                url: check.url,
                status: status,
                success: success,
                preview: text.substring(0, 100)
            });
            
            console.log(`Status: ${status}`);
            console.log(`Success: ${success ? '✅' : '❌'}`);
            console.log(`Preview: ${text.substring(0, 100)}...\n`);
            
        } catch (error) {
            results.push({
                name: check.name,
                url: check.url,
                status: 'ERROR',
                success: false,
                error: error.message
            });
            
            console.log(`Error: ${error.message}\n`);
        }
    }
    
    // Summary
    console.log('\n📊 DEPLOYMENT SUMMARY\n');
    console.log('='.repeat(50));
    
    const passed = results.filter(r => r.success).length;
    const total = results.length;
    
    results.forEach(result => {
        const icon = result.success ? '✅' : '❌';
        console.log(`${icon} ${result.name}: ${result.status}`);
    });
    
    console.log('='.repeat(50));
    console.log(`\nPassed: ${passed}/${total}`);
    
    if (passed === total) {
        console.log('\n🎉 ALL CHECKS PASSED! Deployment successful!');
    } else {
        console.log('\n⚠️ Some checks failed. See details above.');
    }
    
    return results;
}

// Run checks
checkDeployment().then(results => {
    console.log('\n✅ Check complete!');
}).catch(error => {
    console.error('❌ Check failed:', error);
});
