import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { getLatestProductsHandler } from '@api/products';
import { ILatestProduct } from 'src/@types/product';
import { colors } from '@utils/colors';
import GridView from '@ui/grid-view';
import { LATEST_PRODUCTS_COLUMN_COUNT } from 'src/constants';
import HomeLatestProductItem from './product-item';

interface Props {}

const HomeLatestProducts: FC<Props> = (props) => {
  const [latestProducts, setLatestProducts] = useState<ILatestProduct[]>([]);

  const isOdd = latestProducts?.length % LATEST_PRODUCTS_COLUMN_COUNT !== 0;

  useEffect(() => {
    handleGetLatestProducts();

    return () => {};
  }, []);

  const handleGetLatestProducts = async () => {
    const { err, data } = await getLatestProductsHandler();
    if (err) {
      console.log({ getLatestProductError: err });
      return;
    }
    setLatestProducts(data?.data?.products);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recently Listed Offers</Text>
      <FlatList
        data={latestProducts}
        numColumns={LATEST_PRODUCTS_COLUMN_COUNT}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex:
                isOdd && index === latestProducts?.length - 1
                  ? 1 / LATEST_PRODUCTS_COLUMN_COUNT
                  : 1,
            }}
          >
            <HomeLatestProductItem item={item} />
          </View>
        )}
      />
      {/* <GridView
        column={LATEST_PRODUCTS_COLUMN_COUNT}
        items={latestProducts}
        renderItem={(item) => <HomeLatestProductItem item={item} />}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    fontWeight: '600',
    color: colors.PRIMARY,
    fontSize: 20,
    marginBottom: 15,
    letterSpacing: 0.5,
  },
});

export default HomeLatestProducts;
