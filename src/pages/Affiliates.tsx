import { Navbar } from "@/components/Navbar";
import { AffiliateHero } from "@/components/affiliate/AffiliateHero";
import { AffiliateFeatures } from "@/components/affiliate/AffiliateFeatures";
import { AffiliateHowItWorks } from "@/components/affiliate/AffiliateHowItWorks";
import { AffiliateFAQ } from "@/components/affiliate/AffiliateFAQ";
import { AffiliateResources } from "@/components/affiliate/AffiliateResources";

export default function Affiliates() {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 space-y-24">
        <AffiliateHero />
        <AffiliateFeatures />
        <AffiliateHowItWorks />
        <AffiliateFAQ />
        <AffiliateResources />
      </div>
    </div>
  );
}