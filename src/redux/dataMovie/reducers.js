import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMoviesAsync,
  fetchMovieCredits,
  fetchMovieReviews,
  fetchMovieGallery,
  searchMovies,
  fetchLanguages,
} from './actions';

export const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movieCredits: {
      cast: [],
    },
    movieReviews: [],
    movieGallery: {
      backdrops: [],
    },
    languages: [],
    status: 'idle',
    error: null,
    filter: null,
    searchResults: [],
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearFilter: state => {
      state.filter = null;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Movie
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
      // Search
      .addCase(searchMovies.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Actors
      .addCase(fetchMovieCredits.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.movieCredits = action.payload;
        }
      })
      .addCase(fetchMovieCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Commentaries
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
      })
      // Gallery
      .addCase(fetchMovieGallery.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchMovieGallery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.movieGallery = action.payload;
        }
      })
      .addCase(fetchMovieGallery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Languages
      .addCase(fetchLanguages.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter, setSearchResults, setLanguages } =
  movieSlice.actions;

export default movieSlice.reducer;
