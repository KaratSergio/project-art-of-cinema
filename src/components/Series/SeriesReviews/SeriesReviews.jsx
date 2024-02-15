import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeriesReviews } from '../../../redux/dataSeries/seriesThunks';
import { selectSeriesReviews } from '../../../redux/dataSeries/seriesSelectors';

import scss from './SeriesReviews.module.scss';

export const SeriesReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectSeriesReviews);

  useEffect(() => {
    dispatch(fetchSeriesReviews({ id }));
  }, [dispatch, id]);

  return (
    <div className={scss.container}>
      {reviews && reviews.length === 0 ? (
        <div style={{ color: 'white', borderRadius: '8px' }}>
          <p>No reviews for this show</p>
        </div>
      ) : (
        reviews.map(({ author, content, id }) => (
          <div className={scss.commentBox} key={id}>
            <div className={scss.authorBox}>
              <p>Author: {author}</p>
            </div>
            <p className={scss.contentBox}>{content}</p>
          </div>
        ))
      )}
    </div>
  );
};
