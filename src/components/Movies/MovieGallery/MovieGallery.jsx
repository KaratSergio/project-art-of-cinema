import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// api & selector
import { fetchMovieGallery } from '../../../redux/dataMovie/actions';
import { selectMovieGallery } from '../../../redux/dataMovie/selectors';

import scss from './MovieGallery.module.scss';

export const MovieGallery = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const gallery = useSelector(selectMovieGallery);

  useEffect(() => {
    console.log('Effect started');
    dispatch(fetchMovieGallery({ id }));
    console.log('fetchMovieGallery dispatched');
  }, [dispatch, id]);

  console.log('Gallery:', gallery);

  return (
    <section className={scss.container}>
      <h2 className={scss.title}>Gallery</h2>
      <div className={scss.container}>
        {gallery.map((item, index) => (
          <div key={index} className={scss.galleryList}>
            <img
              className={scss.galleryImg}
              src={`https://image.tmdb.org/t/p/original${item.file_path}`}
              alt={`Backdrop ${index}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieGallery;
