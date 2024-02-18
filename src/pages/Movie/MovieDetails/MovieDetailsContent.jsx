import React from 'react';
import { Link } from 'react-router-dom';
import scss from './MovieDetails.module.scss';

const PosterImageURL = 'https://image.tmdb.org/t/p/w400';

export const MovieDetailsContent = ({
  title,
  posterPath,
  releaseDate,
  voteAverage,
  overview,
  genres,
  id,
  from,
  loadTrailer,
}) => {
  const genresList = genres.map(genre => genre.name).join(', ');
  const releaseYear = releaseDate.split('-')[0];

  return (
    <div className={scss.movieCard}>
      <div className={scss.posterImage}>
        <img
          src={`${PosterImageURL}${posterPath}`}
          alt={title}
          className={scss.posterImage}
        />
      </div>
      <div className={scss.description}>
        <div className={scss.info}>
          <div className={scss.titleBox}>
            <h1>
              {title} ({releaseYear})
            </h1>
            <Link className={scss.goBackLink} to={from}>
              X
            </Link>
          <div className={scss.decorLine}></div>
          </div>
        </div>
          <div>
            <div className={scss.ratingBox}>
              <p>Rating {voteAverage.toFixed(1)}</p>
              <div>Genres: {genresList}</div>
            </div>
            <p className={scss.overview}>{overview}</p>
          </div>
        {/* <p>Additional Information</p> */}
        <div className={scss.addInfo}>
          <div className={scss.linkBox}>
            <Link to="cast" state={{ from }}>
              Actors
            </Link>
          </div>
          <div className={scss.linkBox}>
            <Link to="reviews" state={{ from }}>
              Comments
            </Link>
          </div>
          <button className={scss.button} onClick={loadTrailer}>
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsContent;
