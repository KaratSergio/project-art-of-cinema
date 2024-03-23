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

//================PersonList=======================
export const fetchPersonAsync = createAsyncThunk(
  'person/fetchPerson',
  async ({ id }, { rejectWithValue }) => {
    try {
      const endpoint = `person/${id}`;
      const response = await instance.get(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
//================PersonCredits=======================
export const fetchPersonCredits = createAsyncThunk(
  'credits/fetchPersonCredits',
  async ({ id }, { rejectWithValue }) => {
    try {
      const endpoint = `person/${id}/combined_credits`;
      const response = await instance.get(endpoint);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
