import { Link } from 'react-router-dom';
import scss from './SeriesDetails.module.scss';

const PosterImageURL = 'https://image.tmdb.org/t/p/w400';

export const SeriesDetailsContent = ({
  title,
  posterPath,
  // releaseDate,
  voteAverage,
  overview,
  genres,
  id,
  from,
  loadTrailer,
}) => {
  const genresList = genres.map(genre => genre.name).join(', ');
  // const releaseYear = releaseDate.split('-')[0];

  return (
    <div className={scss.seriesCard}>
      <div className={scss.posterImage}>
        <img
          src={`${PosterImageURL}${posterPath}`}
          alt={title}
          className={scss.posterImage}
        />
      </div>
      <div className={scss.description}>
        <div className={scss.titleBox}>
          {/* <h1>
            {title} ({releaseYear})
          </h1> */}
          <Link className={scss.goBackLink} to={from}>
            X
          </Link>
        </div>
        <div className={scss.decorLine}></div>
        <p>Rating {voteAverage}</p>
        <p>{overview}</p>
        <div>Genres: {genresList}</div>
        <p>Additional Information</p>
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

export default SeriesDetailsContent;
