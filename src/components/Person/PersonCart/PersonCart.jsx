import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPersonAsync } from '../../../redux/dataPerson/actions';
import { selectPerson } from '../../../redux/dataPerson/selectors';

import scss from './PersonCart.module.scss';

import { PersonCredits } from '../PersonCredits/PersonCredits';
import { Footer } from '../../Footer/Footer';

export const PersonCart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const person = useSelector(selectPerson);

  const previousPageId = location.state?.previousPageId;
  const previousPath = location.state?.previousPath || '/person';

  useEffect(() => {
    dispatch(fetchPersonAsync({ id }));
  }, [dispatch, id]);

  return (
    <section className={scss.sectionPerson}>
      {person && (
        <div className={scss.container}>
          <div className={scss.profile}>
            <div className={scss.photoBox}>
              <img
                className={scss.photo}
                src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                alt={person.name}
              />
            </div>
            <div className={scss.details}>
              <div className={scss.title}>
                <h2>{person.name}</h2>
                {previousPageId && previousPath && (
                  <Link to={previousPath}>&#10006;</Link>
                )}
                {previousPath === '/person' && (
                  <Link to={'/person'}>&#10006;</Link>
                )}
              </div>
              <p>Birthday: {person.birthday || 'was born on one fine day'}</p>
              <p>
                Place of Birth: {person.place_of_birth || 'on planet earth'}
              </p>
              <p className={scss.biography}>
                Biography:{' '}
                {person.biography ||
                  'Talent and innate charisma helped to quickly break into the world of cinema. The first roles in small films provided an opportunity to showcase acting skills. With each new project, popularity grew, leading to more offers from leading directors and producers. Outside of the film work, actively engages in charitable initiatives and works on projects aimed at supporting children with special needs. Leaves an unforgettable mark in the world of art and continues to inspire the younger generation of actors with their example and talent.'}
              </p>
            </div>
          </div>
        </div>
      )}
      <PersonCredits />
      <Footer />
    </section>
  );
};
