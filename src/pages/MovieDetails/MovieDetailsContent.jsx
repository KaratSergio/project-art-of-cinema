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
        <h1>
          {title} ({releaseYear})
        </h1>
        <button onClick={loadTrailer}>Watch Trailer</button>
        <p>Rating {voteAverage}</p>
        <p>{overview}</p>
        <div>Genres: {genresList}</div>
        <div>Additional Information</div>
        <div>
          <div>
            <Link to="cast" state={{ from }}>
              Cast
            </Link>
          </div>
          <div>
            <Link to="reviews" state={{ from }}>
              Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsContent;
