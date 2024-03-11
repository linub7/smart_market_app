import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import NewProductScreen from '@screens/products/new';
import AuthenticatedNavigator from '../authenticated';
import ProfileNavigator from '../profile';

interface Props {}

const Tab = createBottomTabNavigator();

const TabNavigator: FC<Props> = (props) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home-navigator"
        component={AuthenticatedNavigator}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return focused ? (
              <Icon name="home" size={size} color={color} />
            ) : (
              <Icon name="home-outline" size={size} color={color} />
            );
          },
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="new-product"
        component={NewProductScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return focused ? (
              <Icon name="add-circle" size={size} color={color} />
            ) : (
              <Icon name="add-circle-outline" size={size} color={color} />
            );
          },
          title: 'Create Product',
        }}
      />
      <Tab.Screen
        name="profile-navigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            return focused ? (
              <Icon name="person" size={size} color={color} />
            ) : (
              <Icon name="person-outline" size={size} color={color} />
            );
          },
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default TabNavigator;
