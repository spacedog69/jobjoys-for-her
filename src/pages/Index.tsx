import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { Reviews } from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, Award, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/5 via-primary/10 to-primary/20 py-20">
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
      <div className="py-16 container mx-auto px-4 bg-gradient-to-b from-primary/20 to-primary/5">
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

      {/* Directory Preview Section */}
      <div className="py-16 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-4xl font-bold">+15,000 Job Openings for Women</h2>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <p className="text-xl text-gray-600 mb-12">
              Discover your perfect remote position from our curated job board
            </p>
          </div>

          {/* Job Listings Preview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in opacity-0"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Senior Product Designer</h3>
                    <p className="text-primary">Remote Tech Co.</p>
                  </div>
                  <span className="bg-secondary px-3 py-1 rounded-full text-sm">
                    Full-time
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Join our team and create amazing user experiences for our global customers.
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>$90k - $120k</span>
                  <span>Posted 2 days ago</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              View All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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
