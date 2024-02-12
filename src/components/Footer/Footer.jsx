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
          <p>
            © 2024 KaratSergio. <span className={scss.tmdb}>TMDB</span>
          </p>
          <div className={scss.tmdbAccent}></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
