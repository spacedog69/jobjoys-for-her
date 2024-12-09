import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";

export const JobPostForm = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [formData, setFormData] = useState({
    jobUrl: "",
    companyUrl: "",
    linkedinUrl: "",
    additionalInfo: "",
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

  return (
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
    </form>
  );
};