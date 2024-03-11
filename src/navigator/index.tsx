import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { colors } from '@utils/colors';
import AuthNavigator from './auth';
import {
  getAuthState,
  updateLoadingStateAction,
  updateLoggedInStateAction,
  updateProfileAction,
} from '@store/auth';
import {
  Keys,
  getFromAsyncStorage,
  saveToAsyncStorage,
} from '@utils/asyncStorage';
import { getMeHandler, grantAccessTokenHandler } from '@api/auth';
import ButtonLoader from '@ui/loaders/button-loader';
import TabNavigator from './tab';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE,
  },
};

const AppNavigator: FC<Props> = (props) => {
  const { loggedIn, loading } = useSelector(getAuthState);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAuthInfo();
  }, []);

  const fetchAuthInfo = async () => {
    dispatch(updateLoadingStateAction({ loadingState: true }));
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_ACCESS_TOKEN);
      if (!token)
        return dispatch(updateLoadingStateAction({ loadingState: false }));
      const { err, data } = await getMeHandler(token);
      if (err) {
        const refreshToken = await getFromAsyncStorage(Keys.AUTH_REFRESH_TOKEN);
        if (!refreshToken) {
          dispatch(updateLoadingStateAction({ loadingState: true }));
          dispatch(updateLoggedInStateAction({ loggedInState: false }));
          return;
        }
        const { err: grantError, data: grantData } =
          await grantAccessTokenHandler(refreshToken);
        if (grantError) {
          dispatch(updateLoadingStateAction({ loadingState: true }));
          dispatch(updateLoggedInStateAction({ loggedInState: false }));
          return;
        }
        await saveToAsyncStorage(
          Keys.AUTH_ACCESS_TOKEN,
          grantData?.data?.tokens?.accessToken
        );
        await saveToAsyncStorage(
          Keys.AUTH_REFRESH_TOKEN,
          grantData?.data?.tokens?.refreshToken
        );
      }
      dispatch(updateProfileAction({ profile: data?.data?.me }));
      dispatch(updateLoggedInStateAction({ loggedInState: true }));
      dispatch(updateLoadingStateAction({ loadingState: false }));
    } catch (error) {
      console.log(error);
      dispatch(updateLoadingStateAction({ loadingState: false }));
    }
  };

  return (
    <NavigationContainer theme={AppTheme}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ButtonLoader color={colors.PRIMARY} />
        </View>
      ) : loggedIn ? (
        <TabNavigator />
      ) : (
        <AuthNavigator />
      )}

      <Toast position="top" />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default AppNavigator;
