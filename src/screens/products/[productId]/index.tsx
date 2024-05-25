import { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';
import { IProduct } from 'src/@types/product';
import { getNewTokens } from '@utils/helpers';
import { getSingleProductHandler } from '@api/products';
import CustomHeader from '@components/shared/header';
import { sizes } from '@utils/size';
import ProductDetail from '@components/products/[id]/detail';

type Props = NativeStackScreenProps<
  AuthenticatedNavigatorStackParamList,
  'product-detail'
>;

const SingleProductDetailScreen: FC<Props> = (props) => {
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
      <CustomHeader title="Go Back" size={32} />
      {product && <ProductDetail product={product} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.SCREEN_PADDING,
  },
});

export default SingleProductDetailScreen;
