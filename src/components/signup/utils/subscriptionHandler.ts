import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const handleSubscribe = async (priceId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { 
        priceId,
        successUrl: `${window.location.origin}/signup?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/signup`,
      }
    });

    if (error) throw error;
    
    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to start checkout process');
  }
};

export const handleStripeSuccess = async (sessionId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('verify-subscription', {
      body: { sessionId }
    });

    if (error) throw error;
    
    if (data?.status === 'complete') {
      toast.success('Subscription activated successfully!');
      // Redirect to profile completion
      window.location.href = '/profile';
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error('Failed to verify subscription');
  }
};