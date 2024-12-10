import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface GoldTierProps {
  onSubscribe: (priceId: string) => void;
}

export const GoldTier = ({ onSubscribe }: GoldTierProps) => (
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
        onClick={() => onSubscribe('price_1QU4FcEUIbv2rtd6Aw1ddLni')}
      >
        Subscribe Now
      </Button>
    </CardContent>
  </Card>
);