import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === "/";
  const navbarClass = isLandingPage 
    ? "bg-gradient-to-b from-primary/30 via-primary/10 to-transparent backdrop-blur-sm z-50"
    : "bg-[#1A1F2C]/95 backdrop-blur-sm z-50 border-b border-white/10";

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out");
    }
  };

  const NavLinks = () => (
    <>
      <Link to="/post-job">
        <Button className="bg-accent hover:bg-accent/90 text-white">Post a Job</Button>
      </Link>
      <Link to="/affiliates">
        <Button className="bg-accent hover:bg-accent/90 text-white">Affiliates</Button>
      </Link>
      {session ? (
        <>
          <Link to="/profile">
            <Button className="bg-accent hover:bg-accent/90 text-white">Profile</Button>
          </Link>
          <Button onClick={handleSignOut} className="bg-accent hover:bg-accent/90 text-white">
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button className="bg-accent hover:bg-accent/90 text-white">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-accent hover:bg-accent/90">Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className={`${navbarClass} absolute w-full`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#E5DEFF]">
              Home Jobs for Women
            </span>
          </Link>
          
          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLinks />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-2 bg-[#1A1F2C]/95 backdrop-blur-sm p-4 rounded-lg shadow-lg animate-fade-in">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};