import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const JobPreview = () => {
  return (
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
            <Link
              to={`/job/${i + 1}`}
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in opacity-0 hover:shadow-md transition-shadow"
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
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              View All Jobs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};