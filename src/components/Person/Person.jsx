import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPersonAsync } from '../../redux/dataPerson/actions';
import { selectPerson } from '../../redux/dataPerson/selectors';

import scss from './Person.module.scss';

export const Person = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const person = useSelector(selectPerson);

  useEffect(() => {
    dispatch(fetchPersonAsync({ id }));
  }, [dispatch, id]);

  console.log('Person data:', person);

  return (
    <div className={scss.container}>
      {person && (
        <>
          <div className={scss.profile}>
            <img
              src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
              alt={person.name}
            />
            <div className={scss.details}>
              <h2>{person.name}</h2>
              <p>Birthday: {person.birthday}</p>
              <p>Place of Birth: {person.place_of_birth}</p>
              <p>Biography: {person.biography}</p>
            </div>
          </div>
          <div className={scss.alsoKnownAs}>
            <h3>Also Known As</h3>
            <ul>
              {person.also_known_as.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};
