import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WelcomeHeader } from "@/components/welcome/WelcomeHeader";
import { BasicInfoForm } from "@/components/welcome/BasicInfoForm";
import { SectorSelection } from "@/components/welcome/SectorSelection";
import { WorkTypeSelection } from "@/components/welcome/WorkTypeSelection";

type FormData = {
  email: string;
  fullName: string;
  dateOfBirth: Date;
  gender: string;
  sectors: string[];
  workTypes: string[];
};

export default function Welcome() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);

  const { data: sectors } = useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Jobs_Directory')
        .select('sector')
        .not('sector', 'is', null);
      
      if (error) throw error;
      
      const uniqueSectors = [...new Set(data.map(item => item.sector))];
      return uniqueSectors.filter(Boolean);
    }
  });

  const workTypes = ["Full-time", "Part-time", "Contract"];

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: "temporary-password",
        options: {
          data: {
            full_name: data.fullName,
            date_of_birth: date?.toISOString(),
            gender: data.gender,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (!authData.user?.id) {
        throw new Error("No user ID available");
      }

      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert({
          user_id: authData.user.id,
          preferred_sectors: selectedSectors,
          preferred_contract_types: selectedWorkTypes,
        });

      if (preferencesError) throw preferencesError;

      toast.success("Registration successful!");
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white px-4 py-8 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <WelcomeHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <BasicInfoForm 
            register={register}
            date={date}
            setDate={setDate}
          />

          <SectorSelection
            sectors={sectors || []}
            selectedSectors={selectedSectors}
            setSelectedSectors={setSelectedSectors}
          />

          <WorkTypeSelection
            workTypes={workTypes}
            selectedWorkTypes={selectedWorkTypes}
            setSelectedWorkTypes={setSelectedWorkTypes}
          />

          <Button type="submit" className="w-full">
            Complete Registration
          </Button>
        </form>
      </div>
    </div>
  );
}