import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMoviesAsync } from '../../redux/dataMovie/movieThunks';
import { selectMovies } from '../../redux/dataMovie/movieSelectors';
import Pagination from '../Pagination/Pagination';

import scss from './MovieList.module.scss';

export const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, totalPages } = useSelector(selectMovies);
  const ImageURL = 'https://image.tmdb.org/t/p/w200';

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      dispatch(fetchMoviesAsync(currentPage));
      setLoading(false);
    };

    fetchData();
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default MovieList;
