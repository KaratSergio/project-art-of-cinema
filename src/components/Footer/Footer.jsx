import scss from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={scss.footer}>
            <div className={scss.footerContent}>
                <p>© 2024 KaratSergio. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;