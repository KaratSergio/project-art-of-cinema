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
        const results = await dispatch(fetchMoviesAsync({ 
          endpoint: `movie/${id}`,
          currentPage: 1,
        }));
        setDetails(results.payload); 
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [dispatch, id]);

  if (!details || !details.results || details.results.length === 0) return null;

  const { title, poster_path, release_date, vote_average, overview, genres } =
    details.results[0];
  const releaseYear = (release_date || '').slice(0, 4);
  const score = !isNaN(vote_average) ? Math.round(vote_average * 10) : 0;

  return (
    <div>
      <Link to={from}>Go back</Link>
      <div>
        <div>
          <img src={poster_path ? `${ImageURL}${poster_path}` : ''} alt={title} />
        </div>
        <div>
          <div>
            {title} ({releaseYear})
          </div>
          {/* Рейтинг */}
          <div>Overview</div>
          <div>{overview}</div>
          <div>Genres</div>
          <div>{genres && genres.map(genre => genre.name).join(', ')}</div>
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

