// Main application logic

// Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyBi2TD5oDtTLKax9cj1ClxLtZYQRg0s9a8';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let currentStep = 1;
let userData = {};
let generatedProfile = null;
let isPaid = false;
let inputMethod = null;
let uploadedFile = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    setupOptionCards();
    checkDevModePrompt();
    
    // Restore user data from localStorage if it exists
    try {
        const savedData = localStorage.getItem('spoUserData');
        if (savedData) {
            const restored = JSON.parse(savedData);
            Object.assign(userData, restored);
            console.log('✓ User data restored from localStorage');
            
            // Restore form fields if on step 1
            if (currentStep === 1 && restored.platform) {
                document.getElementById('platform').value = restored.platform;
                if (restored.inputMethod) {
                    selectInputMethod(restored.inputMethod);
                    if (restored.inputMethod === 'text') {
                        if (restored.currentBio) document.getElementById('currentBio').value = restored.currentBio;
                        if (restored.currentHeadline) document.getElementById('currentHeadline').value = restored.currentHeadline;
                    } else if (restored.inputMethod === 'link' && restored.profileLink) {
                        document.getElementById('profileLink').value = restored.profileLink;
                    }
                }
            }
        }
    } catch (e) {
        console.error('Failed to restore from localStorage:', e);
    }
});

// Fill demo data for testing
function fillDemoData() {
    // Select platform
    document.getElementById('platform').value = 'linkedin';
    
    // Select text input method
    selectInputMethod('text');
    
    // Fill in demo bio
    document.getElementById('currentBio').value = 'Experienced professional with 10+ years in technology and innovation. Passionate about AI, digital transformation, and building products that make a difference. Led multiple successful projects and teams.';
    
    // Fill in demo headline
    document.getElementById('currentHeadline').value = 'Technology Leader | AI Enthusiast | Product Innovation';
    
    // Show success message
    const validationDiv = document.getElementById('validationMessages');
    validationDiv.innerHTML = '<div class="validation-success"><strong>✓ Demo data filled!</strong> You can now proceed to Step 2.</div>';
    
    alert('✅ Demo data filled!\n\nYou can now click "Next: Customize →" to proceed.\n\nThis is for testing only - in production, users will enter their own data.');
}

// Setup option card selection
function setupOptionCards() {
    const optionGroups = ['personaOptions', 'toneOptions', 'goalOptions'];
    
    optionGroups.forEach(groupId => {
        const group = document.getElementById(groupId);
        if (!group) return;
        
        const cards = group.querySelectorAll('.option-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selected from siblings
                cards.forEach(c => c.classList.remove('selected'));
                // Add selected to clicked card
                this.classList.add('selected');
                
                // Store selection
                const value = this.getAttribute('data-value');
                if (groupId === 'personaOptions') {
                    userData.persona = value;
                    if (window.Analytics) Analytics.trackPersonaSelected(value);
                }
                if (groupId === 'toneOptions') {
                    userData.tone = value;
                    if (window.Analytics) Analytics.trackToneSelected(value);
                }
                if (groupId === 'goalOptions') {
                    userData.goal = value;
                    if (window.Analytics) Analytics.trackGoalSelected(value);
                }
            });
        });
    });
}

