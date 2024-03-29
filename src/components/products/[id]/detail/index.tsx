import { FC } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AvatarUI from '@ui/avatar';
import { colors } from '@utils/colors';
import dateFormatter from '@utils/date';
import { priceFormatter } from '@utils/helpers';

import { IProduct } from 'src/@types/product';
import ProductImagesSlider from '@ui/products/slider';

interface Props {
  product: IProduct;
}

const ProductDetail: FC<Props> = (props) => {
  const { product } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductImagesSlider images={product?.images} />
      <Text style={styles.category}>{product?.category}</Text>
      <Text style={styles.price}>{priceFormatter(product?.price)}</Text>
      <Text style={styles.date}>
        Purchased on: {dateFormatter(product?.date, 'dd LLL yyyy')}
      </Text>
      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.description}>{product?.description}</Text>

      <View style={styles.sellerContainer}>
        <AvatarUI uri={product?.seller.avatar} size={60} />
        <Text style={styles.sellerName}>{product?.seller.name}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  price: {
    color: colors.ACTIVE,
    fontWeight: '700',
    fontSize: 20,
  },
  date: {
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  category: {
    marginTop: 15,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  name: {
    marginTop: 10,
    color: colors.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: 1,
  },
  description: {
    color: colors.PRIMARY,
    letterSpacing: 0.5,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  sellerName: {
    color: colors.PRIMARY,
    fontWeight: '600',
    fontSize: 20,
    letterSpacing: 0.5,
  },
});

export default ProductDetail;
