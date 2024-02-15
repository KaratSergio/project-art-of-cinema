import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Search } from '../Search/Search';
import { Footer } from '../Footer/Footer'; 
import { Navigation } from '../Navigation/Navigation';
import { Pagination } from '../Pagination/Pagination';

import scss from './Layout.module.scss';
import Logotype from '../../img/logo.jpg';

export const Layout = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const ImageURL = 'https://image.tmdb.org/t/p/w200';

  const handlePageChange = page => {
    setCurrentPage(page); 
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
          <Search setSearchResults={setSearchResults} />
        </div>
        <div>
          {searchResults ? (
            <>
              <ul className={scss.searchResults}>
                {searchResults.map(
                  result =>
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
                totalPages={10}
                onPageChange={handlePageChange}
              />
            <Footer />
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </section>
    </>
  );
};

export default Layout;
