import { Link } from "@/components/ui/link";

export const AffiliateHowItWorks = () => {
  const steps = [
    {
      image: "/lovable-uploads/eafbc6d8-96ef-4610-984c-71c73896d489.png",
      title: "Share Your Link",
      description: "Get your unique affiliate link and share it with your network."
    },
    {
      image: "/lovable-uploads/eafbc6d8-96ef-4610-984c-71c73896d489.png",
      title: "Empower Others",
      description: "Help women discover and apply to their dream remote jobs."
    },
    {
      image: "/lovable-uploads/eafbc6d8-96ef-4610-984c-71c73896d489.png",
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
        {steps.map((step, index) => (
          <div key={index} className="text-center space-y-4">
            <div className="bg-[#232836] p-6 rounded-lg aspect-square flex items-center justify-center">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-auto"
              />
            </div>
            <h3 className="font-semibold text-lg text-[#E5DEFF]">
              {step.title}
            </h3>
            <p className="text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};