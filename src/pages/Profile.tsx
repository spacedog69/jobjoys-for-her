import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>
        
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-[#232836]">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <Card className="bg-[#232836] border-none text-white">
            {isLoading ? (
              <div className="p-6 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <>
                <TabsContent value="personal">
                  <ProfileForm profile={profile} type="personal" />
                </TabsContent>
                <TabsContent value="billing">
                  <ProfileForm profile={profile} type="billing" />
                </TabsContent>
                <TabsContent value="preferences">
                  <ProfileForm profile={profile} type="preferences" />
                </TabsContent>
              </>
            )}
          </Card>
        </Tabs>
      </main>
    </div>
  );
}