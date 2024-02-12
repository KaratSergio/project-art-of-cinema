import { createSelector } from 'reselect';

export const selectMovies = state => state.movies.movies;
export const selectStatus = state => state.status;
export const selectError = state => state.error;
export const selectMovieReviews = state => state.movies.movieReviews;


export const selectMovieCredits = createSelector(
  state => {
    console.log('State:', state); 
    return state.movies.movieCredits;
  },
  movieCredits => {
    console.log('Movie credits:', movieCredits); 
    if (movieCredits && movieCredits.cast) {
      return movieCredits.cast;
    }
    console.log('No movie credits found'); 
    return [];
  }
);