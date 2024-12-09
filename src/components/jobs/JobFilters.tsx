import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";

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
      <FilterSelect
        value={contractFilter}
        onValueChange={setContractFilter}
        options={filters?.contractTypes || []}
        placeholder="Contract Type"
        isLoading={isLoading}
        label="Types"
      />

      <FilterSelect
        value={locationFilter}
        onValueChange={setLocationFilter}
        options={filters?.locations || []}
        placeholder="Location"
        isLoading={isLoading}
        label="Locations"
      />

      <FilterSelect
        value={sectorFilter}
        onValueChange={setSectorFilter}
        options={filters?.sectors || []}
        placeholder="Sector"
        isLoading={isLoading}
        label="Sectors"
      />

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