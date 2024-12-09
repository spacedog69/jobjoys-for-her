import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";
import { X } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const session = useSession();

  const handleClearFilters = () => {
    setContractFilter("all");
    setLocationFilter("all");
    setSectorFilter("all");
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
    sectorFilter !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 bg-white p-2 rounded-md items-center">
        <FilterSelect
          value={contractFilter}
          onValueChange={setContractFilter}
          options={filters?.contractTypes || []}
          placeholder="Contract Type"
          isLoading={isLoading}
          label="Types"
          tooltip="Filter jobs by employment type (Full-time, Part-time, Contract, etc.)"
        />

        <FilterSelect
          value={locationFilter}
          onValueChange={setLocationFilter}
          options={filters?.locations || []}
          placeholder="Location"
          isLoading={isLoading}
          label="Locations"
          tooltip="Filter jobs by location (Remote, Office, Hybrid)"
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

        {hasActiveFilters && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="ml-2"
            >
              Clear filters
            </Button>
            {session?.user && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveFilters}
                className="ml-2"
              >
                Save filters
              </Button>
            )}
          </>
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
        </div>
      )}
    </div>
  );
};