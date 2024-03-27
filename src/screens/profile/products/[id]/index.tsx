import { FC, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

import { getSingleProductHandler } from '@api/products';
import ProductDetail from '@components/products/[id]/detail';
import CustomHeader from '@components/shared/header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getNewTokens } from '@utils/helpers';
import { sizes } from '@utils/size';
import { ProfileNavigatorStackParamList } from 'src/@types/navigation';
import { IProduct } from 'src/@types/product';

type Props = NativeStackScreenProps<
  ProfileNavigatorStackParamList,
  'single-product'
>;

const SingleProductScreen: FC<Props> = (props) => {
  const {
    route: {
      params: { id },
    },
  } = props;
  const [product, setProduct] = useState<IProduct>();

  const { goBack } = useNavigation();

  useEffect(() => {
    handleGetSingleProduct();

    return () => {};
  }, [id]);

  const handleGetSingleProduct = async () => {
    const tokens = await getNewTokens();
    const { err, data } = await getSingleProductHandler(
      id,
      tokens?.newAccessToken!
    );
    if (err) {
      console.log({ err });
      goBack();
      return;
    }
    setProduct(data?.data?.product);
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="Go Back" size={32} />
      <View style={styles.innerContainer}>
        {product && <ProductDetail product={product} />}
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
});

export default SingleProductScreen;
