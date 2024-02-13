import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieReviews } from '../../redux/dataMovie/movieThunks';
import { selectMovieReviews } from '../../redux/dataMovie/movieSelectors';

import scss from './MovieReviews.module.scss';

export const MovieReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector(selectMovieReviews);

  useEffect(() => {
    dispatch(fetchMovieReviews({ id }));
  }, [dispatch, id]);

if (reviews.length === 0) {
  return (
    <div style={{ color: 'white' }}>
      <p>No reviews for this movie</p>
    </div>
  );
}

return (
  <div className={scss.container}>
    {reviews.length === 0 ? (
      <p>No reviews available for this movie</p>
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
