import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const JobPreview = () => {
  const jobs = [
    {
      title: "Senior Product Designer",
      company: "Remote Tech Co.",
      type: "Full-time",
      description: "Join our team and create amazing user experiences for our global customers.",
      salary: "$90k - $120k",
      posted: "2 days ago"
    },
    {
      title: "Accountant",
      company: "Global Payments",
      type: "Part-time",
      description: "Handle financial operations and reporting for a leading payments company.",
      salary: "$60k - $70k",
      posted: "1 day ago"
    },
    {
      title: "Marketing Coordinator",
      company: "Ecomm Star",
      type: "Full-time",
      description: "Drive marketing initiatives for a fast-growing e-commerce platform.",
      salary: "$90k - $100k",
      posted: "3 days ago"
    },
    {
      title: "Project Manager",
      company: "Engine S.L",
      type: "Full-time",
      description: "Lead and deliver complex projects in a dynamic environment.",
      salary: "$130k - $140k",
      posted: "1 week ago"
    },
    {
      title: "Data Analyst",
      company: "DataTech Solutions",
      type: "Full-time",
      description: "Transform data into actionable insights for business growth.",
      salary: "$85k - $95k",
      posted: "4 days ago"
    },
    {
      title: "UX Researcher",
      company: "Innovation Labs",
      type: "Full-time",
      description: "Conduct user research to shape product development decisions.",
      salary: "$95k - $115k",
      posted: "5 days ago"
    }
  ];

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
            <Link
              to={`/job/${i + 1}`}
              key={i}
              className="bg-white p-6 rounded-lg shadow-sm border animate-fade-in opacity-0 hover:shadow-md transition-shadow"
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