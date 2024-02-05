import { Route, Routes } from 'react-router-dom';

import { Layout } from './Layout/Layout';
import { Home } from '../pages/Home/Home';
import { MovieDetails } from '../pages/MovieDetails/MovieDetails';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movie/:id" element={<MovieDetails />}>
          {/* <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
