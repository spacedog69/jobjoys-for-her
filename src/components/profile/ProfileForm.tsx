import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { BillingInfoForm } from "./BillingInfoForm";
import { PreferencesForm } from "./PreferencesForm";

interface ProfileFormProps {
  profile: any;
  type: 'personal' | 'billing' | 'preferences';
}

export function ProfileForm({ profile, type }: ProfileFormProps) {
  const session = useSession();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    username: profile?.username || '',
    website: profile?.website || '',
    billing_address: profile?.billing_address || '',
    phone_number: profile?.phone_number || '',
    company_name: profile?.company_name || '',
  });

  const updateProfile = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!session?.user?.id) throw new Error('No user ID found');
      
      const updateData = {
        ...data,
        id: session.user.id, // Include the user's ID in the update data
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {type === 'personal' && <PersonalInfoForm formData={formData} handleChange={handleChange} />}
      {type === 'billing' && <BillingInfoForm formData={formData} handleChange={handleChange} />}
      {type === 'preferences' && <PreferencesForm />}
      
      <Button 
        type="submit"
        className="mt-6 bg-primary hover:bg-primary/90"
        disabled={updateProfile.isPending}
      >
        {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}