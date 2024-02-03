import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6167a2fbe619d64566c427d4bc6ed1cb';

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchDataAsync = createAsyncThunk(
  'data/fetchData',
  async ({ url, params }) => {
    try {
      const response = await instance.get(url, {
        params: { ...params, per_page: 18 },
      });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);
