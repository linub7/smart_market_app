import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import productsReducer from './products';

const reducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
