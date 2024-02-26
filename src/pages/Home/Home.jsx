import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { MovieRandom } from '../../components/Movies/MovieRandom/MovieRandom';

import scss from './Home.module.scss';

export const Home = () => {
  return (
    <section className={scss.container}>
      <div>
        <MovieRandom />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
