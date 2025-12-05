
// Cloudflare Worker - API Proxy
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };
        
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        
        // Rate limiting
        const ip = request.headers.get('CF-Connecting-IP');
        const rateLimitKey = `rate_limit_${ip}`;
        const count = await env.KV.get(rateLimitKey);
        
        if (count && parseInt(count) > 100) {
            return new Response('Rate limit exceeded', { status: 429 });
        }
        
        await env.KV.put(rateLimitKey, (parseInt(count || 0) + 1).toString(), { expirationTtl: 60 });
        
        // Handle API requests
        if (url.pathname.startsWith('/api/')) {
            // Your API logic here
            return new Response(JSON.stringify({ success: true }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
        
        return fetch(request);
    }
};
