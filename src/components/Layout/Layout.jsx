import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';

import scss from './Layout.module.scss';

export const Layout = () => {
  return (
    <>
      <section className={scss.container}>
        <div><Navigation /></div>
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
