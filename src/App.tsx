import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { CssBaseline, Grid } from "@mui/material";
import Map from "./components/Map";
import List from "./components/List";
import { getPlacesData } from "./api/travelAdvisorAPI";

export interface Place {
  name: string;
  num_reviews: number;
  [key: string]: any; // optional: allows other properties
}

function App() {
  const [type, setType] = useState<string>("restaurants");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [childClicked, setChildClicked] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type).then((data) => {
      setPlaces(data.filter((place: Place) => place.name && place.num_reviews > 0));
      setIsLoading(false);
    });
  }, [type, setPlaces]);
  return (
    <div>
      <CssBaseline />
      <Header />
      <Grid container sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <List
            type={type}
            setType={(type) => setType(type)}
            isLoading={isLoading}
            childClicked={childClicked}
            places={places}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Map />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
