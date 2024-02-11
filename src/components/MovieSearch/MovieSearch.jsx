import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from '../../redux/dataMovie/movieThunks';
import { useSearchParams } from 'react-router-dom';

export const MovieSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const movieSearch = searchParams.get('query') ?? '';

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') return;
    setSearchParams({ query: query });
    setQuery('');
    dispatch(searchMovies({ query: query, currentPage: 1 }))
      .unwrap()
      .catch(() => {
        console.error('Something went wrong, please try again');
      });
  };

  useEffect(() => {
    if (movieSearch) {
      dispatch(searchMovies({ query: movieSearch, currentPage: 1 }))
        .unwrap()
        .catch(() => {
          console.error('Something went wrong, please try again');
        });
    }
  }, [dispatch, movieSearch]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies"
        value={query}
        onChange={handleChange}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default MovieSearch;
