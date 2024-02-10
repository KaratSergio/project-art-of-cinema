import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMoviesAsync,
  fetchMovieCredits,
  fetchMovieReviews,
} from './movieThunks';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movieCredits: {
      cast: [],
    },
    movieReviews: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMoviesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMoviesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieCredits.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieCredits.cast = action.payload;
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMovieReviews.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovieReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movieReviews = action.payload.results;
      })
      .addCase(fetchMovieReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
