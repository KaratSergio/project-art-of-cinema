export const selectMovies = state => state.data.movies.movies;
export const selectStatus = state => state.data.status;
export const selectError = state => state.data.error;
export const selectMovieReviews = state => state.data.movies.movieReviews;

export const selectMovieCredits = state => {
  if (state.data.movies.movieCredits && state.data.movies.movieCredits.cast) {
    return state.data.movies.movieCredits.cast.cast;
  }
  return [];
};