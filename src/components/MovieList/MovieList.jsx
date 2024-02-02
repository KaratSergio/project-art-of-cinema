import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAsync } from '../../redux/dataMovie/dataThunks';
import {
  selectMovies,
  // selectStatus,
  // selectError,
} from '../../redux/dataMovie/dataSelectors';

export const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  // const status = useSelector(selectStatus);
  // const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchDataAsync({ url: '/movie/popular' }));
  }, [dispatch]);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies && movies.map(movie => <li key={movie.id}>{movie.title}</li>)}
      </ul>
    </div>
  );
};

export default MovieList;
