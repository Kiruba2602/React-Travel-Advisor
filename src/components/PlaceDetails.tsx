import React from "react";
import { Place } from "../App";
import { Box, Card, CardContent, CardHeader, CardMedia, Rating, Typography } from "@mui/material";
import { LocationOn, Phone } from "@mui/icons-material";

interface PlaceDetailsProps {
  place: Place;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place }) => {
  return (
    <Card elevation={8}>
      <CardHeader title={place.title} />
      <CardMedia style={{ height: 350 }} image={place.photo ? place.photo.images.large.url : ""} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} />
          <Typography>
            {place.num_reviews} review{place.num_reviews > 1 && "s"}
          </Typography>
        </Box>
        {place.address && (
          <Typography
            gutterBottom
            sx={{ display: "flex", alignItems: "center", justifyContent: "start", marginTop: 4 }}
          >
            <LocationOn />
            {place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
            <Phone />
            {place.phone}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
