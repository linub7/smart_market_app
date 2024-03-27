import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '@screens/profile';
import ProfileChatsScreen from '@screens/profile/chats';
import ProfileProductsScreen from '@screens/profile/products';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';

interface Props {}

const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>();

const ProfileNavigator: FC<Props> = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="profile-chats" component={ProfileChatsScreen} />
      <Stack.Screen name="profile-products" component={ProfileProductsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileNavigator;
