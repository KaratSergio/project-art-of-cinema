import React from 'react';

import { Footer } from '../../components/Footer/Footer';

import { MovieTrailerBar } from '../../components/Movies/MovieTrailerBar/MovieTrailerBar';

import { MediaRandomizer } from '../../components/MediaRandomizer/MediaRandomizer';

import scss from './Home.module.scss';

export const Home = () => {
  return (
    <section className={scss.container}>
      <div>
        <MediaRandomizer />
      </div>
      <div>
        <MovieTrailerBar />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
