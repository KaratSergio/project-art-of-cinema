import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSeries } from '../../../redux/dataSeries/seriesSelectors';
import { fetchSeriesAsync } from '../../../redux/dataSeries/seriesThunks';
import { Pagination } from '../../Pagination/Pagination';

import scss from './SeriesList.module.scss'

export const SeriesList = () => {
  const dispatch = useDispatch();
  const { series, totalPages } = useSelector(selectSeries);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query] = useState('');
  const ImageURL = 'https://image.tmdb.org/t/p/w200';
  const handlePageChange = async page => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(
          fetchSeriesAsync({ endpoint: 'discover/tv', currentPage, query })
        );
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, currentPage, query]);

  return (
    <div className={scss.container}>
      <h1 className={scss.seriesTitle}>Series</h1>
      <div>
        <ul className={scss.seriesGallery}>
          {series &&
            series.slice(0, 18).map(series => (
              <li className={scss.seriesItem} key={series.id}>
                {series.poster_path && (
                  <Link to={`series/${series.id}`}>
                    <img
                      className={scss.seriesPoster}
                      src={`${ImageURL}${series.poster_path}`}
                      alt={series.title}
                    />
                  </Link>
                )}
                <div className={scss.seriesPosterTitle}>
                  <p>{series.title}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default SeriesList;
