import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const MovieReviews = () => {
  const [reviews, setReviews] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieRewievs = async () => {
      try {
        const response = await fetchMoviesAsync(`movie/${id}/reviews`);
        const reviewsArray =
          response.results && Array.isArray(response.results)
            ? response.results
            : [];
        setReviews(reviewsArray);
      } catch (error) {
        console.error('Something went wrong, please try again');
      }
    };

    fetchMovieRewievs();
  }, [id]);

  if (!Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div>
        <ErrorText>No reviews for this movie</ErrorText>
      </div>
    );
  }
  return (
    <div>
      <div>
        {reviews.map(({ author, content, id }) => (
          <div key={id}>
            <div>
              <div>Author: {author}</div>
            </div>
            <div>{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
