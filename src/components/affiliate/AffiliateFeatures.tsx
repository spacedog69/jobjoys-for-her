import { Search, Users, DollarSign, Heart } from "lucide-react";

export const AffiliateFeatures = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Exclusive Women-First Jobs",
      description: "Share curated remote opportunities specifically designed for women in tech."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Supportive Community",
      description: "Join a network of women helping other women succeed in their careers."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Higher Commissions",
      description: "Earn more than competitors - 40% commission on every referral."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Make a Difference",
      description: "Help close the gender gap in tech while earning passive income."
    }
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#E5DEFF]">
        Why Become an Affiliate?
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#232836] p-6 rounded-lg hover:scale-105 transition-transform"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-[#E5DEFF]">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};