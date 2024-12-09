import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const NavLinks = () => (
    <>
      <Link to="/post-job">
        <Button variant="outline">Post a Job</Button>
      </Link>
      <Link to="/affiliates">
        <Button variant="outline">Affiliates</Button>
      </Link>
      {session ? (
        <>
          <Link to="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/login">
            <Button className="bg-accent hover:bg-accent/90">Sign Up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="absolute w-full bg-transparent z-10">
      <div className="w-full px-4 py-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#1A1F2C]">
              Home Jobs for Women
            </span>
          </Link>
          
          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLinks />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="mt-4 flex flex-col space-y-2 bg-white/95 p-4 rounded-lg shadow-lg animate-fade-in">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};