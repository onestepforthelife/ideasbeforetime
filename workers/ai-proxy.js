// Cloudflare Worker - AI API Proxy
// This hides API keys on the backend

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { prompt, provider } = await request.json();

      // Validate input
      if (!prompt || !provider) {
        return new Response(
          JSON.stringify({ error: 'Missing prompt or provider' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Call appropriate AI provider
      let result;
      switch (provider) {
        case 'groq':
          result = await callGroq(prompt, env);
          break;
        case 'gemini':
          result = await callGemini(prompt, env);
          break;
        case 'huggingface':
          result = await callHuggingFace(prompt, env);
          break;
        case 'cohere':
          result = await callCohere(prompt, env);
          break;
        default:
          return new Response(
            JSON.stringify({ error: 'Invalid provider' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
      }

      return new Response(
        JSON.stringify({ content: result, provider }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  }
};

// Groq API call
async function callGroq(prompt, env) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
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

// Gemini API call
async function callGemini(prompt, env) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Hugging Face API call
async function callHuggingFace(prompt, env) {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.HUGGINGFACE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
  return data[0].generated_text;
}

// Cohere API call
async function callCohere(prompt, env) {
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.COHERE_API_KEY}`,
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
