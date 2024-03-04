import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { loadTrailer } from '../../../utils/loadTrailer';
import { Footer } from '../../../components/Footer/Footer';
import { MovieDetailsContent } from './MovieDetailsContent';
import { fetchMovieDetails } from '../../../redux/dataMovie/actions';
import { TrailerModal } from '../../../components/TrailerModal/TrailerModal';

import scss from './MovieDetails.module.scss';

const BackdropImageURL = 'https://image.tmdb.org/t/p/w1280';

export const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const currentPage = localStorage.getItem('currentPage') || 1;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await dispatch(fetchMovieDetails(id));
        setDetails(response.payload);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [dispatch, id]);

  const handleLoadTrailer = async () => {
    await loadTrailer(dispatch, details, setTrailerKey, setIsModalOpen);
  };

  useEffect(() => {
    localStorage.setItem('currentPage', location.state?.currentPage || 1);
  }, [location.state?.currentPage]);

  if (!details) return null;

  return (
    <div
      className={`${scss.container} ${scss.backgroundImageContainer}`}
      style={{
        backgroundImage: `url(${BackdropImageURL}${details.backdrop_path})`,
      }}
    >
      <MovieDetailsContent
        title={details.title}
        posterPath={details.poster_path}
        releaseDate={details.release_date}
        voteAverage={details.vote_average}
        overview={details.overview}
        genres={details.genres}
        id={id}
        from={`/movies/page${currentPage}`}
        loadTrailer={handleLoadTrailer}
        currentPage={currentPage}
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

export default MovieDetails;
