import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, CreditCard, Settings } from "lucide-react";

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
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', session?.user?.id);

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

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          className="bg-[#1A1F2C]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="bg-[#1A1F2C]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">LinkedIn Profile</Label>
        <Input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
          className="bg-[#1A1F2C]"
        />
      </div>
    </div>
  );

  const renderBillingInfo = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Billing Information</h2>
      </div>
      <div className="space-y-2">
        <Label htmlFor="billing_address">Billing Address</Label>
        <Input
          id="billing_address"
          name="billing_address"
          value={formData.billing_address}
          onChange={handleChange}
          className="bg-[#1A1F2C]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone_number">Phone Number</Label>
        <Input
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          className="bg-[#1A1F2C]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="bg-[#1A1F2C]"
        />
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Preferences</h2>
      </div>
      <p className="text-muted-foreground">
        Job preferences can be updated from the main jobs page filters.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {type === 'personal' && renderPersonalInfo()}
      {type === 'billing' && renderBillingInfo()}
      {type === 'preferences' && renderPreferences()}
      
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