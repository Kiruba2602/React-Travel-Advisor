// utils/debouncedFetch.ts
import { debounce } from "lodash";
import { Bounds, Place } from "../App";
import { getPlacesData } from "../api/travelAdvisorAPI";

export const debouncedFetchPlaces = debounce(
  async (
    type: string,
    bounds: Bounds,
    setPlaces: React.Dispatch<React.SetStateAction<Place[]>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const data = await getPlacesData(type, bounds);
      if (Array.isArray(data)) {
        setPlaces(data.filter((place: Place) => place.name && place.num_reviews > 0));
      } else {
        console.error("No data returned from API");
        setPlaces([]);
      }
    } catch (err) {
      console.error("getPlacesData failed:", err);
    } finally {
      setIsLoading(false);
    }
  },
  500
);
