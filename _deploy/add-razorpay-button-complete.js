// Add Razorpay Payment Button to SPO & Astronomy Pages
// Replaces existing payment section with Razorpay hosted page button

const fs = require('fs');

console.log('🔧 Adding Razorpay Payment Button...\n');

// Razorpay button HTML
const razorpayButton = `
            <!-- Razorpay Payment Button -->
            <div style="text-align: center; margin: 30px 0; padding: 30px; background: linear-gradient(135deg, #5a6c7d 0%, #8b9aa7 100%); border-radius: 15px;">
                <h3 style="color: white; font-size: 1.8em; margin-bottom: 15px;">💳 Pay Securely with Razorpay</h3>
                <p style="color: rgba(255,255,255,0.9); font-size: 1.1em; margin-bottom: 20px;">
                    ₹21 only • Instant access • Secure payment
                </p>
                
                <!-- Razorpay Embed Button -->
                <div class="razorpay-embed-btn" data-url="https://pages.razorpay.com/pl_RpRnYp1Qwb72ld/view" data-text="Pay ₹21 Now" data-color="#528FF0" data-size="large">
                    <script>
                    (function(){
                        var d=document; 
                        var x=!d.getElementById('razorpay-embed-btn-js')
                        if(x){ 
                            var s=d.createElement('script'); 
                            s.defer=!0;
                            s.id='razorpay-embed-btn-js';
                            s.src='https://cdn.razorpay.com/static/embed_btn/bundle.js';
                            d.body.appendChild(s);
                        } else{
                            var rzp=window['__rzp__'];
                            rzp && rzp.init && rzp.init()
                        }
                    })();
                    </script>
                </div>
                
                <p style="color: rgba(255,255,255,0.8); font-size: 0.9em; margin-top: 15px;">
                    🔒 Secure payment • NO REFUNDS (backend cost) • Terms in footer
                </p>
            </div>
`;

console.log('✅ Razorpay button HTML ready');
console.log('\n📋 To add manually:');
console.log('1. Open social-optimizer-app.html');
console.log('2. Find Step 4 payment section');
console.log('3. Replace existing payment div with button above');
console.log('\n🔗 Payment URL: https://rzp.io/rzp/onestep');
