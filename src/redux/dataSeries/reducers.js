import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSeriesAsync,
  fetchSeriesCredits,
  fetchSeriesReviews,
  fetchSeriesGallery,
  searchSeries,
} from './actions';

export const seriesSlice = createSlice({
  name: 'series',
  initialState: {
    series: [],
    seriesCredits: {
      cast: [],
    },
    seriesReviews: [],
    seriesGallery: {
      backdrops: [],
    },
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
      // Series
      .addCase(fetchSeriesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSeriesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.series = action.payload.series;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSeriesAsync.rejected, (state, action) => {
        console.error('Failed to fetch series:', action.error.message);
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Search
      .addCase(searchSeries.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchSeries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(searchSeries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Actors
      .addCase(fetchSeriesCredits.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSeriesCredits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.seriesCredits = action.payload;
        }
      })
      .addCase(fetchSeriesCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Commentaries
      .addCase(fetchSeriesReviews.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSeriesReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.seriesReviews = action.payload.results;
      })
      .addCase(fetchSeriesReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Gallery
      .addCase(fetchSeriesGallery.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSeriesGallery.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.seriesGallery = action.payload;
        }
      })
      .addCase(fetchSeriesGallery.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter, setSearchResults } = seriesSlice.actions;

export default seriesSlice.reducer;
