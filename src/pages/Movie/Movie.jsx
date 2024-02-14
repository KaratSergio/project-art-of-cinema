import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { MovieList } from '../../components/Movies/MovieList/MovieList';

import scss from './Movie.module.scss';

export const Movie = () => {
  return (
    <section className={scss.container}>
      <div>
        <MovieList />
      </div>
      <Footer />
    </section>
  );
};

export default Movie;
