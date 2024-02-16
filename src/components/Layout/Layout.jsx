import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom'; 

import { MovieSearch } from '../Search/MovieSearch';
import { Navigation } from '../Navigation/Navigation';

import scss from './Layout.module.scss';
import Logotype from '../../img/logo.jpg';

export const Layout = () => {
  return (
    <>
      <section className={scss.container}>
        <div className={scss.navBox}>
          <div className={scss.logoBox}>
            <img src={Logotype} alt="Logotype" className={scss.logo} />
            <p className={scss.logoText}>Filmistry</p>
          </div>
          <Navigation />
          <MovieSearch />
        </div>
        <div>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default Layout;
