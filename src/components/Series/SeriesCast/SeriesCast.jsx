import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Slider react-slick
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import sliderSettings from '../../../utils/sliderSettings';
// api & selector
import { fetchSeriesCredits } from '../../../redux/dataSeries/seriesThunks';
import { selectSeriesCredits } from '../../../redux/dataSeries/seriesSelectors';

import scss from './SeriesCast.module.scss';

export const SeriesCast = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const credits = useSelector(selectSeriesCredits);
  const baseURL = 'https://image.tmdb.org/t/p/w200';
  const [sliderEnabled, setSliderEnabled] = useState(true);

  useEffect(() => {
    dispatch(fetchSeriesCredits({ id }));
  }, [dispatch, id]);

  //if actor cards < showSlider card = on/off slider
  useEffect(() => {
    if (credits.length <= sliderSettings.slidesToShow) {
      setSliderEnabled(false);
    } else {
      setSliderEnabled(true);
    }
  }, [credits]);

  return (
    <div className={scss.slickList}>
      {credits.length === 0 ? (
        <p className={scss.textSms}>No credits available for this show</p>
      ) : (
        <React.Fragment>
          {sliderEnabled ? (
            <Slider {...sliderSettings}>
              {credits.map(
                ({ profile_path, name, character, id }) =>
                  profile_path && (
                    <div key={id} className={scss.slickSlide}>
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
                  )
              )}
            </Slider>
          ) : (
            <div className={scss.actorList}>
              {credits.map(
                ({ profile_path, name, character, id }) =>
                  profile_path && (
                    <div key={id} className={scss.actorCard}>
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
                  )
              )}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default SeriesCast;
