import { createSlice } from '@reduxjs/toolkit';
import { fetchSeriesAsync } from './seriesThunks';

const seriesSlice = createSlice({
  name: 'series',
  initialState: {
    series: [],
    seriesCredits: {
      cast: [],
    },
    seriesReviews: [],
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
        state.series = action.payload.series; // Оновлення властивості series
        state.totalPages = action.payload.totalPages; // Додавання властивості totalPages
      })
      .addCase(fetchSeriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter, setSearchResults } = seriesSlice.actions;

export default seriesSlice.reducer;
