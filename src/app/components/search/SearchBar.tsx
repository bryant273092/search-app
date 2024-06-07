import { useRouter } from "next/navigation";
import React from "react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

//TODO: Add param to prefill the current input when on the search page
//TODO: Add ability to save search history. Prop it open below the bar every time the user clicks on it
export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      setErrorMsg(
        "Hmm, seems like you forgot to tell me what to search for. Let's try that again!"
      );
    } else {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
    return;
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={query}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        {errorMsg && (
          <FormHelperText
            sx={{ alignSelf: "flex-start", paddingLeft: "10px" }} //TODO: Fix content shift when error is displayed.
            error
          >
            {errorMsg}
          </FormHelperText>
        )}
      </Box>
    </Box>
  );
}
