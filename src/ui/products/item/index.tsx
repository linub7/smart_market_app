import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { IProduct } from 'src/@types/product';
import ProductImage from '../image';

interface Props {
  item: IProduct;
  onPress: () => void;
}

const ProductItem: FC<Props> = (props) => {
  const { item, onPress } = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <ProductImage uri={item.thumbnail} />
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    paddingBottom: 15,
  },
  name: {
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
  },
});

export default ProductItem;
