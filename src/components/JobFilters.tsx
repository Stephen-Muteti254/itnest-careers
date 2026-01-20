import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { JobFilters } from "@/types";

interface JobFiltersComponentProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  departments: string[];
  locations: string[];
  types: string[];
}

export const JobFiltersComponent = ({
  filters,
  onFiltersChange,
  departments,
  locations,
  types,
}: JobFiltersComponentProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg border">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search positions..."
          className="pl-10"
          value={filters.search || ""}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
        />
      </div>

      {/* Department Filter */}
      <Select
        value={filters.department || "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            department: value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Departments</SelectItem>
          {departments.map((dept) => (
            <SelectItem key={dept} value={dept}>
              {dept}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Location Filter */}
      <Select
        value={filters.location || "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            location: value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {locations.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {loc}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select
        value={filters.type || "all"}
        onValueChange={(value) =>
          onFiltersChange({
            ...filters,
            type: value === "all" ? undefined : value,
          })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {types.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
