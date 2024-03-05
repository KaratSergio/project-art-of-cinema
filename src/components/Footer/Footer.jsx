import React from 'react';
import { Link } from 'react-router-dom';
import Logotype from '../../img/logo.jpg';
import scss from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.footerContent}>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <p>
          Cinema turns out to be the first artistic medium that can show how
          matter plays along with man.
          <br /> © Walter Benjamin
        </p>
        <div>
          <p>based on API The Movie Data Base</p>
          <div className={scss.byApi}>
            <p>© 2024 KaratSergio.</p>
            <a
              className={scss.tmdb}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TMDB
              <div className={scss.tmdbAccent}></div>
            </a>
          </div>
        </div>
      </div>
      <div className={scss.footerNavBox}>
        <div>
          <ul className={scss.navList}>
            <li>Movies</li>
            <li>Series</li>
            <li>Gallery</li>
            <li>Person</li>
          </ul>
        </div>
        <div className={scss.logoBox}>
          <Link to="/" className={scss.logoText}>
            <img src={Logotype} alt="Logotype" className={scss.logo} />
            Filmistry
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
