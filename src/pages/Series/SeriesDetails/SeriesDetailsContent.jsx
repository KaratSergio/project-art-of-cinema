import React from 'react';
import { Link } from 'react-router-dom';
import { RatingBar } from 'components/RatingBar/RatingBar';

import scss from './SeriesDetails.module.scss';

const PosterImageURL = 'https://image.tmdb.org/t/p/w400';

export const SeriesDetailsContent = ({
  name,
  posterPath,
  vote_average,
  overview,
  genres,
  from,
  loadTrailer,
  currentPage,
}) => {
  const genresList = genres.map(genre => genre.name).join(', ');

  return (
    <div className={scss.seriesCard}>
      <div className={scss.posterImage}>
        <img
          src={`${PosterImageURL}${posterPath}`}
          alt={name}
          className={scss.posterImage}
        />
      </div>
      <div className={scss.description}>
        <div>
          <div className={scss.info}>
            <div className={scss.titleBox}>
              <h1>{name}</h1>
              <Link className={scss.goBackLink} to={from}>
                X
              </Link>
              <div className={scss.decorLine}></div>
            </div>
          </div>
          <div>
            <div className={scss.ratingBox}>
              <RatingBar rating={vote_average.toFixed(1)} />
              <div>Genres: {genresList}</div>
            </div>
            <p className={scss.overview}>{overview}</p>
          </div>
        </div>
        <div className={scss.addInfo}>
          <div className={scss.linkBox}>
            <Link to="cast" state={{ currentPage }}>
              Actors
            </Link>
          </div>
          <div className={scss.linkBox}>
            <Link to="reviews" state={{ currentPage }}>
              Comments
            </Link>
          </div>
          <button className={scss.button} onClick={loadTrailer}>
            Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsContent;
