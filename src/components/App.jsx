import { Route, Routes } from 'react-router-dom';
import { MovieList } from './MovieList/MovieList';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />}></Route>
    </Routes>
  );
};

export default App;
