import React, { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';

import scss from './Layout.module.scss';
import Logotype from '../../img/kaset.png';

export const Layout = () => {
  return (
    <>
      <section className={scss.container}>
        <div className={scss.navBox}>
          <div className={scss.logoBox}>
            <Link to="/" className={scss.logoBox}>
              <img src={Logotype} alt="Logotype" className={scss.logo} />
              Filmistry
            </Link>
          </div>
          <Navigation />
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
