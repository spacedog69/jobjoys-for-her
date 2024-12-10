import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface WorkTypeSelectionProps {
  workTypes: string[];
  selectedWorkTypes: string[];
  setSelectedWorkTypes: (types: string[]) => void;
}

export const WorkTypeSelection = ({
  workTypes,
  selectedWorkTypes,
  setSelectedWorkTypes,
}: WorkTypeSelectionProps) => {
  return (
    <div>
      <Label>Type of Work (Multiple)</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {workTypes.map((type) => (
          <Button
            key={type}
            type="button"
            variant={selectedWorkTypes.includes(type) ? "default" : "outline"}
            onClick={() => {
              setSelectedWorkTypes(
                selectedWorkTypes.includes(type)
                  ? selectedWorkTypes.filter((t) => t !== type)
                  : [...selectedWorkTypes, type]
              );
            }}
            className={cn(
              "text-sm",
              !selectedWorkTypes.includes(type) &&
                "text-white hover:text-white bg-[#2A2F3C] hover:bg-[#3A3F4C]"
            )}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
};