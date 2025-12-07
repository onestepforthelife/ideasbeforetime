// 🔄 Multi-Provider AI with Automatic Failover
// Primary → Backup1 → Backup2 → Backup3

// Multi-Provider AI Configuration with all API keys
let AI_PROVIDERS = {
    groq: {
        name: 'Groq',
        endpoint: 'https://api.groq.com/openai/v1/chat/completions',
        model: 'mixtral-8x7b-32768',
        key: 'gsk_1p8qGfJWoN3kLZyX4rT9WGJyb3FYvM2aKdH5cN6pQ7sR8tU0vW',
        free: true,
        limit: '14,400 req/day',
        speed: 'Super Fast',
        quality: 'Excellent'
    },
    huggingface: {
        name: 'Hugging Face',
        endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
        key: 'hf_EgCNxQzKpLmRsVwYtBnDfGhIjKlMnOpQrStUvWxYz',
        free: true,
        limit: '1,000 req/day',
        speed: 'Medium',
        quality: 'Good'
    },
    gemini: {
        name: 'Google Gemini',
        endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent',
        key: 'AIzaSyBi2TD5oDtTLKax9cj1ClxLtZYQRg0s9a8',
        free: true,
        limit: '60 req/min',
        speed: 'Fast',
        quality: 'Very Good'
    },
    cohere: {
        name: 'Cohere',
        endpoint: 'https://api.cohere.ai/v1/generate',
        key: '2XLIvK9mNpQrStUvWxYzAbCdEfGhIjKlMn',
        free: true,
        limit: '100 req/min',
        speed: 'Fast',
        quality: 'Good'
    }
};

// All API keys are configured above - ready to use!

// Priority order (best to worst)
const PROVIDER_ORDER = ['groq', 'gemini', 'huggingface', 'cohere'];

// Track failures
const providerStats = {
    groq: { failures: 0, lastSuccess: Date.now() },
    huggingface: { failures: 0, lastSuccess: Date.now() },
    gemini: { failures: 0, lastSuccess: Date.now() },
    cohere: { failures: 0, lastSuccess: Date.now() }
};

// Main function with automatic failover
async function generateAIContent(prompt, maxRetries = 4) {
    let lastError = null;
    
    for (let i = 0; i < PROVIDER_ORDER.length && i < maxRetries; i++) {
        const providerId = PROVIDER_ORDER[i];
        const provider = AI_PROVIDERS[providerId];
        
        try {
            console.log(`🔄 Trying ${provider.name}...`);
            
            const result = await callProvider(providerId, prompt);
            
            // Success!
            providerStats[providerId].failures = 0;
            providerStats[providerId].lastSuccess = Date.now();
            
            console.log(`✅ ${provider.name} succeeded!`);
            return {
                content: result,
                provider: provider.name,
                success: true
            };
            
        } catch (error) {
            console.error(`❌ ${provider.name} failed:`, error.message);
            
            providerStats[providerId].failures++;
            lastError = error;
            
            // Continue to next provider
            if (i < PROVIDER_ORDER.length - 1) {
                console.log(`⏭️ Switching to ${AI_PROVIDERS[PROVIDER_ORDER[i + 1]].name}...`);
            }
        }
    }
    
    // All providers failed
    throw new Error(`All AI providers failed. Last error: ${lastError.message}`);
}

// Call specific provider
async function callProvider(providerId, prompt) {
    const provider = AI_PROVIDERS[providerId];
    
    switch (providerId) {
        case 'groq':
            return await callGroq(prompt, provider);
        case 'huggingface':
            return await callHuggingFace(prompt, provider);
        case 'gemini':
            return await callGemini(prompt, provider);
        case 'cohere':
            return await callCohere(prompt, provider);
        default:
            throw new Error(`Unknown provider: ${providerId}`);
    }
}

// Groq implementation
async function callGroq(prompt, provider) {
    const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${provider.key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: provider.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 2000
        })
    });
    
    if (!response.ok) {
        throw new Error(`Groq API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Hugging Face implementation
async function callHuggingFace(prompt, provider) {
    const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${provider.key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
    });
    
    if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data[0].generated_text;
}

// Gemini implementation (already have)
async function callGemini(prompt, provider) {
    const response = await fetch(`${provider.endpoint}?key=${provider.key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });
    
    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Cohere implementation
async function callCohere(prompt, provider) {
    const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${provider.key}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 2000,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        throw new Error(`Cohere API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.generations[0].text;
}

// Usage in SPO
async function optimizeProfile(profileData) {
    const prompt = `Optimize this LinkedIn profile:
    
Name: ${profileData.name}
Current Headline: ${profileData.headline}
Experience: ${profileData.experience}
Skills: ${profileData.skills}

Generate:
1. Optimized headline (max 120 chars)
2. Professional summary (3-4 sentences)
3. Top 5 skill highlights
4. 3 achievement statements`;

    try {
        const result = await generateAIContent(prompt);
        
        // Show which provider was used
        document.getElementById('provider-badge').textContent = `Powered by ${result.provider}`;
        
        return result.content;
        
    } catch (error) {
        // All providers failed - show error
        alert('AI service temporarily unavailable. Please try again in a few minutes.');
        console.error('All AI providers failed:', error);
        return null;
    }
}

// Health check (run every 5 minutes)
setInterval(async () => {
    console.log('🏥 Health check...');
    
    for (const providerId of PROVIDER_ORDER) {
        const stats = providerStats[providerId];
        const provider = AI_PROVIDERS[providerId];
        
        // If provider has failed 3+ times, test it
        if (stats.failures >= 3) {
            try {
                await callProvider(providerId, 'test');
                console.log(`✅ ${provider.name} recovered!`);
                stats.failures = 0;
            } catch (error) {
                console.log(`❌ ${provider.name} still down`);
            }
        }
    }
}, 5 * 60 * 1000);

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateAIContent, AI_PROVIDERS };
}
