export const selectMovies = state => state.data.movies;
export const selectStatus = state => state.data.status;
export const selectError = state => state.data.error;
export const selectMovieReviews = state => state.data.movieReviews;

export const selectMovieCredits = state => {
  if (state.data.movieCredits && state.data.movieCredits.cast) {
    return state.data.movieCredits.cast.cast;
  }
  return [];
};