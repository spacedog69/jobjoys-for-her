import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface CopperTierProps {
  onSubscribe: (priceId: string) => void;
}

export function CopperTier({ onSubscribe }: CopperTierProps) {
  return (
    <div className="rounded-lg border border-white p-8 bg-[#1A1F2C] hover:scale-105 transition-transform">
      <h3 className="text-2xl font-bold mb-4">Copper</h3>
      <p className="text-3xl font-bold mb-4">$6<span className="text-lg">/week</span></p>
      <Button 
        className="w-full bg-[#B87333] hover:bg-[#B87333]/80 text-white"
        onClick={() => window.location.href = '/welcome'}
      >
        Subscribe Now
      </Button>
      <ul className="mt-8 space-y-4">
        <li className="flex items-center">
          <Check className="h-5 w-5 text-[#B87333] mr-2" />
          Access to all job listings
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-[#B87333] mr-2" />
          Basic search filters
        </li>
        <li className="flex items-center">
          <Check className="h-5 w-5 text-[#B87333] mr-2" />
          Email notifications
        </li>
      </ul>
    </div>
  );
}