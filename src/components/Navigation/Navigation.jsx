import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import BurgerMenu from './BurgerMenu/BurgerMenu';
import scss from './Navigation.module.scss';

export const Navigation = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('');
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const currentPath = location.pathname;
    setActiveMenu(currentPath);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = menu => {
    setActiveMenu(menu);
    setIsBurgerActive(false);
  };

  const handleToggleBurger = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  return (
    <div className={scss.container}>
      <BurgerMenu isActive={isBurgerActive} handleToggle={handleToggleBurger} />
      {!isMobile && !isBurgerActive && (
        <div className={scss.menu}>
          <NavLink
            to="/"
            className={activeMenu === '/' ? scss.active : ''}
            onClick={() => handleMenuClick('/')}
          >
            HOME
          </NavLink>
          <NavLink
            to="/movies/page"
            className={activeMenu === '/movies/page' ? scss.active : ''}
            onClick={() => handleMenuClick('/movies/page')}
          >
            MOVIES
          </NavLink>
          <NavLink
            to="/series/page"
            className={activeMenu === '/series/page' ? scss.active : ''}
            onClick={() => handleMenuClick('/series/page')}
          >
            SERIES
          </NavLink>
          <NavLink
            to="/person"
            className={activeMenu === '/person' ? scss.active : ''}
            onClick={() => handleMenuClick('/person')}
          >
            PERSON
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navigation;
