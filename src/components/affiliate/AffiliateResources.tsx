import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const AffiliateResources = () => {
  const resources = [
    "Email templates for reaching out",
    "Social media post examples",
    "Banner images and creatives",
    "Affiliate marketing guides",
    "Success stories and testimonials"
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#E5DEFF]">
        Resources to Help You Succeed
      </h2>

      <div className="bg-[#232836] p-8 rounded-lg max-w-2xl mx-auto">
        <ul className="space-y-4 mb-8">
          {resources.map((resource, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-300">
              <span className="text-primary">✨</span>
              {resource}
            </li>
          ))}
        </ul>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            <Rocket className="mr-2 h-5 w-5" />
            Start Earning Today
          </Button>
        </div>
      </div>
    </div>
  );
};