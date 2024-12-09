import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Diamond } from "lucide-react";
import { toast } from "sonner";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

interface PricingTiersProps {
  onPlanSelect: (plan: string) => void;
}

export const PricingTiers = ({ onPlanSelect }: PricingTiersProps) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleSubscribe = async (priceId: string) => {
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

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-[#232836] border-none text-white hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Copper</span>
              <DollarSign className="w-6 h-6 text-[#B87333]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">$6<span className="text-lg">/week</span></p>
            <Button 
              className="w-full bg-[#B87333] hover:bg-[#B87333]/80 text-white"
              onClick={() => handleSubscribe('price_copper')}
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#232836] border-none text-white hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Silver</span>
              <DollarSign className="w-6 h-6 text-[#C0C0C0]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">$20<span className="text-lg">/month</span></p>
            <Button 
              className="w-full bg-[#C0C0C0] hover:bg-[#C0C0C0]/80 text-[#232836]"
              onClick={() => handleSubscribe('price_silver')}
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#232836] border-none text-white hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Gold</span>
              <DollarSign className="w-6 h-6 text-[#FFD700]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">$89<span className="text-lg">/year</span></p>
            <Button 
              className="w-full bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#232836]"
              onClick={() => handleSubscribe('price_gold')}
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-12">
        <Card className="bg-gradient-to-r from-[#232836] to-[#2a303f] border-2 border-[#E5E4E2] text-white hover:scale-105 transition-transform shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(229,228,226,0.2)_50%,transparent_100%)] animate-[shine_3s_infinite]"></div>
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center justify-between text-2xl">
              <span className="flex items-center gap-2">
                <Diamond className="w-8 h-8 text-[#E5E4E2]" />
                Platinum
              </span>
              <span className="text-3xl font-bold">$499</span>
            </CardTitle>
            <p className="text-lg text-gray-300">Premium Career Acceleration Package</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-4">
              {[
                "1-on-1 Sessions with Expert Recruiters 👩‍💼",
                "Personalized Career Mentorship Program 🌟",
                "Professional Resume Review & Optimization ✨",
                "Dedicated Job Application Service 📝",
                "Job Offer Guarantee within 30 Days or Full Refund 💫"
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#E5E4E2] mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button 
              className="w-full bg-gradient-to-r from-[#E5E4E2] to-[#C0C0C0] hover:from-[#C0C0C0] hover:to-[#E5E4E2] text-[#232836] font-bold text-lg py-6"
              onClick={() => handleSubscribe('price_platinum')}
            >
              Accelerate Your Career
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};