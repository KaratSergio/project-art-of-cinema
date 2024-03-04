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

//================MovieList=======================
export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
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
      const totalPages = response.data.total_pages;

      return {
        movies: response.data.results,
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
//================MovieDetails=====================
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`movie/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
//================MovieSearch=====================
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, currentPage }, { dispatch }) => {
    try {
      const result = await dispatch(
        fetchMoviesAsync({ endpoint: 'search/movie', query, currentPage })
      );
      return result.payload;
    } catch (error) {
      throw error;
    }
  }
);

//================MovieCredits=====================
export const fetchMovieCredits = createAsyncThunk(
  'movies/fetchMovieCredits',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`movie/${id}/credits`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
//================MovieReviews=====================
export const fetchMovieReviews = createAsyncThunk(
  'movies/fetchMovieReviews',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`movie/${id}/reviews`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
