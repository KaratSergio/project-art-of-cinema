import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectSeries } from '../../../redux/dataSeries/seriesSelectors';
import { fetchSeriesAsync } from '../../../redux/dataSeries/seriesThunks';

import { Pagination } from '../../Pagination/Pagination';
import { SeriesSearch } from '../../Search/SeriesSearch';

import scss from './SeriesList.module.scss';

export const SeriesList = () => {
  const dispatch = useDispatch();
  const { series, totalPages } = useSelector(selectSeries);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(18);
  const ImageURL = 'https://image.tmdb.org/t/p/w200';

  const handlePageChange = async page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(1);
    const currentPageFromURL = window.location.pathname.match(/\/page(\d+)/);

    if (currentPageFromURL && currentPageFromURL[1]) {
      setCurrentPage(parseInt(currentPageFromURL[1]));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(
          fetchSeriesAsync({ endpoint: 'tv/top_rated', currentPage, query })
        );
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, query]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setItemsPerPage(20);
      } else {
        setItemsPerPage(18);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={scss.container}>
      <SeriesSearch />
      <h1 className={scss.seriesTitle}>Series</h1>
      <div>
        <ul className={scss.seriesGallery}>
          {series &&
            series.slice(0, itemsPerPage).map(singleSeries => (
              <li className={scss.seriesItem} key={singleSeries.id}>
                {singleSeries.poster_path && (
                  <Link
                    to={`/series/page${currentPage}/${singleSeries.id}`}
                    state={{ currentPage }}
                  >
                    <img
                      className={scss.seriesPoster}
                      src={`${ImageURL}${singleSeries.poster_path}`}
                      alt={singleSeries.name}
                    />
                  </Link>
                )}
                <div className={scss.seriesPosterTitle}>
                  <p>{singleSeries.name}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      {totalPages !== undefined && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SeriesList;
