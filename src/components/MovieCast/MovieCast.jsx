import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../redux/dataMovie/movieThunks';
import { selectMovieCredits } from '../../redux/dataMovie/movieSelectors';

import scss from './MovieCast.module.scss';

export const MovieCast = () => {
  const { id } = useParams();
  const baseURL = 'https://image.tmdb.org/t/p/w200';
  const dispatch = useDispatch();
  const credits = useSelector(selectMovieCredits);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        await dispatch(fetchMovieCredits({ id }));
      } catch (error) {
        console.error('Something went wrong, please try again');
      }
    };

    fetchCredits();
  }, [dispatch, id]);

  if (!credits || credits.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <ul className={scss.container}>
        {credits.map(
          ({ profile_path, name, character, id }) =>
            profile_path && (
              <li
                className={scss.actorCard}
                key={id}
                style={{
                  backgroundImage: `url(${baseURL}${profile_path})`,
                }}
              >
                <div className={scss.actorName}>
                  <p>{name}</p>
                </div>
                <div className={scss.actorRole}>
                  <p>Role: {character}</p>
                </div>
              </li>
            )
        )}
      </ul>
    </div>
  );
};
