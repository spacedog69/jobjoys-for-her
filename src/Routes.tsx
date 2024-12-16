import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import JobPost from "./pages/JobPost";
import PostJob from "./pages/PostJob";
import Affiliates from "./pages/Affiliates";
import Profile from "./pages/Profile";

export const Routes = () => {
  const session = useSession();

  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/job/:id" element={<JobPost />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/affiliates" element={<Affiliates />} />
      <Route path="/profile" element={<Profile />} />
    </RouterRoutes>
  );
};