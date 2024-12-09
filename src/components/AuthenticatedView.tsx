import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SearchBar } from "@/components/SearchBar";
import { Navbar } from "@/components/Navbar";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobTable } from "@/components/jobs/JobTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const AuthenticatedView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [contractFilter, setContractFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");
  const itemsPerPage = 30;

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
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Latest Job Opportunities</h2>
              <p className="text-sm text-gray-500">
                {isJobsLoading 
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

              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i + 1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(i + 1)}
                          isActive={currentPage === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};