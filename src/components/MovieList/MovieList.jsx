import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAsync } from '../../redux/dataMovie/dataThunks';
import {
  selectMovies,
  selectStatus,
  selectError,
} from '../../redux/dataMovie/dataSelectors';

export const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  console.log(movies, status, error);

  useEffect(() => {
    dispatch(fetchDataAsync({ url: '/movie/popular' }));
  }, [dispatch]);

  console.log(movies);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
