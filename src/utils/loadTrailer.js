import { fetchMovieTrailer } from '../redux/dataMovie/movieThunks';
import { fetchSeriesTrailer } from '../redux/dataSeries/seriesThunks';

export const loadMovieTrailer = async (dispatch, details, setTrailerKey, setIsModalOpen) => {
  try {
    const response = await dispatch(fetchMovieTrailer(details.title));
    setTrailerKey(response.payload);
    setIsModalOpen(true);
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
};

export const loadSeriesTrailer = async (dispatch,seriesName,setTrailerKey,setIsModalOpen) => {
  try {
    const response = await dispatch(fetchSeriesTrailer(seriesName));
    setTrailerKey(response.payload);
    setIsModalOpen(true);
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
};
