import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

export const SearchBar = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const session = useSession();
  const navigate = useNavigate();
  const isLandingPage = useLocation().pathname === "/";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      // If user is logged in, navigate to jobs page with search params
      const params = new URLSearchParams();
      if (jobTitle) params.append("title", jobTitle);
      if (location) params.append("location", location);
      navigate(`/jobs?${params.toString()}`);
    } else if (isLandingPage) {
      // Show dialog only on landing page for non-authenticated users
      setShowDialog(true);
    } else {
      // If not on landing page, redirect to login
      navigate("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
        <div className="flex-1">
          <Input 
            placeholder="🔍 Job Title or Keywords" 
            className="h-12"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Input 
            placeholder="📍 Location (Remote)" 
            className="h-12"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button type="submit" className="h-12 px-8 bg-accent hover:bg-accent/90">
          <Search className="mr-2 h-5 w-5" />
          Search Jobs
        </Button>
      </form>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">
              🎯 We Found Your Perfect Match!
            </DialogTitle>
            <DialogDescription className="text-center space-y-4">
              <p className="text-lg">
                <span className="font-semibold text-primary">200+ jobs</span> match your search for{" "}
                <span className="font-semibold">{jobTitle || "any position"}</span>
                {location && (
                  <> in <span className="font-semibold">{location}</span></>
                )}
              </p>
              <div className="p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-lg text-foreground">
                  Get Instant Access to:
                </h3>
                <ul className="space-y-2 text-left">
                  <li>✨ Exclusive remote job listings</li>
                  <li>🚀 Early access to new opportunities</li>
                  <li>📈 Salary insights and negotiations tips</li>
                </ul>
              </div>
              <Link to="/signup" className="block">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
                  size="lg"
                >
                  Sign Up Now
                </Button>
              </Link>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};