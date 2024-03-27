import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import CustomHeader from '@components/shared/header';
import { sizes } from '@utils/size';
import { getAllMyProductsHandler } from '@api/products';
import { getNewTokens } from '@utils/helpers';
import { IProduct } from 'src/@types/product';
import ProductItem from '@ui/products/item';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';

interface Props {}

const ProfileProductsScreen: FC<Props> = (props) => {
  const [myProducts, setMyProducts] = useState<IProduct[]>([]);
  const navigation =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  useEffect(() => {
    handleGetAllMyProducts();

    return () => {};
  }, []);

  const handleNavigate = (id: string) =>
    navigation.navigate('single-product', { id });

  const handleGetAllMyProducts = async () => {
    const tokens = await getNewTokens();
    // TODO: page & Limit
    const { err, data } = await getAllMyProductsHandler(
      '1',
      '10',
      tokens?.newAccessToken!
    );
    if (err) {
      console.log(err);
      return;
    }
    setMyProducts(data?.data?.products);
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Go Back" size={32} />
      <View style={styles.innerContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          data={myProducts}
          keyExtractor={(el) => el.id}
          renderItem={({ item }) => (
            <ProductItem item={item} onPress={() => handleNavigate(item.id)} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.SCREEN_PADDING,
  },
  innerContainer: {
    marginTop: 25,
  },
  flatList: {
    paddingBottom: 20,
  },
});

export default ProfileProductsScreen;
