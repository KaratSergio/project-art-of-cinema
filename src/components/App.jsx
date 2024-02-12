import { Route, Routes } from 'react-router-dom';
import { Movie } from '../pages/Movie/Movie';
import { Series } from '../pages/Series/Series';
import { Layout } from './Layout/Layout';
import { MovieCast } from '../components/MovieCast/MovieCast';
import { MovieDetails } from '../pages/MovieDetails/MovieDetails';
import { MovieReviews } from '../components/MovieReviews/MovieReviews';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Movie />} />
        <Route path="movie/:id" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="series" element={<Series />}>
          {/* <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
