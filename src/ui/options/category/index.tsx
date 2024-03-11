import { FC, JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  icon: JSX.Element;
  label: string;
}

const CategoryOption: FC<Props> = (props) => {
  const { icon, label } = props;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View>{icon}</View>
      <Text style={styles.categoryLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryLabel: {
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
});

export default CategoryOption;
