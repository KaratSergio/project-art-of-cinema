import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { PersonTrending } from '../../components/Person/PersonTrending/PersonTrending';

import scss from './Person.module.scss';

export const Person = () => {
  return (
    <section className={scss.container}>
      <div>
        <PersonTrending />
      </div>
      <Footer />
    </section>
  );
};
