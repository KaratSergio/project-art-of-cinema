import { fetchTrailer } from '../redux/dataMovie/movieThunks';

export const loadTrailer = async (dispatch, details, setTrailerKey, setIsModalOpen) => {
  try {
    const response = await dispatch(fetchTrailer(details.title));
    setTrailerKey(response.payload);
    setIsModalOpen(true);
  } catch (error) {
    console.error('Error fetching trailer:', error);
  }
};
