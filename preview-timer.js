// 20-Second Preview Timer with Password Protection
// Usage: Add this script to any page that needs timed preview

(function() {
    const PREVIEW_TIME = 20; // seconds
    const PASSWORD = 'acrylic2024'; // Change this to your desired password
    
    let timeLeft = PREVIEW_TIME;
    let timerInterval;
    let isUnlocked = false;
    
    // Check if already unlocked in this session
    if (sessionStorage.getItem('contentUnlocked') === 'true') {
        isUnlocked = true;
        return;
    }
    
    // Create timer overlay
    function createTimerOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'previewOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            text-align: center;
            z-index: 9999;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            font-family: 'Segoe UI', Arial, sans-serif;
        `;
        
        overlay.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <span style="font-size: 18px; font-weight: 600;">
                    ⏱️ Preview Mode: <span id="timeRemaining">${PREVIEW_TIME}</span> seconds remaining
                </span>
                <span style="margin-left: 20px; font-size: 14px; opacity: 0.9;">
                    Enter password to unlock full access
                </span>
            </div>
        `;
        
        document.body.insertBefore(overlay, document.body.firstChild);
        document.body.style.paddingTop = '60px';
    }
    
    // Create blur overlay
    function createBlurOverlay() {
        const blurOverlay = document.createElement('div');
        blurOverlay.id = 'blurOverlay';
        blurOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        blurOverlay.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-width: 500px; text-align: center;">
                <h2 style="color: #667eea; margin-bottom: 20px; font-size: 28px;">🔒 Preview Time Expired</h2>
                <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
                    You've viewed this content for ${PREVIEW_TIME} seconds. Enter the password to continue reading.
                </p>
                <input type="password" id="passwordInput" placeholder="Enter password" 
                       style="width: 100%; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; margin-bottom: 15px;">
                <button onclick="checkPassword()" 
                        style="width: 100%; padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">
                    Unlock Content
                </button>
                <p id="errorMessage" style="color: #dc3545; margin-top: 15px; display: none;">Incorrect password. Please try again.</p>
                <p style="color: #999; font-size: 13px; margin-top: 20px;">
                    Don't have the password? <a href="mailto:onestepforthelife@gmail.com" style="color: #667eea;">Request Access</a>
                </p>
            </div>
        `;
        
        document.body.appendChild(blurOverlay);
    }
    
    // Update timer
    function updateTimer() {
        const timerElement = document.getElementById('timeRemaining');
        if (timerElement) {
            timerElement.textContent = timeLeft;
        }
        
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            createBlurOverlay();
        }
    }
    
    // Check password
    window.checkPassword = function() {
        const input = document.getElementById('passwordInput');
        const errorMsg = document.getElementById('errorMessage');
        
        if (input.value === PASSWORD) {
            sessionStorage.setItem('contentUnlocked', 'true');
            document.getElementById('blurOverlay').remove();
            document.getElementById('previewOverlay').remove();
            document.body.style.paddingTop = '0';
            isUnlocked = true;
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                z-index: 10000;
                box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            `;
            successMsg.textContent = '✅ Content Unlocked!';
            document.body.appendChild(successMsg);
            
            setTimeout(() => successMsg.remove(), 3000);
        } else {
            errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
        }
    };
    
    // Allow Enter key to submit password
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.getElementById('passwordInput')) {
            checkPassword();
        }
    });
    
    // Start timer
    createTimerOverlay();
    timerInterval = setInterval(updateTimer, 1000);
    
})();
