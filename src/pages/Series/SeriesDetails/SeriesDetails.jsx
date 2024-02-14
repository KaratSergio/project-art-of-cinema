import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { loadTrailer } from '../../../utils/loadTrailer';
import { Footer } from '../../../components/Footer/Footer';
import { SeriesDetailsContent } from './SeriesDetailsContent';
import { fetchSeriesDetails } from '../../../redux/dataSeries/seriesThunks';
import { TrailerModal } from '../../../components/TrailerModal/TrailerModal';

import scss from './SeriesDetails.module.scss';

const BackdropImageURL = 'https://image.tmdb.org/t/p/w1280';

export const SeriesDetails = () => {
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await dispatch(fetchSeriesDetails(id));
        setDetails(response.payload);
      } catch (error) {
        console.error('Error fetching series details:', error);
      }
    };

    fetchDetails();
  }, [dispatch, id]);

  const handleLoadTrailer = async () => {
    await loadTrailer(dispatch, details, setTrailerKey, setIsModalOpen);
  };

  if (!details) return null;

  return (
    <div
      className={scss.container}
      style={{
        backgroundImage: `url(${BackdropImageURL}${details.backdrop_path})`,
        width: '1020px',
        height: '610px',
      }}
    >
      <SeriesDetailsContent
        name={details.name}
        posterPath={details.poster_path}
        vote_average={details.vote_average}
        overview={details.overview}
        genres={details.genres}
        from={from}
        loadTrailer={handleLoadTrailer}
      />
      {isModalOpen && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default SeriesDetails;
