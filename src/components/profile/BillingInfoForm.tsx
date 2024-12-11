import { CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { handleSubscribe } from "@/components/signup/utils/subscriptionHandler";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface BillingInfoFormProps {
  formData: {
    billing_address: string;
    phone_number: string;
    company_name: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BillingInfoForm({ formData, handleChange }: BillingInfoFormProps) {
  const { data: subscriptionData, isError } = useQuery({
    queryKey: ['subscription-details'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const response = await fetch('/api/get-subscription-details', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch subscription details');
      }
      
      return response.json();
    },
    retry: false,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Billing Information</h2>
      </div>
      
      {isError ? (
        <p className="text-muted-foreground mb-6">Unable to load subscription details.</p>
      ) : subscriptionData?.subscription ? (
        <div className="bg-[#1A1F2C] p-4 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-2">Current Subscription</h3>
          <p className="text-muted-foreground">Plan: {subscriptionData.subscription.name}</p>
          <p className="text-muted-foreground">
            Started: {format(new Date(subscriptionData.subscription.current_period_start * 1000), 'PPP')}
          </p>
          <p className="text-muted-foreground">
            Expires: {format(new Date(subscriptionData.subscription.current_period_end * 1000), 'PPP')}
          </p>
          <Button 
            onClick={() => handleSubscribe('price_copper_weekly')} 
            className="mt-4"
          >
            Extend Subscription
          </Button>
        </div>
      ) : (
        <p className="text-muted-foreground mb-6">No active subscription found.</p>
      )}

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
}