import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { Reviews } from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, Award } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6">
              Find Your Dream Remote Job 👩‍💻
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Search 65,000+ work from home jobs and get more interviews
            </p>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover Hidden Jobs</h3>
            <p className="text-gray-600">
              We scan the internet daily to find remote jobs not posted on LinkedIn
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mentorship Program</h3>
            <p className="text-gray-600">
              Get personalized guidance and guaranteed interviews
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Premium Support</h3>
            <p className="text-gray-600">
              We help you with your applications and interview prep
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
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
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;