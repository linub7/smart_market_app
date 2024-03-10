import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { AuthState, UserProfile } from 'src/@types/auth';
import { RootState } from '..';

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfileAction: (
      state,
      action: PayloadAction<{ profile: UserProfile }>
    ) => {
      const {
        payload: { profile },
      } = action;
      state.profile = profile;
    },
    updateLoggedInStateAction: (
      state,
      action: PayloadAction<{ loggedInState: boolean }>
    ) => {
      const {
        payload: { loggedInState },
      } = action;
      state.loggedIn = loggedInState;
    },
    updateLoadingStateAction: (
      state,
      action: PayloadAction<{ loadingState: boolean }>
    ) => {
      const {
        payload: { loadingState },
      } = action;
      state.loading = loadingState;
    },
    loggedOutAction: (state) => {
      state.profile = null;
      state.loggedIn = false;
    },
  },
});

export const {
  actions: {
    updateProfileAction,
    updateLoggedInStateAction,
    updateLoadingStateAction,
    loggedOutAction,
  },
} = authSlice;

export const getAuthState = createSelector(
  (state: RootState) => state,
  ({ auth }) => auth
);

export default authSlice.reducer;
