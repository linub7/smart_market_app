import { FC } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  title: string;
  additionalStyle?: StyleProp<ViewStyle>;
}

const EmptyView: FC<Props> = (props) => {
  const { title, additionalStyle } = props;
  return (
    <View style={[styles.container, additionalStyle]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.PRIMARY,
    opacity: 0.6,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default EmptyView;
