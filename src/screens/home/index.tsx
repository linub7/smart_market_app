import 'core-js/stable/atob';
import { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { sizes } from '@utils/size';
import ChatNotificationLink from '@ui/links/chat-notifications';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import HomeSearchBarComponent from '@components/home/search-bar';
import HomeCategoryList from '@components/home/category-list';
import HomeLatestProducts from '@components/home/latest-products';
import socket from 'src/socket';
import { getNewTokens } from '@utils/helpers';

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedNavigatorStackParamList>>();

  useEffect(() => {
    handleSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSocket = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken) return;

    socket.auth = {
      token: tokens?.newAccessToken,
    };
    socket.connect();

    socket.on('connect', () => {
      console.log('connected: ', socket.connected);
    });
    socket.on('disconnect', () => {
      console.log('disconnect: ', socket.connected);
    });
    socket.on('connect_error', (error) => {
      console.log('connect_error: ', error.message);
    });
  };

  const handleNavigateToChats = () => navigation.navigate('chats');

  const handleSelectCategory = (category: string) =>
    navigation.navigate('products', { category });

  return (
    <>
      <ChatNotificationLink onPress={handleNavigateToChats} />
      <View style={styles.container}>
        <HomeSearchBarComponent />
        <HomeCategoryList onPress={handleSelectCategory} />
        <HomeLatestProducts />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
    flex: 1,
  },
});

export default HomeScreen;
