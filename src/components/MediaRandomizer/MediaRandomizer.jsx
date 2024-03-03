import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectMovies } from '../../redux/dataMovie/movieSelectors';
import { fetchMoviesAsync } from '../../redux/dataMovie/movieThunks';
import scss from './MediaRandomizer.module.scss';

export const MediaRandomizer = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(selectMovies);
  const location = useLocation();

  const ImageURL = 'https://image.tmdb.org/t/p/w1280';

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(
          fetchMoviesAsync({
            endpoint: 'trending/all/week',
          })
        );
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const randomContent =
    movies && movies.length > 0
      ? movies[Math.floor(Math.random() * movies.length)]
      : null;

  const currentPage = location.pathname.match(/\/page(\d+)/)?.[1] || 1;

  const getContentLink = () => {
    if (randomContent) {
      if (randomContent.media_type === 'movie') {
        return `/movie/page${currentPage}/${randomContent.id}`;
      } else if (randomContent.media_type === 'tv') {
        return `/series/page${currentPage}/${randomContent.id}`;
      }
    }
    return '/';
  };

  return (
    <div className={scss.container}>
      {randomContent && (
        <div className={scss.posterBox}>
          <Link to={getContentLink()}>
            <img
              className={
                randomContent.media_type === 'movie'
                  ? scss.moviePoster
                  : scss.seriesPoster
              }
              src={`${ImageURL}${randomContent.backdrop_path}`}
              alt={randomContent.title || randomContent.name}
            />
          </Link>
          <div className={scss.moviePosterTitle}>
            <p>{randomContent.title || randomContent.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaRandomizer;
