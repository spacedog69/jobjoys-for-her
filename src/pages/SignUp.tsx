import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Reviews } from "@/components/Reviews";
import { useSubscriptionStatus } from "@/components/subscription/SubscriptionCheck";
import { useState, useEffect } from "react";
import { PricingTiers } from "@/components/signup/PricingTiers";
import { AuthSection } from "@/components/signup/AuthSection";
import { handleStripeSuccess } from "@/components/signup/utils/subscriptionHandler";
import { useSearchParams } from "react-router-dom";

export default function SignUp() {
  const { isSubscribed, isLoading } = useSubscriptionStatus();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      handleStripeSuccess(sessionId);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <Navbar />
      
      <div className="max-w-4xl mx-auto pt-24 px-4">
        <div className="rounded-lg p-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-[#E5DEFF]">
            Discover 65,000+
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-primary">
            Remote Jobs for Women
          </h2>
        </div>

        <PricingTiers onPlanSelect={setSelectedPlan} />

        {(isSubscribed || selectedPlan) && <AuthSection />}

        <Reviews />
      </div>
    </div>
  );
}