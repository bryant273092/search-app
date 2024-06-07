import { Grid } from "@mui/material";
import ImageCard from "./ImageCard";
import { GalleryImage } from "@/app/types";

interface ImageGridProps {
  images: GalleryImage[];
  loading?: boolean;
}

function ImageGrid({ images, loading = false }: ImageGridProps) {
  return (
    <Grid container spacing={3}>
      {loading
        ? Array.from(
            { length: 20 },
            (
              _,
              index // Iterate over a range of 20
            ) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <ImageCard loading={loading} />
              </Grid>
            )
          )
        : images.map((image, index) => (
            <Grid item sx={{margin: "0", paddingLeft: "0"}} xs={6} sm={6} md={4} lg={3} key={index}>
              <ImageCard
                imageUrl={image.link}
                title={image.title}
                loading={loading}
              />
            </Grid>
          ))}
    </Grid>
  );
}

export default ImageGrid;
