import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";

const PostJob = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [formData, setFormData] = useState({
    jobUrl: "",
    companyUrl: "",
    linkedinUrl: "",
    additionalInfo: "",
    isBasicListing: true,
    isHighlighted: false,
    isAnalytics: false,
    isSticky: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error("Please sign in to post a job");
      navigate("/login");
      return;
    }

    try {
      const { error } = await supabase.from("Jobs_Directory").insert([
        {
          JobPost: formData.jobUrl,
          Company: formData.companyUrl,
          LinkedinURL: formData.linkedinUrl,
          text: formData.additionalInfo,
          publishedAt: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast.success("Job posted successfully! We'll review it shortly.");
      navigate("/");
    } catch (error) {
      toast.error("Error posting job. Please try again.");
      console.error("Error:", error);
    }
  };

  const calculatePrice = () => {
    let total = 199; // Basic listing
    if (formData.isHighlighted) total += 99;
    if (formData.isAnalytics) total += 49;
    if (formData.isSticky) total += 299;
    return total;
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto glass-morphism rounded-lg p-8">
          <h1 className="text-4xl font-bold text-[#E5DEFF] mb-2">
            Post a New Job 👩‍💼✨
          </h1>
          <p className="text-[#E5DEFF]/80 mb-8">
            Reach over 300,000 talented women working remotely every month. 
            Let's help you find your perfect team member! 🌟
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#E5DEFF] mb-2">
                Link to job opening 🔗
              </label>
              <Input
                placeholder="https://"
                value={formData.jobUrl}
                onChange={(e) =>
                  setFormData({ ...formData, jobUrl: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-[#E5DEFF] mb-2">
                Company homepage 🏢
              </label>
              <Input
                placeholder="https://"
                value={formData.companyUrl}
                onChange={(e) =>
                  setFormData({ ...formData, companyUrl: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-[#E5DEFF] mb-2">
                Company LinkedIn page 💼
              </label>
              <Input
                placeholder="https://www.linkedin.com/company/..."
                value={formData.linkedinUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkedinUrl: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-[#E5DEFF] mb-2">
                Additional information ✍️
              </label>
              <Textarea
                placeholder="Anything else you want us to know?"
                value={formData.additionalInfo}
                onChange={(e) =>
                  setFormData({ ...formData, additionalInfo: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white min-h-[100px]"
              />
            </div>

            <div className="space-y-4 bg-white/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#E5DEFF] mb-4">
                Add-ons 🎯
              </h3>
              
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isBasicListing}
                  onChange={(e) =>
                    setFormData({ ...formData, isBasicListing: e.target.checked })
                  }
                  className="rounded border-white/20"
                />
                <span className="text-[#E5DEFF]">
                  Basic listing ($199.00) ✨
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isHighlighted}
                  onChange={(e) =>
                    setFormData({ ...formData, isHighlighted: e.target.checked })
                  }
                  className="rounded border-white/20"
                />
                <span className="text-[#E5DEFF]">
                  Stand out with a badge and highlighted background ($99) 🏆
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isAnalytics}
                  onChange={(e) =>
                    setFormData({ ...formData, isAnalytics: e.target.checked })
                  }
                  className="rounded border-white/20"
                />
                <span className="text-[#E5DEFF]">
                  Analytics on job views and clicks ($49) 📊
                </span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.isSticky}
                  onChange={(e) =>
                    setFormData({ ...formData, isSticky: e.target.checked })
                  }
                  className="rounded border-white/20"
                />
                <span className="text-[#E5DEFF]">
                  Stick your post on the front page for 14 days ($299) 📌
                </span>
              </label>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg"
              >
                Pay Now (${calculatePrice()}.00) 💳
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;