import axios from "axios";

export interface placesDataProps {
  type: string;
}

export const getPlacesData = async (type: string) => {
  try {
    const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: "13.0327",
        tr_latitude: "13.1327",
        bl_longitude: "80.2207",
        tr_longitude: "80.3207",
      },
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_TRAVEL_API_KEY,
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    });
    console.log('response', response);
    return response.data.data || [];
  } catch (error) {
    console.error("error", error);
  }
};
