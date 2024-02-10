import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../redux/dataMovie/movieThunks';
import { selectMovieReviews } from '../../redux/dataMovie/movieSelectors';

import scss from './MovieReviews.module.scss';

export const MovieReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector(selectMovieReviews);

  useEffect(() => {
    console.log('Dispatching fetchMovieReviews for movie with ID:', id);
    dispatch(fetchMovieReviews({ id }));
  }, [dispatch, id]);

  console.log('Current movieReviews:', reviews);

  if (!Array.isArray(reviews)) {
    return (
      <div>
        <p>Invalid data format for movie reviews</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div>
        <p>No reviews for this movie</p>
      </div>
    );
  }

  return (
    <div className={scss.container}>
      {reviews.map(({ author, content, id }) => (
        <div className={scss.commentBox} key={id}>
          <div className={scss.authorBox}>
            <p>Author: {author}</p>
          </div>
          <p className={scss.contentBox}>{content}</p>
        </div>
      ))}
    </div>
  );
};
