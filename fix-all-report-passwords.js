// Fix password protection on ALL market report HTML files
// Ensures every report has blurred content + password overlay

const fs = require('fs');
const path = require('path');

// List of all market report files
const reportFiles = [
    'Specialty_Chemicals_Market_Intelligence_Report_Consolidated.html',
    'Specialty_Chemicals_Report_UPDATED.html',
    'Final_Acrylic_Market_Report.html',
    'Poloxamer_Market_Report.html',
    'nickel-esg-report.html'
];

// Password overlay HTML (to be inserted before </body>)
const passwordOverlay = `
<!-- Password Protection Overlay -->
<div id="passwordOverlay">
    <div id="passwordBox">
        <h2>🔒 Protected Content</h2>
        <p>This market research report is confidential. Please enter password to access.</p>
        <input type="password" id="passwordInput" placeholder="Enter password">
        <button id="passwordSubmit">Unlock Report</button>
        <p id="passwordError">Incorrect password. Please try again.</p>
    </div>
</div>

<script>
// Password protection script
(function() {
    const correctPassword = 'market2024';
    const overlay = document.getElementById('passwordOverlay');
    const input = document.getElementById('passwordInput');
    const submit = document.getElementById('passwordSubmit');
    const error = document.getElementById('passwordError');
    const content = document.querySelector('.container');

    function checkPassword() {
        if (input.value === correctPassword) {
            overlay.style.display = 'none';
            content.classList.remove('blurred');
            sessionStorage.setItem('reportAccess', 'granted');
        } else {
            error.style.display = 'block';
            input.value = '';
            input.focus();
        }
    }

    submit.addEventListener('click', checkPassword);
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });

    // Check if already authenticated
    if (sessionStorage.getItem('reportAccess') === 'granted') {
        overlay.style.display = 'none';
        content.classList.remove('blurred');
    } else {
        input.focus();
    }
})();
</script>`;

// Password protection styles (to be inserted in <style> section)
const passwordStyles = `
/* Password Protection Styles */
#passwordOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

#passwordBox {
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    text-align: center;
    max-width: 400px;
}

#passwordBox h2 {
    margin: 0 0 20px 0;
    border: none;
    padding: 0;
}

#passwordInput {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 2px solid #3498db;
    border-radius: 5px;
    margin-bottom: 15px;
}

#passwordSubmit {
    width: 100%;
    padding: 12px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

#passwordSubmit:hover {
    background: #2980b9;
}

#passwordError {
    color: #e74c3c;
    margin-top: 10px;
    display: none;
}

.blurred {
    filter: blur(10px);
    pointer-events: none;
    user-select: none;
}
`;

let fixed = 0;
let errors = 0;

console.log('🔒 Fixing password protection on all market reports...\n');

reportFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${file} - NOT FOUND (skipping)`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // 1. Add .blurred class to container if not present
        if (!content.includes('class="container blurred"')) {
            content = content.replace(
                /<div class="container">/g,
                '<div class="container blurred">'
            );
            modified = true;
        }

        // 2. Add password styles if not present
        if (!content.includes('#passwordOverlay')) {
            content = content.replace(
                '</style>',
                passwordStyles + '\n</style>'
            );
            modified = true;
        }

        // 3. Remove any existing password overlay (to avoid duplicates)
        content = content.replace(/<!-- Password Protection Overlay -->[\s\S]*?<\/script>/g, '');

        // 4. Add password overlay before </body>
        if (!content.includes('id="passwordOverlay"')) {
            content = content.replace(
                '</body>',
                passwordOverlay + '\n</body>'
            );
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ ${file} - FIXED`);
            fixed++;
        } else {
            console.log(`✓  ${file} - Already protected`);
        }

    } catch (err) {
        console.log(`❌ ${file} - ERROR: ${err.message}`);
        errors++;
    }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed: ${fixed} files`);
console.log(`❌ Errors: ${errors} files`);
console.log('='.repeat(60));
console.log('\n📝 Password: market2024');
console.log('🔒 All reports now have password protection!');
