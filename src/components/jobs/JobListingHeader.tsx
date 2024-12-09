import { JobFilters } from "./JobFilters";

interface JobListingHeaderProps {
  isLoading: boolean;
  totalJobs: number;
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
  isFiltersLoading: boolean;
}

export const JobListingHeader = ({
  isLoading,
  totalJobs,
  contractFilter,
  setContractFilter,
  locationFilter,
  setLocationFilter,
  sectorFilter,
  setSectorFilter,
  filters,
  isFiltersLoading,
}: JobListingHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Latest Job Opportunities</h2>
        <p className="text-sm text-gray-500">
          {isLoading 
            ? "Loading jobs..." 
            : `Showing ${totalJobs} ${totalJobs === 1 ? 'job' : 'jobs'}`}
        </p>
      </div>
      <JobFilters 
        contractFilter={contractFilter}
        setContractFilter={setContractFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        sectorFilter={sectorFilter}
        setSectorFilter={setSectorFilter}
        filters={filters}
        isLoading={isFiltersLoading}
      />
    </div>
  );
};