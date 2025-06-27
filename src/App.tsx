import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { CssBaseline, Grid } from "@mui/material";
import Map from "./components/Map";
import List from "./components/List";
import { debouncedFetchPlaces } from "./utils/debouncedFetch";

export interface Place {
  name: string;
  num_reviews: number;
  [key: string]: any; // optional: allows other properties
}

export interface Coords {
  lat: number;
  lng: number;
}

export interface Bounds {
  ne: Coords; // top-right
  sw: Coords; // bottom-left
}

const App: React.FC = () => {
  const [type, setType] = useState<string>("restaurants");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [coords, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState<Bounds | null>(null);
  const [childClicked, setChildClicked] = useState<number | null>(null);

  useEffect(() => {
    if (!bounds) return;
    setIsLoading(true);
    debouncedFetchPlaces(type, bounds, setPlaces, setIsLoading);

    return () => {
      debouncedFetchPlaces.cancel(); // cleanup
    };
  }, [type, bounds]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div>
      <CssBaseline />
      <Header />
      <Grid container sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <List type={type} setType={setType} isLoading={isLoading} childClicked={childClicked} places={places} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          {coords.lat !== 0 && (
            <Map
              coords={coords}
              places={places}
              setBounds={setBounds}
              setCoords={setCoords}
              setChildClicked={setChildClicked}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
