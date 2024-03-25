import React from 'react';
import { Footer } from '../../components/Footer/Footer';

import scss from './PageNotFound.module.scss';

export const NoPageFound = () => {
  return (
    <section className={scss.container}>
      <div>
        <p className={scss.message}>No Page Found</p>
      </div>
      <Footer />
    </section>
  );
};

export default NoPageFound;
