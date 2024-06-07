import {
  GetGallerySearchRequest,
  GetGallerySearchResponse,
  REQUEST_OPTIONS,
} from "@/app/types";

const IMGUR_BASE_ENDPOINT = "https://api.imgur.com/3/";
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const QUERY_PARAM = "q";

//TODO: Add support for pagination.
//TODO: Look into cleaning up this function with helper methods.
export async function getGallerySearch(
  request: GetGallerySearchRequest
): Promise<GetGallerySearchResponse> {
  const truncatedResponse: GetGallerySearchResponse = {
    images: [],
    errorMessage: undefined,
  };
  if (!request.query) {
    truncatedResponse.errorMessage =
      "Error: No query found in GetGallerySearchRequest"; //TODO: Make this a friendlier user facing error
    return truncatedResponse;
  }

  const requestOptions: REQUEST_OPTIONS = {
    method: "GET",
    headers: new Headers({
      Authorization: `Client-ID ${CLIENT_ID}`,
    }),
  };

  const url = buildGallerySearchImagesUrl(request);

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      //TODO: Improve error handling + messaging.
      truncatedResponse.errorMessage =
        "Something went wrong. Please try again later.";
      console.error(
        "Error: Fetch request to GetGallerySearch failed " + response.status
      );
      return truncatedResponse;
    }
    const json = await response.json();

    // Construct a new object with the urls and the title to the images . There are some entries with nested images that we also iterate through.
    truncatedResponse.images = json.data.flatMap(
      (entry: { images: []; link: string; title: string }) => { //TODO: Look into how to future proof this inferred type/response.
        // If the entry doesn't have images and isn't a video, create a GalleryImage directly.
        if (!entry.images && !entry.link?.endsWith(".mp4")) {
          return {
            link: entry.link,
            title: entry.title,
          };
        }

        // Otherwise, filter out images without links or those that are videos, then map them to GalleryImages.
        return (entry.images || [])
          .filter(
            (image: { link: string }) =>
              image.link && !image.link.endsWith(".mp4")
          )
          .map((image: string) => ({
            link: image.link,
            title: entry.title,
          }));
      }
    );
  } catch (error) {
    console.error(error);
    //TODO: Add better error handling and messaging
    truncatedResponse.errorMessage =
      "Something went wrong. Please try again later.";
    throw(error)
  } finally {
    return truncatedResponse;
  }
}

function buildGallerySearchImagesUrl(request: GetGallerySearchRequest): URL {
  //TODO: Look into sanitizing against exploitation of url manipulation.
  const gallerySearchPath = "gallery/search";
  const url = new URL(IMGUR_BASE_ENDPOINT);
  url.pathname += gallerySearchPath;

  if (request.sortOption) {
    url.pathname += `/${request.sortOption}`;
    if (request.sortOption === "top" && request.windowOption) {
      url.pathname += `/${request.windowOption}`;
    }
  }
  if (request.page) url.pathname += `/${request.page}`;
  url.searchParams.set(QUERY_PARAM, decodeURI(request.query));
  return url;
}
