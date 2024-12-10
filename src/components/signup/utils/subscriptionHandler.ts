import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const handleSubscribe = async (priceId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId }
    });

    if (error) throw error;
    if (data?.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    toast.error("Could not process subscription");
  }
};