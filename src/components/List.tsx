import React from "react";
import { Box, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Paper, Select, styled } from "@mui/material";
import PlaceDetails from "./PlaceDetails";
import { Place } from "../App";

export interface ListProps {
  type: string;
  setType: (type: string) => void;
  isLoading: boolean;
  childClicked: unknown;
  places: Place[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "start",
  color: (theme.vars ?? theme).palette.text.secondary,
  elevation: 0,
  boxShadow: "none"
}));

const List: React.FC<ListProps> = ({ type, setType, isLoading, childClicked, places }) => {
  return (
    <Box sx={{ p: 4 }}>
      {isLoading ? (
        <Box sx={{ justifySelf: "center", alignSelf: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <FormControl sx={{ minWidth: 200, marginBottom: 10 }}>
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="type" label="Type" id="placetype" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2} sx={{ height: "75vh", overflow: "auto" }}>
            {places &&
              places.map((place, index) => {
                return (
                  <Grid size={{ xs: 12 }}>
                    <Item>
                      <PlaceDetails key={index} place={place} />
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default List;
