import { FC } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ILatestProduct } from 'src/@types/product';
import { priceFormatter } from '@utils/helpers';
import { colors } from '@utils/colors';
import { AuthenticatedNavigatorStackParamList } from 'src/@types/navigation';

interface Props {
  item: ILatestProduct;
}

const HomeLatestProductItem: FC<Props> = (props) => {
  const { item } = props;
  const navigation =
    useNavigation<NavigationProp<AuthenticatedNavigatorStackParamList>>();

  const handlePress = () =>
    navigation.navigate('product-detail', { id: item.id });
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.price}>{priceFormatter(item.price)}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.ACTIVE,
    paddingTop: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.PRIMARY,
  },
  thumbnail: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
});

export default HomeLatestProductItem;
