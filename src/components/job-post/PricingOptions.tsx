import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const PricingOptions = () => {
  const [pricing, setPricing] = useState({
    isBasicListing: true,
    isHighlighted: false,
    isAnalytics: false,
    isSticky: false,
  });

  const calculatePrice = () => {
    let total = 199; // Basic listing
    if (pricing.isHighlighted) total += 99;
    if (pricing.isAnalytics) total += 49;
    if (pricing.isSticky) total += 299;
    return total;
  };

  const handlePayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: { selectedOptions: pricing }
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div>
      <div className="space-y-4 bg-white/5 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-[#E5DEFF] mb-4">
          Add-ons 🎯
        </h3>
        
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={pricing.isBasicListing}
            onChange={(e) =>
              setPricing({ ...pricing, isBasicListing: e.target.checked })
            }
            className="rounded border-white/20"
          />
          <span className="text-[#E5DEFF]">
            Basic listing ($199.00) ✨
          </span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={pricing.isHighlighted}
            onChange={(e) =>
              setPricing({ ...pricing, isHighlighted: e.target.checked })
            }
            className="rounded border-white/20"
          />
          <span className="text-[#E5DEFF]">
            Stand out with a badge and highlighted background ($99) 🏆
          </span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={pricing.isAnalytics}
            onChange={(e) =>
              setPricing({ ...pricing, isAnalytics: e.target.checked })
            }
            className="rounded border-white/20"
          />
          <span className="text-[#E5DEFF]">
            Analytics on job views and clicks ($49) 📊
          </span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={pricing.isSticky}
            onChange={(e) =>
              setPricing({ ...pricing, isSticky: e.target.checked })
            }
            className="rounded border-white/20"
          />
          <span className="text-[#E5DEFF]">
            Stick your post on the front page for 14 days ($299) 📌
          </span>
        </label>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          onClick={handlePayment}
          className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg"
        >
          Pay Now (${calculatePrice()}.00) 💳
        </Button>
      </div>
    </div>
  );
};