import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// theMovieDb
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6167a2fbe619d64566c427d4bc6ed1cb';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

//================SeriesList=======================
export const fetchSeriesAsync = createAsyncThunk(
  'series/fetchSeries',
  async ({ endpoint, query, currentPage }, { rejectWithValue }) => {
    try {
      const params = {
        include_adult: false,
        include_video: false,
        page: currentPage,
        sort_by: 'popularity.desc',
        ...(query && { query }),
      };

      const response = await instance.get(endpoint, { params });
      // console.log(response.data);
      const totalPages = response.data.total_pages;

      return {
        series: response.data.results,
        totalPages,
      };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
//================SeriesDetails=====================
export const fetchSeriesDetails = createAsyncThunk(
  'series/fetchSeriesDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`tv/${id}`);
      console.log("Details", response.data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
