import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { fetchTrendingPersonAsync } from '../../../redux/dataPerson/actions';
import { selectTrendingPersons } from '../../../redux/dataPerson/selectors';

import scss from './PersonTrending.module.scss';

export const PersonTrending = () => {
  const dispatch = useDispatch();
  const trendingPersons = useSelector(selectTrendingPersons);
  const location = useLocation();
  const previousPath = location.pathname;

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

  console.log('hoveredCard:', hoveredCard);
  console.log('trendingPersons:', trendingPersons);
  console.log('previousPath:', previousPath);

  return (
    <section>
      <h2 className={scss.title}>Trending Persons</h2>
      <div className={scss.actorList}>
        {trendingPersons &&
          trendingPersons.map((person, index) => (
            <Link
              to={{
                pathname: `/person/${person.id}`,
                state: { previousPage: '/person', previousPath: '/person' },
              }}
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
    </section>
  );
};
