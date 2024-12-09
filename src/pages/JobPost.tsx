import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ArrowLeft, Building2, MapPin, Briefcase, Clock, BadgeDollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

const JobPost = () => {
  const { id } = useParams();
  const session = useSession();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!session) {
    navigate("/login");
    return null;
  }

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');
      
      const { data, error } = await supabase
        .from('Jobs_Directory')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const handleApply = () => {
    if (job?.LinkedinURL) {
      window.open(job.LinkedinURL, '_blank');
      toast.success("Redirecting to application page");
    } else {
      toast.error("Application link not available");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Job not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h1 className="text-3xl font-bold mb-4">{job.position}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Building2 className="h-5 w-5 mr-2" />
              <span>{job.Company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="h-5 w-5 mr-2" />
              <span>{job.contractType}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>Posted {new Date(job.publishedAt || '').toLocaleDateString()}</span>
            </div>
          </div>

          {job.salary && (
            <div className="flex items-center text-gray-600 mb-6">
              <BadgeDollarSign className="h-5 w-5 mr-2" />
              <span>{job.salary}</span>
            </div>
          )}

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="whitespace-pre-wrap">{job.text}</div>
          </div>

          <Button
            size="lg"
            onClick={handleApply}
            className="w-full md:w-auto bg-primary hover:bg-primary/90"
            disabled={!job.LinkedinURL}
          >
            Apply Now
          </Button>
        </div>

        <Link to="/" className="inline-flex items-center text-primary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all jobs
        </Link>
      </div>
    </div>
  );
};

export default JobPost;