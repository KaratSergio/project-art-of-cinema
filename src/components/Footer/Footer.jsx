import React from 'react';
import Logotype from '../../img/logo.jpg';
import scss from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={scss.footer}>
      <div className={scss.footerContent}>
        <div className={scss.logoBox}>
          <img src={Logotype} alt="Logotype" className={scss.logo} />
          <p className={scss.logoText}>Filmistry</p>
        </div>
        <p>Millions of movies, TV shows and people to discover. Explore now.</p>
        <p>Made based on The Movie Data Base</p>
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
      <div className={scss.footerNavBox}>
        <div className={scss.NavBox}>
          <h2>Movies</h2>
          <p>popular</p>
          <p>top rated</p>
          <p>upcoming</p>
          <p>now playing</p>
        </div>
        <div>
          <h2>Series</h2>
          <p>popular</p>
          <p>top rated</p>
          <p>upcoming</p>
          <p>now playing</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
