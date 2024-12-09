import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useSubscriptionStatus = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/is-subscribed', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to check subscription');
        
        const { subscribed } = await response.json();
        setIsSubscribed(subscribed);
      } catch (error) {
        console.error('Error checking subscription:', error);
        toast({
          title: "Error",
          description: "Could not verify subscription status",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [toast]);

  return { isSubscribed, isLoading };
};