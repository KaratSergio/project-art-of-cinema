import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sliderSettings from '../../../utils/sliderSettings';

import { fetchPersonCredits } from '../../../redux/dataPerson/actions';
import { selectPersonCredits } from '../../../redux/dataPerson/selectors';

import scss from './PersonCredits.module.scss';

export const PersonCredits = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cast = useSelector(selectPersonCredits);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPersonCredits({ id }))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch, id]);

  const filteredCast = cast.filter(film => film.poster_path);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={scss.container}>
      <h2 className={scss.title}>Films</h2>
      {filteredCast.length > 0 ? (
        <Slider {...sliderSettings}>
          {filteredCast.map((film, id) => (
            <div key={id} className={scss.slickSlide}>
              <img
                className={scss.posterFilm}
                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                alt={film.title}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>No films found</p>
      )}
    </div>
  );
};
