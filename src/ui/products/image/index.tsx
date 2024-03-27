import { FC } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

import { sizes } from '@utils/size';

interface Props {
  uri: string;
}

const { width } = Dimensions.get('screen');
const imageWidth = width - sizes.SCREEN_PADDING * 2;
const aspect = 16 / 9;

const ProductImage: FC<Props> = (props) => {
  const { uri } = props;
  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMethod="resize"
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: imageWidth,
    height: imageWidth / aspect,
    borderRadius: 7,
  },
});

export default ProductImage;
