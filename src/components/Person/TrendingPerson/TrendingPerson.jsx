import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTrendingPersonAsync } from '../../../redux/dataPerson/actions';
import { selectTrendingPersons } from '../../../redux/dataPerson/selectors';

import scss from './TrendingPerson.module.scss';

export const TrendingPerson = () => {
  const dispatch = useDispatch();
  const trendingPersons = useSelector(selectTrendingPersons);

  useEffect(() => {
    dispatch(fetchTrendingPersonAsync());
  }, [dispatch]);

  return (
    <section>
      <h2 className={scss.title}>Trending Persons</h2>
      <div className={scss.actorList}>
        {trendingPersons &&
          trendingPersons.map(person => (
            <div className={scss.actorCard} key={person.id}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
                  alt={person.name}
                />
                <p>{person.name}</p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
