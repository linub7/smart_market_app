import { FC, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { sizes } from '@utils/size';
import CustomHeader from '@components/shared/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import { getProductsByCategoryHandler } from '@api/products';
import { categoryFormatter, getNewTokens } from '@utils/helpers';
import { ILatestProduct } from 'src/@types/product';
import GridView from '@ui/grid-view';
import { LATEST_PRODUCTS_COLUMN_COUNT } from 'src/constants';
import HomeLatestProductItem from '@components/home/latest-products/product-item';
import { colors } from '@utils/colors';
import EmptyView from '@ui/empty-view';

type Props = NativeStackScreenProps<
  AuthenticatedNavigatorStackParamList,
  'products'
>;

const ProductsScreen: FC<Props> = (props) => {
  const {
    route: {
      params: { category },
    },
  } = props;
  const [products, setProducts] = useState<ILatestProduct[]>([]);

  const isOdd = products?.length % LATEST_PRODUCTS_COLUMN_COUNT !== 0;

  useEffect(() => {
    handleGetProductsByCategory();

    return () => {
      setProducts([]);
    };
  }, [category]);

  const handleGetProductsByCategory = async () => {
    const { err, data } = await getProductsByCategoryHandler(
      '1',
      '10',
      category
    );
    if (err) {
      console.log({ GetProductsByCategoryError: err });
      return;
    }
    console.log({ data });
    setProducts(data?.data?.products);
  };
  console.log({ products });
  return (
    <View style={styles.container}>
      <CustomHeader
        title="Go Back"
        size={32}
        right={<Text style={styles.title}>{categoryFormatter(category)}</Text>}
      />

      {products?.length < 1 ? (
        <EmptyView title="There is no products" />
      ) : (
        <FlatList
          data={products}
          numColumns={LATEST_PRODUCTS_COLUMN_COUNT}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              style={{
                flex:
                  isOdd && index === products?.length - 1
                    ? 1 / LATEST_PRODUCTS_COLUMN_COUNT
                    : 1,
              }}
            >
              <HomeLatestProductItem item={item} />
            </View>
          )}
        />
        // <GridView
        //   column={LATEST_PRODUCTS_COLUMN_COUNT}
        //   items={products}
        //   renderItem={(item) => <HomeLatestProductItem item={item} />}
        // />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.SCREEN_PADDING,
  },
  title: {
    fontWeight: '600',
    color: colors.PRIMARY,
    paddingBottom: 5,
    fontSize: 18,
  },
});

export default ProductsScreen;
