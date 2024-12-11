import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

export const JobPreview = () => {
  const session = useSession();
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const jobs = [
    {
      title: "Senior Product Designer",
      company: "Remote Tech Co.",
      type: "Full-time",
      description: "Join our team and create amazing user experiences for our global customers.",
      salary: "$90k - $120k",
      posted: "2 days ago",
      count: 150
    },
    {
      title: "Accountant",
      company: "Global Payments",
      type: "Part-time",
      description: "Handle financial operations and reporting for a leading payments company.",
      salary: "$60k - $70k",
      posted: "1 day ago",
      count: 80
    },
    {
      title: "Marketing Coordinator",
      company: "Ecomm Star",
      type: "Full-time",
      description: "Drive marketing initiatives for a fast-growing e-commerce platform.",
      salary: "$90k - $100k",
      posted: "3 days ago",
      count: 120
    },
    {
      title: "Project Manager",
      company: "Engine S.L",
      type: "Full-time",
      description: "Lead and deliver complex projects in a dynamic environment.",
      salary: "$130k - $140k",
      posted: "1 week ago",
      count: 200
    },
    {
      title: "Data Analyst",
      company: "DataTech Solutions",
      type: "Full-time",
      description: "Transform data into actionable insights for business growth.",
      salary: "$85k - $95k",
      posted: "4 days ago",
      count: 175
    },
    {
      title: "UX Researcher",
      company: "Innovation Labs",
      type: "Full-time",
      description: "Conduct user research to shape product development decisions.",
      salary: "$95k - $115k",
      posted: "5 days ago",
      count: 90
    }
  ];

  const handleJobClick = (job: any) => {
    if (!session) {
      setSelectedJob(job.title);
      setIsDialogOpen(true);
    } else {
      // If authenticated, navigate to job details
      window.location.href = `/job/${job.title.toLowerCase().replace(/ /g, '-')}`;
    }
  };

  return (
    <div className="py-16 bg-[#F8F8F9]">
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
          {jobs.map((job, i) => (
            <div
              key={i}
              onClick={() => handleJobClick(job)}
              className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in opacity-0 hover:shadow-md transition-shadow cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                  <p className="text-primary">{job.company}</p>
                </div>
                <span className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {job.type}
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {job.description}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{job.salary}</span>
                <span>Posted {job.posted}</span>
              </div>
            </div>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-2">
              {selectedJob && `${jobs.find(j => j.title === selectedJob)?.count}+ ${selectedJob} Roles Available`}
            </DialogTitle>
            <DialogDescription className="text-base mb-4">
              Sign up now to access all remote job opportunities for women in tech
            </DialogDescription>
          </DialogHeader>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};