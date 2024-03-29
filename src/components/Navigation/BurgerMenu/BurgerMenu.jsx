import React from 'react';
import { NavLink } from 'react-router-dom';

import scss from './BurgerMenu.module.scss';

export const BurgerMenu = ({ isActive, handleToggle }) => {
  return (
    <div
      className={
        isActive ? `${scss.menuContainer} ${scss.active}` : scss.menuContainer
      }
    >
      <div
        className={isActive ? `${scss.burger} ${scss.active}` : scss.burger}
        onClick={handleToggle}
      >
        <div className={scss.line}></div>
        <div className={scss.line}></div>
        <div className={scss.line}></div>
      </div>

      {isActive && (
        <div className={scss.menu}>
          <NavLink to="/" className={scss.menuItem} onClick={handleToggle}>
            HOME
          </NavLink>
          <NavLink
            to="/movies/page"
            className={scss.menuItem}
            onClick={handleToggle}
          >
            MOVIES
          </NavLink>
          <NavLink
            to="/series/page"
            className={scss.menuItem}
            onClick={handleToggle}
          >
            SERIES
          </NavLink>
          <NavLink
            to="/person"
            className={scss.menuItem}
            onClick={handleToggle}
          >
            PERSON
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
