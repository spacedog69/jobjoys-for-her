import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Users, Award, Star, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Reviews } from "@/components/Reviews";
import { AuthenticatedView } from "@/components/AuthenticatedView";
import { Features } from "@/components/Features";
import { JobPreview } from "@/components/JobPreview";
import { NewsletterPopup } from "@/components/NewsletterPopup";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If not authenticated, show landing page
  if (!session) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <NewsletterPopup />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary via-primary/70 to-primary/20 pt-40 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-6 text-white">
                Find Your Dream Remote Job 👩‍💻
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Search 65,000+ work from home jobs and get more interviews
              </p>
              <SearchBar />
            </div>
          </div>
        </div>

        <Features />
        <JobPreview />
        <Reviews />

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-accent py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Remote Journey? 🚀
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of women who have found their perfect remote job through our platform
            </p>
            <Button
              size="lg"
              className="bg-white text-accent hover:bg-white/90"
              onClick={handleGetStarted}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view
  return <AuthenticatedView />;
};

export default Index;