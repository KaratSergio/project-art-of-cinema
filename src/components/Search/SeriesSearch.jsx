import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { searchSeries } from '../../redux/dataSeries/actions';

import { useSearchParams } from 'react-router-dom';

import scss from './Search.module.scss';

export const SeriesSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const seriesSearch = searchParams.get('query') ?? '';

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') return;
    setSearchParams({ query: query });
    setQuery('');
    dispatch(searchSeries({ query: query, currentPage: 1 }))
      .unwrap()
      .catch(() => {
        console.error('Something went wrong, please try again');
      });
  };

  useEffect(() => {
    if (seriesSearch) {
      dispatch(searchSeries({ query: seriesSearch, currentPage: 1 }))
        .unwrap()
        .catch(() => {
          console.error('Something went wrong, please try again');
        });
    }
  }, [dispatch, seriesSearch]);

  return (
    <div className={scss.searchBox}>
      <form className={scss.from} onSubmit={handleSubmit}>
        <input
          className={scss.input}
          type="text"
          placeholder="Search series"
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

export default SeriesSearch;
