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
          {filters?.contractTypes.map((type) => (
            <SelectItem key={type} value={type || "unknown"}>
              {type || "Unknown"}
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
          {filters?.locations.map((location) => (
            <SelectItem key={location} value={location || "unknown"}>
              {location || "Unknown"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};