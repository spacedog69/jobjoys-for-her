import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";
import { JobTable } from "@/components/jobs/JobTable";
import { JobListingHeader } from "@/components/jobs/JobListingHeader";
import { JobPagination } from "@/components/jobs/JobPagination";
import { useSession } from "@supabase/auth-helpers-react";
import { useSearchParams } from "react-router-dom";

export const AuthenticatedView = () => {
  const session = useSession();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [contractFilter, setContractFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const [salaryRange, setSalaryRange] = useState<number[]>([0, 200000]);
  const itemsPerPage = 30;

  const searchTitle = searchParams.get("title");
  const searchLocation = searchParams.get("location");

  const { data: userPreferences } = useQuery({
    queryKey: ['user-preferences'],
    queryFn: async () => {
      if (!session?.user) return null;
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      return data?.[0] || null;
    },
    enabled: !!session?.user,
  });

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
    queryKey: ['jobs', contractFilter, locationFilter, sectorFilter, salaryRange, searchTitle, searchLocation],
    queryFn: async () => {
      let query = supabase
        .from('Jobs_Directory')
        .select('*')
        .not('position', 'is', null)
        .not('Company', 'is', null)
        .not('location', 'is', null)
        .order('created_at', { ascending: false });

      if (searchTitle) {
        query = query.ilike('position', `%${searchTitle}%`);
      }
      
      if (searchLocation) {
        query = query.ilike('location', `%${searchLocation}%`);
      }

      if (contractFilter && contractFilter !== "all") {
        query = query.eq('contractType', contractFilter);
      }
      if (locationFilter && locationFilter !== "all") {
        query = query.eq('location', locationFilter);
      }
      if (sectorFilter && sectorFilter !== "all") {
        query = query.eq('sector', sectorFilter);
      }
      
      // Add salary range filter
      if (salaryRange[0] > 0) {
        query = query.gte('salary_max', salaryRange[0]);
      }
      if (salaryRange[1] < 200000) {
        query = query.lte('salary_min', salaryRange[1]);
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
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <JobListingHeader
            isLoading={isJobsLoading}
            totalJobs={totalJobs}
            contractFilter={contractFilter}
            setContractFilter={setContractFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            sectorFilter={sectorFilter}
            setSectorFilter={setSectorFilter}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
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
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="min-w-full inline-block align-middle">
                  <JobTable jobs={paginatedJobs} />
                </div>
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