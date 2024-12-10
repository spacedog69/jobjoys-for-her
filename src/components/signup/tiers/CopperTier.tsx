import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface CopperTierProps {
  onSubscribe: (priceId: string) => void;
}

export const CopperTier = ({ onSubscribe }: CopperTierProps) => (
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
        onClick={() => window.location.href = '/profile'}
      >
        Subscribe Now
      </Button>
    </CardContent>
  </Card>
);