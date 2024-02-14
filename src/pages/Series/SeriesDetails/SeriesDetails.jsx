import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { loadTrailer } from '../../../utils/movieUtils';
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
    console.log('ID:', id); 
  const location = useLocation();
  const from = location.state?.from || '/';
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
          console.log('ID:', id);
        const response = await dispatch(fetchSeriesDetails(id));
          console.log('ID:', id);
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
        title={details.title}
        posterPath={details.poster_path}
        // releaseDate={details.release_date}
        voteAverage={details.vote_average}
        overview={details.overview}
        genres={details.genres}
        id={id}
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
