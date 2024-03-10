import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPersonAsync } from '../../redux/dataPerson/actions';
import { selectPerson } from '../../redux/dataPerson/selectors';

import scss from './Person.module.scss';

export const Person = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const person = useSelector(selectPerson);

  const previousPageId = location.state?.previousPageId;

  useEffect(() => {
    dispatch(fetchPersonAsync({ id }));
  }, [dispatch, id]);

  console.log('Person data:', person);

  return (
    <section>
      {person && (
        <div className={scss.container}>
          <div className={scss.profile}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                alt={person.name}
              />
              <Link
                to={
                  previousPageId ? `/movie/page1/${previousPageId}/cast` : '/'
                }
              >
                X
              </Link>
            </div>
            <div className={scss.details}>
              <h2>{person.name}</h2>
              <p>Birthday: {person.birthday}</p>
              <p>Place of Birth: {person.place_of_birth}</p>
              <p className={scss.biography}>Biography: {person.biography}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
