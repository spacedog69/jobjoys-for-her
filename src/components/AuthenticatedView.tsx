import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";
import { JobTable } from "@/components/jobs/JobTable";
import { JobListingHeader } from "@/components/jobs/JobListingHeader";
import { JobPagination } from "@/components/jobs/JobPagination";
import { useSession } from "@supabase/auth-helpers-react";

export const AuthenticatedView = () => {
  const session = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const [contractFilter, setContractFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const itemsPerPage = 30;

  // Query for saved preferences
  const { data: userPreferences } = useQuery({
    queryKey: ['user-preferences'],
    queryFn: async () => {
      if (!session?.user) return null;
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      // Return the first preference if it exists, otherwise return null
      return data?.[0] || null;
    },
    enabled: !!session?.user,
  });

  // Load saved preferences
  useEffect(() => {
    if (userPreferences) {
      if (userPreferences.preferred_contract_types?.[0]) {
        setContractFilter(userPreferences.preferred_contract_types[0]);
      }
      if (userPreferences.preferred_locations?.[0]) {
        setLocationFilter(userPreferences.preferred_locations[0]);
      }
      if (userPreferences.preferred_sectors?.[0]) {
        setSectorFilter(userPreferences.preferred_sectors[0]);
      }
    }
  }, [userPreferences]);

  const { data: jobs, isLoading: isJobsLoading } = useQuery({
    queryKey: ['jobs', contractFilter, locationFilter, sectorFilter],
    queryFn: async () => {
      let query = supabase
        .from('Jobs_Directory')
        .select('*')
        .order('created_at', { ascending: false });

      if (contractFilter && contractFilter !== "all") {
        query = query.eq('contractType', contractFilter);
      }
      if (locationFilter && locationFilter !== "all") {
        query = query.eq('location', locationFilter);
      }
      if (sectorFilter && sectorFilter !== "all") {
        query = query.eq('sector', sectorFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const { data: filters, isLoading: isFiltersLoading } = useQuery({
    queryKey: ['job-filters'],
    queryFn: async () => {
      const { data: jobs } = await supabase
        .from('Jobs_Directory')
        .select('contractType, location, sector');
      
      const uniqueContractTypes = [...new Set(jobs?.map(job => job.contractType).filter(Boolean))];
      const uniqueLocations = [...new Set(jobs?.map(job => job.location).filter(Boolean))];
      const uniqueSectors = [...new Set(jobs?.map(job => job.sector).filter(Boolean))];
      
      return {
        contractTypes: uniqueContractTypes,
        locations: uniqueLocations,
        sectors: uniqueSectors
      };
    }
  });

  const paginatedJobs = jobs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = jobs ? Math.ceil(jobs.length / itemsPerPage) : 0;
  const totalJobs = jobs?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <JobListingHeader
            isLoading={isJobsLoading}
            totalJobs={totalJobs}
            contractFilter={contractFilter}
            setContractFilter={setContractFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            sectorFilter={sectorFilter}
            setSectorFilter={setSectorFilter}
            filters={filters}
            isFiltersLoading={isFiltersLoading}
          />
          
          {isJobsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-20 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <JobTable jobs={paginatedJobs} />
              </div>

              <JobPagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};