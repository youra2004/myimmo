import { GOOGLE_MAPS_API_KEY } from "../../utils/config";

export const GOOGLE_PACES_API_BASE_URL =
  "https://maps.googleapis.com/maps/api/place";

export const getGoogleAutoCompleteUrl = (input?: string) =>
  `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_MAPS_API_KEY}&input=${input}`;

export const getGoogleDetailsUrl = (placeId: string) =>
  `${GOOGLE_PACES_API_BASE_URL}/details/json?key=${GOOGLE_MAPS_API_KEY}&place_id=${placeId}`;

export const MAX_PREDICTIONS = 5;
