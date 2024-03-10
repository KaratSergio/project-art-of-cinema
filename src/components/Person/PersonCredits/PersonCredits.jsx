import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPersonCredits } from '../../../redux/dataPerson/actions';
import { selectPersonCredits } from '../../../redux/dataPerson/selectors';

import scss from './PersonCredits.module.scss';

export const PersonCredits = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cast = useSelector(selectPersonCredits);

  useEffect(() => {
    dispatch(fetchPersonCredits({ id }));
  }, [dispatch, id]);

  return (
    <div className={scss.container}>
      <h2>films with the actor</h2>
      <ul className={scss.listFilm}>
        {cast.map((cast, index) => (
          <li key={index}>
            <img
              className={scss.posterFilm}
              src={`https://image.tmdb.org/t/p/w200${cast.poster_path}`}
              alt={cast.title}
            />
            <div className={scss.description}>
              <h3>{cast.title}</h3>
              <p>{cast.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
