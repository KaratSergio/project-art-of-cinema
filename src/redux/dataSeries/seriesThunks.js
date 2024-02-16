import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// theMovieDb
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '6167a2fbe619d64566c427d4bc6ed1cb';

// youTube
const YouTube_KEY = 'AIzaSyAX8f4ov49tTjdKJ89Pom1aYTR3hXFvaN0';
const YouTube_URL = 'https://youtube.googleapis.com/youtube/v3/search';

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
//================SeriesSearch=====================
export const searchSeries = createAsyncThunk(
  'series/searchSeries',
  async ({ query, currentPage }, { dispatch }) => {
    try {
      const result = await dispatch(
        fetchSeriesAsync({ endpoint: 'search/tv', query, currentPage })
      );
      return result.payload;
    } catch (error) {
      throw error;
    }
  }
);

//================SeriesCredits=====================
export const fetchSeriesCredits = createAsyncThunk(
  'series/fetchSeriesCredits',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await instance.get(`tv/${id}/credits`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
//================SeriesReviews=====================
export const fetchSeriesReviews = createAsyncThunk(
  'series/fetchSeriesReviews',
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await instance.get(`tv/${id}/reviews`);
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
//============MovieTrailer (YouTube)=============
export const fetchTrailer = createAsyncThunk(
  'series/fetchTrailer',
  async (filmName, { rejectWithValue }) => {
    try {
      const url = `${YouTube_URL}?part=snippet&type=video&maxResults=1&q=${filmName}+trailer&key=${YouTube_KEY}`;
      const response = await axios.get(url);
      const data = response.data;
      return data.items[0]?.id?.videoId || null;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
