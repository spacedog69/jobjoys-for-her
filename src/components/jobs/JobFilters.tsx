import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
}

export const JobFilters = ({
  contractFilter,
  setContractFilter,
  locationFilter,
  setLocationFilter,
  sectorFilter,
  setSectorFilter,
  filters,
}: JobFiltersProps) => {
  return (
    <div className="flex gap-4 bg-white p-2 rounded-md">
      <Select value={contractFilter} onValueChange={setContractFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Contract Type" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Types</SelectItem>
          {filters?.contractTypes
            ?.filter(type => type !== null && type !== "") // Filter out null and empty strings
            .map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={locationFilter} onValueChange={setLocationFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Locations</SelectItem>
          {filters?.locations
            ?.filter(location => location !== null && location !== "") // Filter out null and empty strings
            .map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select value={sectorFilter} onValueChange={setSectorFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sector" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All Sectors</SelectItem>
          {filters?.sectors
            ?.filter(sector => sector !== null && sector !== "") // Filter out null and empty strings
            .map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};