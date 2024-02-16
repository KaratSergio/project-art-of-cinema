import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGlobalSearchAsync } from '../../redux/globalSearch/globalSearch';
import { useSearchParams } from 'react-router-dom';

import scss from './Search.module.scss';

export const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const globalSearchQuery = searchParams.get('query') ?? '';

  const handleChange = e => {
    const value = e.currentTarget.value.toLowerCase();
    console.log('New query:', value);
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') return;
    setSearchParams({ query: query });
    setQuery('');
    console.log('Submitting search query:', query);
    dispatch(fetchGlobalSearchAsync({ query: query, currentPage: 1 }));
  };

  useEffect(() => {
    console.log('Global search query:', globalSearchQuery);
    if (globalSearchQuery) {
      dispatch(
        fetchGlobalSearchAsync({ query: globalSearchQuery, currentPage: 1 })
      );
    }
  }, [dispatch, globalSearchQuery]);

  return (
    <div className={scss.searchBox}>
      <form className={scss.form} onSubmit={handleSubmit}>
        <input
          className={scss.input}
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
        />
        <button className={scss.button} type="submit">
          🔍
        </button>
      </form>
    </div>
  );
};

export default Search;
