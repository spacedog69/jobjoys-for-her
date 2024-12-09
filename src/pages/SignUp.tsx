import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Diamond, DollarSign, Check, Search, Rocket, Bell } from "lucide-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Reviews } from "@/components/Reviews";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-24 px-4">
        <div className="bg-secondary/20 rounded-lg p-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-[#E5DEFF]">
            Discover 65,000+
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-primary">
            Remote Jobs for Women
          </h2>
        </div>

        {/* Subscription Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-[#232836] border-none text-white hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Copper</span>
                <DollarSign className="w-6 h-6 text-[#B87333]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$6<span className="text-lg">/week</span></p>
              <Button className="w-full bg-[#B87333] hover:bg-[#B87333]/80 text-white">
                Subscribe Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#232836] border-none text-white hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Silver</span>
                <DollarSign className="w-6 h-6 text-[#C0C0C0]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$20<span className="text-lg">/month</span></p>
              <Button className="w-full bg-[#C0C0C0] hover:bg-[#C0C0C0]/80 text-[#232836]">
                Subscribe Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#232836] border-none text-white hover:scale-105 transition-transform">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Gold</span>
                <DollarSign className="w-6 h-6 text-[#FFD700]" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4">$89<span className="text-lg">/year</span></p>
              <Button className="w-full bg-[#FFD700] hover:bg-[#FFD700]/80 text-[#232836]">
                Subscribe Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Platinum Tier */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-[#232836] to-[#2a303f] border-2 border-[#E5E4E2] text-white hover:scale-105 transition-transform shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(229,228,226,0.2)_50%,transparent_100%)] animate-[shine_3s_infinite]"></div>
            <CardHeader className="space-y-4">
              <CardTitle className="flex items-center justify-between text-2xl">
                <span className="flex items-center gap-2">
                  <Diamond className="w-8 h-8 text-[#E5E4E2]" />
                  Platinum
                </span>
                <span className="text-3xl font-bold">$499</span>
              </CardTitle>
              <p className="text-lg text-gray-300">Premium Career Acceleration Package</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                {[
                  "1-on-1 Sessions with Expert Recruiters 👩‍💼",
                  "Personalized Career Mentorship Program 🌟",
                  "Professional Resume Review & Optimization ✨",
                  "Dedicated Job Application Service 📝",
                  "Job Offer Guarantee within 30 Days or Full Refund 💫"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#E5E4E2] mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-[#E5E4E2] to-[#C0C0C0] hover:from-[#C0C0C0] hover:to-[#E5E4E2] text-[#232836] font-bold text-lg py-6">
                Accelerate Your Career
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Card */}
        <Card className="bg-[#232836] border-none text-white mb-12">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              Unlock 65,000+ jobs
              <br />
              and get more interviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Discover hidden jobs
                  </h3>
                  <p className="text-gray-300">
                    We scan the internet everyday and find remote jobs perfect for women,
                    not posted on LinkedIn or other job boards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Head start against the competition
                  </h3>
                  <p className="text-gray-300">
                    We find jobs within 24 hours of being posted, so you can apply
                    before everyone else.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Bell className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Be the first to know
                  </h3>
                  <p className="text-gray-300">
                    Get instant notifications for new remote opportunities that match
                    your preferences.
                  </p>
                </div>
              </div>
            </div>

            {/* Auth Component */}
            <div className="bg-[#2A303F] p-6 rounded-lg">
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#9b87f5",
                        brandAccent: "#8B5CF6",
                        defaultButtonBackground: "#9b87f5",
                        defaultButtonBackgroundHover: "#8B5CF6",
                      },
                    },
                  },
                  className: {
                    container: "max-w-none",
                    button: "w-full",
                    label: "text-white",
                  },
                }}
                view="sign_up"
                providers={[]}
                theme="dark"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Reviews />
      </div>
    </div>
  );
}
