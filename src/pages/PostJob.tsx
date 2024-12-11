import { Navbar } from "@/components/Navbar";
import { JobPostForm } from "@/components/job-post/JobPostForm";
import { PricingOptions } from "@/components/job-post/PricingOptions";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const PostJob = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      toast.success(
        "Thank you for posting your job! 🎉 We've received your submission and it will be live soon! ✨",
        {
          duration: 6000,
        }
      );
    }
  }, [searchParams]);

  return (
    <>
      <Helmet>
        <title>Post a Remote Job for Women | JobJoys</title>
        <meta 
          name="description" 
          content="Post your remote job opportunity and reach over 300,000 talented women professionals. Find your perfect team member with JobJoys' specialized job board." 
        />
        <meta 
          name="keywords" 
          content="remote jobs, women in tech, job posting, remote work, female professionals, job board" 
        />
        <meta property="og:title" content="Post a Remote Job for Women | JobJoys" />
        <meta 
          property="og:description" 
          content="Post your remote job opportunity and reach over 300,000 talented women professionals. Find your perfect team member with JobJoys' specialized job board." 
        />
        <link rel="canonical" href="https://jobjoys.com/post-job" />
      </Helmet>

      <main className="min-h-screen bg-[#1A1F2C]">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <article className="max-w-3xl mx-auto glass-morphism rounded-lg p-8 mt-16">
            <header>
              <h1 className="text-4xl font-bold text-[#E5DEFF] mb-2">
                Post a New Job 👩‍💼✨
              </h1>
              <p className="text-[#E5DEFF]/80 mb-8">
                Reach over 300,000 talented women working remotely every month. 
                Let's help you find your perfect team member! 🌟
              </p>
            </header>

            <section>
              <JobPostForm />
            </section>

            <section>
              <PricingOptions />
            </section>
          </article>
        </div>
      </main>
    </>
  );
};

export default PostJob;