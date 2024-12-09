import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
  isLoading: boolean;
  label: string;
  tooltip: string;
}

export const FilterSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  isLoading,
  label,
}: FilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={isLoading}>
      <SelectTrigger className="w-[180px]">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent 
        className="bg-white"
        align="start"
        sideOffset={8}
        position="popper"
        side="bottom"
      >
        <SelectItem value="all" className="animate-in fade-in-50 duration-100">
          All {label}
        </SelectItem>
        {options
          ?.filter(option => option !== null && option !== "")
          .map((option, index) => (
            <SelectItem 
              key={option} 
              value={option}
              className="animate-in fade-in-50 duration-100"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {option}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};