// Navigation functions
function nextStep(step) {
    // Validate current step
    if (step === 2) {
        if (!validateStep1()) {
            // Scroll to validation messages
            const validationDiv = document.getElementById('validationMessages');
            if (validationDiv) {
                validationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
    }
    
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
    
    // Show target step
    document.getElementById('step' + step).classList.add('active');
    document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
    
    currentStep = step;
    window.scrollTo(0, 0);
}

function prevStep(step) {
    nextStep(step);
}

// Input method selection
function selectInputMethod(method) {
    inputMethod = method;
    
    // Hide all input sections
    document.getElementById('textInput').style.display = 'none';
    document.getElementById('linkInput').style.display = 'none';
    document.getElementById('imageInput').style.display = 'none';
    document.getElementById('pdfInput').style.display = 'none';
    
    // Remove selected class from all method cards
    document.querySelectorAll('[data-method]').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Show selected input section
    document.getElementById(method + 'Input').style.display = 'block';
    document.querySelector(`[data-method="${method}"]`).classList.add('selected');
    
    // Clear validation messages
    document.getElementById('validationMessages').innerHTML = '';
    
    // Track analytics
    if (window.Analytics) {
        Analytics.trackInputMethod(method);
    }
}

// Handle file uploads
function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    uploadedFile = file;
    const previewDiv = document.getElementById(type + 'Preview');
    
    if (type === 'image') {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewDiv.innerHTML = `
                <div class="file-preview">
                    <img src="${e.target.result}" style="max-width: 100%; border-radius: 8px;">
                    <p style="margin-top: 10px; color: #5a6c7d; font-weight: bold;">✓ Image uploaded successfully</p>
                    <p style="color: #666; font-size: 0.9em;">Our AI will analyze this screenshot to extract your profile information</p>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    } else if (type === 'pdf') {
        previewDiv.innerHTML = `
            <div class="file-preview">
                <div style="font-size: 3em; text-align: center;">📄</div>
                <p style="margin-top: 10px; color: #5a6c7d; font-weight: bold;">✓ ${file.name}</p>
                <p style="color: #666; font-size: 0.9em;">PDF uploaded successfully. Our AI will extract your profile information.</p>
            </div>
        `;
    }
}

// Validation with detailed feedback
function validateStep1() {
    const platform = document.getElementById('platform').value;
    const validationDiv = document.getElementById('validationMessages');
    let errors = [];
    let warnings = [];
    
    // Check platform
    if (!platform) {
        errors.push('Please select a platform (LinkedIn, Facebook, Instagram, or Twitter/X)');
    }
    
    // Check input method
    if (!inputMethod) {
        errors.push('Please select how you want to provide your profile (Text, Link, Image, or PDF)');
    } else {
        // Validate based on input method
        if (inputMethod === 'text') {
            const bio = document.getElementById('currentBio').value;
            if (!bio.trim()) {
                errors.push('Please paste your current bio or about text');
            } else if (bio.trim().length < 20) {
                warnings.push('Your bio seems short. Add more details for better optimization.');
            }
            
            const headline = document.getElementById('currentHeadline').value;
            if (!headline.trim()) {
                warnings.push('Consider adding your current headline for more accurate optimization');
            }
        } else if (inputMethod === 'link') {
            const link = document.getElementById('profileLink').value;
            if (!link.trim()) {
                errors.push('Please enter your profile link or username');
            } else if (!link.includes('http') && !link.includes('@')) {
                warnings.push('Make sure your link is complete (e.g., https://linkedin.com/in/yourname)');
            }
        } else if (inputMethod === 'image' || inputMethod === 'pdf') {
            if (!uploadedFile) {
                errors.push(`Please upload a ${inputMethod === 'image' ? 'screenshot' : 'PDF'} of your profile`);
            }
        }
    }
    
    // Display validation messages
    if (errors.length > 0 || warnings.length > 0) {
        let html = '';
        
        if (errors.length > 0) {
            html += '<div class="validation-error" style="background: #fee; border: 3px solid #e74c3c; padding: 20px; margin: 20px 0; border-radius: 10px; font-size: 1.1em;">';
            html += '<strong style="color: #e74c3c; font-size: 1.3em;">⚠️ Cannot Proceed - Missing Information:</strong><ul style="margin: 15px 0 0 30px; line-height: 1.8;">';
            errors.forEach(err => html += `<li style="color: #c0392b; font-weight: 600;">${err}</li>`);
            html += '</ul></div>';
        }
        
        if (warnings.length > 0) {
            html += '<div class="validation-error" style="background: #e7f3ff; border: 2px solid #2196F3; padding: 15px; margin: 15px 0; border-radius: 8px;">';
            html += '<strong style="color: #0c5460;">💡 Suggestions:</strong><ul style="margin: 10px 0 0 20px;">';
            warnings.forEach(warn => html += `<li>${warn}</li>`);
            html += '</ul></div>';
        }
        
        validationDiv.innerHTML = html;
        validationDiv.style.display = 'block';
        
        if (errors.length > 0) {
            // Scroll to top of validation messages
            validationDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Also show alert for extra visibility
            alert('⚠️ Please fill in all required information before proceeding.\n\nScroll up to see what\'s missing.');
            return false;
        }
    } else {
        validationDiv.innerHTML = '<div class="validation-success" style="background: #d4edda; border: 2px solid #28a745; padding: 15px; margin: 15px 0; border-radius: 8px;"><strong style="color: #155724;">✓ All information provided!</strong> Ready to proceed.</div>';
        validationDiv.style.display = 'block';
    }
    
    // Store data in userData AND localStorage (so it persists if user refreshes)
    userData.platform = platform;
    userData.inputMethod = inputMethod;
    
    if (inputMethod === 'text') {
        userData.currentBio = document.getElementById('currentBio').value;
        userData.currentHeadline = document.getElementById('currentHeadline').value;
    } else if (inputMethod === 'link') {
        userData.profileLink = document.getElementById('profileLink').value;
        // In production, you'd fetch profile data from the link
        userData.currentBio = `Profile from: ${userData.profileLink}`;
    } else if (inputMethod === 'image' || inputMethod === 'pdf') {
        userData.uploadedFile = uploadedFile.name;
        // In production, you'd use OCR/PDF parsing to extract text
        userData.currentBio = `Extracted from ${inputMethod}: ${uploadedFile.name}`;
    }
    
    // Save to localStorage so data persists across page navigation
    try {
        localStorage.setItem('spoUserData', JSON.stringify(userData));
        console.log('✓ User data saved to localStorage');
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
    
    // Track analytics
    if (window.Analytics) {
        Analytics.trackPlatformSelected(platform);
        Analytics.trackStepCompleted(1, 'Input Information');
    }
    
    return true;
}

function validateStep2() {
    if (!userData.persona) {
        alert('Please select a persona');
        return false;
    }
    if (!userData.tone) {
        alert('Please select a tone/style');
        return false;
    }
    if (!userData.goal) {
        alert('Please select your primary goal');
        return false;
    }
    
    userData.keywords = document.getElementById('keywords').value || 'professional development';
    return true;
}

// Generate preview
async function generatePreview() {
    if (!validateStep2()) return;
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'aiLoading';
    loadingDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center;">
            <div style="background: white; padding: 40px; border-radius: 20px; text-align: center; max-width: 400px;">
                <div style="font-size: 3em; margin-bottom: 20px;">🤖</div>
                <h2 style="margin-bottom: 15px;">AI is Optimizing Your Profile...</h2>
                <p style="color: #666; margin-bottom: 20px;">Using Gemini AI to generate personalized suggestions</p>
                <div style="width: 100%; height: 4px; background: #f0f0f0; border-radius: 2px; overflow: hidden;">
                    <div style="width: 0%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); animation: loading 2s ease-in-out infinite;"></div>
                </div>
            </div>
        </div>
        <style>
            @keyframes loading {
                0% { width: 0%; }
                50% { width: 70%; }
                100% { width: 100%; }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);
    
    try {
        // Generate optimized profile using REAL AI
        generatedProfile = await AIEngine.generate(userData);
        
        // Remove loading indicator
        document.body.removeChild(loadingDiv);
        
        // Display preview (blurred)
        displayPreview(true);
        
        // Track analytics
        if (window.Analytics) {
            Analytics.trackCombination(userData.platform, userData.persona, userData.tone, userData.goal);
            Analytics.trackPreviewGenerated(userData);
            Analytics.trackStepCompleted(2, 'Customization');
        }
        
        // Move to step 3
        nextStep(3);
        
    } catch (error) {
        // Remove loading indicator
        if (document.getElementById('aiLoading')) {
            document.body.removeChild(loadingDiv);
        }
        
        alert('⚠️ AI generation failed. Please try again.\n\nError: ' + error.message);
        console.error('AI generation error:', error);
    }
}

// Display preview or full content
function displayPreview(isBlurred) {
    const container = isBlurred ? document.getElementById('previewContent') : document.getElementById('fullContent');
    const blurClass = isBlurred ? 'blur-overlay' : '';
    
    let html = '';
    
    // Headline/Bio
    html += `
        <div class="output-section ${blurClass}">
            <h3>📝 ${userData.platform === 'linkedin' ? 'Optimized Headline' : 'Optimized Bio'}</h3>
            <div class="output-text">${generatedProfile.headline}</div>
            ${!isBlurred ? '<button class="copy-btn" onclick="copyToClipboard(\'' + generatedProfile.headline.replace(/'/g, "\\'") + '\')">📋 Copy</button>' : ''}
        </div>
    `;
    
    // About section (if available)
    if (generatedProfile.about) {
        html += `
            <div class="output-section ${blurClass}">
                <h3>📄 Optimized About Section</h3>
                <div class="output-text" style="white-space: pre-line;">${generatedProfile.about}</div>
                ${!isBlurred ? '<button class="copy-btn" onclick="copyToClipboard(\'' + generatedProfile.about.replace(/'/g, "\\'").replace(/\n/g, '\\n') + '\')">📋 Copy</button>' : ''}
            </div>
        `;
    }
    
    // Content Ideas
    html += `
        <div class="output-section ${blurClass}">
            <h3>💡 Content Ideas</h3>
            <div class="output-text">
                <ul style="margin-left: 20px;">
                    ${generatedProfile.contentIdeas.map(idea => '<li>' + idea + '</li>').join('')}
                </ul>
            </div>
            ${!isBlurred ? '<button class="copy-btn" onclick="copyToClipboard(\'' + generatedProfile.contentIdeas.join('\\n').replace(/'/g, "\\'") + '\')">📋 Copy All</button>' : ''}
        </div>
    `;
    
    // Keywords or Hashtags
    if (generatedProfile.keywords && generatedProfile.keywords.length > 0) {
        html += `
            <div class="output-section ${blurClass}">
                <h3>🔑 Recommended Keywords</h3>
                <div class="output-text">${generatedProfile.keywords.join(' • ')}</div>
                ${!isBlurred ? '<button class="copy-btn" onclick="copyToClipboard(\'' + generatedProfile.keywords.join(', ').replace(/'/g, "\\'") + '\')">📋 Copy</button>' : ''}
            </div>
        `;
    }
    
    if (generatedProfile.hashtags && generatedProfile.hashtags.length > 0) {
        html += `
            <div class="output-section ${blurClass}">
                <h3>#️⃣ Recommended Hashtags</h3>
                <div class="output-text">${generatedProfile.hashtags.join(' ')}</div>
                ${!isBlurred ? '<button class="copy-btn" onclick="copyToClipboard(\'' + generatedProfile.hashtags.join(' ').replace(/'/g, "\\'") + '\')">📋 Copy</button>' : ''}
            </div>
        `;
    }
    
    // Add watermark branding (only on unlocked version)
    if (!isBlurred) {
        html += `
            <div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%); border-radius: 15px; color: white;">
                <div style="font-size: 1.2em; margin-bottom: 10px;">✨ Optimized by</div>
                <div style="font-size: 2em; font-weight: bold; margin-bottom: 10px;">Social Profile Optimizer AI</div>
                <div style="font-size: 0.9em; opacity: 0.9; margin-bottom: 15px;">AI-Powered Profile Optimization • Only ₹11</div>
                <div style="font-size: 0.85em; opacity: 0.8;">Get yours at: <a href="social-optimizer-index.html" style="color: white; text-decoration: underline;">ProfileOptimizer.com</a></div>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

// Copy to clipboard
function copyToClipboard(text) {
    // Decode escaped characters
    text = text.replace(/\\n/g, '\n').replace(/\\'/g, "'");
    
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Copied to clipboard!');
        if (window.Analytics) Analytics.trackCopyToClipboard('profile_content');
    }).catch(err => {
        console.error('Copy failed:', err);
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ Copied to clipboard!');
        if (window.Analytics) Analytics.trackCopyToClipboard('profile_content');
    });
}

// AUTOMATIC PAYMENT PROCESSING - No manual confirmation needed!
// Customer pays → Profile unlocks instantly → No waiting!

function processPayment() {
    // STEP 1: Replace with your Stripe Publishable Key from https://dashboard.stripe.com/apikeys
    const STRIPE_KEY = 'pk_test_DEMO_KEY'; // ⚠️ CHANGE THIS TO YOUR KEY!
    
    // For testing without Stripe account, use demo mode
    if (STRIPE_KEY === 'pk_test_DEMO_KEY') {
        alert('⚡ DEMO MODE\n\nThis will simulate instant payment.\n\nIn production:\n1. Sign up at stripe.com (FREE)\n2. Get your Publishable Key\n3. Replace STRIPE_KEY in code\n\nStripe = Global trust + Lower fees!\nUsed by Amazon, Google, Shopify');
        simulatePayment();
        return;
    }
    
    // STEP 2: Check if Stripe is loaded
    if (typeof Stripe === 'undefined') {
        alert('⚠️ Payment gateway not loaded.\n\nMake sure Stripe script is included in HTML.\n\nUsing demo mode for now...');
        simulatePayment();
        return;
    }
    
    // STEP 3: Get user's currency and pricing
    const pricing = window.currentPricing || window.CurrencyDetector.getCurrentPricing();
    const displayPrice = window.CurrencyDetector.formatPrice(pricing);
    
    console.log('Processing payment:', pricing.currency, displayPrice);
    
    // STEP 4: Initialize Stripe
    const stripe = Stripe(STRIPE_KEY);
    
    // Show processing message
    showProcessingMessage('Redirecting to secure payment...');
    
    // STEP 5: Create Stripe Checkout Session
    // Note: In production, you'll need a backend endpoint to create the session
    // For now, we'll use Stripe Payment Links (no backend needed!)
    
    // Option A: Use Stripe Payment Links (Easiest - No Backend!)
    // 1. Create payment link in Stripe Dashboard
    // 2. Replace URL below with your payment link
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_XXXXXXXX'; // ⚠️ Replace with your link
    
    if (STRIPE_PAYMENT_LINK === 'https://buy.stripe.com/test_XXXXXXXX') {
        // Demo mode - simulate payment
        console.log('Demo mode: No payment link configured');
        setTimeout(() => {
            const overlay = document.getElementById('processingOverlay');
            if (overlay) overlay.remove();
            simulatePayment();
        }, 1000);
        return;
    }
    
    // Store user data for after payment
    sessionStorage.setItem('pendingOptimization', JSON.stringify({
        userData: userData,
        generatedProfile: generatedProfile,
        timestamp: Date.now()
    }));
    
    // Redirect to Stripe Payment Link
    window.location.href = STRIPE_PAYMENT_LINK + '?client_reference_id=' + Date.now();
    
    // Option B: Use Stripe Checkout with Backend (Advanced)
    // Uncomment this if you have a backend server:
    /*
    fetch('YOUR_BACKEND_URL/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: pricing.amount,
            currency: pricing.currency,
            metadata: {
                platform: userData.platform,
                persona: userData.persona,
                tone: userData.tone,
                goal: userData.goal
            }
        })
    })
    .then(res => res.json())
    .then(session => {
        return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(result => {
        if (result.error) {
            alert('❌ Payment Error\n\n' + result.error.message);
        }
    })
    .catch(error => {
        console.error('Payment error:', error);
        alert('❌ Payment Failed\n\nPlease try again or contact support: onestepforthelife@gmail.com');
    });
    */
}

// Show processing message during unlock
function showProcessingMessage(message = 'Unlocking your optimized profile...') {
    const overlay = document.createElement('div');
    overlay.id = 'processingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(102, 126, 234, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-size: 1.5em;
        text-align: center;
        padding: 20px;
    `;
    overlay.innerHTML = `
        <div>
            <div style="font-size: 4em; margin-bottom: 20px;">✅</div>
            <div style="font-size: 1.5em; font-weight: bold; margin-bottom: 10px;">Payment Successful!</div>
            <div style="font-size: 1em; opacity: 0.9;">${message}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Remove after showing success
    setTimeout(() => {
        const el = document.getElementById('processingOverlay');
        if (el) el.remove();
    }, 2000);
}

// Log payment for admin records
function logPayment(paymentId) {
    const paymentLog = JSON.parse(localStorage.getItem('paymentLog') || '[]');
    
    paymentLog.unshift({
        paymentId: paymentId,
        amount: 999,
        platform: userData.platform,
        persona: userData.persona,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    });
    
    // Keep last 100 payments
    if (paymentLog.length > 100) paymentLog.pop();
    
    localStorage.setItem('paymentLog', JSON.stringify(paymentLog));
    console.log('Payment logged:', paymentId);
}

// Notify admin of new payment (optional)
function notifyAdmin(paymentId) {
    // In production, you can send this to your backend or email service
    console.log('Admin notification:', {
        paymentId: paymentId,
        platform: userData.platform,
        amount: '₹999',
        time: new Date().toLocaleString()
    });
    
    // Optional: Send email via backend API
    // fetch('/api/notify-payment', {
    //     method: 'POST',
    //     body: JSON.stringify({ paymentId, userData })
    // });
}

// Simulate payment for demo/testing
function simulatePayment() {
    if (confirm('Demo Mode: Simulate successful payment?\n\nIn production, this will use real Razorpay payment.')) {
        setTimeout(() => {
            isPaid = true;
            showSuccess();
        }, 1000);
    }
}

// Send payment confirmation
function sendPaymentConfirmation(paymentId) {
    // In production, send this to your backend
    console.log('Payment confirmed:', paymentId);
    
    // Optional: Send email notification
    const subject = 'Payment Successful - Social Profile Optimizer';
    const body = `Payment ID: ${paymentId}\nPlatform: ${userData.platform}\nAmount: ₹999`;
    
    // You can integrate with email service here
}

// Show success and unlock content
function showSuccess() {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.progress-step').forEach(s => s.classList.remove('active'));
    
    // Show success
    document.getElementById('stepSuccess').classList.add('active');
    
    // Display full unlocked content
    displayPreview(false);
    
    // Save to localStorage for dashboard
    saveToHistory();
    
    window.scrollTo(0, 0);
}

// Save optimization to history
function saveToHistory() {
    const history = JSON.parse(localStorage.getItem('optimizationHistory') || '[]');
    
    const record = {
        id: Date.now(),
        date: new Date().toISOString(),
        platform: userData.platform,
        persona: userData.persona,
        tone: userData.tone,
        goal: userData.goal,
        profile: generatedProfile
    };
    
    history.unshift(record);
    
    // Keep only last 10
    if (history.length > 10) history.pop();
    
    localStorage.setItem('optimizationHistory', JSON.stringify(history));
}

// Download profile as text file
function downloadProfile() {
    let content = `OPTIMIZED SOCIAL MEDIA PROFILE\n`;
    content += `Platform: ${userData.platform.toUpperCase()}\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `\n${'='.repeat(50)}\n\n`;
    
    content += `HEADLINE/BIO:\n${generatedProfile.headline}\n\n`;
    
    if (generatedProfile.about) {
        content += `ABOUT SECTION:\n${generatedProfile.about}\n\n`;
    }
    
    content += `CONTENT IDEAS:\n`;
    generatedProfile.contentIdeas.forEach((idea, i) => {
        content += `${i + 1}. ${idea}\n`;
    });
    content += `\n`;
    
    if (generatedProfile.keywords && generatedProfile.keywords.length > 0) {
        content += `KEYWORDS:\n${generatedProfile.keywords.join(', ')}\n\n`;
    }
    
    if (generatedProfile.hashtags && generatedProfile.hashtags.length > 0) {
        content += `HASHTAGS:\n${generatedProfile.hashtags.join(' ')}\n\n`;
    }
    
    // Add watermark branding
    content += `\n${'='.repeat(50)}\n`;
    content += `✨ Optimized by Social Profile Optimizer AI\n`;
    content += `AI-Powered Profile Optimization • Only ₹21\n`;
    content += `Get yours at: ProfileOptimizer.com\n`;
    content += `Email: onestepforthelife@gmail.com\n`;
    content += `${'='.repeat(50)}\n`;
    
    // Create download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized-profile-${userData.platform}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Track analytics
    if (window.Analytics) {
        Analytics.trackProfileDownloaded(userData);
    }
}


// Developer Mode
function checkDevModePrompt() {
    // Show dev mode prompt after 30 seconds or on certain actions
    setTimeout(() => {
        const prompt = document.getElementById('devModePrompt');
        if (prompt) prompt.style.display = 'block';
    }, 30000);
}

function showDevMode() {
    const devInfo = `
🔧 DEVELOPER MODE ACTIVATED

📧 Contact Email: onestepforthelife@gmail.com

🛠️ TECHNICAL DETAILS:

FILES STRUCTURE:
- social-optimizer-index.html (Landing page)
- social-optimizer-app.html (Main wizard)
- social-optimizer-dashboard.html (User dashboard)
- social-optimizer-admin.html (Admin panel)
- social-optimizer-ai-engine.js (AI templates)
- social-optimizer-app.js (App logic)

PAYMENT INTEGRATION:
Current: Demo mode (simulated)
Production: Add Stripe/Razorpay/PayPal

To integrate Stripe:
1. Get API keys from stripe.com
2. Add <script src="https://js.stripe.com/v3/"></script>
3. Update processPayment() function with real Stripe code
4. Set up webhook for payment confirmation

FILE UPLOAD PROCESSING:
- Images: Use OCR API (Google Vision, AWS Textract)
- PDFs: Use PDF.js or server-side parsing
- Links: Use web scraping or platform APIs

DEPLOYMENT:
1. Upload to Cloudflare Pages
2. No build process needed
3. Configure custom domain
4. Set environment variables for API keys

DATABASE (Optional):
- Current: LocalStorage (client-side)
- Production: Firebase, Supabase, or custom backend

Need help? Email: onestepforthelife@gmail.com

Press OK to continue in user mode.
    `;
    
    alert(devInfo);
    document.getElementById('devModePrompt').style.display = 'none';
}

// Email integration for support
function sendSupportEmail(subject, body) {
    const email = 'onestepforthelife@gmail.com';
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Add support button functionality
function showSupport() {
    const message = `
Need help with Social Profile Optimizer AI?

📧 Email: onestepforthelife@gmail.com

Common Questions:
- How to upload my profile?
- Payment not working?
- Need custom optimization?
- Technical support?

Click OK to send an email.
    `;
    
    if (confirm(message)) {
        sendSupportEmail(
            'Support Request - Social Profile Optimizer',
            'Hi,\n\nI need help with:\n\n[Describe your issue here]\n\nPlatform: ' + (userData.platform || 'Not selected') + '\n\nThank you!'
        );
    }
}

// Content filter for inappropriate words
function containsInappropriateContent(text) {
    // List of prohibited words/patterns (basic filter)
    const prohibitedWords = [
        'fuck', 'shit', 'bitch', 'asshole', 'damn', 'crap', 'bastard',
        'sex', 'porn', 'xxx', 'nude', 'naked', 'viagra', 'casino',
        'scam', 'fraud', 'hack', 'crack', 'pirate', 'illegal',
        'drug', 'cocaine', 'heroin', 'marijuana', 'weed',
        'kill', 'murder', 'suicide', 'bomb', 'terrorist', 'weapon',
        'hate', 'racist', 'nazi', 'hitler'
    ];
    
    const lowerText = text.toLowerCase();
    
    // Check for prohibited words
    for (let word of prohibitedWords) {
        if (lowerText.includes(word)) {
            return true;
        }
    }
    
    // Check for excessive caps (spam indicator)
    const capsCount = (text.match(/[A-Z]/g) || []).length;
    if (capsCount > text.length * 0.7 && text.length > 20) {
        return true;
    }
    
    // Check for excessive special characters (spam indicator)
    const specialCount = (text.match(/[!@#$%^&*()]/g) || []).length;
    if (specialCount > text.length * 0.3) {
        return true;
    }
    
    return false;
}

// Submit user feedback
function submitFeedback() {
    const feedbackText = document.getElementById('userFeedback').value.trim();
    const warningDiv = document.getElementById('feedbackWarning');
    const successDiv = document.getElementById('feedbackSuccess');
    
    // Reset messages
    warningDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    // Check if empty
    if (!feedbackText) {
        alert('💡 Feedback is optional, but if you want to share, please write something!');
        return;
    }
    
    // Check length
    if (feedbackText.length < 10) {
        alert('💡 Please provide more detailed feedback (at least 10 characters).');
        return;
    }
    
    if (feedbackText.length > 1000) {
        alert('💡 Feedback is too long. Please keep it under 1000 characters.');
        return;
    }
    
    // Check for inappropriate content
    if (containsInappropriateContent(feedbackText)) {
        warningDiv.style.display = 'block';
        warningDiv.textContent = '⚠️ Please keep your feedback professional and appropriate. Inappropriate content detected.';
        return;
    }
    
    // Store feedback
    const feedback = {
        id: Date.now(),
        date: new Date().toISOString(),
        platform: userData.platform,
        persona: userData.persona,
        tone: userData.tone,
        goal: userData.goal,
        feedback: feedbackText,
        rating: null // Can add star rating later
    };
    
    // Save to localStorage
    const allFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
    allFeedback.unshift(feedback);
    
    // Keep only last 100 feedbacks
    if (allFeedback.length > 100) allFeedback.pop();
    
    localStorage.setItem('userFeedback', JSON.stringify(allFeedback));
    
    // Send to admin email (optional - can be implemented with backend)
    console.log('Feedback submitted:', feedback);
    
    // Optional: Send email notification
    // In production, you can send this to your backend API
    /*
    fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback)
    });
    */
    
    // Show success message
    successDiv.style.display = 'block';
    successDiv.textContent = '✅ Thank you for your feedback! We appreciate your input.';
    
    // Clear textarea
    document.getElementById('userFeedback').value = '';
    
    // Track analytics
    if (window.Analytics) {
        Analytics.trackFeedbackSubmitted(feedbackText.length, userData);
    }
    
    // Optional: Send email with feedback
    // sendFeedbackEmail(feedback);
}

// Optional: Send feedback via email
function sendFeedbackEmail(feedback) {
    const subject = 'User Feedback - Social Profile Optimizer';
    const body = `
New Feedback Received:

Platform: ${feedback.platform}
Persona: ${feedback.persona}
Tone: ${feedback.tone}
Goal: ${feedback.goal}
Date: ${new Date(feedback.date).toLocaleString()}

Feedback:
${feedback.feedback}

---
Feedback ID: ${feedback.id}
    `;
    
    // This would open user's email client
    // In production, use a backend service to send emails
    console.log('Feedback email:', { subject, body });
}

