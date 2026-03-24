/**
 * RegSearch — Anthropic API Proxy
 * Cloudflare Worker that forwards requests to the Anthropic API
 * and injects your secret API key server-side.
 *
 * SETUP:
 * 1. Deploy this file to Cloudflare Workers (free at cloudflare.com)
 * 2. Add your Anthropic API key as a secret:
 *      wrangler secret put ANTHROPIC_API_KEY
 *    or via the Cloudflare dashboard → Workers → your worker → Settings → Variables
 * 3. Copy your Worker URL (e.g. https://regsearch-proxy.YOUR-NAME.workers.dev)
 *    and paste it into index.html where it says PROXY_URL
 */

export default {
  async fetch(request, env) {

    // Allow CORS from any origin so your GitHub Pages site can call this
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Read the request body from the browser
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    // Forward to Anthropic with the secret key injected
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  },
};
