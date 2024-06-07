import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { WindowOption } from "@/app/types";
interface WindowProps {
  currentWindow: WindowOption;
}

export function WindowDropdown({ currentWindow }: WindowProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();

  const handleInputChange = (windowOption: WindowOption) => {
    const params = new URLSearchParams(currentSearchParams);
    params.set("window", windowOption);
    router.push(`?${params.toString()}`);
  };

  // TODO: Leverage enum types for windowOptions.
  return (
    <FormControl sx={{ width: "10%", minWidth: "150px", marginTop: "20px" }}>
      <InputLabel id="window-select-label">From</InputLabel>
      <Select
        labelId="window-select-label"
        value={currentWindow}
        label="From"
        onChange={(event) =>
          handleInputChange(event.target.value as WindowOption)
        }
      >
        <MenuItem value="day">Today</MenuItem>
        <MenuItem value="week">This week</MenuItem>
        <MenuItem value="month">This month</MenuItem>
        <MenuItem value="year">This year</MenuItem>
        <MenuItem value="all">All time</MenuItem>
      </Select>
    </FormControl>
  );
}

export function isWindowOption(value: string | null): value is WindowOption {
  return ["day", "week", "month", "year", "all"].includes(value as string);
}
