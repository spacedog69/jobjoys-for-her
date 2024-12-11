import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@supabase/auth-helpers-react";

interface PersonalInfoFormProps {
  formData: {
    full_name: string;
    username: string;
    website: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalInfoForm({ formData, handleChange }: PersonalInfoFormProps) {
  const session = useSession();

  return (
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
        <Label htmlFor="username">Email</Label>
        <Input
          id="username"
          name="username"
          value={session?.user?.email || ''}
          readOnly
          className="bg-[#1A1F2C] text-gray-400"
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
}