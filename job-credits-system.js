/* Job Search Tool - Time-Based Credit System */

const CREDIT_PACKAGES = {
    starter: { seconds: 1000, price: 299, name: "Starter Pack" },
    pro: { seconds: 4000, price: 999, name: "Pro Pack" },
    unlimited: { seconds: 10000, price: 2199, name: "Unlimited Pack" }
};

class CreditSystem {
    constructor() {
        this.timerInterval = null;
        this.startTime = null;
        this.isActive = false;
        this.loadCredits();
    }

    // Load credits from localStorage
    loadCredits() {
        const stored = localStorage.getItem('jobToolCredits');
        if (stored) {
            const data = JSON.parse(stored);
            this.remainingSeconds = data.remainingSeconds || 0;
            this.totalPurchased = data.totalPurchased || 0;
            this.lastUsed = data.lastUsed || null;
        } else {
            this.remainingSeconds = 0;
            this.totalPurchased = 0;
            this.lastUsed = null;
        }
    }

    // Save credits to localStorage
    saveCredits() {
        localStorage.setItem('jobToolCredits', JSON.stringify({
            remainingSeconds: this.remainingSeconds,
            totalPurchased: this.totalPurchased,
            lastUsed: new Date().toISOString()
        }));
    }

    // Add credits after purchase
    addCredits(seconds) {
        this.remainingSeconds += seconds;
        this.totalPurchased += seconds;
        this.saveCredits();
        this.updateDisplay();
    }

    // Start timer
    startTimer() {
        if (this.remainingSeconds <= 0) {
            this.showBuyCreditsModal();
            return false;
        }

        if (!this.isActive) {
            this.isActive = true;
            this.startTime = Date.now();
            
            this.timerInterval = setInterval(() => {
                if (this.remainingSeconds > 0) {
                    this.remainingSeconds--;
                    this.saveCredits();
                    this.updateDisplay();
                    
                    if (this.remainingSeconds <= 0) {
                        this.stopTimer();
                        this.showBuyCreditsModal();
                    }
                }
            }, 1000);
        }
        return true;
    }

    // Stop timer
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
            this.isActive = false;
        }
    }

    // Format seconds to readable time
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${mins}m ${secs}s`;
        } else if (mins > 0) {
            return `${mins}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }

    // Update display
    updateDisplay() {
        const display = document.getElementById('creditDisplay');
        const timeLeft = document.getElementById('timeLeft');
        
        if (display) {
            display.textContent = this.formatTime(this.remainingSeconds);
            
            // Color coding
            if (this.remainingSeconds < 300) { // Less than 5 mins
                display.style.color = '#dc3545';
            } else if (this.remainingSeconds < 1800) { // Less than 30 mins
                display.style.color = '#ffc107';
            } else {
                display.style.color = '#28a745';
            }
        }
        
        if (timeLeft) {
            timeLeft.textContent = this.formatTime(this.remainingSeconds);
        }
    }

    // Show buy credits modal
    showBuyCreditsModal() {
        const modal = document.getElementById('buyCreditsModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // Hide buy credits modal
    hideBuyCreditsModal() {
        const modal = document.getElementById('buyCreditsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Check for passcode
    checkPasscode() {
        const passcode = prompt('🔑 Enter passcode (or click Cancel to pay):');
        if (passcode && passcode.toLowerCase() === 'guruji') {
            return true;
        }
        return false;
    }

    // Initiate Razorpay payment
    buyCredits(packageKey) {
        const pkg = CREDIT_PACKAGES[packageKey];
        
        // Check for passcode first
        if (this.checkPasscode()) {
            this.addCredits(pkg.seconds);
            this.hideBuyCreditsModal();
            this.showSuccessMessage(`✅ ${pkg.name} activated FREE with passcode! ${this.formatTime(pkg.seconds)} added.`);
            if (!this.isActive) {
                this.startTimer();
            }
            return;
        }
        
        const options = {
            key: 'rzp_test_YOUR_KEY_HERE', // Replace with actual Razorpay key
            amount: pkg.price * 100, // Amount in paise
            currency: 'INR',
            name: 'Job Search Tool Credits',
            description: `${pkg.name} - ${this.formatTime(pkg.seconds)}`,
            image: 'images/logo.png',
            handler: (response) => {
                // Payment successful
                this.addCredits(pkg.seconds);
                this.hideBuyCreditsModal();
                this.showSuccessMessage(`✅ ${pkg.name} activated! ${this.formatTime(pkg.seconds)} added.`);
                
                // Auto-start timer if not running
                if (!this.isActive) {
                    this.startTimer();
                }
            },
            prefill: {
                email: '',
                contact: ''
            },
            theme: {
                color: '#5a6c7d'
            },
            modal: {
                ondismiss: () => {
                    console.log('Payment cancelled');
                }
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    }

    // Show success message
    showSuccessMessage(msg) {
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 600;
        `;
        msgDiv.textContent = msg;
        document.body.appendChild(msgDiv);
        
        setTimeout(() => {
            msgDiv.remove();
        }, 5000);
    }
}

// Initialize credit system
const creditSystem = new CreditSystem();

// Auto-pause when tab hidden
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        creditSystem.stopTimer();
    } else {
        if (creditSystem.remainingSeconds > 0) {
            creditSystem.startTimer();
        }
    }
});

// Stop timer on page unload
window.addEventListener('beforeunload', () => {
    creditSystem.stopTimer();
});

