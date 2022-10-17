import { combineReducers } from "redux";
import {
  currentWeatherReducer,
  dailyWeatherReducer,
  hourlyWeatherReducer,
  currentLocation,
} from "./weatherReducer";

export const reducers = combineReducers({
  current: currentWeatherReducer,
  daily: dailyWeatherReducer,
  hourly: hourlyWeatherReducer,
  location: currentLocation,
});
