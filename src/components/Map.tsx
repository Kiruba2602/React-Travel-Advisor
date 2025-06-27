import React, { useEffect } from "react";
import { Box, Paper, Typography, Rating } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Bounds, Coords, Place } from "../App";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapProps {
  coords: Coords;
  places: Place[];
  setBounds: (bounds: Bounds) => void;
  setCoords: (coordinates: Coords) => void;
  setChildClicked: (index: number) => void;
}

const MapEvents: React.FC<{
  setCoords: (c: Coords) => void;
  setBounds: (b: Bounds) => void;
}> = ({ setCoords, setBounds }) => {
  const map = useMap();

  useEffect(() => {
    const center = map.getCenter();
    const bounds = map.getBounds();

    setCoords({ lat: center.lat, lng: center.lng });
    setBounds({
      ne: {
        lat: bounds.getNorthEast().lat,
        lng: bounds.getNorthEast().lng,
      },
      sw: {
        lat: bounds.getSouthWest().lat,
        lng: bounds.getSouthWest().lng,
      },
    });
  }, [map, setCoords, setBounds]);

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const bounds = map.getBounds();

      setCoords({ lat: center.lat, lng: center.lng });
      setBounds({
        ne: {
          lat: bounds.getNorthEast().lat,
          lng: bounds.getNorthEast().lng,
        },
        sw: {
          lat: bounds.getSouthWest().lat,
          lng: bounds.getSouthWest().lng,
        },
      });
    },
  });

  return null;
};

const Map: React.FC<MapProps> = ({ coords, places, setBounds, setCoords, setChildClicked }) => {
  return (
    <Box sx={{ height: "85vh", width: "100%" }}>
      <MapContainer
        center={[coords.lat, coords.lng]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* This will set bounds + coords on initial load and moveend */}
        <MapEvents setCoords={setCoords} setBounds={setBounds} />

        {places.map((place, index) => (
          <Marker
            key={index}
            position={[Number(place.latitude), Number(place.longitude)]}
            eventHandlers={{
              click: () => setChildClicked(index),
            }}
          >
            <Popup>
              <Paper sx={{ p: 1, width: 160, textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom noWrap>
                  {place.name}
                </Typography>
                {place.photo?.images?.large?.url && (
                  <Box
                    component="img"
                    src={place.photo.images.large.url}
                    alt={place.name}
                    sx={{
                      width: 120,
                      height: 100,
                      objectFit: "cover",
                      borderRadius: 1,
                      mb: 1,
                    }}
                  />
                )}
                <Rating size="small" readOnly value={Number(place.rating) || 0} precision={0.5} />
              </Paper>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
