import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@screens/home';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import ProfileChatsScreen from '@screens/profile/chats';
import ProductsScreen from '@screens/products';
import SingleProductScreen from '@screens/products/[productId]';

interface Props {}

const Stack =
  createNativeStackNavigator<AuthenticatedNavigatorStackParamList>();

const AuthenticatedNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="chats" component={ProfileChatsScreen} />
      <Stack.Screen name="products" component={ProductsScreen} />
      <Stack.Screen name="product-detail" component={SingleProductScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AuthenticatedNavigator;
