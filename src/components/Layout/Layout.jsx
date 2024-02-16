import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Search } from '../Search/Search';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import { Pagination } from '../Pagination/Pagination';

import scss from './Layout.module.scss';
import Logotype from '../../img/logo.jpg';

export const Layout = () => {
  const searchResults = useSelector(state => state.globalSearch.searchResults);
  const currentPage = useSelector(state => state.globalSearch.currentPage);
  const totalPages = useSelector(state => state.globalSearch.totalPages);
  const ImageURL = 'https://image.tmdb.org/t/p/w200';
  const itemsPerPage = 18;

  useEffect(() => {
    console.log('searchResults:', searchResults);
    console.log('totalPages:', totalPages);
  }, [searchResults, totalPages]);

  const handlePageChange = page => {
  };

  const renderSearchResults = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentResults = searchResults.slice(startIndex, endIndex);

    return (
      <>
        <ul className={scss.searchResults}>
          {currentResults.map(
            result =>
              result &&
              result.id &&
              result.poster_path && (
                <li className={scss.movieItem} key={result.id}>
                  <img
                    className={scss.moviePoster}
                    src={`${ImageURL}${result.poster_path}`}
                    alt={result.title || result.name}
                  />
                  <p className={scss.moviePosterTitle}>
                    {result.title || result.name}
                  </p>
                </li>
              )
          )}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Footer />
      </>
    );
  };

  return (
    <>
      <section className={scss.container}>
        <div className={scss.navBox}>
          <div className={scss.logoBox}>
            <img src={Logotype} alt="Logotype" className={scss.logo} />
            <p className={scss.logoText}>Filmistry</p>
          </div>
          <Navigation />
          <Search />
        </div>
        <div>
          {searchResults.length > 0 ? renderSearchResults() : <Outlet />}
        </div>
      </section>
    </>
  );
};

export default Layout;
