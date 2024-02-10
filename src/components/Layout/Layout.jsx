import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';
import Logotype from '../../img/logo.jpg';

import scss from './Layout.module.scss';

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
