import { createSlice } from '@reduxjs/toolkit';
import { fetchGlobalSearchAsync } from './globalSearch';

const initialState = {
  searchResults: [],
  totalPages: null,
  status: 'idle',
  error: null,
};

const globalSearchSlice = createSlice({
  name: 'globalSearch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchGlobalSearchAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchGlobalSearchAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchGlobalSearchAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default globalSearchSlice.reducer;
