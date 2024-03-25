import { createSlice } from '@reduxjs/toolkit';
import {
  fetchPersonAsync,
  fetchPersonCredits,
  fetchTrendingPersonAsync,
} from './actions';

export const personSlice = createSlice({
  name: 'person',
  initialState: {
    person: null,
    credits: {
      cast: [],
    },
    trendingPersons: [],
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
      .addCase(fetchPersonAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPersonAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.person = action.payload;
      })
      .addCase(fetchPersonAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //PersonCredits
      .addCase(fetchPersonCredits.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPersonCredits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.credits = action.payload;
        }
      })
      .addCase(fetchPersonCredits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // TrendingPerson
      .addCase(fetchTrendingPersonAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingPersonAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.trendingPersons = action.payload;
      })
      .addCase(fetchTrendingPersonAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilter, clearFilter, setSearchResults } = personSlice.actions;

export default personSlice.reducer;
