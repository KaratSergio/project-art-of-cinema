import { MovieList } from '../../components/MovieList/MovieList';

import scss from './Home.module.scss';

export const Home = () => {
  return (
    <section className={scss.container}>
      <div>
        <MovieList />
      </div>
    </section>
  );
};

export default Home;
