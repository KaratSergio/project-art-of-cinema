import React from 'react';
import { Footer } from '../../components/Footer/Footer';

import scss from './PageNotFound.module.scss';

export const NoPageFound = () => {
  return (
    <section>
      <div className={scss.container}>
        <p className={scss.message}>No Page Found</p>
        <p className={scss.num}>404</p>
      </div>
      <Footer />
    </section>
  );
};

export default NoPageFound;
