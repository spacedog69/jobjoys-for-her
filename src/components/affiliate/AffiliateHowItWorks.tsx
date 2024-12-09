import { Share2, Users, Award } from "lucide-react";

export const AffiliateHowItWorks = () => {
  const steps = [
    {
      icon: Share2,
      title: "Share Your Link",
      description: "Get your unique affiliate link and share it with your network."
    },
    {
      icon: Users,
      title: "Empower Others",
      description: "Help women discover and apply to their dream remote jobs."
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Receive 40% commission for every paying customer you refer."
    }
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#E5DEFF]">
        How It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div key={index} className="text-center space-y-4">
              <div className="bg-[#232836] p-6 rounded-lg aspect-square flex items-center justify-center">
                <IconComponent className="w-24 h-24 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-[#E5DEFF]">
                {step.title}
              </h3>
              <p className="text-gray-300">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};