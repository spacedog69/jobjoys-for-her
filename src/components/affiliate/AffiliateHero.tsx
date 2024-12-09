import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const AffiliateHero = () => {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        <span className="text-[#E5DEFF]">Empower Women in Tech:</span>
        <br />
        <span className="text-primary">Join Our Affiliate Revolution</span>
      </h1>
      
      <p className="text-xl text-gray-300 max-w-2xl mx-auto">
        Earn 40% commission for every paying customer you refer, while helping women find their dream remote jobs.
      </p>

      <div className="flex justify-center items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <img
            key={i}
            src="https://api.dicebear.com/7.x/avatars/svg?seed=${i}"
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-primary"
          />
        ))}
      </div>

      <p className="text-sm text-gray-400">
        Trusted by 5,000+ women in tech
      </p>

      <div className="flex justify-center">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
          <Rocket className="mr-2 h-5 w-5" />
          Join Our Affiliate Program
        </Button>
      </div>

      <div className="pt-12 flex justify-center">
        <Rocket className="w-24 h-24 text-primary animate-bounce" />
      </div>
    </div>
  );
};