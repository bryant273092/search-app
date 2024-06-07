"use client";

import { useSearchParams } from "next/navigation";
import { getGallerySearch } from "@/app/api/imgur";
import { Box } from "@mui/material";
import { GalleryImage } from "@/app/types";
import { GetGallerySearchRequest, GetGallerySearchResponse } from "@/app/types";
import { useEffect, useState } from "react";
import SearchBar from "@/app/components/search/SearchBar";
import ImageGrid from "@/app/components/image/ImageGrid";
import { SortDropdown, isSortOption } from "@/app/components/search/Sort";
import { WindowDropdown, isWindowOption } from "@/app/components/search/Window";

export default function SearchResultsPage({
  params,
}: {
  params: { query: string };
}) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  // TODO: Investigate if we can clean this up further.
  const searchParams = useSearchParams();
  const query = decodeURI(params.query);
  const sortParam = searchParams.get("sort");
  const windowParam = searchParams.get("window");
  // TODO: Add support for pagination.
  const sortOption = isSortOption(sortParam) ? sortParam : "time";
  const windowOption = isWindowOption(windowParam) ? windowParam : "all";

  useEffect(() => {
    // TODO: Test and validate the flow of the function.
    async function fetchData() {
      if (!query) return;
      setIsLoading(true);
      try {
        const request: GetGallerySearchRequest = {
          query: query,
          sortOption: sortOption,
          windowOption: windowOption,
        };
        const results: GetGallerySearchResponse = await getGallerySearch(
          request
        );
        if (results.images) setImages(results.images);
        if (results.errorMessage) setErrorMsg(results.errorMessage);
      } catch (error) {
        // TODO: Add some better error handling + messaging
        console.error(error);
        setErrorMsg("Something went wrong. Please try again later."); //TODO: Create a file for all strings in application aka reduce duplication.
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  const mainContent = (children: React.ReactNode) => {
    // TODO: Add ability to clear sort options with a button.
    return (
      <main>
        <SearchBar />
        <SortDropdown currentSort={sortOption} />
        {sortOption === "top" && ( //TODO: Remove hard code reference.
          <WindowDropdown currentWindow={windowOption} />
        )}
        {children}
      </main>
    );
  };

  // TODO: Extensively test out the different scenarios possible.
  if (isLoading) {
    return mainContent(
      <Box sx={{ width: "min-width", marginTop: "62px" }}>
        <ImageGrid images={images} loading={isLoading} />
      </Box>
    );
  } 
  
  else if (images.length > 0 && query !== "") {
    return mainContent(
      <div>
        <h2>
          Found {images.length} results for <em>{query}</em>
        </h2>
        <Box sx={{ width: "min-width" }}>
          <ImageGrid images={images} loading={isLoading} />
        </Box>
      </div>
    );
  } 
  
  else if (errorMsg) {
    // TODO: Add additional styling
    return mainContent(<h3>{errorMsg}</h3>);
  } 
  
  else if (images.length === 0 && query !== "") {
    //TODO: Iterate on this copy.
    return mainContent(
      <h3>
        There were no results for <em>{query}</em>
      </h3>
    );
  }

  // TODO: Add final catch all case.
}
