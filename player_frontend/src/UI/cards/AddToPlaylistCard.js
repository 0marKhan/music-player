import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({
  playlistData,
  addSongToPlaylist,
  closeAddToPlaylistModal,
}) {
  return (
    <Card
      sx={{ maxWidth: 150, borderRadius: 3 }}
      onClick={() => {
        addSongToPlaylist(playlistData._id);
        closeAddToPlaylistModal();
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ height: 140 }}
          image={playlistData.thumbnail}
          alt="playlist image"
          sx={{
            borderRadius: 0,
            objectFit: "cover",
            width: "100%",
          }}
        />
        <CardContent sx={{ backgroundColor: "black", color: "white" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography
              gutterBottom
              variant="h7"
              component="div"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
              }}
            >
              {playlistData.name}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
