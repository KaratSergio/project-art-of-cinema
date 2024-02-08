import { useDispatch } from 'react-redux';
import { useEffect, useState, Suspense } from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../redux/dataMovie/movieThunks';
import { fetchTrailer } from '../../redux/dataMovie/movieThunks';

import scss from './MovieDetails.module.scss';

export const MovieDetails = () => {
  const [details, setDetails] = useState(null);

  const [trailerKey, setTrailerKey] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const PosterImageURL = 'https://image.tmdb.org/t/p/w400';
  const BackdropImageURL = 'https://image.tmdb.org/t/p/w1280';
  const dispatch = useDispatch();

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

  const loadTrailer = async () => {
    try {
      const response = await dispatch(fetchTrailer(id));
      setTrailerKey(response.payload);
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  if (!details) return null;

  const { title, poster_path, release_date, vote_average, overview, genres } = details;
  const genresList = genres.map(genre => genre.name).join(', ');
  const releaseYear = release_date.split('-')[0];

  return (
    <div
      className={scss.container}
      style={{
        backgroundImage: `url(${BackdropImageURL}${details.backdrop_path})`,
      }}
    >
      <Link to={from}>Go back</Link>
      <div className={scss.movieCard}>
        <div className={scss.posterImage}>
          <img
            src={`${PosterImageURL}${poster_path}`}
            alt={title}
            className={scss.posterImage}
          />
        </div>
        <div div className={scss.description}>
          <h1>
            {title} ({releaseYear})
          </h1>
          <button onClick={loadTrailer}>Watch Trailer</button>
          <p>Rating {vote_average}</p>
          <p>{overview}</p>
          <div>Genres: {genresList}</div>
          <div>Additional Information</div>
          <div>
            <div>
              <Link to={`cast/${id}`} state={{ from }}>
                Cast
              </Link>
            </div>
            <div>
              <Link to={`reviews/${id}`} state={{ from }}>
                Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Suspense
        color={'#301934'}
        loading={true}
        fallback={<div aria-label="Loading Spinner" data-testid="loader" />}
      >
        {trailerKey && (
          <iframe
            className={scss.iframe}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
