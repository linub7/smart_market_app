import { FC } from 'react';
import { ColorValue, DimensionValue, StyleSheet, View } from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: ColorValue;
}

const FormDivider: FC<Props> = (props) => {
  const {
    backgroundColor = colors.DEACTIVE,
    height = 2,
    width = '50%',
  } = props;
  return (
    <View style={[styles.container, { width, height, backgroundColor }]} />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginVertical: 30,
  },
});

export default FormDivider;
