import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    movies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'), 
        state => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'), 
        (state, action) => {
          state.status = 'succeeded';
          state.movies = action.payload;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'), 
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default dataSlice.reducer;
