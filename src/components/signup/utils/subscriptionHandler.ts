import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const handleSubscribe = async (priceId: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      },
      body: JSON.stringify({
        priceId,
        successUrl: `${window.location.origin}/signup?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/signup`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to start checkout process');
  }
};

export const handleStripeSuccess = async (sessionId: string) => {
  try {
    const response = await fetch(`/api/verify-subscription?session_id=${sessionId}`);
    if (!response.ok) {
      throw new Error('Failed to verify subscription');
    }
    
    const { status } = await response.json();
    if (status === 'complete') {
      toast.success('Subscription activated successfully!');
      // Redirect to profile completion
      window.location.href = '/profile';
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to verify subscription');
  }
};