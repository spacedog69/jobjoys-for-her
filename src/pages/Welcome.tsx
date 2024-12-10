import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CheckCircle, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      // First, sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: "temporary-password", // You might want to add a password field to the form
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

      // Create user preferences with the user ID
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
    <div className="min-h-screen bg-[#1A1F2C] text-white p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Heart className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Welcome to Our Community!</h1>
          <p className="text-lg text-gray-400">
            We're excited to have you join us. Let's get to know you better.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-[#1A1F2C]"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                className="bg-[#1A1F2C]"
                {...register("fullName", { required: true })}
              />
            </div>

            <div>
              <Label>Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Gender</Label>
              <Select onValueChange={(value) => register("gender").onChange({ target: { value } })}>
                <SelectTrigger className="bg-[#1A1F2C]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Sectors of Interest (Multiple)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {sectors?.map((sector) => (
                  <Button
                    key={sector}
                    type="button"
                    variant={selectedSectors.includes(sector) ? "default" : "outline"}
                    onClick={() => {
                      setSelectedSectors(prev =>
                        prev.includes(sector)
                          ? prev.filter(s => s !== sector)
                          : [...prev, sector]
                      );
                    }}
                    className="text-sm"
                  >
                    {sector}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>Type of Work (Multiple)</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {workTypes.map((type) => (
                  <Button
                    key={type}
                    type="button"
                    variant={selectedWorkTypes.includes(type) ? "default" : "outline"}
                    onClick={() => {
                      setSelectedWorkTypes(prev =>
                        prev.includes(type)
                          ? prev.filter(t => t !== type)
                          : [...prev, type]
                      );
                    }}
                    className="text-sm"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Complete Registration
          </Button>
        </form>
      </div>
    </div>
  );
}