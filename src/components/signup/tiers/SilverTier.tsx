import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Check } from "lucide-react";

interface SilverTierProps {
  onSubscribe: (priceId: string) => void;
}

export const SilverTier = ({ onSubscribe }: SilverTierProps) => (
  <Card className="bg-[#232836] border border-white text-white hover:scale-105 transition-transform">
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
        onClick={() => onSubscribe('price_1QU44SEUIbv2rtd65taE4xOI')}
      >
        Subscribe Now
      </Button>
      <ul className="mt-8 space-y-4">
        <li className="flex items-center">
          <Check className="h-5 w-5 text-[#C0C0C0] mr-2" />
          Access to all job listings
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-[#C0C0C0] mr-2" />
          Basic search filters
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-[#C0C0C0] mr-2" />
          Email notifications
        </li>
      </ul>
    </CardContent>
  </Card>
);