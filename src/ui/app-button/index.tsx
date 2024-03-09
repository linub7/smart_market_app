import { FC } from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';

import CustomLoader from '@ui/loader';
import { colors } from '@utils/colors';

interface Props {
  btnTitle: string;
  onPress?(): void;
  loading?: boolean;
  borderRadius?: number;
  active?: boolean;
}

const AppButton: FC<Props> = ({
  btnTitle,
  loading = false,
  borderRadius,
  active = true,
  onPress,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        active ? styles.active : styles.deACtive,
        { borderRadius: borderRadius || 10 },
      ]}
      onPress={onPress}
    >
      {loading ? (
        <CustomLoader />
      ) : (
        <Text style={styles.title}>{btnTitle}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  active: {
    backgroundColor: colors.PRIMARY,
  },
  deACtive: {
    backgroundColor: colors.DEACTIVE,
  },
});

export default AppButton;
