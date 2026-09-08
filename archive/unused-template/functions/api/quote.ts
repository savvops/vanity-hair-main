export interface Env {
  // Add any environment variables here
  // DB: D1Database; // Uncomment when using D1
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });
    }

    try {
      const data = await request.json() as {
        name: string;
        phone: string;
        email?: string;
        property_type: string;
        message?: string;
      };

      // Validate required fields
      if (!data.name || !data.phone || !data.property_type) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

      // Here you would typically:
      // 1. Store in D1 database
      // 2. Send email via MailChannels or Resend
      // 3. Send notification to Slack/Discord

      // Example D1 insert (uncomment when D1 is configured):
      // await env.DB.prepare(
      //   'INSERT INTO leads (name, phone, email, property_type, message, created_at) VALUES (?, ?, ?, ?, ?, ?)'
      // ).bind(data.name, data.phone, data.email || null, data.data.property_type, data.message || null, new Date().toISOString()).run();

      // For now, just log and return success
      console.log('Quote request received:', data);

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Quote request submitted successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });

    } catch (error) {
      console.error('Error processing quote request:', error);
      
      return new Response(JSON.stringify({ 
        error: 'Internal server error' 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
};
