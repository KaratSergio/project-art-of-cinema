import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// api & selector
import { fetchSeriesGallery } from '../../../redux/dataSeries/actions';
import { selectSeriesGallery } from '../../../redux/dataSeries/selectors';

import scss from './SeriesGallery.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const SeriesGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectSeriesGallery);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchSeriesGallery({ id }));
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

  return (
    <section className={scss.container}>
      <h2 className={scss.title}>Gallery</h2>
      <div className={scss.container}>
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
        <button className={scss.galleryLeftBtn} onClick={prevSlide}>
          <FaChevronLeft size={32} />
        </button>
        <button className={scss.galleryRightBtn} onClick={nextSlide}>
          <FaChevronRight size={32} />
        </button>
      </div>
    </section>
  );
};

export default SeriesGallery;
