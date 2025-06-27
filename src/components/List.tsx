import React from "react";
import { Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled } from "@mui/material";
import PlaceDetails from "./PlaceDetails";
import { Place } from "../App";

export interface ListProps {
  type: string;
  setType: (type: string) => void;
  isLoading: boolean;
  childClicked: number | null;
  places: Place[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "start",
  color: (theme.vars ?? theme).palette.text.secondary,
  boxShadow: "none",
}));

const List: React.FC<ListProps> = ({ type, setType, isLoading, childClicked, places }) => {
  return (
    <Box sx={{ p: 4 }}>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl sx={{ minWidth: 250, mb: 3 }}>
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="type" label="Type" id="placetype" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2} sx={{ height: "75vh", overflow: "auto" }}>
            {places.map((place, index) => (
              <Grid size={{ xs: 12 }} key={index}>
                <Item
                  sx={{
                    border: childClicked === index ? "2px solid #1976d2" : "none",
                    transition: "0.3s",
                  }}
                >
                  <PlaceDetails place={place} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
