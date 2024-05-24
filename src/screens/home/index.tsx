import 'core-js/stable/atob';
import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { sizes } from '@utils/size';
import ChatNotificationLink from '@ui/links/chat-notifications';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import HomeSearchBarComponent from '@components/home/search-bar';
import HomeCategoryList from '@components/home/category-list';
import HomeLatestProducts from '@components/home/latest-products';

interface Props {}

const HomeScreen: FC<Props> = (props) => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedNavigatorStackParamList>>();

  const handleNavigateToChats = () => navigation.navigate('chats');

  const handleSelectCategory = (category: string) =>
    navigation.navigate('products');

  return (
    <>
      <ChatNotificationLink onPress={handleNavigateToChats} />
      <ScrollView style={styles.container}>
        <HomeSearchBarComponent />
        <HomeCategoryList onPress={handleSelectCategory} />
        <HomeLatestProducts />
      </ScrollView>
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
