import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// api & selector
import { fetchMovieGallery } from '../../../redux/dataMovie/actions';
import { selectMovieGallery } from '../../../redux/dataMovie/selectors';

import scss from './MovieGallery.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const MovieGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectMovieGallery);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchMovieGallery({ id }));
  }, [dispatch, id]);

  const totalSlides = gallery.length;

  const nextSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === gallery.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? gallery.length - 1 : prevSlide - 1
    );
  };

  if (totalSlides === 0) {
    return <p className={scss.noImages}>No Images</p>;
  }

  return (
    <section className={scss.container}>
      <h2 className={scss.title}>Gallery</h2>
      <div>
        <p className={scss.counterImg}>
          {currentSlide + 1} of {totalSlides}
        </p>
        {gallery.map((item, index) => (
          <div
            key={index}
            className={`${scss.galleryList} ${
              index === currentSlide ? scss.active : ''
            }`}
          >
            <img
              className={scss.galleryImg}
              src={`https://image.tmdb.org/t/p/original${item.file_path}`}
              alt={`Backdrop ${index}`}
            />
          </div>
        ))}
        <button
          type="button"
          className={scss.galleryLeftBtn}
          onClick={prevSlide}
        >
          <FaChevronLeft className={scss.icon} />
        </button>
        <button
          type="button"
          className={scss.galleryRightBtn}
          onClick={nextSlide}
        >
          <FaChevronRight className={scss.icon} />
        </button>
      </div>
    </section>
  );
};

export default MovieGallery;
