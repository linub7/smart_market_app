import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { colors } from '@utils/colors';
import AuthNavigator from './auth';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE,
  },
};

const AppNavigator: FC<Props> = (props) => {
  return (
    <NavigationContainer theme={AppTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;