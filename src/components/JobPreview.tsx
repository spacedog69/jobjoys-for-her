import { Star, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { JobCard } from "./jobs/JobCard";
import { JobDialog } from "./jobs/JobDialog";

export const JobPreview = () => {
  const session = useSession();
  const navigate = useNavigate();
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
      window.location.href = `/job/${job.title.toLowerCase().replace(/ /g, '-')}`;
    }
  };

  const handleViewAllJobs = () => {
    navigate('/signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jobs.map((job, i) => (
            <JobCard
              key={i}
              job={job}
              index={i}
              onJobClick={handleJobClick}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
            onClick={handleViewAllJobs}
          >
            View All Jobs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      <JobDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedJob={selectedJob}
        jobCount={selectedJob ? jobs.find(j => j.title === selectedJob)?.count || 0 : 0}
      />
    </div>
  );
};