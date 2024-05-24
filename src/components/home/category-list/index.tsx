import { FC } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { categories } from '@utils/categories';
import { colors } from '@utils/colors';
import { HOME_CATEGORY_ICON_SIZE } from 'src/constants';

interface Props {
  onPress(value: string): void;
}

const HomeCategoryList: FC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.value}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress(item.value)}
            style={styles.categoryContainer}
          >
            <View style={styles.icon}>{item.icon}</View>
            <Text numberOfLines={2} style={styles.label}>
              {item.label}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  categoryContainer: {
    width: HOME_CATEGORY_ICON_SIZE,
    marginRight: 20,
  },
  icon: {
    width: HOME_CATEGORY_ICON_SIZE,
    height: HOME_CATEGORY_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: colors.PRIMARY,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
    paddingTop: 2,
    color: colors.PRIMARY,
  },
});

export default HomeCategoryList;
