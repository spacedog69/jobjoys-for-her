import { toast } from "sonner";
import { SupabaseClient } from "@supabase/supabase-js";
import { Session } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";

export const handleSubscribe = async (
  priceId: string,
  session: Session | null,
  supabase: SupabaseClient,
  navigate?: NavigateFunction
) => {
  try {
    if (!session) {
      toast.error("Please sign in first");
      if (navigate) {
        navigate("/login");
      }
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