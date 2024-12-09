import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Welcome Back</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#7C3AED",
                  brandAccent: "#6D28D9",
                },
              },
            },
          }}
          providers={[]}
          theme="light"
        />
      </div>
    </div>
  );
}