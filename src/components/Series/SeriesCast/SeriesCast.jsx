import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Slider react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import sliderSettings from '../../../utils/sliderSettings';
// api & selector
import { fetchSeriesCredits } from '../../../redux/dataSeries/actions';
import { selectSeriesCredits } from '../../../redux/dataSeries/selectors';

import scss from './SeriesCast.module.scss';

export const SeriesCast = () => {
  const { id: seriesId } = useParams(); // seriesID
  const dispatch = useDispatch();
  const credits = useSelector(selectSeriesCredits);
  const baseURL = 'https://image.tmdb.org/t/p/w200';
  const location = useLocation();
  const previousPath = location.pathname;

  useEffect(() => {
    dispatch(fetchSeriesCredits({ id: seriesId })); // seriesID to API
  }, [dispatch, seriesId]);

  const shouldRenderSlider = credits.length > sliderSettings.slidesToShow;

  const isOddCards = credits.length % 2 !== 0;

  return (
    <div className={scss.slickList}>
      <h2 className={scss.title}>Actors</h2>
      {credits.length === 0 ? (
        <p className={scss.textSms}>No credits available</p>
      ) : shouldRenderSlider ? (
        <Slider {...sliderSettings}>
          {credits.map(
            ({ profile_path, name, character, id }) =>
              profile_path && (
                <Link
                  to={`/person/${id}`}
                  key={id}
                  state={{
                    previousPageId: seriesId,
                    previousPath: previousPath,
                  }} // Передаемо seriesID як previousPageId
                >
                  <div className={scss.slickSlide}>
                    <div className={scss.actorBox}>
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
                  </div>
                </Link>
              )
          )}
          {isOddCards && (
            <div className={scss.slickSlide}>
              <div className={scss.actorCard}>
                <div className={scss.actorImagePlaceholder} />
              </div>
            </div>
          )}
        </Slider>
      ) : (
        <div className={scss.actorList}>
          {credits.map(
            ({ profile_path, name, character, id }) =>
              profile_path && (
                <Link
                  to={`/person/${id}`}
                  key={id}
                  state={{
                    previousPageId: seriesId,
                    previousPath: previousPath,
                  }} // Передаемо seriesID як previousPageId
                >
                  <div className={scss.actorCard}>
                    <div className={scss.actorBox}>
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
                  </div>
                </Link>
              )
          )}
          {isOddCards && (
            <div className={scss.actorCard}>
              <div className={scss.actorImagePlaceholder} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
