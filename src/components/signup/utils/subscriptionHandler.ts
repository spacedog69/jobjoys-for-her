import { toast } from "sonner";
import { SupabaseClient } from "@supabase/supabase-js";

export const handleSubscribe = async (
  priceId: string,
  session: any,
  supabase: SupabaseClient
) => {
  try {
    if (!session) {
      toast.error("Please sign in first");
      return;
    }

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