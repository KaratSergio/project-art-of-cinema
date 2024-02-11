import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../../redux/dataMovie/movieThunks';

export const MovieSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(searchMovies({ query, currentPage: 1 }));
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies"
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default MovieSearch;
