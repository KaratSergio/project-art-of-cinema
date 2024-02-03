import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MovieList } from '../MovieList/MovieList';
// import { Navigation } from '../Navigation/Navigation';

import scss from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <section className={scss.container}>
        <div>{/* <Navigation /> */}</div>
        <div>
          <MovieList />
        </div>
      </section>
      <section>
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
