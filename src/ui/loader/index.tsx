import { FC } from 'react';
import { ActivityIndicator } from 'react-native';

import { colors } from '@utils/colors';

interface Props {
  color?: string;
}

const CustomLoader: FC<Props> = ({ color = colors.PRIMARY }) => {
  return <ActivityIndicator color={color} size={24} />;
};

export default CustomLoader;
