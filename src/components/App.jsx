import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout/Layout';
import { Home } from '../pages/Home/Home';
// import {Footer} from './Footer/Footer'

import { MovieDetails } from '../pages/MovieDetails/MovieDetails';
import { MovieCast } from '../components/MovieCast/MovieCast';
import { MovieReviews } from '../components/MovieReviews/MovieReviews';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
