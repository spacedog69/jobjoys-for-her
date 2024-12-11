import { Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

export function PreferencesForm() {
  const session = useSession();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['user-preferences'],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Preferences</h2>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading preferences...</p>
      ) : preferences ? (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Selected Sectors</h3>
            <div className="flex flex-wrap gap-2">
              {preferences.preferred_sectors?.map((sector: string) => (
                <span
                  key={sector}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Work Types</h3>
            <div className="flex flex-wrap gap-2">
              {preferences.preferred_contract_types?.map((type: string) => (
                <span
                  key={type}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground">
            Job preferences can be updated from the main jobs page filters.
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground">
          No preferences found. You can set your preferences from the main jobs page filters.
        </p>
      )}
    </div>
  );
}