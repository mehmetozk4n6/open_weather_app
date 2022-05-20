import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCity = createAsyncThunk("weather/fetchCity", async (city) => {
  let apikey = sessionStorage.getItem("APIkey");
  const res = await axios(
    `${process.env.REACT_APP_API_BASE_ENDPOINT}?q=${city}&appid=${apikey}`
  );
  return res.data;
});

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    APIkey: sessionStorage.getItem("APIkey") || "",
    weatherData: [],
    status: "idle",
    error: "",
  },
  reducers: {
    cleanWeatherData: (state, action) => {
      state.weatherData = [];
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

export const { cleanWeatherData } = quotesSlice.actions;

export default quotesSlice.reducer;
