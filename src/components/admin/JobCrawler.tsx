import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FirecrawlApp from '@mendable/firecrawl-js';
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
      // Initialize FirecrawlApp with empty config (no API key needed for local usage)
      const firecrawl = new FirecrawlApp({});
      
      const response = await firecrawl.crawlUrl(url, {
        limit: 100,
        formats: ['html'],
        selectors: [
          { name: 'title', selector: 'h1.job-title' },
          { name: 'company', selector: '.company-name' },
          { name: 'location', selector: '.job-location' },
          { name: 'description', selector: '.job-description' },
          { name: 'type', selector: '.job-type' },
          { name: 'salary', selector: '.job-salary' },
        ]
      });

      if (response.success) {
        // Insert the crawled jobs into the database
        const { error } = await supabase
          .from('Jobs_Directory')
          .insert(
            response.data.map((job: any) => ({
              position: job.title,
              Company: job.company,
              location: job.location,
              JobPost: job.description,
              contractType: job.type,
              salary: job.salary,
              publishedAt: new Date().toISOString(),
            }))
          );

        if (error) throw error;
        toast.success(`Successfully crawled jobs from ${url}`);
        setUrl("");
      } else {
        throw new Error("Failed to crawl jobs");
      }
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