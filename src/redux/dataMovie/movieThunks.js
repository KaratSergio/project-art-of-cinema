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

export const fetchMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async ({ endpoint, query, currentPage }) => {
    try {
      const params = {
        include_adult: false,
        include_video: false,
        page: currentPage,
        sort_by: 'popularity.desc',
        query: query,
      };

      const response = await instance.get(endpoint, { params });
      console.log(response.data);
      const totalPages = response.data.total_pages;

      return {
        movies: response.data.results,
        totalPages,
      };
    } catch (error) {
      throw error;
    }
  }
);


export const useSearchMovies = (query, currentPage) => {
  return fetchMoviesAsync({endpoint:`search/movie`, query, currentPage});
};

export const useMovieDetails =(id) => {
  return fetchMoviesAsync({endpoint: `movie/${id}`, currentPage: 1});
};

export const useMovieCredits = id => {
  return fetchMoviesAsync({ endpoint: `movie/${id}/credits`, currentPage: 1 });
};

export const useMovieReviews = id => {
  return fetchMoviesAsync({ endpoint: `movie/${id}/reviews`, currentPage: 1 });
};
