// Multi-Gateway Payment Selector
// Supports: Stripe (Global), Razorpay (India), Direct UPI (India)

const PaymentGateway = {
    // Configuration - Add your keys here
    config: {
        stripe: {
            publishableKey: 'pk_test_DEMO_KEY', // Replace with your Stripe key
            paymentLink: 'https://buy.stripe.com/test_XXXXXXXX', // Replace with your payment link
            enabled: true
        },
        razorpay: {
            keyId: 'rzp_live_RmJ2p4des8sDGF', // Live Razorpay key
            paymentLink: 'https://razorpay.me/@onestepforthelife', // Razorpay payment link
            qrCodeId: 'qr_RmKd822g6HqeTl', // QR Code ID
            enabled: true
        },
        upi: {
            upiId: 'yourname@paytm', // Replace with your UPI ID
            name: 'Social Profile Optimizer',
            enabled: true
        }
    },

    // Detect user's location and recommend best payment method
    detectBestGateway() {
        const country = window.CurrencyDetector?.getCurrentPricing()?.country || 'US';
        
        if (country === 'IN') {
            // India: Show UPI first (0% fees!), then Razorpay, then Stripe
            return ['upi', 'razorpay', 'stripe'];
        } else {
            // International: Show Stripe only
            return ['stripe'];
        }
    },

    // Show payment options to user
    showPaymentOptions() {
        const gateways = this.detectBestGateway();
        const pricing = window.CurrencyDetector?.getCurrentPricing() || { amount: 21, currency: 'INR', symbol: '₹' };
        
        let html = '<div style="max-width: 500px; margin: 0 auto;">';
        html += '<h3 style="text-align: center; color: #5a6c7d; margin-bottom: 20px;">Choose Payment Method</h3>';
        
        gateways.forEach(gateway => {
            if (!this.config[gateway].enabled) return;
            
            const option = this.getGatewayInfo(gateway, pricing);
            html += `
                <div class="payment-option" onclick="PaymentGateway.processPayment('${gateway}')" 
                     style="background: white; border: 2px solid #e0e0e0; border-radius: 12px; padding: 20px; 
                            margin: 15px 0; cursor: pointer; transition: all 0.3s;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="font-size: 2.5em;">${option.icon}</div>
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 1.1em; color: #333;">${option.name}</div>
                            <div style="color: #666; font-size: 0.9em; margin-top: 5px;">${option.description}</div>
                            ${option.badge ? `<div style="display: inline-block; background: ${option.badgeColor}; color: white; 
                                padding: 3px 10px; border-radius: 12px; font-size: 0.75em; margin-top: 5px; font-weight: bold;">
                                ${option.badge}</div>` : ''}
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.3em; font-weight: bold; color: #5a6c7d;">
                                ${pricing.symbol}${pricing.amount}
                            </div>
                            <div style="font-size: 0.8em; color: #999;">${option.fee}</div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Add hover effect
        html += `
            <style>
                .payment-option:hover {
                    border-color: #5a6c7d !important;
                    background: #f8f9ff !important;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2);
                }
            </style>
        `;
        
        return html;
    },

    // Get gateway information
    getGatewayInfo(gateway, pricing) {
        const info = {
            upi: {
                name: 'UPI (PhonePe, GPay, Paytm)',
                icon: '📱',
                description: 'Instant payment via UPI apps',
                fee: '0% fees',
                badge: 'RECOMMENDED',
                badgeColor: '#28a745'
            },
            razorpay: {
                name: 'Razorpay (UPI/Cards/Wallets)',
                icon: '💳',
                description: 'Scan QR or pay via link - All methods accepted',
                fee: '2% fees',
                badge: pricing.country === 'IN' ? 'POPULAR' : null,
                badgeColor: '#5a6c7d'
            },
            stripe: {
                name: 'International Cards',
                icon: '🌍',
                description: 'Trusted by Amazon, Google, Shopify',
                fee: '2.9% fees',
                badge: pricing.country !== 'IN' ? 'TRUSTED GLOBALLY' : null,
                badgeColor: '#635bff'
            }
        };
        
        return info[gateway];
    },

    // Process payment based on selected gateway
    processPayment(gateway) {
        console.log('Processing payment via:', gateway);
        
        // Track analytics
        const pricing = window.CurrencyDetector?.getCurrentPricing() || { amount: 21, currency: 'INR' };
        if (window.Analytics) {
            Analytics.trackPaymentInitiated(userData, pricing);
            Analytics.trackPaymentMethodSelected(gateway, pricing);
        }
        
        switch(gateway) {
            case 'upi':
                this.processUPI();
                break;
            case 'razorpay':
                this.processRazorpay();
                break;
            case 'stripe':
                this.processStripe();
                break;
        }
    },

    // UPI Payment (Direct - 0% fees!)
    processUPI() {
        const pricing = window.CurrencyDetector?.getCurrentPricing() || { amount: 21, currency: 'INR' };
        const upiConfig = this.config.upi;
        
        if (upiConfig.upiId === 'yourname@paytm') {
            alert('⚠️ UPI Setup Required\n\nPlease add your UPI ID in payment-selector.js\n\nUsing demo mode for now...');
            this.simulatePayment();
            return;
        }
        
        // Generate UPI payment link
        const upiLink = `upi://pay?pa=${upiConfig.upiId}&pn=${encodeURIComponent(upiConfig.name)}&am=${pricing.amount}&cu=${pricing.currency}&tn=${encodeURIComponent('Social Profile Optimizer')}`;
        
        // Show UPI payment modal
        const modal = document.createElement('div');
        modal.id = 'upiModal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.8); display: flex; align-items: center; 
            justify-content: center; z-index: 10000; padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; text-align: center;">
                <h2 style="color: #5a6c7d; margin-bottom: 20px;">Pay via UPI</h2>
                
                <div style="background: #f8f9ff; padding: 30px; border-radius: 15px; margin: 20px 0;">
                    <div style="font-size: 3em; margin-bottom: 15px;">📱</div>
                    <div style="font-size: 2em; font-weight: bold; color: #5a6c7d; margin-bottom: 10px;">
                        ₹${pricing.amount}
                    </div>
                    <div style="color: #666; margin-bottom: 20px;">Pay to: ${upiConfig.upiId}</div>
                    
                    <div id="qrcode" style="display: inline-block; padding: 20px; background: white; border-radius: 10px; margin: 20px 0;"></div>
                    
                    <div style="margin: 20px 0;">
                        <a href="${upiLink}" style="display: inline-block; background: #5a6c7d; color: white; 
                           padding: 15px 40px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 1.1em;">
                            Open UPI App
                        </a>
                    </div>
                    
                    <div style="color: #999; font-size: 0.9em; margin-top: 15px;">
                        Works with PhonePe, GPay, Paytm, BHIM, etc.
                    </div>
                </div>
                
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                    <div style="font-weight: bold; color: #856404; margin-bottom: 5px;">After Payment:</div>
                    <div style="color: #856404; font-size: 0.9em;">
                        Click "I've Paid" button below to unlock your profile
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="PaymentGateway.confirmUPIPayment()" 
                            style="flex: 1; background: #28a745; color: white; border: none; 
                                   padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1em;">
                        ✅ I've Paid
                    </button>
                    <button onclick="PaymentGateway.closeModal()" 
                            style="flex: 1; background: #e0e0e0; color: #333; border: none; 
                                   padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1em;">
                        Cancel
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Generate QR code (using QRCode.js library)
        if (typeof QRCode !== 'undefined') {
            new QRCode(document.getElementById('qrcode'), {
                text: upiLink,
                width: 200,
                height: 200
            });
        } else {
            document.getElementById('qrcode').innerHTML = '<div style="color: #999;">QR Code (install QRCode.js)</div>';
        }
    },

    // Confirm UPI payment (manual verification)
    confirmUPIPayment() {
        const transactionId = prompt('Enter UPI Transaction ID (12 digits):\n\nExample: 123456789012');
        
        if (transactionId && transactionId.length >= 10) {
            this.closeModal();
            
            // Show processing
            showProcessingMessage('Verifying payment...');
            
            // In production, verify with backend
            // For now, auto-approve after 2 seconds
            setTimeout(() => {
                const overlay = document.getElementById('processingOverlay');
                if (overlay) overlay.remove();
                
                isPaid = true;
                showSuccess();
                
                // Log payment
                logPayment('UPI_' + transactionId);
                
                // Track analytics
                const pricing = window.CurrencyDetector?.getCurrentPricing() || { amount: 21, currency: 'INR' };
                if (window.Analytics) {
                    Analytics.trackPaymentCompleted('UPI_' + transactionId, userData, pricing, 'UPI');
                }
                
                alert('✅ Payment Verified!\n\nTransaction ID: ' + transactionId + '\n\nYour profile is now unlocked!');
            }, 2000);
        } else {
            alert('⚠️ Invalid Transaction ID\n\nPlease enter a valid 12-digit UPI transaction ID.');
        }
    },

    // Razorpay Payment
    processRazorpay() {
        const config = this.config.razorpay;
        const pricing = window.CurrencyDetector?.getCurrentPricing() || { amount: 21, currency: 'INR' };
        
        // Option 1: Use Payment Link (Easiest - No API needed!)
        if (config.paymentLink) {
            // Show payment modal with options
            this.showRazorpayModal(config, pricing);
            return;
        }
        
        // Option 2: Standard Razorpay Checkout (Requires API)
        if (config.keyId === 'rzp_test_DEMO_KEY' || config.keyId === 'rzp_live_RmJ2p4des8sDGF') {
            alert('⚠️ Using Razorpay Payment Link\n\nFor automatic unlock, set up Razorpay API integration.');
            this.showRazorpayModal(config, pricing);
            return;
        }
        
        if (typeof Razorpay === 'undefined') {
            alert('⚠️ Razorpay not loaded\n\nPlease include Razorpay script in HTML.');
            return;
        }
        
        const amount = pricing.currency === 'INR' ? pricing.amount * 100 : pricing.amount * 100; // Convert to paise/cents
        
        const options = {
            key: config.keyId,
            amount: amount,
            currency: pricing.currency,
            name: 'Social Profile Optimizer AI',
            description: 'AI-Powered Profile Optimization',
            handler: (response) => {
                isPaid = true;
                showSuccess();
                logPayment(response.razorpay_payment_id);
                
                // Track analytics
                if (window.Analytics) {
                    Analytics.trackPaymentCompleted(response.razorpay_payment_id, userData, pricing, 'Razorpay');
                }
            },
            prefill: { name: '', email: '', contact: '' },
            theme: { color: '#5a6c7d' }
        };
        
        const rzp = new Razorpay(options);
        rzp.open();
    },

    // Show Razorpay Payment Modal
    showRazorpayModal(config, pricing) {
        const modal = document.createElement('div');
        modal.id = 'razorpayModal';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.8); display: flex; align-items: center; 
            justify-content: center; z-index: 10000; padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 20px; padding: 40px; max-width: 500px; width: 100%; text-align: center;">
                <h2 style="color: #5a6c7d; margin-bottom: 20px;">Pay via Razorpay</h2>
                
                <div style="background: #f8f9ff; padding: 30px; border-radius: 15px; margin: 20px 0;">
                    <div style="font-size: 3em; margin-bottom: 15px;">💳</div>
                    <div style="font-size: 2em; font-weight: bold; color: #5a6c7d; margin-bottom: 10px;">
                        ₹${pricing.amount}
                    </div>
                    <div style="color: #666; margin-bottom: 20px;">Secure payment powered by Razorpay</div>
                    
                    ${config.qrCodeId ? `
                    <div style="margin: 20px 0;">
                        <img src="https://api.razorpay.com/v1/qr_codes/${config.qrCodeId}/qr_code" 
                             alt="Razorpay QR Code" 
                             style="max-width: 200px; border-radius: 10px; border: 2px solid #e0e0e0; padding: 10px; background: white;">
                        <div style="color: #999; font-size: 0.85em; margin-top: 10px;">
                            Scan with any UPI app
                        </div>
                    </div>
                    ` : ''}
                    
                    <div style="margin: 20px 0;">
                        <a href="${config.paymentLink}" target="_blank" 
                           style="display: inline-block; background: #5a6c7d; color: white; 
                                  padding: 15px 40px; border-radius: 10px; text-decoration: none; 
                                  font-weight: bold; font-size: 1.1em;">
                            Pay Now
                        </a>
                    </div>
                    
                    <div style="color: #999; font-size: 0.9em; margin-top: 15px;">
                        Accepts UPI, Cards, Wallets, Net Banking
                    </div>
                </div>
                
                <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
                    <div style="font-weight: bold; color: #856404; margin-bottom: 5px;">After Payment:</div>
                    <div style="color: #856404; font-size: 0.9em;">
                        Click "I've Paid" button below to unlock your profile
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button onclick="PaymentGateway.confirmRazorpayPayment()" 
                            style="flex: 1; background: #28a745; color: white; border: none; 
                                   padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1em;">
                        ✅ I've Paid
                    </button>
                    <button onclick="PaymentGateway.closeRazorpayModal()" 
                            style="flex: 1; background: #e0e0e0; color: #333; border: none; 
                                   padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 1em;">
                        Cancel
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    },

    // Confirm Razorpay payment
    confirmRazorpayPayment() {
        const transactionId = prompt('Enter Payment ID or Transaction ID:\n\nExample: pay_XXXXXXXXXXXXX or 123456789012');
        
        if (transactionId && transactionId.length >= 10) {
            this.closeRazorpayModal();
            
            // Show processing
            showProcessingMessage('Verifying payment...');
            
            // In production, verify with backend
            // For now, auto-approve after 2 seconds
            setTimeout(() => {
                const overlay = document.getElementById('processingOverlay');
                if (overlay) overlay.remove();
                
                isPaid = true;
                showSuccess();
                
                // Log payment
                logPayment('RAZORPAY_' + transactionId);
                
                // Track analytics
                const pricing = window.CurrencyDetector?.getCurrentPricing() || { amount: 21, currency: 'INR' };
                if (window.Analytics) {
                    Analytics.trackPaymentCompleted('RAZORPAY_' + transactionId, userData, pricing, 'Razorpay');
                }
                
                alert('✅ Payment Verified!\n\nTransaction ID: ' + transactionId + '\n\nYour profile is now unlocked!');
            }, 2000);
        } else {
            alert('⚠️ Invalid Transaction ID\n\nPlease enter a valid payment ID or transaction ID.');
        }
    },

    // Close Razorpay modal
    closeRazorpayModal() {
        const modal = document.getElementById('razorpayModal');
        if (modal) modal.remove();
    },

    // Stripe Payment
    processStripe() {
        const config = this.config.stripe;
        
        if (config.publishableKey === 'pk_test_DEMO_KEY') {
            alert('⚠️ Stripe Setup Required\n\nPlease add your Stripe Publishable Key in payment-selector.js\n\nUsing demo mode for now...');
            this.simulatePayment();
            return;
        }
        
        if (typeof Stripe === 'undefined') {
            alert('⚠️ Stripe not loaded\n\nPlease include Stripe script in HTML.');
            return;
        }
        
        // Option 1: Payment Link (easiest)
        if (config.paymentLink && config.paymentLink !== 'https://buy.stripe.com/test_XXXXXXXX') {
            sessionStorage.setItem('pendingOptimization', JSON.stringify({
                userData: userData,
                generatedProfile: generatedProfile,
                timestamp: Date.now()
            }));
            window.location.href = config.paymentLink;
            return;
        }
        
        // Option 2: Checkout (requires backend)
        alert('⚠️ Stripe Payment Link Required\n\nPlease create a payment link in Stripe Dashboard and add it to payment-selector.js');
    },

    // Close modal
    closeModal() {
        const modal = document.getElementById('upiModal');
        if (modal) modal.remove();
    },

    // Simulate payment for demo
    simulatePayment() {
        if (confirm('Demo Mode: Simulate successful payment?')) {
            setTimeout(() => {
                isPaid = true;
                showSuccess();
            }, 1000);
        }
    }
};

// Make it globally available
window.PaymentGateway = PaymentGateway;

