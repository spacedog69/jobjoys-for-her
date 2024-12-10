import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoFormProps {
  register: any;
  date: string | undefined;
  setDate: (date: string | undefined) => void;
}

export const BasicInfoForm = ({ register, date, setDate }: BasicInfoFormProps) => {
  return (
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
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          placeholder="DD/MM/YYYY"
          className="bg-[#1A1F2C]"
          {...register("dateOfBirth")}
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div>
        <Label>Gender</Label>
        <Select onValueChange={(value) => register("gender").onChange({ target: { value } })}>
          <SelectTrigger className="bg-[#1A1F2C]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};