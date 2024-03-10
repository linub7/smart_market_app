import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/home';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';

interface Props {}

const Stack =
  createNativeStackNavigator<AuthenticatedNavigatorStackParamList>();

const AuthenticatedNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthenticatedNavigator;
