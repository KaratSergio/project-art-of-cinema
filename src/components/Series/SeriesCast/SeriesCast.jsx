import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeriesCredits } from '../../../redux/dataSeries/seriesThunks';
import { selectSeriesCredits } from '../../../redux/dataSeries/seriesSelectors';

import scss from './SeriesCast.module.scss';

export const SeriesCast = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const credits = useSelector(selectSeriesCredits);
  const baseURL = 'https://image.tmdb.org/t/p/w200';

  useEffect(() => {
    dispatch(fetchSeriesCredits({ id }));
  }, [dispatch, id]);

  return (
    <div className={scss.container}>
      {credits.length === 0 ? (
          <p className={scss.textSms}>No credits available for this show</p>
      ) : (
        <ul className={scss.listActors}>
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
