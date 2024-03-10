import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgetPasswordScreen from '@screens/auth/forget-password';
import SigninScreen from '@screens/auth/signin';
import SignupScreen from '@screens/auth/signup';

interface Props {}

const Stack = createNativeStackNavigator();

const AuthNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="signin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="forget-password" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigator;
