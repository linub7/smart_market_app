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

import { getMeHandler } from '@api/auth';
import ButtonLoader from '@ui/loaders/button-loader';
import TabNavigator from './tab';
import { getNewTokens } from '@utils/helpers';

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

    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken)
      return dispatch(updateLoadingStateAction({ loadingState: false }));

    const { err, data } = await getMeHandler(tokens.newAccessToken);
    if (err) {
      dispatch(updateLoadingStateAction({ loadingState: false }));
      dispatch(updateLoggedInStateAction({ loggedInState: false }));
      return;
    }
    dispatch(updateProfileAction({ profile: data?.data?.me }));
    dispatch(updateLoggedInStateAction({ loggedInState: true }));
    dispatch(updateLoadingStateAction({ loadingState: false }));
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
