import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import JobPost from "./pages/JobPost";
import PostJob from "./pages/PostJob";
import Affiliates from "./pages/Affiliates";
import Profile from "./pages/Profile";
import { supabase } from "@/integrations/supabase/client";
import { StrictMode } from "react";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SessionContextProvider supabaseClient={supabase}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="flex flex-col min-h-screen">
                <div className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/job/:id" element={<JobPost />} />
                    <Route path="/post-job" element={<PostJob />} />
                    <Route path="/affiliates" element={<Affiliates />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
                <Footer />
              </div>
            </TooltipProvider>
          </SessionContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;