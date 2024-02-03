import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';
// import { MovieList } from './MovieList/MovieList';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}></Route>
    </Routes>
  );
};

export default App;
