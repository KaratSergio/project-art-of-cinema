import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';
// import { Footer } from '../Footer/Footer';

import scss from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={scss.mainContainer}>
      <section className={scss.container}>
        <div>
          <Navigation />
        </div>
        <div>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default Layout;
