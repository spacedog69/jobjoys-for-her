import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import FirecrawlApp from "@mendable/firecrawl-js";
import { supabase } from "@/integrations/supabase/client";

export const JobCrawler = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Initialize FirecrawlApp with empty config (no API key needed for local usage)
      const firecrawl = new FirecrawlApp({});
      
      const response = await firecrawl.crawlUrl(url, {
        limit: 100,
        scrapeOptions: {
          waitForSelector: 'body',
          extractors: [
            { name: 'title', selector: 'h1.job-title' },
            { name: 'company', selector: '.company-name' },
            { name: 'location', selector: '.job-location' },
            { name: 'description', selector: '.job-description' },
            { name: 'type', selector: '.job-type' },
            { name: 'salary', selector: '.job-salary' },
          ]
        }
      });

      if (response.success) {
        const { data: jobsData } = await supabase
          .from('Jobs_Directory')
          .insert(response.data.map((job: any) => ({
            Company: job.company,
            position: job.title,
            location: job.location,
            JobPost: job.description,
            contractType: job.type,
            salary: job.salary,
          })));

        toast.success('Jobs crawled and saved successfully');
      } else {
        toast.error('Failed to crawl jobs');
      }
    } catch (error) {
      console.error('Error crawling jobs:', error);
      toast.error('Error crawling jobs');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleCrawl} className="space-y-4">
      <div className="flex gap-4">
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter job board URL"
          required
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Crawling..." : "Crawl Jobs"}
        </Button>
      </div>
    </form>
  );
};