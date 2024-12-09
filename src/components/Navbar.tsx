import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
          <Link to="/login">
            <Button variant="outline">Log In</Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-accent hover:bg-accent/90">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};