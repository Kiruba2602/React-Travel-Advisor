import axios from "axios";
import { Bounds } from "../App";

export const getPlacesData = async (type: string, bounds: Bounds) => {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: bounds.sw.lat,
        tr_latitude: bounds.ne.lat,
        bl_longitude: bounds.sw.lng,
        tr_longitude: bounds.ne.lng,
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_TRAVEL_API_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });
    return response.data?.data ?? [];
  } catch (error) {
    console.error("error", error);
  }
};
