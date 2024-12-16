import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";
import { X } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface JobFiltersProps {
  contractFilter: string;
  setContractFilter: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  sectorFilter: string;
  setSectorFilter: (value: string) => void;
  salaryRange: number[];
  setSalaryRange: (value: number[]) => void;
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
  salaryRange,
  setSalaryRange,
  filters,
  isLoading = false,
}: JobFiltersProps) => {
  const session = useSession();

  const handleClearFilters = () => {
    setContractFilter("all");
    setLocationFilter("all");
    setSectorFilter("all");
    setSalaryRange([0, 200000]);
  };

  const handleSaveFilters = async () => {
    if (!session?.user) {
      toast.error("Please log in to save your filters");
      return;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: session.user.id,
          preferred_sectors: sectorFilter !== 'all' ? [sectorFilter] : [],
          preferred_locations: locationFilter !== 'all' ? [locationFilter] : [],
          preferred_contract_types: contractFilter !== 'all' ? [contractFilter] : [],
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      toast.success("Filters saved successfully!");
    } catch (error) {
      console.error('Error saving filters:', error);
      toast.error("Failed to save filters");
    }
  };

  const hasActiveFilters = 
    contractFilter !== "all" || 
    locationFilter !== "all" || 
    sectorFilter !== "all" ||
    salaryRange[0] > 0 ||
    salaryRange[1] < 200000;

  const formatSalary = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 bg-white p-2 rounded-md items-start sm:items-center">
        <FilterSelect
          value={contractFilter}
          onValueChange={setContractFilter}
          options={filters?.contractTypes || []}
          placeholder="Contract Type"
          isLoading={isLoading}
          label="Types"
          tooltip="Filter jobs by employment type"
        />

        <FilterSelect
          value={locationFilter}
          onValueChange={setLocationFilter}
          options={filters?.locations || []}
          placeholder="Location"
          isLoading={isLoading}
          label="Locations"
          tooltip="Filter jobs by location"
        />

        <FilterSelect
          value={sectorFilter}
          onValueChange={setSectorFilter}
          options={filters?.sectors || []}
          placeholder="Sector"
          isLoading={isLoading}
          label="Sectors"
          tooltip="Filter jobs by industry sector"
        />

        <div className="w-full sm:w-[200px] space-y-2">
          <label className="text-sm text-gray-500">Salary Range</label>
          <Slider
            value={salaryRange}
            onValueChange={setSalaryRange}
            min={0}
            max={200000}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatSalary(salaryRange[0])}</span>
            <span>{formatSalary(salaryRange[1])}</span>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="w-full sm:w-auto"
            >
              Clear filters
            </Button>
            {session?.user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveFilters}
                className="w-full sm:w-auto"
              >
                Save filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {contractFilter !== "all" && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {contractFilter}
              <X
                className="h-4 w-4 cursor-pointer hover:text-primary/70"
                onClick={() => setContractFilter("all")}
              />
            </div>
          )}
          {locationFilter !== "all" && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {locationFilter}
              <X
                className="h-4 w-4 cursor-pointer hover:text-primary/70"
                onClick={() => setLocationFilter("all")}
              />
            </div>
          )}
          {sectorFilter !== "all" && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {sectorFilter}
              <X
                className="h-4 w-4 cursor-pointer hover:text-primary/70"
                onClick={() => setSectorFilter("all")}
              />
            </div>
          )}
          {(salaryRange[0] > 0 || salaryRange[1] < 200000) && (
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {formatSalary(salaryRange[0])} - {formatSalary(salaryRange[1])}
              <X
                className="h-4 w-4 cursor-pointer hover:text-primary/70"
                onClick={() => setSalaryRange([0, 200000])}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};