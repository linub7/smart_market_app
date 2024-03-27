import { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  title: string;
  active?: boolean;
  onPress?(): void;
}

const AppLink: FC<Props> = ({ title, onPress, active = true }) => {
  return (
    <Pressable
      onPress={active ? onPress : null}
      style={{ opacity: active ? 1 : 0.4 }}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.PRIMARY,
  },
});

export default AppLink;
