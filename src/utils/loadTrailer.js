import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const YouTube_KEY = 'AIzaSyAX8f4ov49tTjdKJ89Pom1aYTR3hXFvaN0';
const YouTube_URL = 'https://youtube.googleapis.com/youtube/v3/search';

//============Trailer (YouTube)=============
export const fetchYouTubeTrailer = createAsyncThunk(
  'trailer/fetchTrailer',
  async (name, { rejectWithValue }) => {
    try {
      const url = `${YouTube_URL}?part=snippet&type=video&maxResults=1&q=${name}+trailer&key=${YouTube_KEY}`;
      const response = await axios.get(url);
      const data = response.data;
      return data.items.length > 0 ? data.items[0].id.videoId : null;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const loadTrailer = async (
  dispatch,
  details,
  setTrailerKey,
  setIsModalOpen
) => {
  try {
    const response = await dispatch(
      fetchYouTubeTrailer(details.title || details.name)
    );
    setTrailerKey(response.payload);
    setIsModalOpen(true);
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
};
