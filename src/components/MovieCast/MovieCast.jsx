import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../redux/dataMovie/movieThunks';
import { selectMovieCredits } from '../../redux/dataMovie/movieSelectors';

export const MovieCast = () => {
  const { id } = useParams();
  const baseURL = 'https://image.tmdb.org/t/p/w200';
  const dispatch = useDispatch();
  const credits = useSelector(state => selectMovieCredits(state, id));

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
      {Array.isArray(credits) && credits.length > 0 ? (
        credits.map(({ profile_path, name, character, id }) => (
          <div key={id}>
            <img src={`${baseURL}${profile_path}`} alt={name} />
            <div>
              <p>{name}</p>
              <p>Role: {character}</p>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};
