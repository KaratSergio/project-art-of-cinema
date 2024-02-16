import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';
import movieReducer from './dataMovie/movieSlice';
import seriesReducer from './dataSeries/seriesSlice';
import globalSearchReducer from './globalSearch/globalSearchSlice';

const rootReducer = combineReducers({
  globalSearch: globalSearchReducer,
  movies: movieReducer,
  series: seriesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['globalSearch'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
