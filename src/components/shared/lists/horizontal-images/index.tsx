import { FC } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface Props {
  images: string[];
  style?: StyleProp<ViewStyle>;
  onPress?: (item: string) => void;
  onLongPress?: (item: string) => void;
}

const HorizontalImagesList: FC<Props> = (props) => {
  const { images, style, onPress, onLongPress } = props;
  return (
    <FlatList
      contentContainerStyle={style}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={images}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPress && onPress(item)}
          onLongPress={() => onLongPress && onLongPress(item)}
          style={styles.listItem}
        >
          <Image source={{ uri: item }} style={styles.image} />
        </Pressable>
      )}
      keyExtractor={(item) => item}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 70,
    height: 70,
    borderRadius: 7,
    marginLeft: 5,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
});

export default HorizontalImagesList;
