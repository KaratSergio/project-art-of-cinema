import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { MovieTop } from '../../components/Movies/MovieTop/MovieTop'

import scss from './Home.module.scss';

export const Home = () => {
  return (
    <section className={scss.container}>
      <div>
        <MovieTop />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
