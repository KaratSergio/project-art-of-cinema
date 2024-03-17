import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeriesReviews } from '../../../redux/dataSeries/actions';
import { selectSeriesReviews } from '../../../redux/dataSeries/selectors';

import scss from './SeriesReviews.module.scss';

export const SeriesReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectSeriesReviews);

  useEffect(() => {
    dispatch(fetchSeriesReviews({ id }));
  }, [dispatch, id]);

  return (
    <div>
      <h2 className={scss.title}>Comments</h2>
      <div className={scss.container}>
        <div
          className={`${scss.commentsWrapper} ${
            reviews && reviews.length === 0 ? scss.hasReviews : ''
          }`}
        >
          {reviews && reviews.length === 0 ? (
            <div className={scss.noReviewSms}>
              <p>No reviews!</p>
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
      </div>
    </div>
  );
};
