import { Users, Award, Briefcase } from "lucide-react";

export const Features = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-b from-primary/20 to-primary/5">
      <div className="container mx-auto px-4">
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
    </div>
  );
};