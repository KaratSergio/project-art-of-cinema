import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        <ErrorText>No credits information for this movie</ErrorText>
      </div>
    );
  }
  return (
    <CastContainer>
      {credits.map(({ profile_path, name, character, id }) => {
        return (
          <ActorCard key={id}>
            {profile_path ? (
              <Photo src={`${baseURL}${profile_path}`} alt={name} />
            ) : (
              <DefaultPhoto />
            )}
            <div>
              <ActorName>{name}</ActorName>
              <ActorRole>Role: {character}</ActorRole>
            </div>
          </ActorCard>
        );
      })}
    </CastContainer>
  );
};
