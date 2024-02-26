import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies } from '../../../redux/dataMovie/movieSelectors';
import { fetchMoviesAsync } from '../../../redux/dataMovie/movieThunks';

import scss from './MovieRandom.module.scss';

export const MovieRandom = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(selectMovies);

  const ImageURL = 'https://image.tmdb.org/t/p/w400';

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchMoviesAsync({
            endpoint: 'trending/movie/week',
          })
        );
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Get random movie
  const randomMovie =
    movies && movies.length > 0
      ? movies[Math.floor(Math.random() * movies.length)]
      : null;

  return (
    <div className={scss.container}>
      {randomMovie && (
        <div>
          <Link to={`movie/${randomMovie.id}`}>
            <img
              className={scss.moviePoster}
              src={`${ImageURL}${randomMovie.poster_path}`}
              alt={randomMovie.title}
            />
          </Link>
          <div className={scss.moviePosterTitle}>
            <p>{randomMovie.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRandom;
