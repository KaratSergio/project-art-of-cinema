import { Footer } from '../../components/Footer/Footer';
import { MovieList } from '../../components/MovieList/MovieList';

import scss from './Movie.module.scss';

export const Movie = () => {
  return (
    <section className={scss.container}>
      <div>
        <MovieList />
      </div>
      <Footer />
    </section>
  );
};

export default Movie;
