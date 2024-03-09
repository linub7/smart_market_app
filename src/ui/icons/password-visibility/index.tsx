import { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { colors } from '@utils/colors';

interface Props {
  privateIcon: boolean;
}

const PasswordVisibilityIcon: FC<Props> = ({ privateIcon }) => {
  return privateIcon ? (
    <Icon name="eye" color={colors.PRIMARY} size={16} />
  ) : (
    <Icon name="eye-off" color={colors.PRIMARY} size={16} />
  );
};

export default PasswordVisibilityIcon;
