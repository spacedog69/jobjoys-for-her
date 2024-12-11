import { Card, CardContent } from "@/components/ui/card";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Features } from "./Features";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AuthSection = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-[#232836] border-none text-white mb-12">
      <CardContent className="space-y-8 pt-6">
        <Features />
        <div className="bg-[#2A303F] p-6 rounded-lg">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#9b87f5",
                    brandAccent: "#8B5CF6",
                    defaultButtonBackground: "#9b87f5",
                    defaultButtonBackgroundHover: "#8B5CF6",
                  },
                },
              },
              className: {
                container: "max-w-none",
                button: "w-full",
                label: "text-white",
              },
            }}
            view="sign_up"
            providers={[]}
            theme="dark"
            onError={(error) => {
              if (error.message.includes("User already registered")) {
                toast.error("This email is already registered. Please log in instead.");
                navigate("/login");
              } else {
                toast.error("An error occurred during signup. Please try again.");
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};