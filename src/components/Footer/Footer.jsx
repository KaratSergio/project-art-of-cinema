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
        <p>© 2024 KaratSergio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
