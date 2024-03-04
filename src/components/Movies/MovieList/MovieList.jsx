import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectMovies } from '../../../redux/dataMovie/selectors';
import { fetchMoviesAsync } from '../../../redux/dataMovie/actions';

import { Pagination } from '../../Pagination/Pagination';
import { MovieSearch } from '../../Search/MovieSearch';

import scss from './MovieList.module.scss';

export const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, totalPages } = useSelector(selectMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(18);
  const ImageURL = 'https://image.tmdb.org/t/p/w200';

  const handlePageChange = async page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    const currentPageFromURL = window.location.pathname.match(/\/page(\d+)/);

    if (currentPageFromURL && currentPageFromURL[1]) {
      setCurrentPage(parseInt(currentPageFromURL[1]));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(
          fetchMoviesAsync({ endpoint: 'discover/movie', currentPage, query })
        );
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, query]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setItemsPerPage(20);
      } else {
        setItemsPerPage(18);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={scss.container}>
      <MovieSearch />
      <h1 className={scss.movieTitle}>Movies</h1>
      <div>
        <ul className={scss.movieGallery}>
          {movies &&
            movies.slice(0, itemsPerPage).map(movie => (
              <li className={scss.movieItem} key={movie.id}>
                {movie.poster_path && (
                  <Link
                    to={`/movie/page${currentPage}/${movie.id}`}
                    state={{ currentPage }}
                  >
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}
    </div>
  );
};

export default MovieList;
