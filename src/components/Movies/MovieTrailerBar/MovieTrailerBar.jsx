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
  const [currentPage] = useState(1);
  const [query] = useState('');
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
        await dispatch(
          fetchMoviesAsync({
            endpoint: 'trending/movie/day',
            currentPage,
            query,
          })
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
    const interval = setInterval(nextSlide, 5000); // Автопрокрутка каждые 5 секунд
    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [nextSlide]);

  const handleLoadTrailer = async movie => {
    await loadTrailer(dispatch, movie, setTrailerKey, setIsModalOpen);
  };

  return (
    <div className={scss.container}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={scss.slider}>
          <div className={scss.slideContainer}>
            {[...movies.slice(currentIndex), ...movies.slice(0, currentIndex)]
              .slice(0, slidesToShow)
              .map(movie => (
                <div key={movie.id} className={scss.slide}>
                  <div
                    className={scss.overlay}
                    onClick={() => handleLoadTrailer(movie)}
                  >
                    <img
                      className={scss.slideImg}
                      src={`${IMG_URL}${movie.backdrop_path}`}
                      alt={movie.title}
                    />
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
