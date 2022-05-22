import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCity = createAsyncThunk("weather/fetchCity", async (city) => {
  let apikey = sessionStorage.getItem("APIkey");
  const res = await axios(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
  );
  return res.data;
});

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    APIkey: sessionStorage.getItem("APIkey") || "",
    weatherData: [],
    status: "idle",
    error: "",
  },
  reducers: {
    cleanWeatherData: (state, action) => {
      state.weatherData = "";
    },
    cleanErrorMessage: (state, action) => {
      state.error = "";
    },
  },
  extraReducers: {
    [fetchCity.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchCity.fulfilled]: (state, action) => {
      state.weatherData = action.payload;
      state.status = "succeeded";
    },
    [fetchCity.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const weatherSelector = (state) => state.weather.weatherData;
export const statusSelector = (state) => state.weather.status;
export const errorSelector = (state) => state.weather.error;

export const { cleanWeatherData, cleanErrorMessage } = weatherSlice.actions;

export default weatherSlice.reducer;
