import { FC, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ViewToken } from 'react-native';

import ProductImage from '../image';
import { colors } from '@utils/colors';

interface Props {
  images: string[];
}

const ProductImagesSlider: FC<Props> = (props) => {
  const { images } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const viewableConfig = useRef({ itemVisiblePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setActiveIndex(info.viewableItems[0].index || 0);
    }
  );
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={images}
        viewabilityConfig={viewableConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
        keyExtractor={(el) => el}
        renderItem={({ item }) => <ProductImage uri={item} />}
      />
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>
          {activeIndex + 1}/{images?.length}{' '}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  flatList: {
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    width: 35,
    height: 25,
    backgroundColor: colors.BACK_DROP,
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  indicatorText: {
    color: colors.WHITE,
    fontWeight: '600',
  },
});

export default ProductImagesSlider;
