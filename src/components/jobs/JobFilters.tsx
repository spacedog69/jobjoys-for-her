import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface JobFiltersProps {
  contractFilter: string;
  setContractFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  sectorFilter: string;
  setSectorFilter: (value: string) => void;
  filters: {
    contractTypes: string[];
    locations: string[];
    sectors: string[];
  } | undefined;
  isLoading?: boolean;
}

export const JobFilters = ({
  contractFilter,
  setContractFilter,
  locationFilter,
  setLocationFilter,
  sectorFilter,
  setSectorFilter,
  filters,
  isLoading = false,
}: JobFiltersProps) => {
  const handleClearFilters = () => {
    setContractFilter("all");
    setLocationFilter("all");
    setSectorFilter("all");
  };

  const hasActiveFilters = 
    contractFilter !== "all" || 
    locationFilter !== "all" || 
    sectorFilter !== "all";

  return (
    <div className="flex flex-wrap gap-4 bg-white p-2 rounded-md items-center">
      <Select value={contractFilter} onValueChange={setContractFilter} disabled={isLoading}>
        <SelectTrigger className="w-[180px]">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <SelectValue placeholder="Contract Type" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Types</SelectItem>
          {filters?.contractTypes
            ?.filter(type => type !== null && type !== "")
            .map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={locationFilter} onValueChange={setLocationFilter} disabled={isLoading}>
        <SelectTrigger className="w-[180px]">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <SelectValue placeholder="Location" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Locations</SelectItem>
          {filters?.locations
            ?.filter(location => location !== null && location !== "")
            .map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={sectorFilter} onValueChange={setSectorFilter} disabled={isLoading}>
        <SelectTrigger className="w-[180px]">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <SelectValue placeholder="Sector" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Sectors</SelectItem>
          {filters?.sectors
            ?.filter(sector => sector !== null && sector !== "")
            .map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          className="ml-2"
        >
          Clear filters
        </Button>
      )}
    </div>
  );
};