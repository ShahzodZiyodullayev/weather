import { ActionType } from "./../contents/actionType";

const initialState = {
  product: [],
};

export const currentWeatherReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setCurrentWeather:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const dailyWeatherReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setDailyWeather:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const hourlyWeatherReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setHourlyWeather:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const currentLocation = (state = [], { type, payload }) => {
  switch (type) {
    case ActionType.setCurrentLocation:
      return { ...state, ...payload };
    default:
      return state;
  }
};
