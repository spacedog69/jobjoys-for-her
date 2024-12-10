import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BasicInfoFormProps {
  register: any;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
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
    </div>
  );
};