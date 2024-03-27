import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchTrendingPersonAsync } from '../../../redux/dataPerson/actions';
import { selectTrendingPersons } from '../../../redux/dataPerson/selectors';

import Footer from '../../Footer/Footer';

import scss from './TrendingPerson.module.scss';

export const TrendingPerson = () => {
  const dispatch = useDispatch();
  const trendingPersons = useSelector(selectTrendingPersons);

  useEffect(() => {
    dispatch(fetchTrendingPersonAsync());
  }, [dispatch]);

  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = index => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section>
      <h2 className={scss.title}>Trending Persons</h2>
      <div className={scss.actorList}>
        {trendingPersons &&
          trendingPersons.map((person, index) => (
            <Link
              to={`/actor/${person.id}`}
              className={`${scss.actorCard} ${
                hoveredCard === index ? scss.hover : ''
              }`}
              key={person.id}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200/${person.profile_path}`}
                alt={person.name}
              />
              <figcaption>
                <h3>&#9733; {person.name}</h3>
                <p>more details &rarr;</p>
              </figcaption>
            </Link>
          ))}
      </div>
      <Footer />
    </section>
  );
};
