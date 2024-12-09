import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export const Navbar = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  return (
    <nav className="absolute w-full bg-transparent z-10">
      <div className="container mx-auto px-4 py-8 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#1A1F2C]">
            Home Jobs for Women
          </span>
        </Link>
        <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </nav>
  );
};