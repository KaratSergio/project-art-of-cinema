import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import fetchMoviesAsync from '../../redux/dataMovie/movieThunks'

export const MovieCast = () => {
  const [credits, setCredits] = useState([]);
  const { id } = useParams();
  const baseURL = 'https://image.tmdb.org/t/p/w200';

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const { cast: results } = await fetchMoviesAsync(`movie/${id}/credits`);
        setCredits(results);
      } catch (error) {
        console.error('Something went wrong, please try again');
      }
    };

    fetchMovieCredits();
  }, [id]);

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
