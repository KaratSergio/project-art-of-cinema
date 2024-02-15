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

// Search
export const fetchGlobalSearchAsync = createAsyncThunk(
  'globalSearch/fetchGlobalSearch',
  async ({ query, currentPage }, { rejectWithValue }) => {
    try {
      const params = {
        include_adult: false,
        include_video: false,
        page: currentPage,
        query: query,
      };

        const response = await instance.get('search/multi', { params });
        console.log('Response from server:', response.data);
      const totalPages = response.data.total_pages;

      return {
        results: response.data.results,
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
