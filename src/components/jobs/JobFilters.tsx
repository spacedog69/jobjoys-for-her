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
  filters: {
    contractTypes: string[];
    locations: string[];
  } | undefined;
}

export const JobFilters = ({
  contractFilter,
  setContractFilter,
  locationFilter,
  setLocationFilter,
  filters,
}: JobFiltersProps) => {
  return (
    <div className="flex gap-4">
      <Select value={contractFilter} onValueChange={setContractFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Contract Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {filters?.contractTypes
            .filter(type => type !== null && type !== "") // Filter out null and empty strings
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
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {filters?.locations
            .filter(location => location !== null && location !== "") // Filter out null and empty strings
            .map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};