import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMoviesAsync } from '../../../redux/dataMovie/actions';
import { selectMovies } from '../../../redux/dataMovie/selectors';

import { loadTrailer } from '../../../utils/loadTrailer';
import { TrailerModal } from '../../../components/TrailerModal/TrailerModal';

import scss from './MovieTrailerBar.module.scss';

export const MovieTrailerBar = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector(selectMovies);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 3;
  const IMG_URL = 'https://image.tmdb.org/t/p/w400';

  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  }, [movies.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchMoviesAsync({ endpoint: 'trending/movie/day' }));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleLoadTrailer = async movie => {
    await loadTrailer(dispatch, movie, setTrailerKey, setIsModalOpen);
  };

  // Склеюємо слайди, щоб отримати циклічний ефект
  const mergedMovies = [...movies, ...movies.slice(0, slidesToShow)];

  return (
    <div className={scss.container}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={scss.slider}>
          <h2 className={scss.title}>Trending movies</h2>
          <div className={scss.slideContainer}>
            {mergedMovies
              .slice(currentIndex, currentIndex + slidesToShow)
              .map(movie => (
                <div key={movie.id} className={scss.slide}>
                  <div
                    className={scss.overlay}
                    onClick={() => handleLoadTrailer(movie)}
                  >
                    <div className={scss.boxSlideImg}>
                      <img
                        className={scss.slideImg}
                        src={`${IMG_URL}${movie.backdrop_path}`}
                        alt={movie.title}
                      />
                      <h3 className={scss.titleMovie}>
                        {movie.title.toLowerCase()} (
                        {movie.release_date
                          ? movie.release_date.slice(0, 4)
                          : ''}
                        )
                      </h3>
                    </div>
                    <div className={scss.playIcon}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className={scss.navBtn}>
        <button className={scss.prevButton} onClick={prevSlide}>
          Prev
        </button>
        <button className={scss.nextButton} onClick={nextSlide}>
          Next
        </button>
      </div>
      {isModalOpen && (
        <TrailerModal
          trailerKey={trailerKey}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieTrailerBar;
