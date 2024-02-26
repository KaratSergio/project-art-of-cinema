import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { MediaRandomizer } from '../../components/MediaRandomizer/MediaRandomizer';

import scss from './Home.module.scss';

export const Home = () => {
  return (
    <section className={scss.container}>
      <div>
        <MediaRandomizer />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
