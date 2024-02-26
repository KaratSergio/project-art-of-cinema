import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';

import { Home } from '../pages/Home/Home';

import { Series } from '../pages/Series/Series';
import { SeriesDetails } from '../pages/Series/SeriesDetails/SeriesDetails';
import { SeriesReviews } from './Series/SeriesReviews/SeriesReviews';
import { SeriesCast } from './Series/SeriesCast/SeriesCast';

import { Movie } from '../pages/Movie/Movie';
import { MovieDetails } from '../pages/Movie/MovieDetails/MovieDetails';
import { MovieReviews } from './Movies/MovieReviews/MovieReviews';
import { MovieCast } from './Movies/MovieCast/MovieCast';

import { NoPageFound } from '../pages/PageNotFound/PageNotFound';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="movies" element={<Movie />} />
        <Route path="movie/:id" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>

        <Route path="series" element={<Series />} />
        <Route path="series/:id" element={<SeriesDetails />}>
          <Route path="cast" element={<SeriesCast />} />
          <Route path="reviews" element={<SeriesReviews />} />
        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Route>
    </Routes>
  );
};

export default App;
