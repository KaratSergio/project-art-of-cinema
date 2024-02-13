import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieReviews } from '../../redux/dataMovie/movieThunks';
import { selectMovieReviews } from '../../redux/dataMovie/movieSelectors';

import scss from './MovieReviews.module.scss';

export const MovieReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const reviews = useSelector(selectMovieReviews);

  useEffect(() => {
    dispatch(fetchMovieReviews({ id }));
  }, [dispatch, id]);

  return (
    <div className={scss.container}>
      {reviews.length === 0 ? (
        <div style={{ color: 'white' }}>
          <p>No reviews for this movie</p>
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

