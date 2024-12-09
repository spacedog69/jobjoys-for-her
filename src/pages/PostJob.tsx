import { Navbar } from "@/components/Navbar";
import { JobPostForm } from "@/components/job-post/JobPostForm";
import { PricingOptions } from "@/components/job-post/PricingOptions";

const PostJob = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto glass-morphism rounded-lg p-8 mt-16">
          <h1 className="text-4xl font-bold text-[#E5DEFF] mb-2">
            Post a New Job 👩‍💼✨
          </h1>
          <p className="text-[#E5DEFF]/80 mb-8">
            Reach over 300,000 talented women working remotely every month. 
            Let's help you find your perfect team member! 🌟
          </p>

          <JobPostForm />
          <PricingOptions />
        </div>
      </div>
    </div>
  );
};

export default PostJob;