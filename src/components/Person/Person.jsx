import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPersonAsync } from '../../../redux/dataPerson/actions';
import { selectPerson } from '../../../redux/dataPerson/selectors';

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
      <div>
        {person &&
          person.map(({ id, name, biography }) => (
            <div className={scss.cox} key={id}>
              <div className={scss.authorBox}>
                <p>Name: {name}</p>
              </div>
              <p className={scss.contentBox}>{biography}</p>{' '}
            </div>
          ))}
      </div>
    </div>
  );
};
