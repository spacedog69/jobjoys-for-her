import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SectorSelectionProps {
  sectors: string[];
  selectedSectors: string[];
  setSelectedSectors: (sectors: string[]) => void;
}

export const SectorSelection = ({
  sectors,
  selectedSectors,
  setSelectedSectors,
}: SectorSelectionProps) => {
  return (
    <div>
      <Label>Sectors of Interest (Multiple)</Label>
      <div className="flex flex-wrap gap-2 mt-2">
        {sectors?.map((sector) => (
          <Button
            key={sector}
            type="button"
            variant={selectedSectors.includes(sector) ? "default" : "outline"}
            onClick={() => {
              setSelectedSectors(
                selectedSectors.includes(sector)
                  ? selectedSectors.filter((s) => s !== sector)
                  : [...selectedSectors, sector]
              );
            }}
            className={cn(
              "text-sm",
              !selectedSectors.includes(sector) &&
                "text-white hover:text-white bg-[#2A2F3C] hover:bg-[#3A3F4C]"
            )}
          >
            {sector}
          </Button>
        ))}
      </div>
    </div>
  );
};