import React, { useEffect, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectMovies } from '../../redux/dataMovie/selectors';
import { fetchMoviesAsync } from '../../redux/dataMovie/actions';

import { Rings } from 'react-loader-spinner';

import scss from './MediaRandomizer.module.scss';

export const MediaRandomizer = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(selectMovies);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const ImageURL = 'https://image.tmdb.org/t/p/w1280';

  useEffect(() => {
    if (!movies.length) {
      const fetchData = async () => {
        try {
          await dispatch(
            fetchMoviesAsync({
              endpoint: 'trending/all/week',
            })
          );
        } catch (error) {
          console.error('Error fetching movies:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [dispatch, movies.length]);

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

  const shouldShowContent = !loading;

  return (
    <div className={scss.container}>
      {shouldShowContent && randomContent && (
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
      {loading && (
        <div className={scss.loader}>
          <Rings color="#00BFFF" height={80} width={80} />{' '}
        </div>
      )}
    </div>
  );
};

export default MediaRandomizer;
