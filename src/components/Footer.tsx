import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#1A1F2C] text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">JobJoys</h3>
            <p className="text-gray-300">
              Connecting women with their dream remote jobs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-gray-300 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/affiliates" className="text-gray-300 hover:text-white transition-colors">
                  Affiliates
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-300">
              Email: support@jobjoys.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} JobJoys. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};