import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../redux/dataMovie/movieThunks';
import { selectMovieCredits } from '../../redux/dataMovie/movieSelectors';

export const MovieCast = () => {
  const [credits, setCredits] = useState([]);
  const { id } = useParams();
  const baseURL = 'https://image.tmdb.org/t/p/w200';
  const dispatch = useDispatch();
  const cast = useSelector(selectMovieCredits);
  console.log(cast);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        await dispatch(fetchMovieCredits(id));
      } catch (error) {
        console.error('Something went wrong, please try again');
      }
    };

    fetchCredits();
  }, [dispatch, id]);

  useEffect(() => {
    if (cast && cast.length > 0) {
      setCredits(cast);
    }
  }, [cast]);

  if (!credits || credits.length === 0) {
    return (
      <div>
        <p>No credits information for this movie</p>
      </div>
    );
  }
  return (
    <div>
      {credits.map(({ profile_path, name, character, id }) => {
        return (
          <div key={id}>
            <img src={`${baseURL}${profile_path}`} alt={name} />
            <div>
              <p>{name}</p>
              <p>Role: {character}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
