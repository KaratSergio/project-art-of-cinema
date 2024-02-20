import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectMovies } from '../../../redux/dataMovie/movieSelectors';
import { fetchMoviesAsync } from '../../../redux/dataMovie/movieThunks';

import { Pagination } from '../../Pagination/Pagination';
import { MovieSearch } from '../../Search/MovieSearch';

import scss from './MovieList.module.scss';

export const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, totalPages } = useSelector(selectMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query] = useState('');
  const ImageURL = 'https://image.tmdb.org/t/p/w200';
  
  const handlePageChange = async page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(
          fetchMoviesAsync({endpoint: 'discover/movie',currentPage,query,}));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, query]);

  return (
    <div className={scss.container}>
      <MovieSearch />
      <h1 className={scss.movieTitle}>Movies</h1>
      <div>
        <ul className={scss.movieGallery}>
          {movies &&
            movies.slice(0, 18).map(movie => (
              <li className={scss.movieItem} key={movie.id}>
                {movie.poster_path && (
                  <Link to={`movie/${movie.id}`}>
                    <img
                      className={scss.moviePoster}
                      src={`${ImageURL}${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                )}
                <div className={scss.moviePosterTitle}>
                  <p>{movie.title}</p>
                </div>
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
