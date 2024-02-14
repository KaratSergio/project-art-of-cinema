import  React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import scss from './Navigation.module.scss';

export const Navigation = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveMenu(currentPath);
  }, [location.pathname]);

  const handleMenuClick = menu => {
    setActiveMenu(menu);
  };

  return (
    <div className={scss['container']}>
      <NavLink
        to="/"
        className={activeMenu === '/' ? scss.active : ''}
        onClick={() => handleMenuClick('/')}
      >
        MOVIE
      </NavLink>
      <NavLink
        to="/series"
        className={activeMenu === '/series' ? scss.active : ''}
        onClick={() => handleMenuClick('/series')}
      >
        SERIES
      </NavLink>
    </div>
  );
};

export default Navigation;
