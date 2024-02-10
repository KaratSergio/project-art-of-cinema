export const selectMovies = (state) => state.data.movies;
export const selectStatus = (state) => state.data.status;
export const selectError = (state) => state.data.error;
export const selectMovieCredits = (state) => state.data.credits;

// export const selectMovieCredits = (state, id) => {
//   const credits = state.movie.credits[id];
//   console.log('Credits:', credits); // Добавляем логирование
//   return credits;
// };

