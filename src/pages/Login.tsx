import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (session) {
        console.log("User is logged in, redirecting to home");
        navigate("/");
      }
    });

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Initial session check:", session);
      if (session) {
        console.log("Initial session exists, redirecting to home");
        navigate("/");
      }
    };
    
    checkSession();
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