import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Diamond, Check } from "lucide-react";

interface PlatinumTierProps {
  onSubscribe: (priceId: string) => void;
}

export const PlatinumTier = ({ onSubscribe }: PlatinumTierProps) => (
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
        onClick={() => onSubscribe('price_1QU4FuEUIbv2rtd6DbEljzeM')}
      >
        Accelerate Your Career
      </Button>
    </CardContent>
  </Card>
);