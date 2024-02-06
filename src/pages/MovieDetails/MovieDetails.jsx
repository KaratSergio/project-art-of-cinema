import { useDispatch } from 'react-redux';
import { useEffect, useState, Suspense } from 'react';
import { Link, useLocation, useParams, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from '../../redux/dataMovie/movieThunks';

export const MovieDetails = () => {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const ImageURL = 'https://image.tmdb.org/t/p/w400';
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await dispatch(fetchMovieDetails(id));
        // console.log('Received movie details:', response.payload);
        setDetails(response.payload);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [dispatch, id]);

  if (!details) return null;
  // console.log(details);

  const { title, poster_path, release_date, vote_average, overview, genres } =
    details;
  const genresList = genres.map(genre => genre.name).join(', ');

  return (
    <div>
      <Link to={from}>Go back</Link>
      <div>
        <div>
          <img src={`${ImageURL}${poster_path}`} alt={title} />
        </div>
        <div>
          <div>
            {title} ({release_date})
          </div>
          <div>Overview</div>
          <div>{vote_average}</div>
          <div>{overview}</div>
          <div>Genres</div>
          <div>{genresList}</div>
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
