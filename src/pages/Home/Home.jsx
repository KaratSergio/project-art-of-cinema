import { Footer } from '../../components/Footer/Footer';
import { MovieList } from '../../components/MovieList/MovieList';

import scss from './Home.module.scss';

export const Home = () => {
  return (
    <section className={scss.container}>
      <div>
        <MovieList />
      </div>
      <Footer />
    </section>
  );
};

export default Home;
