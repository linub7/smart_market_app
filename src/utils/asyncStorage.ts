import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToAsyncStorage = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const getFromAsyncStorage = async (key: string) => {
  return await AsyncStorage.getItem(key);
};

export const removeFromAsyncStorage = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

export const clearAsyncStorage = async () => {
  await AsyncStorage.clear();
};

export enum Keys {
  AUTH_ACCESS_TOKEN = 'AUTH_ACCESS_TOKEN',
  AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN',
}
