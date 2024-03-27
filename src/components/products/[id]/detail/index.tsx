import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { IProduct } from 'src/@types/product';

interface Props {
  product: IProduct;
}

const ProductDetail: FC<Props> = (props) => {
  const { product } = props;
  return (
    <View style={styles.container}>
      <Text>{product?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProductDetail;
