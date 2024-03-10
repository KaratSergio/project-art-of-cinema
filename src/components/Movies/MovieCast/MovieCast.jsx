import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Slider react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import sliderSettings from '../../../utils/sliderSettings';
// api & selector
import { fetchMovieCredits } from '../../../redux/dataMovie/actions';
import { selectMovieCredits } from '../../../redux/dataMovie/selectors';

import scss from './MovieCast.module.scss';

export const MovieCast = () => {
  const { id: movieId } = useParams(); //  movieId
  const dispatch = useDispatch();
  const credits = useSelector(selectMovieCredits);
  const baseURL = 'https://image.tmdb.org/t/p/w200';

  useEffect(() => {
    dispatch(fetchMovieCredits({ id: movieId })); //  movieId запит к API
  }, [dispatch, movieId]);

  return (
    <div className={scss.slickList}>
      {credits.length === 0 ? (
        <p className={scss.textSms}>No credits available for this movie</p>
      ) : (
        <Slider {...sliderSettings}>
          {credits.map(
            ({ profile_path, name, character, id }) =>
              profile_path && (
                <Link
                  to={`/actor/${id}`}
                  key={id}
                  state={{ previousPageId: movieId }} // Передаемо movieId як previousPageId
                >
                  <div className={scss.slickSlide}>
                    <img
                      src={`${baseURL}${profile_path}`}
                      alt={name}
                      className={scss.actorImage}
                    />
                    <div className={scss.actorInfo}>
                      <p className={scss.actorName}>{name}</p>
                      <p className={scss.actorRole}>
                        Role: {character ? character : 'minor'}
                      </p>
                    </div>
                  </div>
                </Link>
              )
          )}
        </Slider>
      )}
    </div>
  );
};

export default MovieCast;
