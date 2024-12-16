import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const JobCrawler = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCrawl = async () => {
    if (!url) {
      toast.error("Please enter a URL to crawl");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('crawl-jobs', {
        body: {
          url,
          selectors: {
            title: 'h1.job-title',
            company: '.company-name',
            location: '.job-location',
            description: '.job-description',
            type: '.job-type',
            salary: '.job-salary',
          },
        },
      });

      if (error) throw error;

      toast.success(`Successfully crawled jobs from ${url}`);
      setUrl("");
    } catch (error) {
      console.error('Error crawling jobs:', error);
      toast.error("Failed to crawl jobs. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Job Board Crawler</h2>
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter job board URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleCrawl} 
          disabled={isLoading}
        >
          {isLoading ? "Crawling..." : "Start Crawl"}
        </Button>
      </div>
    </div>
  );
};