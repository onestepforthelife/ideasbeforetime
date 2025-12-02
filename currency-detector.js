// AUTOMATIC CURRENCY DETECTION & PRICING
// Detects user's country and shows price in local currency

const PRICING = {
    // India - Special pricing
    IN: { currency: 'INR', symbol: '₹', amount: 21, amountInPaise: 2100, name: 'Indian Rupee' },
    
    // USA
    US: { currency: 'USD', symbol: '$', amount: 1, amountInCents: 100, name: 'US Dollar' },
    
    // Europe
    DE: { currency: 'EUR', symbol: '€', amount: 0.92, amountInCents: 92, name: 'Euro' },
    FR: { currency: 'EUR', symbol: '€', amount: 0.92, amountInCents: 92, name: 'Euro' },
    IT: { currency: 'EUR', symbol: '€', amount: 0.92, amountInCents: 92, name: 'Euro' },
    ES: { currency: 'EUR', symbol: '€', amount: 0.92, amountInCents: 92, name: 'Euro' },
    NL: { currency: 'EUR', symbol: '€', amount: 0.92, amountInCents: 92, name: 'Euro' },
    
    // UK
    GB: { currency: 'GBP', symbol: '£', amount: 0.79, amountInPence: 79, name: 'British Pound' },
    
    // Canada
    CA: { currency: 'CAD', symbol: 'C$', amount: 1.35, amountInCents: 135, name: 'Canadian Dollar' },
    
    // Australia
    AU: { currency: 'AUD', symbol: 'A$', amount: 1.52, amountInCents: 152, name: 'Australian Dollar' },
    
    // Singapore
    SG: { currency: 'SGD', symbol: 'S$', amount: 1.34, amountInCents: 134, name: 'Singapore Dollar' },
    
    // UAE
    AE: { currency: 'AED', symbol: 'AED', amount: 3.67, amountInFils: 367, name: 'UAE Dirham' },
    
    // Saudi Arabia
    SA: { currency: 'SAR', symbol: 'SAR', amount: 3.75, amountInHalala: 375, name: 'Saudi Riyal' },
    
    // Japan
    JP: { currency: 'JPY', symbol: '¥', amount: 149, amountInYen: 149, name: 'Japanese Yen' },
    
    // South Korea
    KR: { currency: 'KRW', symbol: '₩', amount: 1320, amountInWon: 1320, name: 'Korean Won' },
    
    // Brazil
    BR: { currency: 'BRL', symbol: 'R$', amount: 4.95, amountInCentavos: 495, name: 'Brazilian Real' },
    
    // Mexico
    MX: { currency: 'MXN', symbol: 'MX$', amount: 17.10, amountInCentavos: 1710, name: 'Mexican Peso' },
    
    // South Africa
    ZA: { currency: 'ZAR', symbol: 'R', amount: 18.50, amountInCents: 1850, name: 'South African Rand' },
    
    // Default for other countries (USD)
    DEFAULT: { currency: 'USD', symbol: '$', amount: 1, amountInCents: 100, name: 'US Dollar' }
};

let userCountry = 'IN'; // Default to India
let userPricing = PRICING.IN;

// Detect user's country
async function detectUserCountry() {
    try {
        // Method 1: Use ipapi.co (free, no API key needed)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.country_code) {
            userCountry = data.country_code;
            userPricing = PRICING[userCountry] || PRICING.DEFAULT;
            console.log('Detected country:', userCountry, userPricing);
            return userPricing;
        }
    } catch (error) {
        console.log('Country detection failed, using default:', error);
    }
    
    // Fallback: Try to detect from browser timezone
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta')) {
            userCountry = 'IN';
            userPricing = PRICING.IN;
        }
    } catch (e) {
        console.log('Timezone detection failed');
    }
    
    return userPricing;
}

// Update all prices on page
function updatePricesOnPage(pricing) {
    // Update main price display
    const priceElements = document.querySelectorAll('.price, [data-price]');
    priceElements.forEach(el => {
        el.textContent = `${pricing.symbol}${pricing.amount}`;
    });
    
    // Update price in text
    const priceTexts = document.querySelectorAll('[data-price-text]');
    priceTexts.forEach(el => {
        const originalText = el.getAttribute('data-original-text') || el.textContent;
        el.setAttribute('data-original-text', originalText);
        el.textContent = originalText.replace(/₹21|₹\s*21|\$1|\$\s*1/g, `${pricing.symbol}${pricing.amount}`);
    });
    
    // Update button text
    const buttons = document.querySelectorAll('button[data-payment-button]');
    buttons.forEach(btn => {
        if (btn.textContent.includes('₹') || btn.textContent.includes('$')) {
            btn.textContent = btn.textContent.replace(/₹21|₹\s*21|\$1|\$\s*1/g, `${pricing.symbol}${pricing.amount}`);
        }
    });
    
    // Store pricing globally for payment processing
    window.currentPricing = pricing;
}

// Get Razorpay amount based on currency
function getRazorpayAmount(pricing) {
    // Razorpay uses smallest currency unit
    if (pricing.currency === 'INR') {
        return pricing.amountInPaise; // 2100 paise = ₹21
    } else if (pricing.currency === 'USD') {
        return pricing.amountInCents; // 100 cents = $1
    } else if (pricing.currency === 'EUR') {
        return pricing.amountInCents; // 92 cents = €0.92
    } else if (pricing.currency === 'GBP') {
        return pricing.amountInPence; // 79 pence = £0.79
    } else if (pricing.currency === 'JPY') {
        return pricing.amountInYen; // 149 yen (no decimal)
    }
    
    // Default: multiply by 100 for most currencies
    return Math.round(pricing.amount * 100);
}

// Format price for display
function formatPrice(pricing) {
    if (pricing.currency === 'JPY' || pricing.currency === 'KRW') {
        // No decimals for Yen and Won
        return `${pricing.symbol}${Math.round(pricing.amount)}`;
    }
    return `${pricing.symbol}${pricing.amount.toFixed(2)}`;
}

// Initialize currency detection on page load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', async function() {
        console.log('Detecting user country and currency...');
        const pricing = await detectUserCountry();
        updatePricesOnPage(pricing);
        
        // Show currency info to user
        const currencyInfo = document.getElementById('currency-info');
        if (currencyInfo) {
            currencyInfo.innerHTML = `
                <div style="background: #e7f3ff; padding: 10px; border-radius: 8px; text-align: center; margin: 10px 0;">
                    💰 Price in your currency: <strong>${formatPrice(pricing)}</strong> (${pricing.name})
                </div>
            `;
        }
    });
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.CurrencyDetector = {
        detectUserCountry,
        updatePricesOnPage,
        getRazorpayAmount,
        formatPrice,
        getCurrentPricing: () => userPricing,
        PRICING
    };
}

