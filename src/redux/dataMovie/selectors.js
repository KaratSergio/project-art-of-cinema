export const selectError = state => state.error;
export const selectStatus = state => state.status;
export const selectMovies = state => state.movies.movies;
export const selectMovieReviews = state => state.movies.movieReviews || [];
export const selectMovieGallery = state =>
  state.movies.movieGallery?.backdrops || [];
export const selectMovieCredits = state =>
  state.movies.movieCredits?.cast || [];
