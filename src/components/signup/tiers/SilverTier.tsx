import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface SilverTierProps {
  onSubscribe: (priceId: string) => void;
}

export const SilverTier = ({ onSubscribe }: SilverTierProps) => (
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
        onClick={() => onSubscribe('prod_RMnf5HNr3zRSmD')}
      >
        Subscribe Now
      </Button>
    </CardContent>
  </Card>
);