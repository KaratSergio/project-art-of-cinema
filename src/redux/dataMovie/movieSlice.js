import { createSlice } from '@reduxjs/toolkit';
import {
  fetchMoviesAsync,
  fetchMovieCredits,
  fetchMovieReviews,
  searchMovies,
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
        console.log('Movie credits payload:', action.payload);
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
      });
  },
});

export const { setFilter, clearFilter, setSearchResults } = movieSlice.actions;

export default movieSlice.reducer;
