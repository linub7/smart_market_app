import { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  label: string;
}

const AuthInputLabel: FC<Props> = ({ label }) => {
  return <Text style={styles.label}>{label}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: colors.PRIMARY,
  },
});

export default AuthInputLabel;
