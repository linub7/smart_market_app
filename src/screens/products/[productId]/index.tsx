import { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import { IProduct } from 'src/@types/product';
import { getNewTokens } from '@utils/helpers';
import { getSingleProductHandler } from '@api/products';

type Props = NativeStackScreenProps<
  AuthenticatedNavigatorStackParamList,
  'product-detail'
>;

const SingleProductScreen: FC<Props> = (props) => {
  const [product, setProduct] = useState<IProduct | null>();
  const {
    route: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    handleGetSingleProduct();

    return () => {
      setProduct(null);
    };
  }, [id]);

  const handleGetSingleProduct = async () => {
    const tokens = await getNewTokens();
    if (!tokens?.newAccessToken) return;
    const { err, data } = await getSingleProductHandler(
      id,
      tokens.newAccessToken
    );
    if (err) {
      console.log({ getSingleProductError: err });
      return;
    }
    setProduct(data?.data?.product);
  };
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(product, null, 4)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SingleProductScreen;
