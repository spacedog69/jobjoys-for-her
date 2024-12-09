import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
      <div className="flex-1">
        <Input placeholder="🔍 Job Title or Keywords" className="h-12" />
      </div>
      <div className="flex-1">
        <Input placeholder="📍 Location (Remote)" className="h-12" />
      </div>
      <Button className="h-12 px-8 bg-accent hover:bg-accent/90">
        <Search className="mr-2 h-5 w-5" />
        Search Jobs
      </Button>
    </div>
  );
};