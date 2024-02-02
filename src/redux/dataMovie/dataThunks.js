import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '6167a2fbe619d64566c427d4bc6ed1cb',
  },
});

export const fetchDataAsync = createAsyncThunk(
  'data/fetchData',
  async ({ url, params }) => {
    try {
      const response = await instance.get(url, { params });
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
);
