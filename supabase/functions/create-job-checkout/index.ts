import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PRICE_IDS = {
  basicListing: 'price_1QUklHEUIbv2rtd6BswugwVr',
  highlighted: 'price_1QUklcEUIbv2rtd6qYzTil4l',
  analytics: 'price_1QUkm4EUIbv2rtd6HRnDCuZQ',
  sticky: 'price_1QUknCEUIbv2rtd68pTDeNfJ',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { selectedOptions } = await req.json();
    
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const lineItems = [];
    
    if (selectedOptions.isBasicListing) {
      lineItems.push({ price: PRICE_IDS.basicListing, quantity: 1 });
    }
    if (selectedOptions.isHighlighted) {
      lineItems.push({ price: PRICE_IDS.highlighted, quantity: 1 });
    }
    if (selectedOptions.isAnalytics) {
      lineItems.push({ price: PRICE_IDS.analytics, quantity: 1 });
    }
    if (selectedOptions.isSticky) {
      lineItems.push({ price: PRICE_IDS.sticky, quantity: 1 });
    }

    console.log('Creating payment session...');
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/post-job?success=true`,
      cancel_url: `${req.headers.get('origin')}/post-job?canceled=true`,
    });

    console.log('Payment session created:', session.id);
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating payment session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});