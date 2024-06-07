import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SortOption,
} from "@/app/types";
interface SortProps {
  currentSort: SortOption;
}

export function SortDropdown({ currentSort }: SortProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const handleInputChange = (sortOption: SortOption) => {
    const params = new URLSearchParams(currentSearchParams);
    params.set("sort", sortOption);
    router.push(`?${params.toString()}`);
  };

  return (
    <FormControl sx={{ width: "10%", minWidth: "100px", margin: "20px 15px 0 0" }}>
      <InputLabel id="sort-select-label">Sort by</InputLabel>
      <Select
        labelId="sort-select-label"
        value={currentSort}
        label="Sort by"
        onChange={(event) =>
          handleInputChange(event.target.value as SortOption)
        }
      >
        {/* TODO: Look into more appropriate display names for these options. */}
        <MenuItem value="time">Time</MenuItem> 
        <MenuItem value="viral">Viral</MenuItem>
        <MenuItem value="top">Top</MenuItem>
      </Select>
    </FormControl>
  );
}
export function isSortOption(value: string | null): value is SortOption {
  return value === "time" || value === "viral" || value === "top";
}


