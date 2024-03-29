import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '@screens/profile';
import ProfileChatsScreen from '@screens/profile/chats';
import ProfileProductsScreen from '@screens/profile/products';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';
import SingleProductScreen from '@screens/profile/products/[id]';
import SingleProductEditScreen from '@screens/profile/products/[id]/edit';
import ChatScreen from '@screens/profile/chats/[userId]';

interface Props {}

const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>();

const ProfileNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="profile-chats" component={ProfileChatsScreen} />
      <Stack.Screen name="profile-products" component={ProfileProductsScreen} />
      <Stack.Screen name="single-product" component={SingleProductScreen} />
      <Stack.Screen name="edit-product" component={SingleProductEditScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;
