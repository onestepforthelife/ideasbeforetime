/* 
 * GODA AI API - Cloudflare Worker with Multi-Provider Failover
 * Primary: Google Gemini API
 * Backup: Cloudflare AI (Workers AI)
 * Auto-switches if one fails or runs out of credits
 * Deploy to: workers.cloudflare.com
 */

// ENVIRONMENT VARIABLES (Set in Cloudflare Dashboard):
// 1. GEMINI_API_KEY (optional - for Gemini)
// 2. AI (automatic - Cloudflare Workers AI binding)

export default {
  async fetch(request, env) {
    // CORS headers for browser requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // Change to your domain in production
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });
    }

    try {
      // Get user message from request
      const { message, conversationHistory } = await request.json();

      if (!message || message.trim().length === 0) {
        return new Response(JSON.stringify({ 
          error: 'Message is required' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Rate limiting (simple version)
      const clientIP = request.headers.get('CF-Connecting-IP');
      // TODO: Implement proper rate limiting with KV storage if needed

      // Build conversation context
      const contents = [];
      
      // Add conversation history if provided
      if (conversationHistory && conversationHistory.length > 0) {
        conversationHistory.forEach(msg => {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          });
        });
      }

      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      // System instruction for GODA AI
      const systemInstruction = `You are GODA AI Assistant for Ideas Before Time website (onestepforthelife.com).

Your role:
- Help users navigate the site
- Answer questions about tools, blog posts, and services
- Provide information about chemical industry insights
- Assist with Kiro IDE troubleshooting
- Be friendly, concise, and helpful

Available resources:
- Tools: SPO (Social Profile Optimizer), Job Search, RO Water Guide, Astrology
- Blog: 100+ posts on leadership, technology, chemical industry
- Reports: Chemical market intelligence reports
- About: Creator's CV, timeline, expertise

Keep responses:
- Short and clear (2-3 sentences preferred)
- Include relevant links when helpful
- Professional but friendly tone
- Accurate and honest (say "I don't know" if unsure)`;

      // Try providers in order: Gemini → Cloudflare AI
      let aiResponse = null;
      let provider = 'unknown';

      // PROVIDER 1: Google Gemini (if API key available)
      if (env.GEMINI_API_KEY) {
        try {
          console.log('Trying Gemini API...');
          const geminiResponse = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': env.GEMINI_API_KEY
              },
              body: JSON.stringify({
                contents: contents,
                systemInstruction: {
                  parts: [{ text: systemInstruction }]
                },
                generationConfig: {
                  temperature: 0.7,
                  topK: 40,
                  topP: 0.95,
                  maxOutputTokens: 500,
                },
                safetySettings: [
                  {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                  },
                  {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                  },
                  {
                    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                  },
                  {
                    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                  }
                ]
              })
            }
          );

          if (geminiResponse.ok) {
            const data = await geminiResponse.json();
            aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (aiResponse) {
              provider = 'gemini';
              console.log('✅ Gemini API success');
            }
          } else {
            const errorText = await geminiResponse.text();
            console.error('Gemini API failed:', errorText);
            
            // Check if quota exceeded
            if (errorText.includes('quota') || errorText.includes('limit')) {
              console.log('⚠️ Gemini quota exceeded, switching to Cloudflare AI...');
            }
          }
        } catch (error) {
          console.error('Gemini API error:', error.message);
        }
      }

      // PROVIDER 2: Cloudflare AI (fallback or if no Gemini key)
      if (!aiResponse && env.AI) {
        try {
          console.log('Trying Cloudflare AI...');
          
          // Build prompt from conversation history
          let prompt = systemInstruction + '\n\n';
          
          if (conversationHistory && conversationHistory.length > 0) {
            conversationHistory.forEach(msg => {
              prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
            });
          }
          
          prompt += `User: ${message}\nAssistant:`;

          const cloudflareResponse = await env.AI.run(
            '@cf/meta/llama-3-8b-instruct', // Free model
            {
              messages: [
                { role: 'system', content: systemInstruction },
                ...contents.map(c => ({
                  role: c.role === 'user' ? 'user' : 'assistant',
                  content: c.parts[0].text
                }))
              ],
              max_tokens: 500,
              temperature: 0.7
            }
          );

          if (cloudflareResponse?.response) {
            aiResponse = cloudflareResponse.response;
            provider = 'cloudflare';
            console.log('✅ Cloudflare AI success');
          }
        } catch (error) {
          console.error('Cloudflare AI error:', error.message);
        }
      }

      // If both providers failed, return fallback
      if (!aiResponse) {
        console.error('❌ All AI providers failed');
        return new Response(JSON.stringify({ 
          error: 'AI service temporarily unavailable',
          fallback: 'I\'m having trouble connecting right now. Please try again in a moment, or explore our <a href="/tools.html">Tools</a> and <a href="/blog.html">Blog</a>.',
          provider: 'none'
        }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Return response with provider info
      return new Response(JSON.stringify({ 
        response: aiResponse,
        provider: provider, // 'gemini' or 'cloudflare'
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({ 
        error: 'Internal server error',
        fallback: 'Something went wrong. Please try again or contact us at onestepforthelife@gmail.com'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
