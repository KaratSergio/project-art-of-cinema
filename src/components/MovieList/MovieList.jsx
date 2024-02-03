import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataAsync } from '../../redux/dataMovie/dataThunks';
import {
  selectMovies,
  // selectStatus,
  // selectError,
} from '../../redux/dataMovie/dataSelectors';

import scss from './MovieList.module.scss';

export const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const ImageURL = 'https://image.tmdb.org/t/p/w200';
  // const status = useSelector(selectStatus);
  // const error = useSelector(selectError);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchDataAsync({ url: '/movie/popular', params: { page: currentPage } })
    );
  }, [dispatch, currentPage]);

  return (
    <div className={scss.container}>
      <h1 className={scss.movieTitle}>Movies</h1>
      <div>
        <ul className={scss.movieGallery}>
          {movies &&
            movies.slice(0, 18).map(movie => (
              <li className={scss.movieItem} key={movie.id}>
                {movie.poster_path && (
                  <img
                    src={`${ImageURL}${movie.poster_path}`}
                    alt={movie.title}
                  />
                )}
                <p>{movie.title}</p>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <button onClick={() => setCurrentPage(prevPage => prevPage - 1)}>
          Previous Page
        </button>
        <button onClick={() => setCurrentPage(prevPage => prevPage + 1)}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default MovieList;
