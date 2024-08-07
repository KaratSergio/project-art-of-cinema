import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './Layout/Layout';

import { Home } from '../pages/Home/Home';

import { Series } from '../pages/Series/Series';
import { SeriesDetails } from '../pages/Series/SeriesDetails/SeriesDetails';
import { SeriesReviews } from './Series/SeriesReviews/SeriesReviews';
import { SeriesGallery } from './Series/SeriesGallery/SeriesGallery';
import { SeriesCast } from './Series/SeriesCast/SeriesCast';

import { Movie } from '../pages/Movie/Movie';
import { MovieDetails } from '../pages/Movie/MovieDetails/MovieDetails';
import { MovieReviews } from './Movies/MovieReviews/MovieReviews';
import { MovieGallery } from './Movies/MovieGallery/MovieGallery';
import { MovieCast } from './Movies/MovieCast/MovieCast';

import { Person } from '../pages/Person/Person';
import { PersonCart } from './Person/PersonCart/PersonCart';
import { PersonCredits } from './Person/PersonCredits/PersonCredits';

import { NoPageFound } from '../pages/PageNotFound/PageNotFound';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="movies/:page" element={<Movie />} />
        <Route path="movie/:page/:id" element={<MovieDetails />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
          <Route path="gallery" element={<MovieGallery />} />
        </Route>

        <Route path="person" element={<Person />} />
        <Route path="person/:id" element={<PersonCart />}>
          <Route path="credits" element={<PersonCredits />} />
        </Route>

        <Route path="series/:page" element={<Series />} />
        <Route path="series/:page/:id" element={<SeriesDetails />}>
          <Route path="cast" element={<SeriesCast />} />
          <Route path="reviews" element={<SeriesReviews />} />
          <Route path="gallery" element={<SeriesGallery />} />
        </Route>

        <Route path="*" element={<NoPageFound />} />
      </Route>
    </Routes>
  );
};

export default App;
