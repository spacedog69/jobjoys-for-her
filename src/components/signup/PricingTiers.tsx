import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { CopperTier } from "./tiers/CopperTier";
import { SilverTier } from "./tiers/SilverTier";
import { GoldTier } from "./tiers/GoldTier";
import { PlatinumTier } from "./tiers/PlatinumTier";
import { handleSubscribe } from "./utils/subscriptionHandler";

interface PricingTiersProps {
  onPlanSelect: (plan: string) => void;
}

export const PricingTiers = ({ onPlanSelect }: PricingTiersProps) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleSubscription = (priceId: string) => {
    handleSubscribe(priceId, session, supabase);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <CopperTier onSubscribe={handleSubscription} />
        <SilverTier onSubscribe={handleSubscription} />
        <GoldTier onSubscribe={handleSubscription} />
      </div>

      <div className="mb-12">
        <PlatinumTier onSubscribe={handleSubscription} />
      </div>
    </>
  );
};