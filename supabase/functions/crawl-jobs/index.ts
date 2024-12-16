import { serve } from "https://deno.fresh.dev/std@v9.6.1/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CRAWL4AI_API_KEY = Deno.env.get('CRAWL4AI_API_KEY');
const CRAWL4AI_API_URL = 'https://api.crawl4ai.com/v1';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { url, selectors } = await req.json();

    // Call the crawl4ai API
    const response = await fetch(`${CRAWL4AI_API_URL}/crawl`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRAWL4AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        selectors,
      }),
    });

    const data = await response.json();

    // Insert crawled jobs into the Jobs_Directory table
    const { supabaseClient } = await import('../_shared/supabaseClient.ts');
    
    if (data.results && Array.isArray(data.results)) {
      const jobsToInsert = data.results.map(job => ({
        position: job.title,
        Company: job.company,
        location: job.location,
        JobPost: job.description,
        contractType: job.type,
        salary: job.salary,
        publishedAt: new Date().toISOString(),
      }));

      const { error } = await supabaseClient
        .from('Jobs_Directory')
        .insert(jobsToInsert);

      if (error) {
        console.error('Error inserting jobs:', error);
        throw error;
      }
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in crawl-jobs function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});