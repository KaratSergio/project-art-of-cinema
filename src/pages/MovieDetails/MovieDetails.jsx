import { useEffect, useState, Suspense } from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchMoviesAsync } from '../../redux/dataMovie/movieThunks';

export const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const ImageURL = 'https://image.tmdb.org/t/p/w400';
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await dispatch(
          fetchMoviesAsync({
            endpoint: `movie/${id}`,
            currentPage: 1,
          })
        );
        setDetails(response.payload);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [dispatch, id]);

  if (!details) return <div>Loading...</div>;

  return (
    <div>
      <Link to={from}>Go back</Link>
      <div>
        <div>
          <img src={`${ImageURL}${details.poster_path}`} alt={details.title} />
        </div>
        <div>
          <div>
            {details.title} (
            {details.release_date ? details.release_date.slice(0, 4) : ''})
          </div>
          <div>Overview</div>
          <div>{details.overview}</div>
          <div>Genres</div>
          <div>
            {details.genres &&
              details.genres.map(genre => genre.name).join(', ')}
          </div>
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
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
