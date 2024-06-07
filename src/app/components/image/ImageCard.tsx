import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Skeleton,
  Modal,
  Box,
  CardActionArea,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
interface ImageCardProps {
  imageUrl?: string;
  title?: string;
  loading: boolean;
}

function ImageCard({ imageUrl, title, loading }: ImageCardProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Card //TODO: Optimize responsive sizing.
        // TODO: Add tooltip on hover for title.
        role="button"
        sx={{
          maxWidth: 345,
          margin: 0,
          cursor: loading ? "default" : "pointer",
          width: "100%",
        }}
      >
        {loading ? (
          <Skeleton variant="rectangular" width={345} height={200} />
        ) : (
          <CardActionArea onClick={!loading ? handleOpenModal : undefined}>
            <CardMedia //TODO: Investigate whether these images are cached and are loaded effectively.
              component="img"
              height="200"
              width="100%"
              image={imageUrl} // TODO: Add placeholder in case resource is not found
              alt={title || "Image"}
            />
          </CardActionArea>
        )}
      </Card>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="" //TODO: Update these to the relevant values.
        aria-describedby=""
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <IconButton // TODO: Optimize responsive behavior
            sx={{
              position: "absolute",
              top: "10px",
              right: "0px",
              color: "white",
              width: "15%",
              maxWidth: "80px",
              zIndex: "100",
              minWidth: "60px",
            }}
            aria-label="close"
            onClick={handleCloseModal}
          >
            <CloseIcon
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
              }}
            />
          </IconButton>
          <img
            src={imageUrl || ""}
            alt={title || "Image"}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </Box>
      </Modal>
    </>
  );
}

export default ImageCard;
