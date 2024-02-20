import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovieCredits } from '../../../redux/dataMovie/movieThunks';
import { selectMovieCredits } from '../../../redux/dataMovie/movieSelectors';

import scss from './MovieCast.module.scss';

export const MovieCast = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const credits = useSelector(selectMovieCredits);
  const baseURL = 'https://image.tmdb.org/t/p/w200';

  useEffect(() => {
    dispatch(fetchMovieCredits({ id }));
  }, [dispatch, id]);

  return (
    <div>
      {credits.length === 0 ? (
        <p className={scss.textSms}>No credits available for this movie</p>
      ) : (
        <ul className={scss.container}>
          {credits.map(
            ({ profile_path, name, character, id }) =>
              profile_path && (
                <li
                  className={scss.actorCard}
                  key={id}
                  style={{
                    backgroundImage: `url(${baseURL}${profile_path})`,
                  }}
                >
                  <div className={scss.actorName}>
                    <p>{name}</p>
                  </div>
                  <div className={scss.actorRole}>
                    <p>Role: {character}</p>
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};
